import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/product-card";
import { Input } from "@/components/ui/input";
import { CATEGORIES } from "@/lib/catalog";
import { useFloor } from "@/lib/floor";
import { parseShopSearch } from "@/lib/shop-search";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/shop")({
  validateSearch: parseShopSearch,
  component: Shop,
});

type Sort = "featured" | "price-asc" | "price-desc";

function Shop() {
  const { category = "all", q } = Route.useSearch();
  const navigate = Route.useNavigate();
  const floor = useFloor();
  const [sort, setSort] = useState<Sort>("featured");
  const [draft, setDraft] = useState(q ?? "");

  const items = useMemo(() => {
    let list = floor.slice();
    if (category && category !== "all") {
      list = list.filter((p) => p.category === category);
    }
    if (q) {
      const needle = q.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(needle) ||
          p.brand.toLowerCase().includes(needle) ||
          p.badges.some((b) => b.toLowerCase().includes(needle)) ||
          p.description.toLowerCase().includes(needle),
      );
    }
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "featured") {
      list.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
    }
    return list;
  }, [category, q, sort, floor]);

  const active = CATEGORIES.find((c) => c.id === category) ?? CATEGORIES[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-kicker tracking-kicker text-gold uppercase">The floor</p>
      <h1 className="font-display mt-3 text-5xl sm:text-6xl">{active.label}</h1>
      <p className="mt-4 max-w-lg text-muted leading-relaxed">{active.blurb}</p>

      <div className="mt-8 flex flex-col gap-4 border-y border-border py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              to="/shop"
              search={{ category: c.id, q }}
              className={cn(
                "inline-flex h-11 items-center rounded-md px-4 text-xs font-medium tracking-kicker uppercase transition-colors duration-150",
                c.id === active.id
                  ? "bg-gold text-gold-fg"
                  : "border border-border text-muted hover:text-fg",
              )}
            >
              {c.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <form
            className="sm:w-56"
            onSubmit={(e) => {
              e.preventDefault();
              const next = draft.trim();
              navigate({
                to: "/shop",
                search: { category, q: next || undefined },
              });
            }}
          >
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const next = draft.trim();
                  navigate({
                    to: "/shop",
                    search: { category, q: next || undefined },
                  });
                }
              }}
              placeholder="Filter pieces"
              aria-label="Filter pieces"
            />
          </form>
          <label className="sr-only" htmlFor="sort">
            Sort
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="h-11 rounded-md border border-border bg-elevated px-3 text-sm text-fg"
          >
            <option value="featured">Featured</option>
            <option value="price-desc">Price · high</option>
            <option value="price-asc">Price · low</option>
          </select>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="py-20 text-center">
          <h2 className="font-display text-3xl">Nothing confirmed on the floor.</h2>
          <p className="mt-2 text-muted">Try another room — or if you’re the house, confirm a scan in the backroom.</p>
          <Link to="/trade" className="mt-6 inline-block text-sm text-accent underline-offset-4 hover:underline">
            Send a want-list
          </Link>
        </div>
      ) : (
        <>
          <p className="mt-6 text-xs tabular-nums text-subtle">{items.length} pieces</p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
