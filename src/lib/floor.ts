import { useMemo } from "react";
import { PRODUCTS, type Product } from "@/lib/catalog";
import { useInventory, type DeskStatus, type IncomingScan, type Overlay } from "@/lib/inventory-store";

export type FloorProduct = Product & {
  status: DeskStatus;
  incoming?: boolean;
};

function defaultStatus(p: Product): DeskStatus {
  if (p.category !== "hats") return "live";
  return p.scan ? "live" : "draft";
}

function applyOverlay(p: Product, overlay?: Overlay): FloorProduct {
  return {
    ...p,
    status: overlay?.status ?? defaultStatus(p),
    stock: overlay?.stock ?? p.stock,
    price: overlay?.price ?? p.price,
  };
}

function incomingToProduct(s: IncomingScan): FloorProduct {
  return {
    slug: `scan-${s.id}`,
    name: s.name,
    brand: s.brand,
    category: "hats",
    price: s.price,
    condition: "New",
    image: s.image,
    alt: `${s.name} — scanned in the backroom`,
    badges: s.status === "live" ? ["Scanned"] : ["Draft"],
    description: "Scanned in the backroom. Hits the floor only after the house confirms it.",
    details: ["Photographed in-house", `Scan: ${s.scanName}`],
    stock: s.stock,
    scan: s.scanName,
    status: s.status,
    incoming: true,
  };
}

export function buildDesk(overlays: Record<string, Overlay>, incoming: IncomingScan[]): FloorProduct[] {
  const seeded = PRODUCTS.filter((p) => p.category === "hats").map((p) => applyOverlay(p, overlays[p.slug]));
  return [...incoming.map(incomingToProduct), ...seeded];
}

export function buildFloor(overlays: Record<string, Overlay>, incoming: IncomingScan[]): FloorProduct[] {
  const seeded = PRODUCTS.map((p) => applyOverlay(p, overlays[p.slug]));
  const extras = incoming.filter((s) => s.status === "live").map(incomingToProduct);
  return [...seeded, ...extras].filter((p) => {
    if (p.stock <= 0) return false;
    if (p.category !== "hats") return true;
    return p.status === "live" && Boolean(p.scan);
  });
}

export function useFloor() {
  const overlays = useInventory((s) => s.overlays);
  const incoming = useInventory((s) => s.incoming);
  return useMemo(() => buildFloor(overlays, incoming), [overlays, incoming]);
}

export function useDesk() {
  const overlays = useInventory((s) => s.overlays);
  const incoming = useInventory((s) => s.incoming);
  return useMemo(() => buildDesk(overlays, incoming), [overlays, incoming]);
}

export function useFloorProduct(slug: string) {
  const floor = useFloor();
  return floor.find((p) => p.slug === slug);
}
