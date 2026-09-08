import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Link } from "@tanstack/react-router";
import { Wordmark } from "@/components/site-header";
import { SoundToggle } from "@/components/sound-toggle";
import { StorefrontScene } from "@/components/storefront-scene";
import { cartCount, useCart } from "@/lib/cart-store";
import { useDoor } from "@/lib/door";
import { useFloor, type FloorProduct } from "@/lib/floor";
import { ShoppingBag } from "lucide-react";

export function HouseGallery() {
  const floor = useFloor();
  const closed = useDoor((s) => s.closed);
  const add = useCart((s) => s.add);
  const lines = useCart((s) => s.lines);
  const [mounted, setMounted] = useState(false);
  const [hint, setHint] = useState(true);
  const [cam, setCam] = useState<"default" | "hats" | "collabs">("default");
  const [picked, setPicked] = useState<FloorProduct | null>(null);

  const hats = floor.filter((p) => p.category === "hats").slice(0, 3);
  const street = [
    ...floor.filter((p) => p.category === "street").slice(0, 2),
    ...floor.filter((p) => p.category === "hats").slice(3, 4),
  ];

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (closed) {
      document.documentElement.classList.remove("house-3d-lock");
      return;
    }
    document.documentElement.classList.add("house-3d-lock");
    return () => document.documentElement.classList.remove("house-3d-lock");
  }, [closed]);

  const count = mounted ? cartCount(lines) : 0;

  return (
    <div className="house-3d">
      {mounted ? (
        <Canvas
          camera={{ position: [0, 1.4, 4.5], fov: 50, near: 0.1, far: 80 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.12;
          }}
          shadows
          onPointerDown={() => setHint(false)}
        >
          <Suspense fallback={null}>
            <StorefrontScene
              hats={hats}
              street={street}
              selected={picked?.slug ?? null}
              onPick={setPicked}
              cam={cam}
            />
          </Suspense>
        </Canvas>
      ) : null}

      <div className="store-vignette" aria-hidden />
      <div className="store-glow store-glow-neon" aria-hidden />
      <div className="store-glow store-glow-shrine" aria-hidden />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between px-4 py-4 sm:px-6">
        <div className="pointer-events-auto rounded-sm bg-bg/70 px-3 py-2 backdrop-blur-sm">
          <Wordmark compact />
        </div>
        <div className="pointer-events-auto flex flex-wrap items-center justify-end gap-2">
          <button type="button" className="store-pill" onClick={() => setCam("default")}>
            Collections
          </button>
          <button type="button" className="store-pill" onClick={() => setCam("hats")}>
            Hat shop
          </button>
          <button type="button" className="store-pill" onClick={() => setCam("collabs")}>
            Street
          </button>
          <SoundToggle />
          <Link
            to="/shop"
            search={{ category: "all" }}
            className="store-pill"
          >
            Shop
          </Link>
          <Link
            to="/cart"
            className="relative inline-flex size-10 items-center justify-center rounded-full border border-gold/50 bg-bg/70 text-fg backdrop-blur-sm"
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

      {picked ? (
        <div className="store-tip">
          <p className="font-display text-lg text-fg">{picked.name}</p>
          <p className="mt-1 text-sm text-gold">${picked.price.toLocaleString()}</p>
          <div className="mt-3 flex gap-2">
            <Link
              to="/product/$slug"
              params={{ slug: picked.slug }}
              className="inline-flex h-9 flex-1 items-center justify-center rounded-sm border border-gold/50 text-kicker tracking-kicker text-fg uppercase"
            >
              View
            </Link>
            <button
              type="button"
              className="inline-flex h-9 flex-1 items-center justify-center rounded-sm bg-gold text-kicker tracking-kicker text-gold-fg uppercase"
              onClick={() => add(picked.slug)}
            >
              Add
            </button>
          </div>
        </div>
      ) : null}

      {hint && !closed ? (
        <p className="pointer-events-none absolute inset-x-0 bottom-10 z-20 text-center text-kicker tracking-kicker text-gold uppercase">
          Drag to look · tap a piece
        </p>
      ) : null}
    </div>
  );
}
