import { createFileRoute } from "@tanstack/react-router";
import { GameApp } from "@/components/chess/GameApp";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <GameApp />;
}
