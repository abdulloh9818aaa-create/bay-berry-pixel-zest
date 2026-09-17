import { Chess } from "chess.js";
import type { AiRequest, AiResponse } from "./types";
import { pickMove } from "./search";

self.onmessage = (event: MessageEvent<AiRequest>) => {
  const { requestId, fen, history, difficulty } = event.data;
  const chess = new Chess(fen);
  const move = pickMove(chess, history, difficulty);
  if (!move) return;
  const response: AiResponse = {
    requestId,
    from: move.from,
    to: move.to,
    promotion: move.promotion,
  };
  self.postMessage(response);
};
