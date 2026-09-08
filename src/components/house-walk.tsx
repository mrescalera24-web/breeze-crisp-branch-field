import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { HouseLockup } from "@/components/house-lockup";
import { Wordmark } from "@/components/site-header";
import { SoundToggle } from "@/components/sound-toggle";
import { Atmosphere } from "@/components/atmosphere";
import { Button } from "@/components/ui/button";
import { useFloor } from "@/lib/floor";
import { STOPS, nearestStop, transformFor } from "@/lib/walk";
import { cartCount, useCart } from "@/lib/cart-store";
import { formatUsd } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import type { FloorProduct } from "@/lib/floor";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function StallPieces({ products }: { products: FloorProduct[] }) {
  if (!products.length) return null;
  return (
    <div className="mt-8 flex gap-3 overflow-x-auto">
      {products.slice(0, 3).map((p) => (
        <Link
          key={p.slug}
          to="/product/$slug"
          params={{ slug: p.slug }}
          className="glow-gold w-28 shrink-0 bg-bg/50 p-1"
        >
          <img src={p.image} alt={p.alt} className="img-flush aspect-portrait w-full object-cover" />
          <p className="mt-2 truncate px-1 text-micro tracking-kicker text-gold uppercase">{p.name}</p>
          <p className="px-1 pb-1 text-xs tabular-nums text-fg">{formatUsd(p.price)}</p>
        </Link>
      ))}
    </div>
  );
}

function Cell({
  x,
  y,
  scene,
  alt,
  veil = "heavy",
  children,
}: {
  x: string;
  y: string;
  scene: string;
  alt: string;
  veil?: "heavy" | "soft";
  children: ReactNode;
}) {
  return (
    <section className="walk-cell" style={{ left: x, top: y }}>
      <img src={scene} alt={alt} className="img-flush absolute inset-0 size-full object-cover" />
      {veil === "heavy" ? (
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
      ) : (
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-bg/90 to-transparent" />
      )}
      <div className="relative flex h-full flex-col justify-end px-6 pb-16 sm:px-12 sm:pb-20">{children}</div>
    </section>
  );
}

export function HouseWalk() {
  const pinRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const wrapping = useRef(false);
  const reduced = useReducedMotion();
  const [stop, setStop] = useState(0);
  const floor = useFloor();
  const lines = useCart((s) => s.lines);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const hats = floor.filter((p) => p.category === "hats");
  const street = floor.filter((p) => p.category === "street");
  const vault = floor.filter((p) => p.category === "vault");

  useEffect(() => {
    document.documentElement.classList.add("walk-lock");
    return () => document.documentElement.classList.remove("walk-lock");
  }, []);

  useEffect(() => {
    if (reduced) return;
    const pin = pinRef.current;
    const world = worldRef.current;
    if (!pin || !world) return;

    let frame = 0;
    const apply = () => {
      const max = pin.offsetHeight - window.innerHeight;
      if (max <= 0) return;
      let local = window.scrollY - pin.offsetTop;
      if (local >= max - 4) {
        if (!wrapping.current) {
          wrapping.current = true;
          window.scrollTo({ top: pin.offsetTop + 1, left: 0, behavior: "instant" });
          local = 1;
        }
      } else {
        wrapping.current = false;
      }
      const progress = Math.min(1, Math.max(0, local / max));
      world.style.transform = transformFor(progress);
      const next = nearestStop(progress);
      setStop((s) => (s === next ? s : next));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        apply();
      });
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  const count = mounted ? cartCount(lines) : 0;
  const label = STOPS[stop]?.label ?? "La Casa";

  return (
    <div>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 py-4 sm:px-6">
        <div className="pointer-events-auto rounded-sm bg-bg/70 px-3 py-2 backdrop-blur-sm">
          <Wordmark compact />
        </div>
        <div className="pointer-events-auto flex items-center gap-2">
          <p className="hidden text-kicker tracking-kicker text-gold uppercase sm:block">{label}</p>
          <SoundToggle />
          <Link
            to="/shop"
            search={{ category: "all" }}
            className="inline-flex h-10 items-center rounded-sm border border-border bg-bg/70 px-3 text-micro tracking-kicker text-fg uppercase backdrop-blur-sm"
          >
            Shop
          </Link>
          <Link
            to="/cart"
            className="relative inline-flex size-10 items-center justify-center rounded-sm border border-border bg-bg/70 text-fg backdrop-blur-sm"
            aria-label={count === 1 ? "Bag, 1 item" : `Bag, ${count} items`}
          >
            <ShoppingBag className="size-4" />
            {count > 0 ? (
              <span className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-gold text-[10px] font-medium text-gold-fg tabular-nums">
                {count}
              </span>
            ) : null}
          </Link>
        </div>
      </div>

      <div ref={pinRef} className="walk-pin">
        <div className="walk-sticky">
          <Atmosphere reduced={reduced} />
          <div ref={worldRef} className="walk-world">
            <Cell x="0" y="0" scene="/scenes/pedestal.jpg" alt="Exclusive one-of-one on the pedestal">
              <HouseLockup />
              <p className="mt-8 text-kicker tracking-kicker text-muted uppercase">Scroll the house</p>
            </Cell>

            <Cell x="0" y="100dvh" scene="/scenes/mural.jpg" alt="The wall — street mural">
              <p className="text-kicker tracking-kicker text-gold uppercase">The wall</p>
              <h2 className="font-display mt-3 max-w-xl text-5xl sm:text-7xl">Not on the internet.</h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-fg/85">
                What sits in this house isn’t sitting in a mall. Keep going — the floor opens left.
              </p>
            </Cell>

            <Cell
              x="100vw"
              y="100dvh"
              scene="/scenes/altar.jpg"
              alt="The chamber — velvet, gold, smoke"
              veil="soft"
            >
              <p className="text-kicker tracking-kicker text-gold uppercase">The chamber</p>
              <h2 className="font-display mt-3 text-5xl sm:text-6xl">Private floor.</h2>
              <p className="mt-3 max-w-md text-sm text-fg/85">
                Members energy. Pieces that don’t restock. If you know, you already wanted it.
              </p>
            </Cell>

            <Cell x="200vw" y="100dvh" scene="/scenes/hat-box.jpg" alt="Gorras — scanned crowns">
              <p className="text-kicker tracking-kicker text-gold uppercase">Left stall · Gorras</p>
              <h2 className="font-display mt-3 text-5xl sm:text-6xl">The crowns.</h2>
              <p className="mt-4 max-w-md text-sm text-fg/85">
                Scanned in-house. One on the book means one on the floor. You can’t order this from a feed.
              </p>
              <StallPieces products={hats} />
              <Button asChild className="mt-8 w-fit">
                <Link to="/shop" search={{ category: "hats" }}>
                  Hold a crown
                </Link>
              </Button>
            </Cell>

            <Cell x="300vw" y="100dvh" scene="/scenes/gold.jpg" alt="Street — gold, cloth, ice">
              <p className="text-kicker tracking-kicker text-gold uppercase">Right stall · Street</p>
              <h2 className="font-display mt-3 text-5xl sm:text-6xl">The rack.</h2>
              <p className="mt-4 max-w-md text-sm text-fg/85">
                Authenticated cloth. Deadstock and excellent. What you wear when they already know.
              </p>
              <StallPieces products={street} />
              <Button asChild className="mt-8 w-fit">
                <Link to="/shop" search={{ category: "street" }}>
                  The rack
                </Link>
              </Button>
            </Cell>

            <Cell x="200vw" y="200dvh" scene="/scenes/vault.jpg" alt="The vault">
              <p className="text-kicker tracking-kicker text-gold uppercase">The fourth room</p>
              <h2 className="font-display mt-3 text-5xl sm:text-6xl">The vault.</h2>
              <p className="mt-4 max-w-md text-sm text-fg/85">
                Chases. Slabs. The book. Locked until somebody’s serious.
              </p>
              <StallPieces products={vault} />
              <Button asChild className="mt-8 w-fit">
                <Link to="/shop" search={{ category: "vault" }}>
                  Open the vault
                </Link>
              </Button>
            </Cell>

            <Cell x="0" y="200dvh" scene="/scenes/pedestal.jpg" alt="Back at the door">
              <HouseLockup />
              <p className="mt-8 text-kicker tracking-kicker text-muted uppercase">Keep scrolling — the house loops</p>
            </Cell>
          </div>
        </div>
      </div>
    </div>
  );
}
