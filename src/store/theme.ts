import { create } from "zustand";
import {
  applyTheme,
  defaultTheme,
  loadTheme,
  PRESETS,
  writeTheme,
  type BoardColors,
  type ChromeId,
  type PresetId,
  type ThemeState,
} from "@/lib/chess/theme";

type ThemeStore = ThemeState & {
  settingsOpen: boolean;
  hydrate: () => void;
  setPreset: (id: Exclude<PresetId, "custom">) => void;
  setChrome: (chrome: ChromeId) => void;
  setBoardColor: (key: keyof BoardColors, value: string) => void;
  reset: () => void;
  openSettings: () => void;
  closeSettings: () => void;
};

function persist(state: ThemeState) {
  applyTheme(state);
  writeTheme(state);
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  ...defaultTheme(),
  settingsOpen: false,

  hydrate: () => {
    const loaded = loadTheme();
    set(loaded);
    applyTheme(loaded);
  },

  setPreset: (id) => {
    const preset = PRESETS.find((item) => item.id === id);
    if (!preset) return;
    const next: ThemeState = {
      version: 1,
      preset: id,
      chrome: preset.chrome,
      board: { ...preset.board },
    };
    set(next);
    persist(next);
  },

  setChrome: (chrome) => {
    const next: ThemeState = { ...get(), chrome, preset: get().preset };
    set({ chrome });
    persist(next);
  },

  setBoardColor: (key, value) => {
    const board = { ...get().board, [key]: value };
    const next: ThemeState = { version: 1, preset: "custom", chrome: get().chrome, board };
    set(next);
    persist(next);
  },

  reset: () => {
    const next = defaultTheme();
    set({ ...next, settingsOpen: get().settingsOpen });
    persist(next);
  },

  openSettings: () => set({ settingsOpen: true }),
  closeSettings: () => set({ settingsOpen: false }),
}));
