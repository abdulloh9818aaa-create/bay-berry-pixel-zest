import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Undo2, c as RotateCcw, d as Copy, i as Users, l as Flag, n as VolumeX, r as Volume2, s as Settings2, t as X, u as Cpu } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { t as Chess } from "../_libs/chess.js.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DQ9Bm_Ju.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function squareFile(square) {
	return square.charCodeAt(0) - 97;
}
function squareRank(square) {
	return square.charCodeAt(1) - 49;
}
function coordsToSquare(file, rank) {
	return `${String.fromCharCode(97 + file)}${rank + 1}`;
}
function squareDist(a, b) {
	const df = squareFile(a) - squareFile(b);
	const dr = squareRank(a) - squareRank(b);
	return df * df + dr * dr;
}
function opposite(color) {
	return color === "w" ? "b" : "w";
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function Glyph({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 45 45",
		className: "h-full w-full",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
			fill: "currentColor",
			stroke: "var(--piece-stroke)",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			children
		})
	});
}
function PawnGlyph() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glyph, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38-1.56 1.08-2.78 2.74-2.78 4.62 0 1.24.53 2.36 1.38 3.16C15.4 24.5 14 26.9 14 29.5v2h17v-2c0-2.6-1.4-5-3.88-6.34.85-.8 1.38-1.92 1.38-3.16 0-1.88-1.22-3.54-2.78-4.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14 33.5h17M15.5 36.5h14" })] });
}
function KnightGlyph() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glyph, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 10c2.2.2 4.4 1.4 6 3.4 1.4 1.8 2.1 3.8 2.2 5.8.2 2.2-.4 4.2-1.6 5.8l.8.4c1.6.6 2.8 2 3.2 3.6.4 1.6 0 3.2-1 4.4H12.5c-.2-2.2.4-4.6 1.8-6.2 1-1.2 1.4-2.2 1.2-3.4-.4-1.8-1.6-3-2.8-4.2-1.4-1.4-2.4-3.2-2.2-5 .2-1.6 1.4-3 3-3.6 1.2-.4 2.2 0 3.2.8L18 11l1.4-2.2c.4-.6 1.2-.8 1.8-.6l.8.4z" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M14.8 15.6c.6.2 1.2.8 1.2 1.5 0 .4-.2.8-.5 1",
			fill: "var(--piece-stroke)",
			stroke: "none"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M13 36.5h20M14.5 33.5h17" })
	] });
}
function BishopGlyph() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glyph, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M22.5 8.5c1.4 0 2.4 1.4 2.1 2.7-.2.6-.5 1.1-.6 1.6 2.6 2.2 6 6.2 6 10.4 0 4.4-3.2 7.3-7.5 7.8v1.5h-1v-1.5c-4.3-.5-7.5-3.4-7.5-7.8 0-4.2 3.4-8.2 6-10.4-.1-.5-.4-1-.6-1.6-.3-1.3.7-2.7 2.1-2.7z" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M20.2 22.5h4.6M22.5 20.2v4.6",
			strokeWidth: "1.6"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14 33.5h17M15.5 36.5h14" })
	] });
}
function RookGlyph() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glyph, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14 14.5V9.5h4v3h3v-3h3v3h3v-3h4v5l-2 3.5v11H16v-11z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14 33.5h17M15.5 36.5h14" })] });
}
function QueenGlyph() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glyph, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "12",
			cy: "13",
			r: "2.1"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "18.2",
			cy: "10.2",
			r: "2.1"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "22.5",
			cy: "9",
			r: "2.2"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "26.8",
			cy: "10.2",
			r: "2.1"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "33",
			cy: "13",
			r: "2.1"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12.2 14.6 16 28.5h13l3.8-13.9-4.6 6.2-3.4-8.2-2.3 9.2-2.3-9.2-3.4 8.2z" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16.5 28.5h12c.6 1.4.8 2.6.8 3.5H15.7c0-.9.2-2.1.8-3.5z" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14 33.5h17M15.5 36.5h14" })
	] });
}
function KingGlyph() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glyph, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M22.5 7v7M19.8 10.5h5.4",
			strokeWidth: "1.8"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M15.5 18.5c0-2.6 3.1-4.5 7-4.5s7 1.9 7 4.5v1.2c2.2.9 3.8 3.1 3.8 5.8 0 4.2-4.4 6.8-10.8 6.8S11.7 29.7 11.7 25.5c0-2.7 1.6-4.9 3.8-5.8z" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14 33.5h17M15.5 36.5h14" })
	] });
}
var GLYPHS = {
	p: PawnGlyph,
	n: KnightGlyph,
	b: BishopGlyph,
	r: RookGlyph,
	q: QueenGlyph,
	k: KingGlyph
};
var NAMES = {
	w: {
		p: "Белая пешка",
		n: "Белый конь",
		b: "Белый слон",
		r: "Белая ладья",
		q: "Белый ферзь",
		k: "Белый король"
	},
	b: {
		p: "Чёрная пешка",
		n: "Чёрный конь",
		b: "Чёрный слон",
		r: "Чёрная ладья",
		q: "Чёрный ферзь",
		k: "Чёрный король"
	}
};
function ChessPiece({ type, color, className }) {
	const GlyphNode = GLYPHS[type];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("chess-piece inline-flex", color === "w" ? "piece-w" : "piece-b", className),
		role: "img",
		"aria-label": NAMES[color][type],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlyphNode, {})
	});
}
var game = new Chess();
var pieceSeq = 1;
function getGame() {
	return game;
}
function resetEngine() {
	game = new Chess();
	return game;
}
function loadHistory(sans) {
	game = new Chess();
	for (const san of sans) try {
		if (!game.move(san)) break;
	} catch {
		break;
	}
	return game;
}
function playEngineMove(from, to, promotion) {
	try {
		return game.move({
			from,
			to,
			promotion
		});
	} catch {
		return null;
	}
}
function undoEngineMove() {
	return game.undo();
}
var START_COUNT = {
	p: 8,
	n: 2,
	b: 2,
	r: 2,
	q: 1,
	k: 1
};
var MATERIAL = {
	p: 1,
	n: 3,
	b: 3,
	r: 5,
	q: 9,
	k: 0
};
function capturedByColor(chess) {
	const onBoard = {
		w: {
			p: 0,
			n: 0,
			b: 0,
			r: 0,
			q: 0,
			k: 0
		},
		b: {
			p: 0,
			n: 0,
			b: 0,
			r: 0,
			q: 0,
			k: 0
		}
	};
	for (const row of chess.board()) for (const cell of row) {
		if (!cell) continue;
		onBoard[cell.color][cell.type] += 1;
	}
	const missing = (color) => {
		const out = [];
		for (const type of [
			"q",
			"r",
			"b",
			"n",
			"p"
		]) {
			const n = START_COUNT[type] - onBoard[color][type];
			for (let i = 0; i < n; i++) out.push(type);
		}
		return out;
	};
	return {
		w: missing("w"),
		b: missing("b")
	};
}
function materialScore(chess) {
	let white = 0;
	let black = 0;
	for (const row of chess.board()) for (const cell of row) {
		if (!cell) continue;
		if (cell.color === "w") white += MATERIAL[cell.type];
		else black += MATERIAL[cell.type];
	}
	return white - black;
}
function reconcilePieces(prev, chess) {
	const next = [];
	for (const row of chess.board()) for (const cell of row) if (cell) next.push({
		type: cell.type,
		color: cell.color,
		square: cell.square
	});
	const used = /* @__PURE__ */ new Set();
	const result = [];
	for (const n of next) {
		let best;
		let bestD = Infinity;
		for (const p of prev) {
			if (used.has(p.id) || p.type !== n.type || p.color !== n.color) continue;
			const d = squareDist(p.square, n.square);
			if (d < bestD) {
				bestD = d;
				best = p;
			}
		}
		if (best) {
			used.add(best.id);
			result.push({
				id: best.id,
				type: n.type,
				color: n.color,
				square: n.square
			});
		} else result.push({
			id: `pc-${pieceSeq++}`,
			type: n.type,
			color: n.color,
			square: n.square
		});
	}
	return result;
}
function seedPieces(chess) {
	pieceSeq = 1;
	return reconcilePieces([], chess);
}
var ctx = null;
var master = null;
var sfx = null;
var muted = false;
var visibilityBound = false;
function ensureGraph() {
	if (typeof window === "undefined") return;
	if (ctx) return;
	ctx = new (window.AudioContext || window.webkitAudioContext)({ latencyHint: "interactive" });
	master = ctx.createGain();
	sfx = ctx.createGain();
	sfx.gain.value = .4;
	master.gain.value = muted ? 0 : 1;
	sfx.connect(master);
	master.connect(ctx.destination);
}
function unlockAudio() {
	ensureGraph();
	if (ctx?.state === "suspended") ctx.resume();
	if (!visibilityBound && typeof document !== "undefined") {
		visibilityBound = true;
		document.addEventListener("visibilitychange", () => {
			if (document.visibilityState === "visible") {
				if (ctx?.state === "suspended") ctx.resume();
			}
		});
	}
}
function setMuted(value) {
	muted = value;
	if (master && ctx) master.gain.setTargetAtTime(value ? 0 : 1, ctx.currentTime, .03);
}
function tone(freq, dur, type, gain = .16, delay = 0, slideTo) {
	if (!ctx || !sfx) return;
	const t = ctx.currentTime + delay;
	const osc = ctx.createOscillator();
	const g = ctx.createGain();
	osc.type = type;
	osc.frequency.setValueAtTime(freq, t);
	if (slideTo !== void 0) osc.frequency.exponentialRampToValueAtTime(Math.max(slideTo, 1), t + dur);
	g.gain.setValueAtTime(1e-4, t);
	g.gain.exponentialRampToValueAtTime(gain, t + .01);
	g.gain.exponentialRampToValueAtTime(1e-4, t + dur);
	osc.connect(g);
	g.connect(sfx);
	osc.start(t);
	osc.stop(t + dur + .03);
	osc.onended = () => {
		osc.disconnect();
		g.disconnect();
	};
}
function playMoveSound(kind) {
	unlockAudio();
	if (muted) return;
	const jitter = 1 + (Math.random() * .08 - .04);
	switch (kind) {
		case "move":
			tone(210 * jitter, .07, "sine", .14);
			tone(88 * jitter, .09, "triangle", .08);
			break;
		case "capture":
			tone(150 * jitter, .09, "square", .05);
			tone(72, .16, "sine", .18, 0, 42);
			break;
		case "castle":
			tone(180, .07, "sine", .12);
			tone(240, .08, "sine", .1, .07);
			break;
		case "promote":
			tone(320, .1, "triangle", .12);
			tone(480, .12, "sine", .1, .06);
			break;
		case "check":
			tone(360, .09, "square", .05);
			tone(240, .12, "sine", .12, .05);
			break;
		case "mate":
			tone(220, .18, "sine", .16);
			tone(277, .22, "triangle", .12, .08);
			tone(330, .28, "sine", .1, .16);
	}
}
var KEY$1 = "kingside.save";
var VERSION = 1;
function isSquare(value) {
	return typeof value === "string" && /^[a-h][1-8]$/.test(value);
}
function loadSave() {
	if (typeof window === "undefined") return null;
	try {
		const raw = localStorage.getItem(KEY$1);
		if (!raw) return null;
		const data = JSON.parse(raw);
		if (data.version !== VERSION) return null;
		if (data.mode !== "ai" && data.mode !== "local") return null;
		if (!Array.isArray(data.history)) return null;
		return {
			version: 1,
			history: data.history.filter((s) => typeof s === "string"),
			mode: data.mode,
			difficulty: data.difficulty === "casual" || data.difficulty === "sharp" ? data.difficulty : "club",
			playerColor: data.playerColor === "b" ? "b" : "w",
			orientation: data.orientation === "b" ? "b" : "w",
			lastMove: data.lastMove && isSquare(data.lastMove.from) && isSquare(data.lastMove.to) ? {
				from: data.lastMove.from,
				to: data.lastMove.to
			} : null
		};
	} catch {
		return null;
	}
}
function writeSave(save) {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem(KEY$1, JSON.stringify(save));
	} catch {}
}
function clearSave() {
	if (typeof window === "undefined") return;
	try {
		localStorage.removeItem(KEY$1);
	} catch {}
}
function resultOf() {
	const chess = getGame();
	if (!chess.isGameOver()) return null;
	if (chess.isCheckmate()) return {
		kind: "mate",
		winner: opposite(chess.turn())
	};
	if (chess.isStalemate()) return { kind: "stalemate" };
	if (chess.isThreefoldRepetition()) return { kind: "repetition" };
	if (chess.isInsufficientMaterial()) return { kind: "material" };
	if (chess.isDrawByFiftyMoves()) return { kind: "fifty" };
	return { kind: "draw" };
}
function persist$1(state) {
	if (state.phase !== "playing" || state.result) {
		if (state.result) clearSave();
		return;
	}
	writeSave({
		version: 1,
		history: state.history.map((m) => m.san),
		mode: state.mode,
		difficulty: state.difficulty,
		playerColor: state.playerColor,
		orientation: state.orientation,
		lastMove: state.lastMove
	});
}
function snapshot(prevPieces) {
	const chess = getGame();
	const history = chess.history({ verbose: true });
	const last = history[history.length - 1];
	return {
		fen: chess.fen(),
		turn: chess.turn(),
		history,
		pieces: reconcilePieces(prevPieces, chess),
		captured: capturedByColor(chess),
		material: materialScore(chess),
		lastMove: last ? {
			from: last.from,
			to: last.to
		} : null,
		inCheck: chess.isCheck(),
		result: resultOf(),
		selected: null,
		legal: [],
		promotion: null
	};
}
function soundFor(move, result, inCheck) {
	if (result?.kind === "mate") playMoveSound("mate");
	else if (inCheck) playMoveSound("check");
	else if (move.isPromotion()) playMoveSound("promote");
	else if (move.isKingsideCastle() || move.isQueensideCastle()) playMoveSound("castle");
	else if (move.isCapture() || move.isEnPassant()) playMoveSound("capture");
	else playMoveSound("move");
}
function isPlayerTurn(state) {
	if (state.result) return false;
	if (state.thinking) return false;
	if (state.mode === "local") return true;
	return state.turn === state.playerColor;
}
var useGameStore = create((set, get) => ({
	phase: "menu",
	mode: "ai",
	difficulty: "club",
	playerColor: "w",
	orientation: "w",
	fen: "start",
	turn: "w",
	history: [],
	pieces: [],
	captured: {
		w: [],
		b: []
	},
	material: 0,
	selected: null,
	legal: [],
	lastMove: null,
	inCheck: false,
	result: null,
	promotion: null,
	thinking: false,
	aiRequestId: 0,
	muted: false,
	hasSave: false,
	hydrated: false,
	hydrate: () => {
		const save = loadSave();
		set({
			hasSave: Boolean(save && save.history.length > 0),
			hydrated: true
		});
	},
	startGame: (mode, playerColor, difficulty) => {
		unlockAudio();
		resetEngine();
		const chess = getGame();
		const aiFirst = mode === "ai" && playerColor === "b";
		set({
			phase: "playing",
			mode,
			playerColor,
			difficulty,
			orientation: mode === "ai" ? playerColor : "w",
			thinking: aiFirst,
			aiRequestId: aiFirst ? get().aiRequestId + 1 : get().aiRequestId,
			hasSave: false,
			...snapshot([]),
			pieces: seedPieces(chess)
		});
		persist$1({ ...get() });
	},
	continueGame: () => {
		const save = loadSave();
		if (!save || save.history.length === 0) return;
		unlockAudio();
		loadHistory(save.history);
		const chess = getGame();
		const snap = snapshot([]);
		const aiToMove = save.mode === "ai" && chess.turn() !== save.playerColor && !snap.result;
		set({
			phase: "playing",
			mode: save.mode,
			difficulty: save.difficulty,
			playerColor: save.playerColor,
			orientation: save.orientation,
			thinking: aiToMove,
			aiRequestId: aiToMove ? get().aiRequestId + 1 : get().aiRequestId,
			hasSave: true,
			...snap,
			pieces: seedPieces(chess),
			lastMove: save.lastMove ?? snap.lastMove
		});
	},
	toMenu: () => {
		const save = loadSave();
		set({
			phase: "menu",
			thinking: false,
			selected: null,
			legal: [],
			promotion: null,
			hasSave: Boolean(save && save.history.length > 0)
		});
	},
	canInteract: () => {
		const s = get();
		return s.phase === "playing" && !s.result && !s.thinking && isPlayerTurn(s);
	},
	canUndo: () => {
		const s = get();
		if (s.phase !== "playing" || s.history.length === 0) return false;
		if (s.mode === "local") return true;
		return s.history.some((m) => m.color === s.playerColor) || s.thinking;
	},
	selectSquare: (square) => {
		const s = get();
		if (s.phase !== "playing" || s.result || s.thinking || s.promotion) return;
		if (!isPlayerTurn(s)) return;
		if (s.selected) {
			if (s.legal.find((m) => m.to === square)) {
				get().tryMove(s.selected, square);
				return;
			}
		}
		const chess = getGame();
		const piece = chess.get(square);
		if (piece && piece.color === chess.turn()) set({
			selected: square,
			legal: chess.moves({
				square,
				verbose: true
			})
		});
		else set({
			selected: null,
			legal: []
		});
	},
	tryMove: (from, to) => {
		const s = get();
		if (s.phase !== "playing" || s.result || s.thinking) return;
		if (!isPlayerTurn(s)) return;
		const chess = getGame();
		const options = chess.moves({
			square: from,
			verbose: true
		}).filter((m) => m.to === to);
		if (options.length === 0) {
			const piece = chess.get(to);
			if (piece && piece.color === chess.turn()) set({
				selected: to,
				legal: chess.moves({
					square: to,
					verbose: true
				})
			});
			else set({
				selected: null,
				legal: []
			});
			return;
		}
		if (options.some((m) => m.promotion) && !s.promotion) {
			set({
				promotion: {
					from,
					to
				},
				selected: from
			});
			return;
		}
		const move = playEngineMove(from, to);
		if (!move) return;
		const snap = snapshot(get().pieces);
		soundFor(move, snap.result, snap.inCheck);
		const aiTurn = get().mode === "ai" && !snap.result && getGame().turn() !== get().playerColor;
		set({
			...snap,
			thinking: aiTurn,
			aiRequestId: aiTurn ? get().aiRequestId + 1 : get().aiRequestId
		});
		persist$1(get());
	},
	choosePromotion: (piece) => {
		const s = get();
		if (!s.promotion) return;
		const move = playEngineMove(s.promotion.from, s.promotion.to, piece);
		if (!move) {
			set({ promotion: null });
			return;
		}
		const snap = snapshot(get().pieces);
		soundFor(move, snap.result, snap.inCheck);
		const aiTurn = get().mode === "ai" && !snap.result && getGame().turn() !== get().playerColor;
		set({
			...snap,
			thinking: aiTurn,
			aiRequestId: aiTurn ? get().aiRequestId + 1 : get().aiRequestId
		});
		persist$1(get());
	},
	cancelPromotion: () => set({
		promotion: null,
		selected: null,
		legal: []
	}),
	undo: () => {
		const s = get();
		if (!get().canUndo()) return;
		if (s.thinking) {
			undoEngineMove();
			set({
				thinking: false,
				aiRequestId: s.aiRequestId + 1,
				...snapshot(s.pieces)
			});
			persist$1(get());
			return;
		}
		undoEngineMove();
		if (s.mode === "ai") undoEngineMove();
		set({
			thinking: false,
			...snapshot(get().pieces)
		});
		persist$1(get());
	},
	flip: () => set({ orientation: opposite(get().orientation) }),
	resign: () => {
		const s = get();
		if (s.phase !== "playing" || s.result) return;
		set({
			result: {
				kind: "resign",
				winner: opposite(s.mode === "ai" ? s.playerColor : s.turn)
			},
			thinking: false,
			selected: null,
			legal: [],
			promotion: null
		});
		playMoveSound("mate");
		clearSave();
	},
	applyAiMove: (payload) => {
		const s = get();
		if (!s.thinking || payload.requestId !== s.aiRequestId) return;
		if (s.result) {
			set({ thinking: false });
			return;
		}
		const move = playEngineMove(payload.from, payload.to, payload.promotion);
		if (!move) {
			set({ thinking: false });
			return;
		}
		const snap = snapshot(s.pieces);
		soundFor(move, snap.result, snap.inCheck);
		set({
			...snap,
			thinking: false
		});
		persist$1(get());
	},
	toggleMuted: () => {
		const next = !get().muted;
		setMuted(next);
		set({ muted: next });
	}
}));
var FILES = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h"
];
function displayCoords(file, rank, orientation) {
	return {
		col: orientation === "w" ? file : 7 - file,
		row: orientation === "w" ? 7 - rank : rank
	};
}
function hitSquare(clientX, clientY, el, orientation) {
	const rect = el.getBoundingClientRect();
	const x = (clientX - rect.left) / rect.width;
	const y = (clientY - rect.top) / rect.height;
	if (x < 0 || y < 0 || x >= 1 || y >= 1) return null;
	let file = Math.floor(x * 8);
	let rankFromTop = Math.floor(y * 8);
	if (orientation === "w") return coordsToSquare(file, 7 - rankFromTop);
	return coordsToSquare(7 - file, rankFromTop);
}
function Board() {
	const boardRef = (0, import_react.useRef)(null);
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
	const [drag, setDrag] = (0, import_react.useState)(null);
	const legalTo = new Set(legal.map((m) => m.to));
	const kingSquare = inCheck ? pieces.find((p) => p.type === "k" && p.color === turn)?.square : void 0;
	const occupied = new Set(pieces.map((p) => p.square));
	const interactive = canInteract() && !promotion;
	const onPointerDown = (event) => {
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
				size: rect.width / 8
			});
		}
	};
	const onPointerMove = (event) => {
		if (!drag) return;
		setDrag({
			...drag,
			x: event.clientX,
			y: event.clientY
		});
	};
	const onPointerUp = (event) => {
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
	for (let row = 0; row < 8; row++) for (let col = 0; col < 8; col++) {
		const file = orientation === "w" ? col : 7 - col;
		const rank = orientation === "w" ? 7 - row : row;
		const square = coordsToSquare(file, rank);
		const isDark = (file + rank) % 2 === 0;
		const isSelected = selected === square;
		const isLast = lastMove?.from === square || lastMove?.to === square;
		const isCheckSq = kingSquare === square;
		const showFile = row === 7;
		const showRank = col === 0;
		squares.push(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("relative flex items-end justify-start", isDark ? "bg-board-dark" : "bg-board-light", isLast && "after:absolute after:inset-0 after:bg-board-hl/35 after:content-['']", isSelected && "after:absolute after:inset-0 after:bg-board-hl/50 after:content-['']", isCheckSq && "after:absolute after:inset-0 after:bg-check/55 after:content-['']"),
			children: [
				showRank ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("absolute top-0.5 left-1 font-medium text-2xs leading-none", isDark ? "text-board-light/80" : "text-board-dark/75"),
					children: rank + 1
				}) : null,
				showFile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("absolute right-1 bottom-0.5 font-medium text-2xs leading-none", isDark ? "text-board-light/80" : "text-board-dark/75"),
					children: FILES[file]
				}) : null,
				legalTo.has(square) && !occupied.has(square) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "legal-dot absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" }) : null,
				legalTo.has(square) && occupied.has(square) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "legal-ring" }) : null
			]
		}, square));
	}
	const draggingPiece = drag ? pieces.find((p) => p.id === drag.id) : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative w-full max-w-xl lg:max-w-2xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-xl bg-frame p-2 shadow-[0_24px_60px_-28px_rgb(0_0_0_/_0.7)] sm:p-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: boardRef,
				role: "grid",
				"aria-label": "Шахматная доска",
				"aria-disabled": !interactive,
				className: cn("relative grid aspect-square w-full grid-cols-8 grid-rows-8 overflow-hidden rounded-md touch-none select-none", (thinking || result) && "pointer-events-none"),
				onPointerDown,
				onPointerMove,
				onPointerUp,
				onPointerCancel: () => setDrag(null),
				children: [squares, pieces.map((piece) => {
					const { col, row } = displayCoords(squareFile(piece.square), squareRank(piece.square), orientation);
					const isDragging = drag?.id === piece.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("chess-piece pointer-events-none absolute top-0 left-0 z-10 h-[12.5%] w-[12.5%] p-[4%] transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]", isDragging && "opacity-0"),
						style: { transform: `translate(${col * 100}%, ${row * 100}%)` },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChessPiece, {
							type: piece.type,
							color: piece.color,
							className: "h-full w-full"
						})
					}, piece.id);
				})]
			})
		}), draggingPiece && drag ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none fixed z-50",
			style: {
				width: drag.size,
				height: drag.size,
				left: drag.x - drag.size / 2,
				top: drag.y - drag.size / 2,
				padding: drag.size * .04
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChessPiece, {
				type: draggingPiece.type,
				color: draggingPiece.color,
				className: "h-full w-full"
			})
		}) : null]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-medium select-none transition-[transform,background-color,color,opacity] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-fg hover:opacity-90",
			ghost: "bg-transparent text-fg hover:bg-elevated",
			outline: "border border-border bg-transparent text-fg hover:bg-elevated",
			subtle: "bg-elevated text-fg hover:bg-surface"
		},
		size: {
			sm: "h-10 rounded-sm px-3 text-sm",
			md: "h-11 rounded-md px-4 text-sm",
			lg: "h-12 rounded-md px-5 text-base",
			icon: "size-11 rounded-md"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, asChild = false, type = "button", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		type: asChild ? void 0 : type,
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
var KEY = "kingside.theme";
var BOARD_DEFAULT = {
	boardLight: "#e1d4be",
	boardDark: "#6b5344",
	boardHl: "#b7c4a8",
	pieceW: "#f3eee4",
	pieceB: "#1a1714"
};
var CHROME = {
	dark: {
		bg: "#0c0b0a",
		surface: "#141210",
		elevated: "#1c1916",
		fg: "#f0ece4",
		muted: "#9a9388",
		subtle: "#6e6860",
		border: "#2c2723",
		accent: "#d8d2c8",
		accentFg: "#0c0b0a",
		frame: "#1a1613"
	},
	light: {
		bg: "#f3efe6",
		surface: "#ebe4d6",
		elevated: "#fffaf2",
		fg: "#1c1916",
		muted: "#6e6860",
		subtle: "#9a9388",
		border: "#d4cbb8",
		accent: "#3d342c",
		accentFg: "#f3efe6",
		frame: "#cfc3ae"
	}
};
var PRESETS = [
	{
		id: "walnut",
		label: "Орех",
		chrome: "dark",
		board: BOARD_DEFAULT
	},
	{
		id: "forest",
		label: "Лес",
		chrome: "dark",
		board: {
			boardLight: "#dce6c8",
			boardDark: "#4d6750",
			boardHl: "#c4b07a",
			pieceW: "#f4f0e6",
			pieceB: "#1a1c18"
		}
	},
	{
		id: "ink",
		label: "Чернила",
		chrome: "dark",
		board: {
			boardLight: "#d7dee8",
			boardDark: "#3e4b5c",
			boardHl: "#8aa4c1",
			pieceW: "#f2f4f7",
			pieceB: "#16181c"
		}
	},
	{
		id: "sand",
		label: "Бумага",
		chrome: "light",
		board: {
			boardLight: "#f2e6cf",
			boardDark: "#c4a574",
			boardHl: "#8b9e7a",
			pieceW: "#fff8ee",
			pieceB: "#2a221c"
		}
	},
	{
		id: "night",
		label: "Ночь",
		chrome: "dark",
		board: {
			boardLight: "#3f3f46",
			boardDark: "#18181b",
			boardHl: "#6b7c6a",
			pieceW: "#f0ece4",
			pieceB: "#0c0c0e"
		}
	}
];
var CSS_VARS = {
	boardLight: "--color-board-light",
	boardDark: "--color-board-dark",
	boardHl: "--color-board-hl",
	pieceW: "--color-piece-w",
	pieceB: "--color-piece-b",
	bg: "--color-bg",
	surface: "--color-surface",
	elevated: "--color-elevated",
	fg: "--color-fg",
	muted: "--color-muted",
	subtle: "--color-subtle",
	border: "--color-border",
	accent: "--color-accent",
	accentFg: "--color-accent-fg",
	frame: "--color-frame"
};
function hexLuminance(hex) {
	const raw = hex.replace("#", "");
	if (raw.length !== 6) return .5;
	const r = Number.parseInt(raw.slice(0, 2), 16) / 255;
	const g = Number.parseInt(raw.slice(2, 4), 16) / 255;
	const b = Number.parseInt(raw.slice(4, 6), 16) / 255;
	return .2126 * r + .7152 * g + .0722 * b;
}
function strokeFor(fill) {
	return hexLuminance(fill) > .55 ? "#2c2622" : "#e8e2d8";
}
function isHex(value) {
	return typeof value === "string" && /^#[0-9a-fA-F]{6}$/.test(value);
}
function defaultTheme() {
	return {
		version: 1,
		preset: "walnut",
		chrome: "dark",
		board: { ...BOARD_DEFAULT }
	};
}
function resolveColors(state) {
	return {
		...CHROME[state.chrome],
		...state.board
	};
}
function applyTheme(state) {
	if (typeof document === "undefined") return;
	const colors = resolveColors(state);
	const root = document.documentElement;
	for (const key of Object.keys(CSS_VARS)) root.style.setProperty(CSS_VARS[key], colors[key]);
	root.style.setProperty("--color-piece-w-stroke", strokeFor(colors.pieceW));
	root.style.setProperty("--color-piece-b-stroke", strokeFor(colors.pieceB));
	root.style.setProperty("--color-check", hexLuminance(colors.boardDark) > .4 ? "#8a3f36" : "#a45a4c");
	root.dataset.chrome = state.chrome;
}
function sanitizeBoard(raw) {
	const next = { ...BOARD_DEFAULT };
	Object.keys(next).forEach((key) => {
		if (isHex(raw?.[key])) next[key] = raw[key];
	});
	return next;
}
function loadTheme() {
	const fallback = defaultTheme();
	if (typeof window === "undefined") return fallback;
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return fallback;
		const data = JSON.parse(raw);
		if (data.version !== 1) return fallback;
		return {
			version: 1,
			preset: data.preset === "forest" || data.preset === "ink" || data.preset === "sand" || data.preset === "night" || data.preset === "custom" || data.preset === "walnut" ? data.preset : "walnut",
			chrome: data.chrome === "light" ? "light" : "dark",
			board: sanitizeBoard(data.board)
		};
	} catch {
		return fallback;
	}
}
function writeTheme(state) {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem(KEY, JSON.stringify(state));
	} catch {}
}
function persist(state) {
	applyTheme(state);
	writeTheme(state);
}
var useThemeStore = create((set, get) => ({
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
		const next = {
			version: 1,
			preset: id,
			chrome: preset.chrome,
			board: { ...preset.board }
		};
		set(next);
		persist(next);
	},
	setChrome: (chrome) => {
		const next = {
			...get(),
			chrome,
			preset: get().preset
		};
		set({ chrome });
		persist(next);
	},
	setBoardColor: (key, value) => {
		const board = {
			...get().board,
			[key]: value
		};
		const next = {
			version: 1,
			preset: "custom",
			chrome: get().chrome,
			board
		};
		set(next);
		persist(next);
	},
	reset: () => {
		const next = defaultTheme();
		set({
			...next,
			settingsOpen: get().settingsOpen
		});
		persist(next);
	},
	openSettings: () => set({ settingsOpen: true }),
	closeSettings: () => set({ settingsOpen: false })
}));
var PICKERS = [
	{
		key: "boardLight",
		label: "Светлые клетки"
	},
	{
		key: "boardDark",
		label: "Тёмные клетки"
	},
	{
		key: "boardHl",
		label: "Подсветка хода"
	},
	{
		key: "pieceW",
		label: "Белые фигуры"
	},
	{
		key: "pieceB",
		label: "Чёрные фигуры"
	}
];
function SettingsButton() {
	const openSettings = useThemeStore((s) => s.openSettings);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		variant: "ghost",
		size: "icon",
		"aria-label": "Настройки цветов",
		onClick: openSettings,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, {
			className: "size-5",
			strokeWidth: 1.75
		})
	});
}
function SettingsPanel() {
	const open = useThemeStore((s) => s.settingsOpen);
	const close = useThemeStore((s) => s.closeSettings);
	const preset = useThemeStore((s) => s.preset);
	const chrome = useThemeStore((s) => s.chrome);
	const board = useThemeStore((s) => s.board);
	const setPreset = useThemeStore((s) => s.setPreset);
	const setChrome = useThemeStore((s) => s.setChrome);
	const setBoardColor = useThemeStore((s) => s.setBoardColor);
	const reset = useThemeStore((s) => s.reset);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (event) => {
			if (event.key === "Escape") close();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, close]);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "absolute inset-0 bg-bg/70",
			"aria-label": "Закрыть настройки",
			onClick: close
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "settings-title",
			className: "modal-enter relative z-10 flex max-h-[min(92dvh,40rem)] w-full max-w-md flex-col overflow-hidden rounded-xl border border-border bg-surface",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between gap-3 px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "settings-title",
					className: "font-display text-xl font-medium tracking-tight",
					children: "Цвета"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					"aria-label": "Закрыть",
					onClick: close,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
						className: "size-5",
						strokeWidth: 1.75
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-6 overflow-y-auto px-5 pb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniPreview, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "flex flex-col gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-muted",
							children: "Палитра"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-3 gap-2 sm:grid-cols-5",
							children: PRESETS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"aria-pressed": preset === item.id,
								"aria-label": item.label,
								onClick: () => setPreset(item.id),
								className: cn("flex min-h-16 flex-col items-center justify-center gap-2 rounded-md p-2 transition-colors duration-150", preset === item.id ? "bg-accent text-accent-fg" : "bg-elevated text-muted hover:text-fg"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "grid size-8 grid-cols-2 overflow-hidden rounded-sm",
									"aria-hidden": "true",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { background: item.board.boardLight } }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { background: item.board.boardDark } }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { background: item.board.boardDark } }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { background: item.board.boardLight } })
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xs font-medium",
									children: item.label
								})]
							}, item.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "flex flex-col gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-muted",
							children: "Интерфейс"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-1 rounded-lg bg-elevated p-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChromeOption, {
								label: "Тёмный",
								active: chrome === "dark",
								onClick: () => setChrome("dark")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChromeOption, {
								label: "Светлый",
								active: chrome === "light",
								onClick: () => setChrome("light")
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-muted",
							children: "Свои цвета"
						}), PICKERS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex min-h-11 items-center justify-between gap-3 rounded-md px-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-fg",
								children: item.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "color",
								value: board[item.key],
								"aria-label": item.label,
								onChange: (event) => setBoardColor(item.key, event.target.value),
								className: "size-11 cursor-pointer rounded-md border border-border bg-transparent p-1"
							})]
						}, item.key))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: reset,
						children: "Сбросить"
					})
				]
			})]
		})]
	});
}
function ChromeOption({ label, active, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("flex min-h-11 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors duration-150", active ? "bg-accent text-accent-fg" : "text-muted hover:text-fg"),
		children: label
	});
}
function MiniPreview() {
	const placed = {
		"0-1": {
			type: "n",
			color: "b"
		},
		"2-2": {
			type: "k",
			color: "w"
		}
	};
	const cells = [
		0,
		1,
		2,
		3
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center rounded-lg bg-elevated p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid size-36 grid-cols-4 overflow-hidden rounded-md",
			"aria-hidden": "true",
			children: cells.flatMap((row) => cells.map((col) => {
				const dark = (row + col) % 2 === 1;
				const piece = placed[`${row}-${col}`];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("flex items-center justify-center p-0.5", dark ? "bg-board-dark" : "bg-board-light"),
					children: piece ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChessPiece, {
						type: piece.type,
						color: piece.color,
						className: "h-full w-full"
					}) : null
				}, `${row}-${col}`);
			}))
		})
	});
}
var PROMO = [
	"q",
	"r",
	"b",
	"n"
];
function statusText(turn, inCheck, thinking, result, mode, playerColor) {
	if (result) switch (result.kind) {
		case "mate": return result.winner === "w" ? "Мат. Белые победили" : "Мат. Чёрные победили";
		case "stalemate": return "Пат — ничья";
		case "repetition": return "Ничья: троекратное повторение";
		case "material": return "Ничья: недостаточно фигур";
		case "fifty": return "Ничья: правило 50 ходов";
		case "resign": return result.winner === "w" ? "Белые победили" : "Чёрные победили";
		default: return "Ничья";
	}
	if (thinking) return "Считает ход";
	if (inCheck) return turn === "w" ? "Шах белым" : "Шах чёрным";
	if (mode === "ai") return turn === playerColor ? "Ваш ход" : "Ход машины";
	return turn === "w" ? "Ход белых" : "Ход чёрных";
}
function pairMoves(history) {
	const rows = [];
	for (let i = 0; i < history.length; i += 2) rows.push({
		n: i / 2 + 1,
		w: history[i]?.san,
		b: history[i + 1]?.san
	});
	return rows;
}
function PlayScreen() {
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
	const [copied, setCopied] = (0, import_react.useState)(false);
	const status = statusText(turn, inCheck, thinking, result, mode, playerColor);
	const rows = pairMoves(history);
	const promoColor = turn;
	const copyPgn = async () => {
		const pgn = rows.map((row) => `${row.n}. ${row.w ?? ""}${row.b ? ` ${row.b}` : ""}`).join(" ").trim();
		try {
			await navigator.clipboard.writeText(pgn || "*");
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1400);
		} catch {}
	};
	const topColor = orientation === "w" ? "b" : "w";
	const bottomColor = orientation;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-4 py-4 sm:px-6 sm:py-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-4 flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: toMenu,
				className: "font-display text-xl font-medium tracking-[-0.03em] text-fg",
				children: "Kingside"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						"aria-label": "Отменить ход",
						disabled: !canUndo(),
						onClick: undo,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, {
							className: "size-5",
							strokeWidth: 1.75
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						"aria-label": "Перевернуть доску",
						onClick: flip,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
							className: "size-5",
							strokeWidth: 1.75
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						"aria-label": muted ? "Включить звук" : "Выключить звук",
						onClick: toggleMuted,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative inline-flex size-5 items-center justify-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, {
								className: cn("size-5 transition-[opacity,transform,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)]", muted ? "scale-[0.25] opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-0"),
								strokeWidth: 1.75
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, {
								className: cn("absolute inset-0 size-5 transition-[opacity,transform,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)]", muted ? "scale-100 opacity-100 blur-0" : "scale-[0.25] opacity-0 blur-[4px]"),
								strokeWidth: 1.75
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsButton, {})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-5 lg:flex-row lg:items-start lg:gap-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex w-full flex-col items-center gap-3 lg:flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CapturedRow, {
						pieces: captured[topColor],
						color: topColor,
						advantage: topColor === "w" ? material : -material
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-full max-w-xl lg:max-w-2xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Board, {}),
							promotion ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-bg/55 p-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "modal-enter flex flex-wrap items-center justify-center gap-2 rounded-xl border border-border bg-surface p-3",
									children: [PROMO.map((type) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "flex size-14 items-center justify-center rounded-md bg-elevated hover:bg-frame sm:size-16",
										onClick: () => choosePromotion(type),
										"aria-label": `Превратить в ${type}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChessPiece, {
											type,
											color: promoColor,
											className: "h-12 w-12"
										})
									}, type)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										onClick: cancelPromotion,
										children: "Отмена"
									})]
								})
							}) : null,
							result ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-bg/60 p-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "modal-enter flex w-full max-w-sm flex-col gap-4 rounded-xl border border-border bg-surface p-6 text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-display text-2xl font-medium tracking-[-0.03em]",
										children: status
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											onClick: () => startGame(mode, playerColor, difficulty),
											children: "Ещё раз"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outline",
											onClick: toMenu,
											children: "В меню"
										})]
									})]
								})
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CapturedRow, {
						pieces: captured[bottomColor],
						color: bottomColor,
						advantage: bottomColor === "w" ? material : -material
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "flex w-full flex-col gap-4 pb-6 lg:w-72 lg:shrink-0 lg:pt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("font-display text-2xl font-medium tracking-[-0.03em] text-fg", thinking && "thinking-shimmer"),
						children: status
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: mode === "ai" ? difficulty === "casual" ? "Спокойный уровень" : difficulty === "club" ? "Клубный уровень" : "Острый уровень" : "Два игрока"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-surface p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-3 text-sm font-medium text-muted",
							children: "Ходы"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "max-h-56 overflow-y-auto font-sans text-sm leading-7 tabular-nums lg:max-h-[22rem]",
							children: rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "text-subtle",
								children: "Партия ещё не началась"
							}) : rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "grid grid-cols-[2rem_1fr_1fr] gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-subtle",
										children: [row.n, "."]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-fg",
										children: row.w
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-fg",
										children: row.b ?? ""
									})
								]
							}, row.n))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: copyPgn,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
								className: "size-4",
								strokeWidth: 1.75
							}), copied ? "Скопировано" : "Скопировать ходы"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							onClick: resign,
							disabled: Boolean(result),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, {
								className: "size-4",
								strokeWidth: 1.75
							}), "Сдаться"]
						})]
					})
				]
			})]
		})]
	});
}
function CapturedRow({ pieces, color, advantage }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-8 w-full max-w-xl items-center gap-1 lg:max-w-2xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap items-center",
			children: pieces.map((type, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChessPiece, {
				type,
				color,
				className: "-ml-1 h-6 w-6 first:ml-0 sm:h-7 sm:w-7"
			}, `${color}-${type}-${i}`))
		}), advantage > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "ml-2 text-sm tabular-nums text-muted",
			children: ["+", advantage]
		}) : null]
	});
}
var DIFFICULTIES = [
	{
		id: "casual",
		label: "Спокойный"
	},
	{
		id: "club",
		label: "Клубный"
	},
	{
		id: "sharp",
		label: "Острый"
	}
];
function StartScreen() {
	const startGame = useGameStore((s) => s.startGame);
	const continueGame = useGameStore((s) => s.continueGame);
	const hasSave = useGameStore((s) => s.hasSave);
	const [difficulty, setDifficulty] = (0, import_react.useState)("club");
	const play = (color, mode) => {
		startGame(mode, color, difficulty);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative mx-auto flex min-h-dvh w-full max-w-lg flex-col justify-center px-5 py-10 sm:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute top-4 right-4 sm:top-6 sm:right-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsButton, {})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "stagger-in flex flex-col gap-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex flex-col items-center text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-5 flex items-end gap-1",
							"aria-hidden": "true",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChessPiece, {
								type: "k",
								color: "w",
								className: "h-12 w-12"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChessPiece, {
								type: "k",
								color: "b",
								className: "h-12 w-12"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium tracking-[0.18em] text-muted uppercase",
							children: "Шахматы"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-2 font-display text-5xl font-medium tracking-[-0.03em] text-fg sm:text-6xl",
							children: "Kingside"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-sm text-base leading-normal text-muted",
							children: "Тихая доска. Полные правила. Машина, которая думает, пока вы смотрите на поле."
						})
					]
				}),
				hasSave ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "lg",
					className: "w-full",
					onClick: continueGame,
					children: "Продолжить партию"
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "flex flex-col gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-muted",
						children: "Уровень машины"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-3 gap-1 rounded-lg bg-elevated p-1",
						role: "radiogroup",
						"aria-label": "Сложность",
						children: DIFFICULTIES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							role: "radio",
							"aria-checked": difficulty === item.id,
							onClick: () => setDifficulty(item.id),
							className: cn("flex min-h-11 flex-col items-center justify-center rounded-md px-2 py-2 text-center transition-colors duration-150", difficulty === item.id ? "bg-accent text-accent-fg" : "text-muted hover:text-fg"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium",
								children: item.label
							})
						}, item.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeCard, {
							title: "Белыми",
							description: "Вы ходите первыми против машины",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, {
								className: "size-5",
								strokeWidth: 1.75
							}),
							onClick: () => play("w", "ai")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeCard, {
							title: "Чёрными",
							description: "Машина открывает партию",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, {
								className: "size-5",
								strokeWidth: 1.75
							}),
							onClick: () => play("b", "ai")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeCard, {
							title: "Вдвоём",
							description: "Одна доска, двое за столом",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
								className: "size-5",
								strokeWidth: 1.75
							}),
							onClick: () => play("w", "local")
						})
					]
				})
			]
		})]
	});
}
function ModeCard({ title, description, icon, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "flex min-h-16 items-center gap-4 rounded-xl border border-border bg-surface px-4 py-4 text-left transition-colors duration-150 hover:bg-elevated",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex size-11 items-center justify-center rounded-md bg-elevated text-fg",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex min-w-0 flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium text-fg",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm text-muted",
				children: description
			})]
		})]
	});
}
function GameApp() {
	const phase = useGameStore((s) => s.phase);
	const hydrate = useGameStore((s) => s.hydrate);
	const hydrateTheme = useThemeStore((s) => s.hydrate);
	(0, import_react.useEffect)(() => {
		hydrate();
		hydrateTheme();
	}, [hydrate, hydrateTheme]);
	useAiController();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [phase === "menu" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StartScreen, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayScreen, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsPanel, {})] });
}
function useAiController() {
	const workerRef = (0, import_react.useRef)(null);
	const thinking = useGameStore((s) => s.thinking);
	const requestId = useGameStore((s) => s.aiRequestId);
	(0, import_react.useEffect)(() => {
		let worker = null;
		try {
			worker = new Worker(new URL("../../lib/chess/ai.worker.ts", import.meta.url), { type: "module" });
			worker.onmessage = (event) => {
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
	(0, import_react.useEffect)(() => {
		if (!thinking) return;
		const state = useGameStore.getState();
		const payload = {
			requestId: state.aiRequestId,
			fen: state.fen,
			history: state.history.map((move) => move.san),
			difficulty: state.difficulty
		};
		if (workerRef.current) {
			workerRef.current.postMessage(payload);
			return;
		}
		let cancelled = false;
		const timer = window.setTimeout(() => {
			(async () => {
				const { Chess } = await import("../_libs/chess.js.mjs").then((n) => n.n);
				const { pickMove } = await import("./search-CXa7Mgm_.mjs");
				const move = pickMove(new Chess(payload.fen), payload.history, payload.difficulty);
				if (!cancelled && move) useGameStore.getState().applyAiMove({
					requestId: payload.requestId,
					from: move.from,
					to: move.to,
					promotion: move.promotion
				});
			})();
		}, 30);
		return () => {
			cancelled = true;
			window.clearTimeout(timer);
		};
	}, [thinking, requestId]);
}
var routes_exports = /* @__PURE__ */ __exportAll({ component: () => Home });
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameApp, {});
}
//#endregion
export { squareFile as n, squareRank as r, routes_exports as t };
