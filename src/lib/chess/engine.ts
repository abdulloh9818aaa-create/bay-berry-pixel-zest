import { Chess, type Move } from "chess.js";
import type { Color, PieceSymbol, PlacedPiece, Square } from "./types";
import { squareDist } from "./types";

let game = new Chess();
let pieceSeq = 1;

export function getGame(): Chess {
  return game;
}

export function resetEngine(): Chess {
  game = new Chess();
  return game;
}

export function loadHistory(sans: string[]): Chess {
  game = new Chess();
  for (const san of sans) {
    try {
      const moved = game.move(san);
      if (!moved) break;
    } catch {
      break;
    }
  }
  return game;
}

export function playEngineMove(from: Square, to: Square, promotion?: PieceSymbol): Move | null {
  try {
    return game.move({ from, to, promotion });
  } catch {
    return null;
  }
}

export function undoEngineMove(): Move | null {
  return game.undo();
}

const START_COUNT: Record<PieceSymbol, number> = {
  p: 8,
  n: 2,
  b: 2,
  r: 2,
  q: 1,
  k: 1,
};

const MATERIAL: Record<PieceSymbol, number> = {
  p: 1,
  n: 3,
  b: 3,
  r: 5,
  q: 9,
  k: 0,
};

export function capturedByColor(chess: Chess): { w: PieceSymbol[]; b: PieceSymbol[] } {
  const onBoard: Record<Color, Record<PieceSymbol, number>> = {
    w: { p: 0, n: 0, b: 0, r: 0, q: 0, k: 0 },
    b: { p: 0, n: 0, b: 0, r: 0, q: 0, k: 0 },
  };
  for (const row of chess.board()) {
    for (const cell of row) {
      if (!cell) continue;
      onBoard[cell.color][cell.type] += 1;
    }
  }
  const missing = (color: Color): PieceSymbol[] => {
    const out: PieceSymbol[] = [];
    for (const type of ["q", "r", "b", "n", "p"] as PieceSymbol[]) {
      const n = START_COUNT[type] - onBoard[color][type];
      for (let i = 0; i < n; i++) out.push(type);
    }
    return out;
  };
  return { w: missing("w"), b: missing("b") };
}

export function materialScore(chess: Chess): number {
  let white = 0;
  let black = 0;
  for (const row of chess.board()) {
    for (const cell of row) {
      if (!cell) continue;
      if (cell.color === "w") white += MATERIAL[cell.type];
      else black += MATERIAL[cell.type];
    }
  }
  return white - black;
}

export function reconcilePieces(prev: PlacedPiece[], chess: Chess): PlacedPiece[] {
  const next: { type: PieceSymbol; color: Color; square: Square }[] = [];
  for (const row of chess.board()) {
    for (const cell of row) {
      if (cell) next.push({ type: cell.type, color: cell.color, square: cell.square });
    }
  }
  const used = new Set<string>();
  const result: PlacedPiece[] = [];
  for (const n of next) {
    let best: PlacedPiece | undefined;
    let bestD = Infinity;
    for (const p of prev) {
      if (used.has(p.id) || p.type !== n.type || p.color !== n.color) continue;
      const d = squareDist(p.square, n.square);
      if (d < bestD) {
        bestD = d;
        best = p;
      }
    }
    if (best) {
      used.add(best.id);
      result.push({ id: best.id, type: n.type, color: n.color, square: n.square });
    } else {
      result.push({
        id: `pc-${pieceSeq++}`,
        type: n.type,
        color: n.color,
        square: n.square,
      });
    }
  }
  return result;
}

export function seedPieces(chess: Chess): PlacedPiece[] {
  pieceSeq = 1;
  return reconcilePieces([], chess);
}
