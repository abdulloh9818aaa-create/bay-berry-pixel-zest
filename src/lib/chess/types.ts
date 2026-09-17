import type { Color, PieceSymbol, Square } from "chess.js";

export type { Color, PieceSymbol, Square };

export type Difficulty = "casual" | "club" | "sharp";
export type PlayMode = "ai" | "local";

export type PlacedPiece = {
  id: string;
  type: PieceSymbol;
  color: Color;
  square: Square;
};

export type LastMove = { from: Square; to: Square };

export type GameResult =
  | { kind: "mate"; winner: Color }
  | { kind: "stalemate" }
  | { kind: "repetition" }
  | { kind: "material" }
  | { kind: "fifty" }
  | { kind: "draw" }
  | { kind: "resign"; winner: Color };

export type PromotionRequest = { from: Square; to: Square };

export type AiRequest = {
  requestId: number;
  fen: string;
  history: string[];
  difficulty: Difficulty;
};

export type AiResponse = {
  requestId: number;
  from: Square;
  to: Square;
  promotion?: PieceSymbol;
};

export function squareFile(square: Square): number {
  return square.charCodeAt(0) - 97;
}

export function squareRank(square: Square): number {
  return square.charCodeAt(1) - 49;
}

export function coordsToSquare(file: number, rank: number): Square {
  return `${String.fromCharCode(97 + file)}${rank + 1}` as Square;
}

export function squareDist(a: Square, b: Square): number {
  const df = squareFile(a) - squareFile(b);
  const dr = squareRank(a) - squareRank(b);
  return df * df + dr * dr;
}

export function opposite(color: Color): Color {
  return color === "w" ? "b" : "w";
}
