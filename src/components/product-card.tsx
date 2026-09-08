import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/catalog";
import { formatUsd } from "@/lib/utils";

function badgeVariant(label: string) {
  if (label === "Chase" || label === "Grail" || label === "Enchanted") return "brand" as const;
  if (label === "Featured" || label === "House") return "gold" as const;
  if (label === "New") return "accent" as const;
  return "outline" as const;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/product/$slug"
      params={{ slug: product.slug }}
      className="group block bg-surface p-2 shadow-[var(--shadow-border)] transition-[box-shadow] duration-200 ease-out hover:shadow-[var(--shadow-border-hover)]"
    >
      <div className="relative overflow-hidden bg-elevated">
        <img
          src={product.image}
          alt={product.alt}
          className="img-flush aspect-portrait w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.badges.slice(0, 2).map((b) => (
            <Badge key={b} variant={badgeVariant(b)}>
              {b}
            </Badge>
          ))}
        </div>
        {product.stock === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center bg-bg/60 text-kicker tracking-kicker text-fg uppercase">
            Held
          </div>
        ) : null}
      </div>
      <div className="px-3 pt-5 pb-4">
        <p className="text-micro tracking-kicker text-muted uppercase">{product.brand}</p>
        <h3 className="font-display mt-2 text-2xl leading-snug text-fg">{product.name}</h3>
        <p className="mt-3 text-sm tabular-nums tracking-wide text-gold">
          {formatUsd(product.price)}
          {product.compareAt ? (
            <span className="ml-2 text-subtle line-through">{formatUsd(product.compareAt)}</span>
          ) : null}
        </p>
      </div>
    </Link>
  );
}
