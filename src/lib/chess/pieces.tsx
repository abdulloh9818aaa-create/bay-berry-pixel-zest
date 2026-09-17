import type { ReactNode } from "react";
import type { Color, PieceSymbol } from "./types";
import { cn } from "@/lib/utils";

type PieceProps = {
  type: PieceSymbol;
  color: Color;
  className?: string;
};

function Glyph({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 45 45" className="h-full w-full" aria-hidden="true">
      <g
        fill="currentColor"
        stroke="var(--piece-stroke)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </g>
    </svg>
  );
}

function PawnGlyph() {
  return (
    <Glyph>
      <path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38-1.56 1.08-2.78 2.74-2.78 4.62 0 1.24.53 2.36 1.38 3.16C15.4 24.5 14 26.9 14 29.5v2h17v-2c0-2.6-1.4-5-3.88-6.34.85-.8 1.38-1.92 1.38-3.16 0-1.88-1.22-3.54-2.78-4.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" />
      <path d="M14 33.5h17M15.5 36.5h14" />
    </Glyph>
  );
}

function KnightGlyph() {
  return (
    <Glyph>
      <path d="M21 10c2.2.2 4.4 1.4 6 3.4 1.4 1.8 2.1 3.8 2.2 5.8.2 2.2-.4 4.2-1.6 5.8l.8.4c1.6.6 2.8 2 3.2 3.6.4 1.6 0 3.2-1 4.4H12.5c-.2-2.2.4-4.6 1.8-6.2 1-1.2 1.4-2.2 1.2-3.4-.4-1.8-1.6-3-2.8-4.2-1.4-1.4-2.4-3.2-2.2-5 .2-1.6 1.4-3 3-3.6 1.2-.4 2.2 0 3.2.8L18 11l1.4-2.2c.4-.6 1.2-.8 1.8-.6l.8.4z" />
      <path
        d="M14.8 15.6c.6.2 1.2.8 1.2 1.5 0 .4-.2.8-.5 1"
        fill="var(--piece-stroke)"
        stroke="none"
      />
      <path d="M13 36.5h20M14.5 33.5h17" />
    </Glyph>
  );
}

function BishopGlyph() {
  return (
    <Glyph>
      <path d="M22.5 8.5c1.4 0 2.4 1.4 2.1 2.7-.2.6-.5 1.1-.6 1.6 2.6 2.2 6 6.2 6 10.4 0 4.4-3.2 7.3-7.5 7.8v1.5h-1v-1.5c-4.3-.5-7.5-3.4-7.5-7.8 0-4.2 3.4-8.2 6-10.4-.1-.5-.4-1-.6-1.6-.3-1.3.7-2.7 2.1-2.7z" />
      <path d="M20.2 22.5h4.6M22.5 20.2v4.6" strokeWidth="1.6" />
      <path d="M14 33.5h17M15.5 36.5h14" />
    </Glyph>
  );
}

function RookGlyph() {
  return (
    <Glyph>
      <path d="M14 14.5V9.5h4v3h3v-3h3v3h3v-3h4v5l-2 3.5v11H16v-11z" />
      <path d="M14 33.5h17M15.5 36.5h14" />
    </Glyph>
  );
}

function QueenGlyph() {
  return (
    <Glyph>
      <circle cx="12" cy="13" r="2.1" />
      <circle cx="18.2" cy="10.2" r="2.1" />
      <circle cx="22.5" cy="9" r="2.2" />
      <circle cx="26.8" cy="10.2" r="2.1" />
      <circle cx="33" cy="13" r="2.1" />
      <path d="M12.2 14.6 16 28.5h13l3.8-13.9-4.6 6.2-3.4-8.2-2.3 9.2-2.3-9.2-3.4 8.2z" />
      <path d="M16.5 28.5h12c.6 1.4.8 2.6.8 3.5H15.7c0-.9.2-2.1.8-3.5z" />
      <path d="M14 33.5h17M15.5 36.5h14" />
    </Glyph>
  );
}

function KingGlyph() {
  return (
    <Glyph>
      <path d="M22.5 7v7M19.8 10.5h5.4" strokeWidth="1.8" />
      <path d="M15.5 18.5c0-2.6 3.1-4.5 7-4.5s7 1.9 7 4.5v1.2c2.2.9 3.8 3.1 3.8 5.8 0 4.2-4.4 6.8-10.8 6.8S11.7 29.7 11.7 25.5c0-2.7 1.6-4.9 3.8-5.8z" />
      <path d="M14 33.5h17M15.5 36.5h14" />
    </Glyph>
  );
}

const GLYPHS: Record<PieceSymbol, () => ReactNode> = {
  p: PawnGlyph,
  n: KnightGlyph,
  b: BishopGlyph,
  r: RookGlyph,
  q: QueenGlyph,
  k: KingGlyph,
};

const NAMES: Record<Color, Record<PieceSymbol, string>> = {
  w: {
    p: "Белая пешка",
    n: "Белый конь",
    b: "Белый слон",
    r: "Белая ладья",
    q: "Белый ферзь",
    k: "Белый король",
  },
  b: {
    p: "Чёрная пешка",
    n: "Чёрный конь",
    b: "Чёрный слон",
    r: "Чёрная ладья",
    q: "Чёрный ферзь",
    k: "Чёрный король",
  },
};

export function ChessPiece({ type, color, className }: PieceProps) {
  const GlyphNode = GLYPHS[type];
  return (
    <span
      className={cn("chess-piece inline-flex", color === "w" ? "piece-w" : "piece-b", className)}
      role="img"
      aria-label={NAMES[color][type]}
    >
      <GlyphNode />
    </span>
  );
}
