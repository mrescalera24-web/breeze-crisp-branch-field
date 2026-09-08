import { create } from "zustand";
import { persist } from "zustand/middleware";

export type DeskStatus = "live" | "hold" | "sold" | "draft";

export type Overlay = {
  status?: DeskStatus;
  stock?: number;
  price?: number;
};

export type IncomingScan = {
  id: string;
  name: string;
  brand: string;
  price: number;
  stock: number;
  status: DeskStatus;
  image: string;
  scanName: string;
  createdAt: string;
};

type InventoryState = {
  overlays: Record<string, Overlay>;
  incoming: IncomingScan[];
  setStatus: (slug: string, status: DeskStatus) => void;
  setStock: (slug: string, stock: number) => void;
  setPrice: (slug: string, price: number) => void;
  addIncoming: (scan: Omit<IncomingScan, "id" | "createdAt" | "status">) => IncomingScan;
  patchIncoming: (id: string, patch: Partial<IncomingScan>) => void;
  dropIncoming: (id: string) => void;
};

function patchOverlay(overlays: Record<string, Overlay>, slug: string, patch: Overlay) {
  return { ...overlays, [slug]: { ...overlays[slug], ...patch } };
}

export const useInventory = create<InventoryState>()(
  persist(
    (set, get) => ({
      overlays: {},
      incoming: [],
      setStatus: (slug, status) =>
        set({ overlays: patchOverlay(get().overlays, slug, { status }) }),
      setStock: (slug, stock) =>
        set({ overlays: patchOverlay(get().overlays, slug, { stock: Math.max(0, stock) }) }),
      setPrice: (slug, price) =>
        set({ overlays: patchOverlay(get().overlays, slug, { price: Math.max(0, price) }) }),
      addIncoming: (scan) => {
        const row: IncomingScan = {
          ...scan,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          status: "draft",
        };
        set({ incoming: [row, ...get().incoming] });
        return row;
      },
      patchIncoming: (id, patch) =>
        set({
          incoming: get().incoming.map((s) => (s.id === id ? { ...s, ...patch } : s)),
        }),
      dropIncoming: (id) =>
        set({ incoming: get().incoming.filter((s) => s.id !== id) }),
    }),
    { name: "casa-backroom" },
  ),
);
