import { useEffect } from "react";
import { Settings2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChessPiece } from "@/lib/chess/pieces";
import { PRESETS, type BoardColors } from "@/lib/chess/theme";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/store/theme";

const PICKERS: { key: keyof BoardColors; label: string }[] = [
  { key: "boardLight", label: "Светлые клетки" },
  { key: "boardDark", label: "Тёмные клетки" },
  { key: "boardHl", label: "Подсветка хода" },
  { key: "pieceW", label: "Белые фигуры" },
  { key: "pieceB", label: "Чёрные фигуры" },
];

export function SettingsButton() {
  const openSettings = useThemeStore((s) => s.openSettings);
  return (
    <Button variant="ghost" size="icon" aria-label="Настройки цветов" onClick={openSettings}>
      <Settings2 className="size-5" strokeWidth={1.75} />
    </Button>
  );
}

export function SettingsPanel() {
  const open = useThemeStore((s) => s.settingsOpen);
  const close = useThemeStore((s) => s.closeSettings);
  const preset = useThemeStore((s) => s.preset);
  const chrome = useThemeStore((s) => s.chrome);
  const board = useThemeStore((s) => s.board);
  const setPreset = useThemeStore((s) => s.setPreset);
  const setChrome = useThemeStore((s) => s.setChrome);
  const setBoardColor = useThemeStore((s) => s.setBoardColor);
  const reset = useThemeStore((s) => s.reset);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-bg/70"
        aria-label="Закрыть настройки"
        onClick={close}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        className="modal-enter relative z-10 flex max-h-[min(92dvh,40rem)] w-full max-w-md flex-col overflow-hidden rounded-xl border border-border bg-surface"
      >
        <header className="flex items-center justify-between gap-3 px-5 py-4">
          <h2 id="settings-title" className="font-display text-xl font-medium tracking-tight">
            Цвета
          </h2>
          <Button variant="ghost" size="icon" aria-label="Закрыть" onClick={close}>
            <X className="size-5" strokeWidth={1.75} />
          </Button>
        </header>

        <div className="flex flex-col gap-6 overflow-y-auto px-5 pb-6">
          <MiniPreview />

          <section className="flex flex-col gap-3">
            <p className="text-sm font-medium text-muted">Палитра</p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
              {PRESETS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={preset === item.id}
                  aria-label={item.label}
                  onClick={() => setPreset(item.id)}
                  className={cn(
                    "flex min-h-16 flex-col items-center justify-center gap-2 rounded-md p-2 transition-colors duration-150",
                    preset === item.id
                      ? "bg-accent text-accent-fg"
                      : "bg-elevated text-muted hover:text-fg",
                  )}
                >
                  <span
                    className="grid size-8 grid-cols-2 overflow-hidden rounded-sm"
                    aria-hidden="true"
                  >
                    <span style={{ background: item.board.boardLight }} />
                    <span style={{ background: item.board.boardDark }} />
                    <span style={{ background: item.board.boardDark }} />
                    <span style={{ background: item.board.boardLight }} />
                  </span>
                  <span className="text-2xs font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <p className="text-sm font-medium text-muted">Интерфейс</p>
            <div className="grid grid-cols-2 gap-1 rounded-lg bg-elevated p-1">
              <ChromeOption
                label="Тёмный"
                active={chrome === "dark"}
                onClick={() => setChrome("dark")}
              />
              <ChromeOption
                label="Светлый"
                active={chrome === "light"}
                onClick={() => setChrome("light")}
              />
            </div>
          </section>

          <section className="flex flex-col gap-2">
            <p className="text-sm font-medium text-muted">Свои цвета</p>
            {PICKERS.map((item) => (
              <label
                key={item.key}
                className="flex min-h-11 items-center justify-between gap-3 rounded-md px-1"
              >
                <span className="text-sm text-fg">{item.label}</span>
                <input
                  type="color"
                  value={board[item.key]}
                  aria-label={item.label}
                  onChange={(event) => setBoardColor(item.key, event.target.value)}
                  className="size-11 cursor-pointer rounded-md border border-border bg-transparent p-1"
                />
              </label>
            ))}
          </section>

          <Button variant="outline" onClick={reset}>
            Сбросить
          </Button>
        </div>
      </div>
    </div>
  );
}

function ChromeOption({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex min-h-11 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors duration-150",
        active ? "bg-accent text-accent-fg" : "text-muted hover:text-fg",
      )}
    >
      {label}
    </button>
  );
}

function MiniPreview() {
  const placed: Record<string, { type: "n" | "k"; color: "w" | "b" }> = {
    "0-1": { type: "n", color: "b" },
    "2-2": { type: "k", color: "w" },
  };
  const cells = [0, 1, 2, 3];
  return (
    <div className="flex items-center justify-center rounded-lg bg-elevated p-4">
      <div className="grid size-36 grid-cols-4 overflow-hidden rounded-md" aria-hidden="true">
        {cells.flatMap((row) =>
          cells.map((col) => {
            const dark = (row + col) % 2 === 1;
            const piece = placed[`${row}-${col}`];
            return (
              <span
                key={`${row}-${col}`}
                className={cn(
                  "flex items-center justify-center p-0.5",
                  dark ? "bg-board-dark" : "bg-board-light",
                )}
              >
                {piece ? (
                  <ChessPiece type={piece.type} color={piece.color} className="h-full w-full" />
                ) : null}
              </span>
            );
          }),
        )}
      </div>
    </div>
  );
}
