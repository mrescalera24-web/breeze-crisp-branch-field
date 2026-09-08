const MUTE_KEY = "casa-mute";

function midi(n: number) {
  return 440 * 2 ** ((n - 69) / 12);
}

class HouseAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private timer: number | null = null;
  started = false;
  muted = false;
  private listeners = new Set<() => void>();

  constructor() {
    try {
      this.muted = localStorage.getItem(MUTE_KEY) === "1";
    } catch {
      this.muted = false;
    }
  }

  subscribe(fn: () => void) {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private emit() {
    this.listeners.forEach((fn) => fn());
  }

  async start() {
    if (this.started) {
      if (this.ctx?.state === "suspended") await this.ctx.resume();
      return;
    }
    const ctx = new AudioContext();
    const master = ctx.createGain();
    master.gain.value = this.muted ? 0 : 0.22;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 2400;
    filter.Q.value = 0.7;
    master.connect(filter);
    filter.connect(ctx.destination);
    this.ctx = ctx;
    this.master = master;
    this.started = true;
    if (ctx.state === "suspended") await ctx.resume();
    this.loop();
    this.emit();
  }

  setMuted(next: boolean) {
    this.muted = next;
    try {
      localStorage.setItem(MUTE_KEY, next ? "1" : "0");
    } catch {
      /* private */
    }
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(next ? 0 : 0.22, this.ctx.currentTime, 0.05);
    }
    this.emit();
  }

  toggle() {
    this.setMuted(!this.muted);
  }

  private tone(freq: number, type: OscillatorType, t: number, dur: number, gain: number, attack = 0.02, release?: number) {
    const ctx = this.ctx;
    const master = this.master;
    if (!ctx || !master) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    const rel = release ?? dur * 0.45;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(gain, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0008, t + Math.max(attack + 0.05, dur - rel));
    osc.connect(g);
    g.connect(master);
    osc.start(t);
    osc.stop(t + dur + 0.05);
  }

  private noise(t: number, dur: number, gain: number) {
    const ctx = this.ctx;
    const master = this.master;
    if (!ctx || !master) return;
    const n = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
    const d = n.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / d.length);
    const src = ctx.createBufferSource();
    src.buffer = n;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 180;
    bp.Q.value = 0.8;
    const g = ctx.createGain();
    g.gain.value = gain;
    src.connect(bp);
    bp.connect(g);
    g.connect(master);
    src.start(t);
  }

  private loop() {
    const ctx = this.ctx;
    if (!ctx) return;
    const bpm = 68;
    const beat = 60 / bpm;
    const bar = beat * 4;
    const cycle = bar * 8;
    const roots = [50, 50, 46, 48, 50, 53, 46, 48]; // D2, Bb, C, D, F, Bb, C

    const schedule = (origin: number) => {
      for (let b = 0; b < 8; b++) {
        const t0 = origin + b * bar;
        const root = midi(roots[b]);
        this.tone(root / 2, "sine", t0, bar * 0.95, 0.38, 0.04, 0.3);
        this.tone(root, "sine", t0, bar * 0.9, 0.12, 0.06, 0.4);
        this.tone(root * 2, "triangle", t0, bar * 0.85, 0.045, 0.2, 0.5);
        this.tone(root * 2.5, "sawtooth", t0 + 0.02, bar * 0.8, 0.02, 0.3, 0.5);
        this.noise(t0, 0.18, 0.08);
        this.tone(root * 4, "sine", t0 + beat * 2, 0.9, 0.05, 0.01, 0.7);
        if (b % 2 === 0) {
          this.tone(midi(74), "sine", t0 + beat * 3, 1.4, 0.04, 0.02, 1);
        }
        if (b === 3 || b === 7) {
          this.tone(midi(81), "triangle", t0 + beat * 1.5, 2.2, 0.035, 0.04, 1.4);
        }
      }
    };

    const spin = () => {
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      schedule(now + 0.05);
      this.timer = window.setTimeout(spin, cycle * 1000 - 80);
    };
    spin();
  }
}

export const houseAudio = new HouseAudio();
