import { n as squareFile, r as squareRank } from "./routes-DQ9Bm_Ju.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-CXa7Mgm_.js
var MATERIAL = {
	p: 100,
	n: 320,
	b: 330,
	r: 500,
	q: 900,
	k: 2e4
};
/** Piece-square tables, a8 = 0, white's perspective (simplified eval). */
var PST = {
	p: [
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		50,
		50,
		50,
		50,
		50,
		50,
		50,
		50,
		10,
		10,
		20,
		30,
		30,
		20,
		10,
		10,
		5,
		5,
		10,
		25,
		25,
		10,
		5,
		5,
		0,
		0,
		0,
		20,
		20,
		0,
		0,
		0,
		5,
		-5,
		-10,
		0,
		0,
		-10,
		-5,
		5,
		5,
		10,
		10,
		-20,
		-20,
		10,
		10,
		5,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0
	],
	n: [
		-50,
		-40,
		-30,
		-30,
		-30,
		-30,
		-40,
		-50,
		-40,
		-20,
		0,
		0,
		0,
		0,
		-20,
		-40,
		-30,
		0,
		10,
		15,
		15,
		10,
		0,
		-30,
		-30,
		5,
		15,
		20,
		20,
		15,
		5,
		-30,
		-30,
		0,
		15,
		20,
		20,
		15,
		0,
		-30,
		-30,
		5,
		10,
		15,
		15,
		10,
		5,
		-30,
		-40,
		-20,
		0,
		5,
		5,
		0,
		-20,
		-40,
		-50,
		-40,
		-30,
		-30,
		-30,
		-30,
		-40,
		-50
	],
	b: [
		-20,
		-10,
		-10,
		-10,
		-10,
		-10,
		-10,
		-20,
		-10,
		0,
		0,
		0,
		0,
		0,
		0,
		-10,
		-10,
		0,
		5,
		10,
		10,
		5,
		0,
		-10,
		-10,
		5,
		5,
		10,
		10,
		5,
		5,
		-10,
		-10,
		0,
		10,
		10,
		10,
		10,
		0,
		-10,
		-10,
		10,
		10,
		10,
		10,
		10,
		10,
		-10,
		-10,
		5,
		0,
		0,
		0,
		0,
		5,
		-10,
		-20,
		-10,
		-10,
		-10,
		-10,
		-10,
		-10,
		-20
	],
	r: [
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		5,
		10,
		10,
		10,
		10,
		10,
		10,
		5,
		-5,
		0,
		0,
		0,
		0,
		0,
		0,
		-5,
		-5,
		0,
		0,
		0,
		0,
		0,
		0,
		-5,
		-5,
		0,
		0,
		0,
		0,
		0,
		0,
		-5,
		-5,
		0,
		0,
		0,
		0,
		0,
		0,
		-5,
		-5,
		0,
		0,
		0,
		0,
		0,
		0,
		-5,
		0,
		0,
		0,
		5,
		5,
		0,
		0,
		0
	],
	q: [
		-20,
		-10,
		-10,
		-5,
		-5,
		-10,
		-10,
		-20,
		-10,
		0,
		0,
		0,
		0,
		0,
		0,
		-10,
		-10,
		0,
		5,
		5,
		5,
		5,
		0,
		-10,
		-5,
		0,
		5,
		5,
		5,
		5,
		0,
		-5,
		0,
		0,
		5,
		5,
		5,
		5,
		0,
		-5,
		-10,
		5,
		5,
		5,
		5,
		5,
		0,
		-10,
		-10,
		0,
		5,
		0,
		0,
		0,
		0,
		-10,
		-20,
		-10,
		-10,
		-5,
		-5,
		-10,
		-10,
		-20
	],
	k: [
		-30,
		-40,
		-40,
		-50,
		-50,
		-40,
		-40,
		-30,
		-30,
		-40,
		-40,
		-50,
		-50,
		-40,
		-40,
		-30,
		-30,
		-40,
		-40,
		-50,
		-50,
		-40,
		-40,
		-30,
		-30,
		-40,
		-40,
		-50,
		-50,
		-40,
		-40,
		-30,
		-20,
		-30,
		-30,
		-40,
		-40,
		-30,
		-30,
		-20,
		-10,
		-20,
		-20,
		-20,
		-20,
		-20,
		-20,
		-10,
		20,
		20,
		0,
		0,
		0,
		0,
		20,
		20,
		20,
		30,
		10,
		0,
		0,
		10,
		30,
		20
	]
};
function pstIndex(square, color) {
	const file = squareFile(square);
	const rank = squareRank(square);
	return color === "w" ? (7 - rank) * 8 + file : rank * 8 + file;
}
function evaluate(chess) {
	if (chess.isCheckmate()) return -1e5;
	if (chess.isDraw()) return 0;
	let score = 0;
	let whiteBishops = 0;
	let blackBishops = 0;
	for (const row of chess.board()) for (const cell of row) {
		if (!cell) continue;
		const sign = cell.color === "w" ? 1 : -1;
		score += sign * (MATERIAL[cell.type] + PST[cell.type][pstIndex(cell.square, cell.color)]);
		if (cell.type === "b") {
			if (cell.color === "w") whiteBishops += 1;
			else blackBishops += 1;
		}
	}
	if (whiteBishops >= 2) score += 30;
	if (blackBishops >= 2) score -= 30;
	if (chess.isCheck()) score += chess.turn() === "w" ? -18 : 18;
	return chess.turn() === "w" ? score : -score;
}
function orderMoves(moves) {
	return [...moves].sort((a, b) => moveScore(b) - moveScore(a));
}
function moveScore(move) {
	let s = 0;
	if (move.promotion) s += 800 + (MATERIAL[move.promotion] ?? 0);
	if (move.captured) s += 10 * MATERIAL[move.captured] - MATERIAL[move.piece];
	return s;
}
var BOOK = {
	"": [
		"e4",
		"d4",
		"Nf3",
		"c4"
	],
	e4: [
		"e5",
		"c5",
		"e6",
		"c6",
		"d5"
	],
	"e4 e5": ["Nf3"],
	"e4 e5 Nf3": ["Nc6", "Nf6"],
	"e4 e5 Nf3 Nc6": [
		"Bb5",
		"Bc4",
		"d4"
	],
	"e4 e5 Nf3 Nc6 Bb5": ["a6", "Nf6"],
	"e4 e5 Nf3 Nc6 Bc4": ["Nf6", "Bc5"],
	"e4 e5 Nf3 Nf6": ["Nxe5", "d4"],
	"e4 c5": ["Nf3"],
	"e4 c5 Nf3": [
		"d6",
		"Nc6",
		"e6"
	],
	"e4 c5 Nf3 d6": ["d4"],
	"e4 c5 Nf3 d6 d4": ["cxd4"],
	"e4 c5 Nf3 d6 d4 cxd4": ["Nxd4"],
	"e4 c5 Nf3 Nc6": ["d4"],
	"e4 e6": ["d4"],
	"e4 e6 d4": ["d5"],
	"e4 c6": ["d4"],
	"e4 c6 d4": ["d5"],
	"e4 d5": ["exd5"],
	d4: ["d5", "Nf6"],
	"d4 d5": ["c4", "Nf3"],
	"d4 Nf6": ["c4", "Nf3"],
	"d4 Nf6 c4": ["e6", "g6"],
	"d4 Nf6 c4 e6": ["Nc3", "Nf3"],
	"d4 Nf6 c4 g6": ["Nc3"],
	Nf3: ["d5", "Nf6"],
	c4: ["e5", "Nf6"]
};
var timedOut = false;
function pickBook(chess, history) {
	const options = BOOK[history.join(" ")];
	if (!options?.length) return null;
	const order = options.map((_, i) => i);
	for (let i = order.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const current = order[i];
		order[i] = order[j];
		order[j] = current;
	}
	for (const index of order) {
		const san = options[index];
		if (!san) continue;
		try {
			const move = chess.move(san);
			if (move) {
				chess.undo();
				return move;
			}
		} catch {}
	}
	return null;
}
function negamax(chess, depth, alpha, beta, ply, deadline) {
	if (performance.now() > deadline) {
		timedOut = true;
		return evaluate(chess);
	}
	if (chess.isCheckmate()) return -1e5 + ply;
	if (chess.isDraw()) return 0;
	if (depth <= 0) return evaluate(chess);
	const moves = orderMoves(chess.moves({ verbose: true }));
	if (moves.length === 0) return chess.isCheck() ? -1e5 + ply : 0;
	let best = -Infinity;
	for (const move of moves) {
		chess.move({
			from: move.from,
			to: move.to,
			promotion: move.promotion
		});
		const score = -negamax(chess, depth - 1, -beta, -alpha, ply + 1, deadline);
		chess.undo();
		if (timedOut) return best === -Infinity ? score : best;
		if (score > best) best = score;
		if (best > alpha) alpha = best;
		if (alpha >= beta) break;
	}
	return best;
}
function searchRoot(chess, maxDepth, timeMs) {
	const deadline = performance.now() + timeMs;
	const moves = orderMoves(chess.moves({ verbose: true }));
	let best = moves[0];
	for (let depth = 1; depth <= maxDepth; depth++) {
		timedOut = false;
		let iterBest = best;
		let iterScore = -Infinity;
		let alpha = -Infinity;
		const ordered = [best, ...moves.filter((m) => m.san !== best.san)];
		for (const move of ordered) {
			chess.move({
				from: move.from,
				to: move.to,
				promotion: move.promotion
			});
			const score = -negamax(chess, depth - 1, -Infinity, -alpha, 1, deadline);
			chess.undo();
			if (timedOut) break;
			if (score > iterScore) {
				iterScore = score;
				iterBest = move;
			}
			if (score > alpha) alpha = score;
		}
		if (timedOut && depth > 1) break;
		best = iterBest;
		if (Math.abs(iterScore) > 9e4) break;
	}
	return best;
}
function pickMove(chess, history, difficulty) {
	const legal = chess.moves({ verbose: true });
	if (legal.length === 0) return null;
	if (!(difficulty === "casual" && Math.random() < .32)) {
		const book = pickBook(chess, history);
		if (book) return {
			from: book.from,
			to: book.to,
			promotion: book.promotion
		};
	}
	if (difficulty === "casual" && Math.random() < .2) {
		const move = legal[Math.floor(Math.random() * legal.length)];
		return {
			from: move.from,
			to: move.to,
			promotion: move.promotion
		};
	}
	const move = searchRoot(chess, difficulty === "casual" ? 2 : difficulty === "club" ? 3 : 4, difficulty === "casual" ? 200 : difficulty === "club" ? 550 : 1400);
	return {
		from: move.from,
		to: move.to,
		promotion: move.promotion
	};
}
//#endregion
export { pickMove };
