import { Cpu, Users } from "lucide-react";
import { useState, type ReactNode } from "react";
import { SettingsButton } from "@/components/chess/SettingsPanel";
import { Button } from "@/components/ui/button";
import { ChessPiece } from "@/lib/chess/pieces";
import type { Color, Difficulty } from "@/lib/chess/types";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/store/game";

const DIFFICULTIES: { id: Difficulty; label: string }[] = [
  { id: "casual", label: "Спокойный" },
  { id: "club", label: "Клубный" },
  { id: "sharp", label: "Острый" },
];

export function StartScreen() {
  const startGame = useGameStore((s) => s.startGame);
  const continueGame = useGameStore((s) => s.continueGame);
  const hasSave = useGameStore((s) => s.hasSave);
  const [difficulty, setDifficulty] = useState<Difficulty>("club");

  const play = (color: Color, mode: "ai" | "local") => {
    startGame(mode, color, difficulty);
  };

  return (
    <main className="relative mx-auto flex min-h-dvh w-full max-w-lg flex-col justify-center px-5 py-10 sm:px-8">
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <SettingsButton />
      </div>
      <div className="stagger-in flex flex-col gap-8">
        <header className="flex flex-col items-center text-center">
          <div className="mb-5 flex items-end gap-1" aria-hidden="true">
            <ChessPiece type="k" color="w" className="h-12 w-12" />
            <ChessPiece type="k" color="b" className="h-12 w-12" />
          </div>
          <p className="text-sm font-medium tracking-[0.18em] text-muted uppercase">Шахматы</p>
          <h1 className="mt-2 font-display text-5xl font-medium tracking-[-0.03em] text-fg sm:text-6xl">
            Kingside
          </h1>
          <p className="mt-3 max-w-sm text-base leading-normal text-muted">
            Тихая доска. Полные правила. Машина, которая думает, пока вы смотрите на поле.
          </p>
        </header>

        {hasSave ? (
          <Button size="lg" className="w-full" onClick={continueGame}>
            Продолжить партию
          </Button>
        ) : null}

        <section className="flex flex-col gap-3">
          <p className="text-sm font-medium text-muted">Уровень машины</p>
          <div
            className="grid grid-cols-3 gap-1 rounded-lg bg-elevated p-1"
            role="radiogroup"
            aria-label="Сложность"
          >
            {DIFFICULTIES.map((item) => (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={difficulty === item.id}
                onClick={() => setDifficulty(item.id)}
                className={cn(
                  "flex min-h-11 flex-col items-center justify-center rounded-md px-2 py-2 text-center transition-colors duration-150",
                  difficulty === item.id ? "bg-accent text-accent-fg" : "text-muted hover:text-fg",
                )}
              >
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <ModeCard
            title="Белыми"
            description="Вы ходите первыми против машины"
            icon={<Cpu className="size-5" strokeWidth={1.75} />}
            onClick={() => play("w", "ai")}
          />
          <ModeCard
            title="Чёрными"
            description="Машина открывает партию"
            icon={<Cpu className="size-5" strokeWidth={1.75} />}
            onClick={() => play("b", "ai")}
          />
          <ModeCard
            title="Вдвоём"
            description="Одна доска, двое за столом"
            icon={<Users className="size-5" strokeWidth={1.75} />}
            onClick={() => play("w", "local")}
          />
        </section>
      </div>
    </main>
  );
}

function ModeCard({
  title,
  description,
  icon,
  onClick,
}: {
  title: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-16 items-center gap-4 rounded-xl border border-border bg-surface px-4 py-4 text-left transition-colors duration-150 hover:bg-elevated"
    >
      <span className="flex size-11 items-center justify-center rounded-md bg-elevated text-fg">
        {icon}
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="font-medium text-fg">{title}</span>
        <span className="text-sm text-muted">{description}</span>
      </span>
    </button>
  );
}
