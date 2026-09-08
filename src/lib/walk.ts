export const STOPS = [
  { id: "entrance", label: "La Casa" },
  { id: "wall", label: "The wall" },
  { id: "altar", label: "The chamber" },
  { id: "gorras", label: "Gorras" },
  { id: "street", label: "Street" },
  { id: "vault", label: "Vault" },
  { id: "home", label: "La Casa" },
] as const;

/** Camera, in screens. Negative = the world slides to reveal that cell. */
const KEYS: { x: number; y: number }[] = [
  { x: 0, y: 0 },
  { x: 0, y: -1 },
  { x: -1, y: -1 },
  { x: -2, y: -1 },
  { x: -3, y: -1 },
  { x: -2, y: -2 },
  { x: 0, y: -2 },
];

export function cameraAt(progress: number) {
  const p = Math.min(1, Math.max(0, progress));
  const n = KEYS.length - 1;
  const f = p * n;
  const i = Math.min(n - 1, Math.floor(f));
  const t = f - i;
  const a = KEYS[i];
  const b = KEYS[i + 1];
  return {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
  };
}

export function nearestStop(progress: number) {
  const n = KEYS.length - 1;
  return Math.min(n, Math.max(0, Math.round(progress * n)));
}

export function transformFor(progress: number) {
  const { x, y } = cameraAt(progress);
  return `translate3d(${x * 100}vw, ${y * 100}dvh, 0)`;
}
