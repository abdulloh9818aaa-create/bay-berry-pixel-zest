import { Copy, Flag, RotateCcw, Undo2, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import { Board } from "@/components/chess/Board";
import { SettingsButton } from "@/components/chess/SettingsPanel";
import { Button } from "@/components/ui/button";
import { ChessPiece } from "@/lib/chess/pieces";
import type { Color, GameResult, PieceSymbol } from "@/lib/chess/types";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/store/game";

const PROMO: PieceSymbol[] = ["q", "r", "b", "n"];

function statusText(
  turn: Color,
  inCheck: boolean,
  thinking: boolean,
  result: GameResult | null,
  mode: "ai" | "local",
  playerColor: Color,
): string {
  if (result) {
    switch (result.kind) {
      case "mate":
        return result.winner === "w" ? "Мат. Белые победили" : "Мат. Чёрные победили";
      case "stalemate":
        return "Пат — ничья";
      case "repetition":
        return "Ничья: троекратное повторение";
      case "material":
        return "Ничья: недостаточно фигур";
      case "fifty":
        return "Ничья: правило 50 ходов";
      case "resign":
        return result.winner === "w" ? "Белые победили" : "Чёрные победили";
      default:
        return "Ничья";
    }
  }
  if (thinking) return "Считает ход";
  if (inCheck) return turn === "w" ? "Шах белым" : "Шах чёрным";
  if (mode === "ai") {
    return turn === playerColor ? "Ваш ход" : "Ход машины";
  }
  return turn === "w" ? "Ход белых" : "Ход чёрных";
}

function pairMoves(history: { san: string }[]) {
  const rows: { n: number; w?: string; b?: string }[] = [];
  for (let i = 0; i < history.length; i += 2) {
    rows.push({ n: i / 2 + 1, w: history[i]?.san, b: history[i + 1]?.san });
  }
  return rows;
}

export function PlayScreen() {
  const toMenu = useGameStore((s) => s.toMenu);
  const undo = useGameStore((s) => s.undo);
  const flip = useGameStore((s) => s.flip);
  const resign = useGameStore((s) => s.resign);
  const toggleMuted = useGameStore((s) => s.toggleMuted);
  const startGame = useGameStore((s) => s.startGame);
  const choosePromotion = useGameStore((s) => s.choosePromotion);
  const cancelPromotion = useGameStore((s) => s.cancelPromotion);
  const canUndo = useGameStore((s) => s.canUndo);
  const muted = useGameStore((s) => s.muted);
  const turn = useGameStore((s) => s.turn);
  const inCheck = useGameStore((s) => s.inCheck);
  const thinking = useGameStore((s) => s.thinking);
  const result = useGameStore((s) => s.result);
  const mode = useGameStore((s) => s.mode);
  const playerColor = useGameStore((s) => s.playerColor);
  const difficulty = useGameStore((s) => s.difficulty);
  const history = useGameStore((s) => s.history);
  const captured = useGameStore((s) => s.captured);
  const material = useGameStore((s) => s.material);
  const promotion = useGameStore((s) => s.promotion);
  const orientation = useGameStore((s) => s.orientation);
  const [copied, setCopied] = useState(false);

  const status = statusText(turn, inCheck, thinking, result, mode, playerColor);
  const rows = pairMoves(history);
  const promoColor: Color = turn;

  const copyPgn = async () => {
    const pgn = rows
      .map((row) => `${row.n}. ${row.w ?? ""}${row.b ? ` ${row.b}` : ""}`)
      .join(" ")
      .trim();
    try {
      await navigator.clipboard.writeText(pgn || "*");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      /* ignore */
    }
  };

  const topColor: Color = orientation === "w" ? "b" : "w";
  const bottomColor: Color = orientation;

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-4 py-4 sm:px-6 sm:py-6">
      <header className="mb-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={toMenu}
          className="font-display text-xl font-medium tracking-[-0.03em] text-fg"
        >
          Kingside
        </button>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Отменить ход"
            disabled={!canUndo()}
            onClick={undo}
          >
            <Undo2 className="size-5" strokeWidth={1.75} />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Перевернуть доску" onClick={flip}>
            <RotateCcw className="size-5" strokeWidth={1.75} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={muted ? "Включить звук" : "Выключить звук"}
            onClick={toggleMuted}
          >
            <span className="relative inline-flex size-5 items-center justify-center">
              <Volume2
                className={cn(
                  "size-5 transition-[opacity,transform,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)]",
                  muted ? "scale-[0.25] opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-0",
                )}
                strokeWidth={1.75}
              />
              <VolumeX
                className={cn(
                  "absolute inset-0 size-5 transition-[opacity,transform,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)]",
                  muted ? "scale-100 opacity-100 blur-0" : "scale-[0.25] opacity-0 blur-[4px]",
                )}
                strokeWidth={1.75}
              />
            </span>
          </Button>
          <SettingsButton />
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-5 lg:flex-row lg:items-start lg:gap-10">
        <div className="flex w-full flex-col items-center gap-3 lg:flex-1">
          <CapturedRow
            pieces={captured[topColor]}
            color={topColor}
            advantage={topColor === "w" ? material : -material}
          />
          <div className="relative w-full max-w-xl lg:max-w-2xl">
            <Board />
            {promotion ? (
              <div className="absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-bg/55 p-4">
                <div className="modal-enter flex flex-wrap items-center justify-center gap-2 rounded-xl border border-border bg-surface p-3">
                  {PROMO.map((type) => (
                    <button
                      key={type}
                      type="button"
                      className="flex size-14 items-center justify-center rounded-md bg-elevated hover:bg-frame sm:size-16"
                      onClick={() => choosePromotion(type)}
                      aria-label={`Превратить в ${type}`}
                    >
                      <ChessPiece type={type} color={promoColor} className="h-12 w-12" />
                    </button>
                  ))}
                  <Button variant="ghost" onClick={cancelPromotion}>
                    Отмена
                  </Button>
                </div>
              </div>
            ) : null}
            {result ? (
              <div className="absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-bg/60 p-4">
                <div className="modal-enter flex w-full max-w-sm flex-col gap-4 rounded-xl border border-border bg-surface p-6 text-center">
                  <h2 className="font-display text-2xl font-medium tracking-[-0.03em]">{status}</h2>
                  <div className="flex flex-col gap-2">
                    <Button onClick={() => startGame(mode, playerColor, difficulty)}>Ещё раз</Button>
                    <Button variant="outline" onClick={toMenu}>
                      В меню
                    </Button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <CapturedRow
            pieces={captured[bottomColor]}
            color={bottomColor}
            advantage={bottomColor === "w" ? material : -material}
          />
        </div>

        <aside className="flex w-full flex-col gap-4 pb-6 lg:w-72 lg:shrink-0 lg:pt-8">
          <div>
            <p
              className={cn(
                "font-display text-2xl font-medium tracking-[-0.03em] text-fg",
                thinking && "thinking-shimmer",
              )}
            >
              {status}
            </p>
            <p className="mt-1 text-sm text-muted">
              {mode === "ai"
                ? difficulty === "casual"
                  ? "Спокойный уровень"
                  : difficulty === "club"
                    ? "Клубный уровень"
                    : "Острый уровень"
                : "Два игрока"}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-4">
            <p className="mb-3 text-sm font-medium text-muted">Ходы</p>
            <ol className="max-h-56 overflow-y-auto font-sans text-sm leading-7 tabular-nums lg:max-h-[22rem]">
              {rows.length === 0 ? (
                <li className="text-subtle">Партия ещё не началась</li>
              ) : (
                rows.map((row) => (
                  <li key={row.n} className="grid grid-cols-[2rem_1fr_1fr] gap-2">
                    <span className="text-subtle">{row.n}.</span>
                    <span className="text-fg">{row.w}</span>
                    <span className="text-fg">{row.b ?? ""}</span>
                  </li>
                ))
              )}
            </ol>
          </div>

          <div className="flex flex-col gap-2">
            <Button variant="outline" onClick={copyPgn}>
              <Copy className="size-4" strokeWidth={1.75} />
              {copied ? "Скопировано" : "Скопировать ходы"}
            </Button>
            <Button variant="ghost" onClick={resign} disabled={Boolean(result)}>
              <Flag className="size-4" strokeWidth={1.75} />
              Сдаться
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function CapturedRow({
  pieces,
  color,
  advantage,
}: {
  pieces: PieceSymbol[];
  color: Color;
  advantage: number;
}) {
  return (
    <div className="flex min-h-8 w-full max-w-xl items-center gap-1 lg:max-w-2xl">
      <div className="flex flex-wrap items-center">
        {pieces.map((type, i) => (
          <ChessPiece
            key={`${color}-${type}-${i}`}
            type={type}
            color={color}
            className="-ml-1 h-6 w-6 first:ml-0 sm:h-7 sm:w-7"
          />
        ))}
      </div>
      {advantage > 0 ? (
        <span className="ml-2 text-sm tabular-nums text-muted">+{advantage}</span>
      ) : null}
    </div>
  );
}
