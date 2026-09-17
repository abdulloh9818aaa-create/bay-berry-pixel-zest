import { useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { ChessPiece } from "@/lib/chess/pieces";
import type { Color, Square } from "@/lib/chess/types";
import { coordsToSquare, squareFile, squareRank } from "@/lib/chess/types";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/store/game";

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];

function displayCoords(file: number, rank: number, orientation: Color) {
  const col = orientation === "w" ? file : 7 - file;
  const row = orientation === "w" ? 7 - rank : rank;
  return { col, row };
}

function hitSquare(
  clientX: number,
  clientY: number,
  el: HTMLDivElement,
  orientation: Color,
): Square | null {
  const rect = el.getBoundingClientRect();
  const x = (clientX - rect.left) / rect.width;
  const y = (clientY - rect.top) / rect.height;
  if (x < 0 || y < 0 || x >= 1 || y >= 1) return null;
  let file = Math.floor(x * 8);
  let rankFromTop = Math.floor(y * 8);
  if (orientation === "w") {
    return coordsToSquare(file, 7 - rankFromTop);
  }
  return coordsToSquare(7 - file, rankFromTop);
}

export function Board() {
  const boardRef = useRef<HTMLDivElement>(null);
  const orientation = useGameStore((s) => s.orientation);
  const pieces = useGameStore((s) => s.pieces);
  const selected = useGameStore((s) => s.selected);
  const legal = useGameStore((s) => s.legal);
  const lastMove = useGameStore((s) => s.lastMove);
  const inCheck = useGameStore((s) => s.inCheck);
  const turn = useGameStore((s) => s.turn);
  const result = useGameStore((s) => s.result);
  const thinking = useGameStore((s) => s.thinking);
  const promotion = useGameStore((s) => s.promotion);
  const selectSquare = useGameStore((s) => s.selectSquare);
  const tryMove = useGameStore((s) => s.tryMove);
  const canInteract = useGameStore((s) => s.canInteract);

  const [drag, setDrag] = useState<{
    id: string;
    from: Square;
    x: number;
    y: number;
    originX: number;
    originY: number;
    size: number;
  } | null>(null);

  const legalTo = new Set(legal.map((m) => m.to));
  const kingSquare = inCheck
    ? pieces.find((p) => p.type === "k" && p.color === turn)?.square
    : undefined;
  const occupied = new Set(pieces.map((p) => p.square));
  const interactive = canInteract() && !promotion;

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!interactive || !boardRef.current) return;
    const square = hitSquare(event.clientX, event.clientY, boardRef.current, orientation);
    if (!square) return;
    const piece = pieces.find((p) => p.square === square);
    selectSquare(square);
    if (piece && piece.color === turn) {
      const rect = boardRef.current.getBoundingClientRect();
      event.currentTarget.setPointerCapture(event.pointerId);
      setDrag({
        id: piece.id,
        from: square,
        x: event.clientX,
        y: event.clientY,
        originX: event.clientX,
        originY: event.clientY,
        size: rect.width / 8,
      });
    }
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag) return;
    setDrag({ ...drag, x: event.clientX, y: event.clientY });
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!boardRef.current) return;
    if (!drag) return;
    const dx = event.clientX - drag.originX;
    const dy = event.clientY - drag.originY;
    const dist = Math.hypot(dx, dy);
    const square = hitSquare(event.clientX, event.clientY, boardRef.current, orientation);
    setDrag(null);
    if (dist < 10) return;
    if (square && square !== drag.from) tryMove(drag.from, square);
  };

  const squares = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const file = orientation === "w" ? col : 7 - col;
      const rank = orientation === "w" ? 7 - row : row;
      const square = coordsToSquare(file, rank);
      const isDark = (file + rank) % 2 === 0;
      const isSelected = selected === square;
      const isLast = lastMove?.from === square || lastMove?.to === square;
      const isCheckSq = kingSquare === square;
      const showFile = row === 7;
      const showRank = col === 0;
      squares.push(
        <div
          key={square}
          className={cn(
            "relative flex items-end justify-start",
            isDark ? "bg-board-dark" : "bg-board-light",
            isLast && "after:absolute after:inset-0 after:bg-board-hl/35 after:content-['']",
            isSelected && "after:absolute after:inset-0 after:bg-board-hl/50 after:content-['']",
            isCheckSq && "after:absolute after:inset-0 after:bg-check/55 after:content-['']",
          )}
        >
          {showRank ? (
            <span
              className={cn(
                "absolute top-0.5 left-1 font-medium text-2xs leading-none",
                isDark ? "text-board-light/80" : "text-board-dark/75",
              )}
            >
              {rank + 1}
            </span>
          ) : null}
          {showFile ? (
            <span
              className={cn(
                "absolute right-1 bottom-0.5 font-medium text-2xs leading-none",
                isDark ? "text-board-light/80" : "text-board-dark/75",
              )}
            >
              {FILES[file]}
            </span>
          ) : null}
          {legalTo.has(square) && !occupied.has(square) ? (
            <span className="legal-dot absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          ) : null}
          {legalTo.has(square) && occupied.has(square) ? <span className="legal-ring" /> : null}
        </div>,
      );
    }
  }

  const draggingPiece = drag ? pieces.find((p) => p.id === drag.id) : undefined;

  return (
    <div className="relative w-full max-w-xl lg:max-w-2xl">
      <div className="rounded-xl bg-frame p-2 shadow-[0_24px_60px_-28px_rgb(0_0_0_/_0.7)] sm:p-3">
        <div
          ref={boardRef}
          role="grid"
          aria-label="Шахматная доска"
          aria-disabled={!interactive}
          className={cn(
            "relative grid aspect-square w-full grid-cols-8 grid-rows-8 overflow-hidden rounded-md touch-none select-none",
            (thinking || result) && "pointer-events-none",
          )}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={() => setDrag(null)}
        >
          {squares}
          {pieces.map((piece) => {
            const { col, row } = displayCoords(
              squareFile(piece.square),
              squareRank(piece.square),
              orientation,
            );
            const isDragging = drag?.id === piece.id;
            return (
              <div
                key={piece.id}
                className={cn(
                  "chess-piece pointer-events-none absolute top-0 left-0 z-10 h-[12.5%] w-[12.5%] p-[4%] transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isDragging && "opacity-0",
                )}
                style={{ transform: `translate(${col * 100}%, ${row * 100}%)` }}
              >
                <ChessPiece type={piece.type} color={piece.color} className="h-full w-full" />
              </div>
            );
          })}
        </div>
      </div>
      {draggingPiece && drag ? (
        <div
          className="pointer-events-none fixed z-50"
          style={{
            width: drag.size,
            height: drag.size,
            left: drag.x - drag.size / 2,
            top: drag.y - drag.size / 2,
            padding: drag.size * 0.04,
          }}
        >
          <ChessPiece
            type={draggingPiece.type}
            color={draggingPiece.color}
            className="h-full w-full"
          />
        </div>
      ) : null}
    </div>
  );
}
