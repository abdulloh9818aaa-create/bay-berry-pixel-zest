import { useEffect, useRef } from "react";
import { PlayScreen } from "@/components/chess/PlayScreen";
import { SettingsPanel } from "@/components/chess/SettingsPanel";
import { StartScreen } from "@/components/chess/StartScreen";
import type { AiRequest, AiResponse } from "@/lib/chess/types";
import { useGameStore } from "@/store/game";
import { useThemeStore } from "@/store/theme";

export function GameApp() {
  const phase = useGameStore((s) => s.phase);
  const hydrate = useGameStore((s) => s.hydrate);
  const hydrateTheme = useThemeStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
    hydrateTheme();
  }, [hydrate, hydrateTheme]);

  useAiController();

  return (
    <>
      {phase === "menu" ? <StartScreen /> : <PlayScreen />}
      <SettingsPanel />
    </>
  );
}

function useAiController() {
  const workerRef = useRef<Worker | null>(null);
  const thinking = useGameStore((s) => s.thinking);
  const requestId = useGameStore((s) => s.aiRequestId);

  useEffect(() => {
    let worker: Worker | null = null;
    try {
      worker = new Worker(new URL("../../lib/chess/ai.worker.ts", import.meta.url), {
        type: "module",
      });
      worker.onmessage = (event: MessageEvent<AiResponse>) => {
        useGameStore.getState().applyAiMove(event.data);
      };
    } catch {
      worker = null;
    }
    workerRef.current = worker;
    return () => {
      worker?.terminate();
      workerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!thinking) return;
    const state = useGameStore.getState();
    const payload: AiRequest = {
      requestId: state.aiRequestId,
      fen: state.fen,
      history: state.history.map((move) => move.san),
      difficulty: state.difficulty,
    };

    if (workerRef.current) {
      workerRef.current.postMessage(payload);
      return;
    }

    let cancelled = false;
    const timer = window.setTimeout(() => {
      void (async () => {
        const { Chess } = await import("chess.js");
        const { pickMove } = await import("@/lib/chess/search");
        const chess = new Chess(payload.fen);
        const move = pickMove(chess, payload.history, payload.difficulty);
        if (!cancelled && move) {
          useGameStore.getState().applyAiMove({
            requestId: payload.requestId,
            from: move.from,
            to: move.to,
            promotion: move.promotion,
          });
        }
      })();
    }, 30);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [thinking, requestId]);
}
