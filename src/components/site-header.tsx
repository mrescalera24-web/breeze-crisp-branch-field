import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { SoundToggle } from "@/components/sound-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { HOUSE } from "@/lib/brand";
import { cartCount, useCart } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/shop", label: "Shop", search: { category: "all" } },
  { to: "/shop", label: "Street", search: { category: "street" } },
  { to: "/shop", label: "Gorras", search: { category: "hats" } },
  { to: "/shop", label: "Vault", search: { category: "vault" } },
  { to: "/trade", label: "Trade" },
  { to: "/about", label: "The house" },
] as const;

function TripleMark({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("inline-flex items-end gap-0.5", className)}>
      <span className="block h-3.5 w-0.5 bg-gold shadow-[var(--shadow-neon)]" />
      <span className="block h-4 w-0.5 bg-accent shadow-[var(--shadow-aqua)]" />
      <span className="block h-2.5 w-0.5 bg-fg" />
    </span>
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3 text-fg">
      <TripleMark />
      <span className="flex flex-col leading-none">
        <span className="lockup-kicker text-micro text-gold uppercase">
          {HOUSE.house}
        </span>
        <span className={cn("font-display tracking-tight", compact ? "text-lg" : "text-xl sm:text-2xl")}>
          {HOUSE.short}
        </span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const search = useRouterState({ select: (s) => s.location.searchStr });
  const navigate = useNavigate();
  const lines = useCart((s) => s.lines);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => setOpen(false), [pathname, search]);

  const count = mounted ? cartCount(lines) : 0;

  function submitSearch(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    navigate({ to: "/shop", search: { category: "all", q: q || undefined } });
    setSearchOpen(false);
  }

  return (
    <header className="header-rule sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:h-[4.5rem] sm:px-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="size-5" />
          </Button>
          <Wordmark />
        </div>

        <nav className="hidden items-center gap-1 lg:flex">
          <Link
            to="/shop"
            search={{ category: "all" }}
            className="rounded-md px-3 py-2 text-xs font-medium tracking-[0.14em] text-muted uppercase transition-colors duration-150 hover:text-fg"
          >
            Shop
          </Link>
          <Link
            to="/shop"
            search={{ category: "street" }}
            className="rounded-md px-3 py-2 text-xs font-medium tracking-[0.14em] text-muted uppercase transition-colors duration-150 hover:text-fg"
          >
            Street
          </Link>
          <Link
            to="/shop"
            search={{ category: "hats" }}
            className="rounded-md px-3 py-2 text-xs font-medium tracking-[0.14em] text-muted uppercase transition-colors duration-150 hover:text-fg"
          >
            Gorras
          </Link>
          <Link
            to="/shop"
            search={{ category: "vault" }}
            className="rounded-md px-3 py-2 text-xs font-medium tracking-[0.14em] text-muted uppercase transition-colors duration-150 hover:text-fg"
          >
            Vault
          </Link>
          <Link
            to="/trade"
            className="rounded-md px-3 py-2 text-xs font-medium tracking-[0.14em] text-muted uppercase transition-colors duration-150 hover:text-fg"
          >
            Trade
          </Link>
          <Link
            to="/about"
            className="rounded-md px-3 py-2 text-xs font-medium tracking-[0.14em] text-muted uppercase transition-colors duration-150 hover:text-fg"
          >
            The house
          </Link>
        </nav>

        <div className="flex items-center gap-1">
          <SoundToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
          >
            <Search className="size-5" />
          </Button>
          <Link
            to="/cart"
            className="relative inline-flex size-11 items-center justify-center rounded-md text-fg transition-colors duration-150 hover:bg-elevated"
            aria-label={count === 1 ? "Bag, 1 item" : `Bag, ${count} items`}
          >
            <ShoppingBag className="size-5" />
            {count > 0 ? (
              <span className="absolute top-1.5 right-1.5 flex size-4 items-center justify-center rounded-full bg-brand text-[10px] font-medium text-brand-fg tabular-nums">
                {count}
              </span>
            ) : null}
          </Link>
        </div>
      </div>

      {searchOpen ? (
        <form
          onSubmit={submitSearch}
          className="mx-auto flex max-w-6xl items-center gap-2 border-t border-border px-4 py-3 sm:px-6"
        >
          <Search className="size-4 text-muted" />
          <Input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the collection — El Mago, BAPE, Charizard…"
            className="border-0 bg-transparent focus-visible:ring-0"
          />
        </form>
      ) : null}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="p-6 pt-14">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <Wordmark compact />
          <nav className="mt-8 flex flex-col gap-1">
            {NAV.map((item) =>
              item.to === "/shop" && "search" in item ? (
                <Link
                  key={item.label}
                  to="/shop"
                  search={item.search}
                  className="rounded-lg px-3 py-3 text-sm tracking-[0.12em] text-fg uppercase hover:bg-elevated"
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.label}
                  to={item.to}
                  className="rounded-lg px-3 py-3 text-sm tracking-[0.12em] text-fg uppercase hover:bg-elevated"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
          <p className="mt-auto pt-10 text-xs text-subtle">
            {HOUSE.creed} {HOUSE.raza}
          </p>
        </SheetContent>
      </Sheet>
    </header>
  );
}
