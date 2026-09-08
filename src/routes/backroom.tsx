import { useMemo, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HOUSE } from "@/lib/brand";
import { useDesk, type FloorProduct } from "@/lib/floor";
import { useInventory, type DeskStatus } from "@/lib/inventory-store";
import { useHydrated } from "@/lib/use-hydrated";
import { formatUsd } from "@/lib/utils";

export const Route = createFileRoute("/backroom")({ component: Backroom });

const HOUSE_KEY = "triplej";
const DOOR = "casa-desk-open";

function isOpen() {
  try {
    return sessionStorage.getItem(DOOR) === "1";
  } catch {
    return false;
  }
}

async function fileToJpeg(file: File) {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Could not read that photo."));
      el.src = url;
    });
    const max = 1200;
    const scale = Math.min(1, max / Math.max(img.width, img.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(img.width * scale));
    canvas.height = Math.max(1, Math.round(img.height * scale));
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("No canvas");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.82);
  } finally {
    URL.revokeObjectURL(url);
  }
}

function Backroom() {
  const hydrated = useHydrated();
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState("");

  if (!hydrated) {
    return (
      <section className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="text-sm text-muted">Opening the backroom…</p>
      </section>
    );
  }

  if (!open && !isOpen()) {
    return (
      <section className="mx-auto max-w-md px-4 py-24">
        <p className="text-kicker tracking-kicker text-gold uppercase">The desk</p>
        <h1 className="font-display mt-3 text-5xl">Backroom</h1>
        <p className="mt-4 text-muted leading-relaxed">
          Scans come in here. Nothing hits the floor until the house confirms it. House key — the three J’s.
        </p>
        <form
          className="mt-8 space-y-4"
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            if (key.trim().toLowerCase() !== HOUSE_KEY) {
              toast("Wrong key.");
              return;
            }
            sessionStorage.setItem(DOOR, "1");
            setOpen(true);
          }}
        >
          <Label htmlFor="house-key">House key</Label>
          <Input
            id="house-key"
            type="password"
            autoComplete="off"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="the three J’s"
          />
          <Button type="submit">Open the desk</Button>
        </form>
      </section>
    );
  }

  return <Desk />;
}

function Desk() {
  const rows = useDesk();
  const addIncoming = useInventory((s) => s.addIncoming);
  const [busy, setBusy] = useState(false);

  const counts = useMemo(() => {
    return {
      live: rows.filter((r) => r.status === "live" && r.stock > 0).length,
      hold: rows.filter((r) => r.status === "hold").length,
      sold: rows.filter((r) => r.status === "sold" || r.stock === 0).length,
      draft: rows.filter((r) => r.status === "draft").length,
    };
  }, [rows]);

  async function onFiles(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) continue;
        const image = await fileToJpeg(file);
        const stem = file.name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ");
        addIncoming({
          name: stem || "Untitled scan",
          brand: "Unconfirmed",
          price: 0,
          stock: 1,
          image,
          scanName: file.name,
        });
      }
      toast("Scan in. Name it, price it, then confirm.");
    } catch {
      toast("Couldn’t read that photo.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-kicker tracking-kicker text-gold uppercase">The desk · {HOUSE.city}</p>
      <h1 className="font-display mt-3 text-5xl sm:text-6xl">Backroom</h1>
      <p className="mt-4 max-w-xl text-muted leading-relaxed">
        Only scanned hats get a seat. Confirm a piece and it hits Gorras. Hold it and it disappears from the floor. No invented crowns.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ["Live", counts.live],
          ["Hold", counts.hold],
          ["Sold", counts.sold],
          ["Draft", counts.draft],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl bg-surface px-4 py-5 shadow-[var(--shadow-border)]">
            <p className="text-micro tracking-kicker text-muted uppercase">{k}</p>
            <p className="font-display mt-1 text-3xl tabular-nums text-gold">{v}</p>
          </div>
        ))}
      </div>

      <label className="mt-10 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface px-6 py-12 text-center">
        <p className="font-display text-2xl">Drop a scan</p>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Phone photo, case shot, crate shot. Lands as a draft until you confirm.
        </p>
        <input
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          disabled={busy}
          onChange={(e) => {
            void onFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <span className="mt-5 inline-flex h-11 items-center rounded-md bg-brand px-5 text-sm font-medium text-brand-fg">
          {busy ? "Reading…" : "Upload photos"}
        </span>
      </label>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((row) => (
          <DeskCard key={row.slug} row={row} />
        ))}
      </div>
    </div>
  );
}

function DeskCard({ row }: { row: FloorProduct }) {
  const setStatus = useInventory((s) => s.setStatus);
  const setStock = useInventory((s) => s.setStock);
  const setPrice = useInventory((s) => s.setPrice);
  const patchIncoming = useInventory((s) => s.patchIncoming);
  const dropIncoming = useInventory((s) => s.dropIncoming);
  const incomingId = row.incoming ? row.slug.replace(/^scan-/, "") : null;

  function status(next: DeskStatus) {
    if (incomingId) patchIncoming(incomingId, { status: next });
    else setStatus(row.slug, next);
  }

  return (
    <article className="rounded-2xl bg-surface p-2 shadow-[var(--shadow-border)]">
      <img src={row.image} alt={row.alt} className="img-flush aspect-portrait w-full rounded-xl object-cover" />
      <div className="px-3 pt-4 pb-3">
        <div className="flex flex-wrap gap-1.5">
          <Badge variant={row.status === "live" ? "gold" : row.status === "sold" ? "brand" : "outline"}>
            {row.status}
          </Badge>
          {row.scan ? <Badge variant="outline">Scan</Badge> : null}
        </div>
        {incomingId ? (
          <Input
            className="mt-3"
            value={row.name}
            onChange={(e) => patchIncoming(incomingId, { name: e.target.value })}
          />
        ) : (
          <h3 className="font-display mt-3 text-2xl leading-snug">{row.name}</h3>
        )}
        <p className="mt-1 text-micro tracking-kicker text-muted uppercase">{row.brand}</p>
        <p className="mt-1 truncate text-xs text-subtle">{row.scan ?? "No scan on file"}</p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div>
            <Label>Price</Label>
            <Input
              type="number"
              min={0}
              className="mt-1"
              value={row.price}
              onChange={(e) => {
                const n = Number(e.target.value);
                if (incomingId) patchIncoming(incomingId, { price: n });
                else setPrice(row.slug, n);
              }}
            />
          </div>
          <div>
            <Label>Stock</Label>
            <Input
              type="number"
              min={0}
              className="mt-1"
              value={row.stock}
              onChange={(e) => {
                const n = Number(e.target.value);
                if (incomingId) patchIncoming(incomingId, { stock: n });
                else setStock(row.slug, n);
              }}
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button size="sm" onClick={() => status("live")}>
            Confirm
          </Button>
          <Button size="sm" variant="outline" onClick={() => status("hold")}>
            Hold
          </Button>
          <Button size="sm" variant="ghost" onClick={() => status("sold")}>
            Sold
          </Button>
          {incomingId ? (
            <Button size="sm" variant="ghost" onClick={() => dropIncoming(incomingId)}>
              Drop
            </Button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
