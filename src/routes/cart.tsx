import { useMemo, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { HOUSE } from "@/lib/brand";
import { cartCount, useCart } from "@/lib/cart-store";
import { useFloor } from "@/lib/floor";
import { useInquiries } from "@/lib/inquiries-store";
import { useHydrated } from "@/lib/use-hydrated";
import { formatUsd } from "@/lib/utils";

export const Route = createFileRoute("/cart")({ component: CartPage });

function CartPage() {
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const addInquiry = useInquiries((s) => s.add);
  const hydrated = useHydrated();
  const floor = useFloor();
  const [form, setForm] = useState({
    name: "",
    email: "",
    method: "pickup" as "pickup" | "ship",
    note: "",
  });
  const [sent, setSent] = useState(false);

  const rows = useMemo(
    () =>
      lines
        .map((line) => {
          const product = floor.find((p) => p.slug === line.slug);
          return product ? { line, product } : null;
        })
        .filter((r): r is NonNullable<typeof r> => r !== null),
    [lines, floor],
  );

  const total = rows.reduce((n, r) => n + r.product.price * r.line.qty, 0);
  const count = cartCount(lines);

  if (!hydrated) {
    return (
      <section className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="text-sm text-muted">Opening the bag…</p>
      </section>
    );
  }

  function requestBag(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast("Name and email so we can confirm.");
      return;
    }
    addInquiry({
      kind: "order",
      name: form.name.trim(),
      email: form.email.trim(),
      message: [
        `Fulfillment: ${form.method === "pickup" ? "Montrose pickup" : "Insured ship"}`,
        form.note,
        "",
        ...rows.map(
          (r) =>
            `${r.product.brand} — ${r.product.name}${r.line.size ? ` (${r.line.size})` : ""} × ${r.line.qty} · ${formatUsd(r.product.price)}`,
        ),
        `Total ${formatUsd(total)}`,
      ]
        .filter((x) => x !== undefined)
        .join("\n"),
      amount: total,
    });
    clear();
    setSent(true);
    toast("Request in. We’ll confirm the hold.");
  }

  if (sent) {
    return (
      <section className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="text-[11px] tracking-[0.22em] text-muted uppercase">Hold requested</p>
        <h1 className="font-display mt-3 text-5xl">It’s with the house.</h1>
        <p className="mt-4 text-muted">
          We’ll confirm availability and a number. {HOUSE.city} pickup is fastest; we ship the pieces that deserve it.
        </p>
        <Button asChild className="mt-8">
          <Link to="/shop" search={{ category: "all" }}>
            Keep looking
          </Link>
        </Button>
      </section>
    );
  }

  if (rows.length === 0) {
    return (
      <section className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="text-[11px] tracking-[0.22em] text-muted uppercase">Bag</p>
        <h1 className="font-display mt-3 text-5xl">Empty, for now.</h1>
        <p className="mt-4 text-muted">The floor is open. Street, gorras, vault.</p>
        <Button asChild className="mt-8">
          <Link to="/shop" search={{ category: "all" }}>
            Shop the house
          </Link>
        </Button>
      </section>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:py-16">
      <div>
        <p className="text-[11px] tracking-[0.22em] text-muted uppercase">Bag</p>
        <h1 className="font-display mt-2 text-4xl sm:text-5xl">
          {count} {count === 1 ? "piece" : "pieces"}
        </h1>
        <ul className="mt-8 divide-y divide-border border-y border-border">
          {rows.map(({ line, product }) => (
            <li key={`${line.slug}-${line.size ?? ""}`} className="flex gap-4 py-5">
              <Link
                to="/product/$slug"
                params={{ slug: product.slug }}
                className="size-24 shrink-0 overflow-hidden rounded-lg bg-elevated"
              >
                <img src={product.image} alt={product.alt} className="img-flush size-full object-cover" />
              </Link>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] tracking-[0.16em] text-muted uppercase">{product.brand}</p>
                <Link to="/product/$slug" params={{ slug: product.slug }} className="font-display text-xl">
                  {product.name}
                </Link>
                {line.size ? <p className="text-sm text-muted">Size {line.size}</p> : null}
                <p className="mt-1 text-sm tabular-nums">{formatUsd(product.price)}</p>
                <div className="mt-3 flex items-center gap-3">
                  <label className="sr-only" htmlFor={`qty-${line.slug}`}>
                    Quantity
                  </label>
                  <select
                    id={`qty-${line.slug}`}
                    value={line.qty}
                    onChange={(e) => setQty(line.slug, Number(e.target.value), line.size)}
                    className="h-10 rounded-md border border-border bg-elevated px-2 text-sm"
                  >
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="text-xs text-muted underline-offset-4 hover:text-fg hover:underline"
                    onClick={() => remove(line.slug, line.size)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <form
        onSubmit={requestBag}
        className="h-fit rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-border)]"
      >
        <h2 className="font-display text-2xl">Request this hold</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          We confirm by message. No surprise charges. Total {formatUsd(total)}.
        </p>
        <p className="mt-4 text-3xl tabular-nums">{formatUsd(total)}</p>
        <div className="mt-6 space-y-3">
          <div>
            <Label htmlFor="cart-name">Name</Label>
            <Input
              id="cart-name"
              className="mt-1.5"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="cart-email">Email</Label>
            <Input
              id="cart-email"
              type="email"
              className="mt-1.5"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div>
            <p className="text-xs font-medium tracking-wide text-muted">How you want it</p>
            <div className="mt-2 flex gap-2">
              {(["pickup", "ship"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setForm({ ...form, method: m })}
                  className={`h-10 flex-1 rounded-md text-xs font-medium tracking-[0.12em] uppercase ${
                    form.method === m
                      ? "bg-accent text-accent-fg"
                      : "border border-border text-muted"
                  }`}
                >
                  {m === "pickup" ? "Montrose pickup" : "Ship"}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="cart-note">Note</Label>
            <Textarea
              id="cart-note"
              className="mt-1.5"
              placeholder="When you can pick up, or a shipping address."
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
            />
          </div>
        </div>
        <Button type="submit" className="mt-6 w-full">
          Request hold
        </Button>
      </form>
    </div>
  );
}
