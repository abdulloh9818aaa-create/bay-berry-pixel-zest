export type ChromeId = "dark" | "light";
export type PresetId = "walnut" | "forest" | "ink" | "sand" | "night" | "custom";

export type BoardColors = {
  boardLight: string;
  boardDark: string;
  boardHl: string;
  pieceW: string;
  pieceB: string;
};

export type ChromeColors = {
  bg: string;
  surface: string;
  elevated: string;
  fg: string;
  muted: string;
  subtle: string;
  border: string;
  accent: string;
  accentFg: string;
  frame: string;
};

export type ThemeColors = BoardColors & ChromeColors;

export type ThemeState = {
  version: 1;
  preset: PresetId;
  chrome: ChromeId;
  board: BoardColors;
};

const KEY = "kingside.theme";

export const BOARD_DEFAULT: BoardColors = {
  boardLight: "#e1d4be",
  boardDark: "#6b5344",
  boardHl: "#b7c4a8",
  pieceW: "#f3eee4",
  pieceB: "#1a1714",
};

export const CHROME: Record<ChromeId, ChromeColors> = {
  dark: {
    bg: "#0c0b0a",
    surface: "#141210",
    elevated: "#1c1916",
    fg: "#f0ece4",
    muted: "#9a9388",
    subtle: "#6e6860",
    border: "#2c2723",
    accent: "#d8d2c8",
    accentFg: "#0c0b0a",
    frame: "#1a1613",
  },
  light: {
    bg: "#f3efe6",
    surface: "#ebe4d6",
    elevated: "#fffaf2",
    fg: "#1c1916",
    muted: "#6e6860",
    subtle: "#9a9388",
    border: "#d4cbb8",
    accent: "#3d342c",
    accentFg: "#f3efe6",
    frame: "#cfc3ae",
  },
};

export const PRESETS: {
  id: Exclude<PresetId, "custom">;
  label: string;
  chrome: ChromeId;
  board: BoardColors;
}[] = [
  {
    id: "walnut",
    label: "Орех",
    chrome: "dark",
    board: BOARD_DEFAULT,
  },
  {
    id: "forest",
    label: "Лес",
    chrome: "dark",
    board: {
      boardLight: "#dce6c8",
      boardDark: "#4d6750",
      boardHl: "#c4b07a",
      pieceW: "#f4f0e6",
      pieceB: "#1a1c18",
    },
  },
  {
    id: "ink",
    label: "Чернила",
    chrome: "dark",
    board: {
      boardLight: "#d7dee8",
      boardDark: "#3e4b5c",
      boardHl: "#8aa4c1",
      pieceW: "#f2f4f7",
      pieceB: "#16181c",
    },
  },
  {
    id: "sand",
    label: "Бумага",
    chrome: "light",
    board: {
      boardLight: "#f2e6cf",
      boardDark: "#c4a574",
      boardHl: "#8b9e7a",
      pieceW: "#fff8ee",
      pieceB: "#2a221c",
    },
  },
  {
    id: "night",
    label: "Ночь",
    chrome: "dark",
    board: {
      boardLight: "#3f3f46",
      boardDark: "#18181b",
      boardHl: "#6b7c6a",
      pieceW: "#f0ece4",
      pieceB: "#0c0c0e",
    },
  },
];

const CSS_VARS: Record<keyof ThemeColors, string> = {
  boardLight: "--color-board-light",
  boardDark: "--color-board-dark",
  boardHl: "--color-board-hl",
  pieceW: "--color-piece-w",
  pieceB: "--color-piece-b",
  bg: "--color-bg",
  surface: "--color-surface",
  elevated: "--color-elevated",
  fg: "--color-fg",
  muted: "--color-muted",
  subtle: "--color-subtle",
  border: "--color-border",
  accent: "--color-accent",
  accentFg: "--color-accent-fg",
  frame: "--color-frame",
};

function hexLuminance(hex: string): number {
  const raw = hex.replace("#", "");
  if (raw.length !== 6) return 0.5;
  const r = Number.parseInt(raw.slice(0, 2), 16) / 255;
  const g = Number.parseInt(raw.slice(2, 4), 16) / 255;
  const b = Number.parseInt(raw.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function strokeFor(fill: string): string {
  return hexLuminance(fill) > 0.55 ? "#2c2622" : "#e8e2d8";
}

export function isHex(value: unknown): value is string {
  return typeof value === "string" && /^#[0-9a-fA-F]{6}$/.test(value);
}

export function defaultTheme(): ThemeState {
  return {
    version: 1,
    preset: "walnut",
    chrome: "dark",
    board: { ...BOARD_DEFAULT },
  };
}

export function resolveColors(state: ThemeState): ThemeColors {
  return { ...CHROME[state.chrome], ...state.board };
}

export function applyTheme(state: ThemeState) {
  if (typeof document === "undefined") return;
  const colors = resolveColors(state);
  const root = document.documentElement;
  for (const key of Object.keys(CSS_VARS) as (keyof ThemeColors)[]) {
    root.style.setProperty(CSS_VARS[key], colors[key]);
  }
  root.style.setProperty("--color-piece-w-stroke", strokeFor(colors.pieceW));
  root.style.setProperty("--color-piece-b-stroke", strokeFor(colors.pieceB));
  root.style.setProperty("--color-check", hexLuminance(colors.boardDark) > 0.4 ? "#8a3f36" : "#a45a4c");
  root.dataset.chrome = state.chrome;
}

function sanitizeBoard(raw: Partial<BoardColors> | undefined): BoardColors {
  const next = { ...BOARD_DEFAULT };
  (Object.keys(next) as (keyof BoardColors)[]).forEach((key) => {
    if (isHex(raw?.[key])) next[key] = raw[key];
  });
  return next;
}

export function loadTheme(): ThemeState {
  const fallback = defaultTheme();
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return fallback;
    const data = JSON.parse(raw) as Partial<ThemeState>;
    if (data.version !== 1) return fallback;
    const preset =
      data.preset === "forest" ||
      data.preset === "ink" ||
      data.preset === "sand" ||
      data.preset === "night" ||
      data.preset === "custom" ||
      data.preset === "walnut"
        ? data.preset
        : "walnut";
    return {
      version: 1,
      preset,
      chrome: data.chrome === "light" ? "light" : "dark",
      board: sanitizeBoard(data.board),
    };
  } catch {
    return fallback;
  }
}

export function writeTheme(state: ThemeState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* private mode / quota */
  }
}
