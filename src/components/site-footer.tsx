import { Link } from "@tanstack/react-router";
import { HOUSE } from "@/lib/brand";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="lockup-kicker text-micro text-gold uppercase">
            {HOUSE.house}
          </p>
          <p className="font-display mt-1 text-3xl text-fg">{HOUSE.short}</p>
          <p className="mt-3 max-w-xs text-sm text-muted">{HOUSE.creed}</p>
          <p className="mt-1 text-sm text-muted">{HOUSE.raza} {HOUSE.tagline}</p>
          <p className="mt-2 text-sm text-subtle">{HOUSE.city}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <p className="text-micro font-medium tracking-kicker text-muted uppercase">Rooms</p>
          <Link to="/shop" search={{ category: "street" }} className="text-fg hover:text-gold">
            Street — BAPE, Palm Angels, Coach
          </Link>
          <Link to="/shop" search={{ category: "hats" }} className="text-fg hover:text-gold">
            Gorras — scanned Dandy, Son of God
          </Link>
          <Link to="/shop" search={{ category: "vault" }} className="text-fg hover:text-gold">
            Vault — Chase, Pokémon, Lorcana
          </Link>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <p className="text-micro font-medium tracking-kicker text-muted uppercase">House</p>
          <Link to="/trade" className="text-fg hover:text-gold">
            Sell or trade
          </Link>
          <Link to="/about" className="text-fg hover:text-gold">
            The family
          </Link>
          <Link to="/backroom" className="text-fg hover:text-gold">
            Backroom
          </Link>
          <p className="mt-4 text-xs leading-relaxed text-subtle">
            Authenticated drip. Montrose pickup or insured ship. Private offers and trades.
          </p>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-subtle sm:px-6">
          © {new Date().getFullYear()} {HOUSE.name}. {HOUSE.creed} {HOUSE.raza} From G’s to Gents.
        </p>
      </div>
    </footer>
  );
}
