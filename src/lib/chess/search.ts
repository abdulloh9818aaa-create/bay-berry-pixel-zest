import { Chess, type Move } from "chess.js";
import type { Difficulty, PieceSymbol, Square } from "./types";
import { evaluate, orderMoves } from "./eval";

const BOOK: Record<string, string[]> = {
  "": ["e4", "d4", "Nf3", "c4"],
  e4: ["e5", "c5", "e6", "c6", "d5"],
  "e4 e5": ["Nf3"],
  "e4 e5 Nf3": ["Nc6", "Nf6"],
  "e4 e5 Nf3 Nc6": ["Bb5", "Bc4", "d4"],
  "e4 e5 Nf3 Nc6 Bb5": ["a6", "Nf6"],
  "e4 e5 Nf3 Nc6 Bc4": ["Nf6", "Bc5"],
  "e4 e5 Nf3 Nf6": ["Nxe5", "d4"],
  "e4 c5": ["Nf3"],
  "e4 c5 Nf3": ["d6", "Nc6", "e6"],
  "e4 c5 Nf3 d6": ["d4"],
  "e4 c5 Nf3 d6 d4": ["cxd4"],
  "e4 c5 Nf3 d6 d4 cxd4": ["Nxd4"],
  "e4 c5 Nf3 Nc6": ["d4"],
  "e4 e6": ["d4"],
  "e4 e6 d4": ["d5"],
  "e4 c6": ["d4"],
  "e4 c6 d4": ["d5"],
  "e4 d5": ["exd5"],
  d4: ["d5", "Nf6"],
  "d4 d5": ["c4", "Nf3"],
  "d4 Nf6": ["c4", "Nf3"],
  "d4 Nf6 c4": ["e6", "g6"],
  "d4 Nf6 c4 e6": ["Nc3", "Nf3"],
  "d4 Nf6 c4 g6": ["Nc3"],
  Nf3: ["d5", "Nf6"],
  c4: ["e5", "Nf6"],
};

export type SearchMove = {
  from: Square;
  to: Square;
  promotion?: PieceSymbol;
};

let timedOut = false;

function pickBook(chess: Chess, history: string[]): Move | null {
  const options = BOOK[history.join(" ")];
  if (!options?.length) return null;
  const order = options.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const current = order[i]!;
    order[i] = order[j]!;
    order[j] = current;
  }
  for (const index of order) {
    const san = options[index];
    if (!san) continue;
    try {
      const move = chess.move(san);
      if (move) {
        chess.undo();
        return move;
      }
    } catch {
      /* illegal in this line */
    }
  }
  return null;
}

function negamax(
  chess: Chess,
  depth: number,
  alpha: number,
  beta: number,
  ply: number,
  deadline: number,
): number {
  if (performance.now() > deadline) {
    timedOut = true;
    return evaluate(chess);
  }
  if (chess.isCheckmate()) return -100000 + ply;
  if (chess.isDraw()) return 0;
  if (depth <= 0) return evaluate(chess);

  const moves = orderMoves(chess.moves({ verbose: true }));
  if (moves.length === 0) return chess.isCheck() ? -100000 + ply : 0;

  let best = -Infinity;
  for (const move of moves) {
    chess.move({ from: move.from, to: move.to, promotion: move.promotion });
    const score = -negamax(chess, depth - 1, -beta, -alpha, ply + 1, deadline);
    chess.undo();
    if (timedOut) return best === -Infinity ? score : best;
    if (score > best) best = score;
    if (best > alpha) alpha = best;
    if (alpha >= beta) break;
  }
  return best;
}

function searchRoot(chess: Chess, maxDepth: number, timeMs: number): Move {
  const deadline = performance.now() + timeMs;
  const moves = orderMoves(chess.moves({ verbose: true }));
  let best = moves[0]!;
  for (let depth = 1; depth <= maxDepth; depth++) {
    timedOut = false;
    let iterBest = best;
    let iterScore = -Infinity;
    let alpha = -Infinity;
    const ordered = [best, ...moves.filter((m) => m.san !== best.san)];
    for (const move of ordered) {
      chess.move({ from: move.from, to: move.to, promotion: move.promotion });
      const score = -negamax(chess, depth - 1, -Infinity, -alpha, 1, deadline);
      chess.undo();
      if (timedOut) break;
      if (score > iterScore) {
        iterScore = score;
        iterBest = move;
      }
      if (score > alpha) alpha = score;
    }
    if (timedOut && depth > 1) break;
    best = iterBest;
    if (Math.abs(iterScore) > 90000) break;
  }
  return best;
}

export function pickMove(
  chess: Chess,
  history: string[],
  difficulty: Difficulty,
): SearchMove | null {
  const legal = chess.moves({ verbose: true });
  if (legal.length === 0) return null;

  const skipBook = difficulty === "casual" && Math.random() < 0.32;
  if (!skipBook) {
    const book = pickBook(chess, history);
    if (book) {
      return { from: book.from, to: book.to, promotion: book.promotion };
    }
  }

  if (difficulty === "casual" && Math.random() < 0.2) {
    const move = legal[Math.floor(Math.random() * legal.length)]!;
    return { from: move.from, to: move.to, promotion: move.promotion };
  }

  const time = difficulty === "casual" ? 200 : difficulty === "club" ? 550 : 1400;
  const depth = difficulty === "casual" ? 2 : difficulty === "club" ? 3 : 4;
  const move = searchRoot(chess, depth, time);
  return { from: move.from, to: move.to, promotion: move.promotion };
}
