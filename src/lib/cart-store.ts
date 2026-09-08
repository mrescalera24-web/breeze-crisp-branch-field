import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = {
  slug: string;
  size?: string;
  qty: number;
};

type CartState = {
  lines: CartLine[];
  add: (slug: string, size?: string) => void;
  setQty: (slug: string, qty: number, size?: string) => void;
  remove: (slug: string, size?: string) => void;
  clear: () => void;
};

function sameLine(a: CartLine, slug: string, size?: string) {
  return a.slug === slug && (a.size ?? "") === (size ?? "");
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      add: (slug, size) => {
        const lines = [...get().lines];
        const i = lines.findIndex((l) => sameLine(l, slug, size));
        if (i >= 0) {
          lines[i] = { ...lines[i], qty: lines[i].qty + 1 };
        } else {
          lines.push({ slug, size, qty: 1 });
        }
        set({ lines });
      },
      setQty: (slug, qty, size) => {
        if (qty <= 0) {
          set({ lines: get().lines.filter((l) => !sameLine(l, slug, size)) });
          return;
        }
        set({
          lines: get().lines.map((l) =>
            sameLine(l, slug, size) ? { ...l, qty } : l,
          ),
        });
      },
      remove: (slug, size) =>
        set({ lines: get().lines.filter((l) => !sameLine(l, slug, size)) }),
      clear: () => set({ lines: [] }),
    }),
    { name: "after-hours-cart" },
  ),
);

export function cartCount(lines: CartLine[]) {
  return lines.reduce((n, l) => n + l.qty, 0);
}
