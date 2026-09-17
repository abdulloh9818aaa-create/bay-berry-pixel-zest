type SoundKind = "move" | "capture" | "castle" | "check" | "mate" | "promote";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let sfx: GainNode | null = null;
let muted = false;
let visibilityBound = false;

function ensureGraph() {
  if (typeof window === "undefined") return;
  if (ctx) return;
  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  ctx = new AC({ latencyHint: "interactive" });
  master = ctx.createGain();
  sfx = ctx.createGain();
  sfx.gain.value = 0.4;
  master.gain.value = muted ? 0 : 1;
  sfx.connect(master);
  master.connect(ctx.destination);
}

export function unlockAudio() {
  ensureGraph();
  if (ctx?.state === "suspended") void ctx.resume();
  if (!visibilityBound && typeof document !== "undefined") {
    visibilityBound = true;
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        if (ctx?.state === "suspended") void ctx.resume();
      }
    });
  }
}

export function setMuted(value: boolean) {
  muted = value;
  if (master && ctx) {
    master.gain.setTargetAtTime(value ? 0 : 1, ctx.currentTime, 0.03);
  }
}

function tone(
  freq: number,
  dur: number,
  type: OscillatorType,
  gain = 0.16,
  delay = 0,
  slideTo?: number,
) {
  if (!ctx || !sfx) return;
  const t = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  if (slideTo !== undefined) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(slideTo, 1), t + dur);
  }
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g);
  g.connect(sfx);
  osc.start(t);
  osc.stop(t + dur + 0.03);
  osc.onended = () => {
    osc.disconnect();
    g.disconnect();
  };
}

export function playMoveSound(kind: SoundKind) {
  unlockAudio();
  if (muted) return;
  const jitter = 1 + (Math.random() * 0.08 - 0.04);
  switch (kind) {
    case "move":
      tone(210 * jitter, 0.07, "sine", 0.14);
      tone(88 * jitter, 0.09, "triangle", 0.08);
      break;
    case "capture":
      tone(150 * jitter, 0.09, "square", 0.05);
      tone(72, 0.16, "sine", 0.18, 0, 42);
      break;
    case "castle":
      tone(180, 0.07, "sine", 0.12);
      tone(240, 0.08, "sine", 0.1, 0.07);
      break;
    case "promote":
      tone(320, 0.1, "triangle", 0.12);
      tone(480, 0.12, "sine", 0.1, 0.06);
      break;
    case "check":
      tone(360, 0.09, "square", 0.05);
      tone(240, 0.12, "sine", 0.12, 0.05);
      break;
    case "mate":
      tone(220, 0.18, "sine", 0.16);
      tone(277, 0.22, "triangle", 0.12, 0.08);
      tone(330, 0.28, "sine", 0.1, 0.16);
      break;
  }
}
