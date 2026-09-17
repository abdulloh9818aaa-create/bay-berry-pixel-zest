import { create } from "zustand";
import type { Move } from "chess.js";
import type {
  Color,
  Difficulty,
  GameResult,
  LastMove,
  PieceSymbol,
  PlacedPiece,
  PlayMode,
  PromotionRequest,
  Square,
} from "@/lib/chess/types";
import { opposite } from "@/lib/chess/types";
import {
  capturedByColor,
  getGame,
  loadHistory,
  materialScore,
  playEngineMove,
  reconcilePieces,
  resetEngine,
  seedPieces,
  undoEngineMove,
} from "@/lib/chess/engine";
import { playMoveSound, setMuted as setAudioMuted, unlockAudio } from "@/lib/chess/sounds";
import { clearSave, loadSave, writeSave, type SaveV1 } from "@/lib/chess/save";

type Phase = "menu" | "playing";

type GameStore = {
  phase: Phase;
  mode: PlayMode;
  difficulty: Difficulty;
  playerColor: Color;
  orientation: Color;
  fen: string;
  turn: Color;
  history: Move[];
  pieces: PlacedPiece[];
  captured: { w: PieceSymbol[]; b: PieceSymbol[] };
  material: number;
  selected: Square | null;
  legal: Move[];
  lastMove: LastMove | null;
  inCheck: boolean;
  result: GameResult | null;
  promotion: PromotionRequest | null;
  thinking: boolean;
  aiRequestId: number;
  muted: boolean;
  hasSave: boolean;
  hydrated: boolean;

  hydrate: () => void;
  startGame: (mode: PlayMode, playerColor: Color, difficulty: Difficulty) => void;
  continueGame: () => void;
  toMenu: () => void;
  selectSquare: (square: Square) => void;
  tryMove: (from: Square, to: Square) => void;
  choosePromotion: (piece: PieceSymbol) => void;
  cancelPromotion: () => void;
  undo: () => void;
  flip: () => void;
  resign: () => void;
  applyAiMove: (payload: {
    requestId: number;
    from: Square;
    to: Square;
    promotion?: PieceSymbol;
  }) => void;
  toggleMuted: () => void;
  canInteract: () => boolean;
  canUndo: () => boolean;
};

function resultOf(): GameResult | null {
  const chess = getGame();
  if (!chess.isGameOver()) return null;
  if (chess.isCheckmate()) {
    return { kind: "mate", winner: opposite(chess.turn()) };
  }
  if (chess.isStalemate()) return { kind: "stalemate" };
  if (chess.isThreefoldRepetition()) return { kind: "repetition" };
  if (chess.isInsufficientMaterial()) return { kind: "material" };
  if (chess.isDrawByFiftyMoves()) return { kind: "fifty" };
  return { kind: "draw" };
}

function persist(state: GameStore) {
  if (state.phase !== "playing" || state.result) {
    if (state.result) clearSave();
    return;
  }
  const save: SaveV1 = {
    version: 1,
    history: state.history.map((m) => m.san),
    mode: state.mode,
    difficulty: state.difficulty,
    playerColor: state.playerColor,
    orientation: state.orientation,
    lastMove: state.lastMove,
  };
  writeSave(save);
}

function snapshot(prevPieces: PlacedPiece[]): Pick<
  GameStore,
  | "fen"
  | "turn"
  | "history"
  | "pieces"
  | "captured"
  | "material"
  | "lastMove"
  | "inCheck"
  | "result"
  | "selected"
  | "legal"
  | "promotion"
> {
  const chess = getGame();
  const history = chess.history({ verbose: true });
  const last = history[history.length - 1];
  return {
    fen: chess.fen(),
    turn: chess.turn(),
    history,
    pieces: reconcilePieces(prevPieces, chess),
    captured: capturedByColor(chess),
    material: materialScore(chess),
    lastMove: last ? { from: last.from, to: last.to } : null,
    inCheck: chess.isCheck(),
    result: resultOf(),
    selected: null,
    legal: [],
    promotion: null,
  };
}

function soundFor(move: Move, result: GameResult | null, inCheck: boolean) {
  if (result?.kind === "mate") playMoveSound("mate");
  else if (inCheck) playMoveSound("check");
  else if (move.isPromotion()) playMoveSound("promote");
  else if (move.isKingsideCastle() || move.isQueensideCastle()) playMoveSound("castle");
  else if (move.isCapture() || move.isEnPassant()) playMoveSound("capture");
  else playMoveSound("move");
}

function isPlayerTurn(state: { mode: PlayMode; playerColor: Color; turn: Color; thinking: boolean; result: GameResult | null }) {
  if (state.result) return false;
  if (state.thinking) return false;
  if (state.mode === "local") return true;
  return state.turn === state.playerColor;
}

export const useGameStore = create<GameStore>((set, get) => ({
  phase: "menu",
  mode: "ai",
  difficulty: "club",
  playerColor: "w",
  orientation: "w",
  fen: "start",
  turn: "w",
  history: [],
  pieces: [],
  captured: { w: [], b: [] },
  material: 0,
  selected: null,
  legal: [],
  lastMove: null,
  inCheck: false,
  result: null,
  promotion: null,
  thinking: false,
  aiRequestId: 0,
  muted: false,
  hasSave: false,
  hydrated: false,

  hydrate: () => {
    const save = loadSave();
    set({ hasSave: Boolean(save && save.history.length > 0), hydrated: true });
  },

  startGame: (mode, playerColor, difficulty) => {
    unlockAudio();
    resetEngine();
    const chess = getGame();
    const aiFirst = mode === "ai" && playerColor === "b";
    const next: Partial<GameStore> = {
      phase: "playing",
      mode,
      playerColor,
      difficulty,
      orientation: mode === "ai" ? playerColor : "w",
      thinking: aiFirst,
      aiRequestId: aiFirst ? get().aiRequestId + 1 : get().aiRequestId,
      hasSave: false,
      ...snapshot([]),
      pieces: seedPieces(chess),
    };
    set(next as GameStore);
    persist({ ...get() });
  },

  continueGame: () => {
    const save = loadSave();
    if (!save || save.history.length === 0) return;
    unlockAudio();
    loadHistory(save.history);
    const chess = getGame();
    const snap = snapshot([]);
    const aiToMove =
      save.mode === "ai" && chess.turn() !== save.playerColor && !snap.result;
    set({
      phase: "playing",
      mode: save.mode,
      difficulty: save.difficulty,
      playerColor: save.playerColor,
      orientation: save.orientation,
      thinking: aiToMove,
      aiRequestId: aiToMove ? get().aiRequestId + 1 : get().aiRequestId,
      hasSave: true,
      ...snap,
      pieces: seedPieces(chess),
      lastMove: save.lastMove ?? snap.lastMove,
    });
  },

  toMenu: () => {
    const save = loadSave();
    set({
      phase: "menu",
      thinking: false,
      selected: null,
      legal: [],
      promotion: null,
      hasSave: Boolean(save && save.history.length > 0),
    });
  },

  canInteract: () => {
    const s = get();
    return s.phase === "playing" && !s.result && !s.thinking && isPlayerTurn(s);
  },

  canUndo: () => {
    const s = get();
    if (s.phase !== "playing" || s.history.length === 0) return false;
    if (s.mode === "local") return true;
    return s.history.some((m) => m.color === s.playerColor) || s.thinking;
  },

  selectSquare: (square) => {
    const s = get();
    if (s.phase !== "playing" || s.result || s.thinking || s.promotion) return;
    if (!isPlayerTurn(s)) return;
    if (s.selected) {
      const match = s.legal.find((m) => m.to === square);
      if (match) {
        get().tryMove(s.selected, square);
        return;
      }
    }
    const chess = getGame();
    const piece = chess.get(square);
    if (piece && piece.color === chess.turn()) {
      set({
        selected: square,
        legal: chess.moves({ square, verbose: true }),
      });
    } else {
      set({ selected: null, legal: [] });
    }
  },

  tryMove: (from, to) => {
    const s = get();
    if (s.phase !== "playing" || s.result || s.thinking) return;
    if (!isPlayerTurn(s)) return;
    const chess = getGame();
    const options = chess.moves({ square: from, verbose: true }).filter((m) => m.to === to);
    if (options.length === 0) {
      const piece = chess.get(to);
      if (piece && piece.color === chess.turn()) {
        set({ selected: to, legal: chess.moves({ square: to, verbose: true }) });
      } else {
        set({ selected: null, legal: [] });
      }
      return;
    }
    if (options.some((m) => m.promotion) && !s.promotion) {
      set({ promotion: { from, to }, selected: from });
      return;
    }
    const move = playEngineMove(from, to);
    if (!move) return;
    const snap = snapshot(get().pieces);
    soundFor(move, snap.result, snap.inCheck);
    const aiTurn =
      get().mode === "ai" && !snap.result && getGame().turn() !== get().playerColor;
    set({
      ...snap,
      thinking: aiTurn,
      aiRequestId: aiTurn ? get().aiRequestId + 1 : get().aiRequestId,
    });
    persist(get());
  },

  choosePromotion: (piece) => {
    const s = get();
    if (!s.promotion) return;
    const move = playEngineMove(s.promotion.from, s.promotion.to, piece);
    if (!move) {
      set({ promotion: null });
      return;
    }
    const snap = snapshot(get().pieces);
    soundFor(move, snap.result, snap.inCheck);
    const aiTurn =
      get().mode === "ai" && !snap.result && getGame().turn() !== get().playerColor;
    set({
      ...snap,
      thinking: aiTurn,
      aiRequestId: aiTurn ? get().aiRequestId + 1 : get().aiRequestId,
    });
    persist(get());
  },

  cancelPromotion: () => set({ promotion: null, selected: null, legal: [] }),

  undo: () => {
    const s = get();
    if (!get().canUndo()) return;
    if (s.thinking) {
      undoEngineMove();
      set({
        thinking: false,
        aiRequestId: s.aiRequestId + 1,
        ...snapshot(s.pieces),
      });
      persist(get());
      return;
    }
    undoEngineMove();
    if (s.mode === "ai") undoEngineMove();
    set({ thinking: false, ...snapshot(get().pieces) });
    persist(get());
  },

  flip: () => set({ orientation: opposite(get().orientation) }),

  resign: () => {
    const s = get();
    if (s.phase !== "playing" || s.result) return;
    const loser = s.mode === "ai" ? s.playerColor : s.turn;
    set({
      result: { kind: "resign", winner: opposite(loser) },
      thinking: false,
      selected: null,
      legal: [],
      promotion: null,
    });
    playMoveSound("mate");
    clearSave();
  },

  applyAiMove: (payload) => {
    const s = get();
    if (!s.thinking || payload.requestId !== s.aiRequestId) return;
    if (s.result) {
      set({ thinking: false });
      return;
    }
    const move = playEngineMove(payload.from, payload.to, payload.promotion);
    if (!move) {
      set({ thinking: false });
      return;
    }
    const snap = snapshot(s.pieces);
    soundFor(move, snap.result, snap.inCheck);
    set({ ...snap, thinking: false });
    persist(get());
  },

  toggleMuted: () => {
    const next = !get().muted;
    setAudioMuted(next);
    set({ muted: next });
  },
}));
