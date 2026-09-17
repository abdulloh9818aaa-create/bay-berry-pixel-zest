import type { Color, Difficulty, LastMove, PlayMode, Square } from "./types";

const KEY = "kingside.save";
const VERSION = 1;

export type SaveV1 = {
  version: 1;
  history: string[];
  mode: PlayMode;
  difficulty: Difficulty;
  playerColor: Color;
  orientation: Color;
  lastMove: LastMove | null;
};

function isSquare(value: unknown): value is Square {
  return typeof value === "string" && /^[a-h][1-8]$/.test(value);
}

export function loadSave(): SaveV1 | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Partial<SaveV1>;
    if (data.version !== VERSION) return null;
    if (data.mode !== "ai" && data.mode !== "local") return null;
    if (!Array.isArray(data.history)) return null;
    return {
      version: 1,
      history: data.history.filter((s): s is string => typeof s === "string"),
      mode: data.mode,
      difficulty:
        data.difficulty === "casual" || data.difficulty === "sharp"
          ? data.difficulty
          : "club",
      playerColor: data.playerColor === "b" ? "b" : "w",
      orientation: data.orientation === "b" ? "b" : "w",
      lastMove:
        data.lastMove && isSquare(data.lastMove.from) && isSquare(data.lastMove.to)
          ? { from: data.lastMove.from, to: data.lastMove.to }
          : null,
    };
  } catch {
    return null;
  }
}

export function writeSave(save: SaveV1) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(save));
  } catch {
    /* private mode / quota */
  }
}

export function clearSave() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
