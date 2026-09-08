import type { Category } from "@/lib/catalog";

export type ShopSearch = {
  category?: Category | "all";
  q?: string;
};

export function parseShopSearch(s: Record<string, unknown>): ShopSearch {
  const category = s.category;
  const known =
    category === "street" || category === "hats" || category === "vault" || category === "all";
  return {
    ...(known ? { category } : {}),
    ...(typeof s.q === "string" && s.q.trim() ? { q: s.q } : {}),
  };
}
