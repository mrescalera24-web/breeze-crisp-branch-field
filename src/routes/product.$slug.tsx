import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { ProductCard } from "@/components/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/lib/cart-store";
import { getProduct } from "@/lib/catalog";
import { useFloor, useFloorProduct } from "@/lib/floor";
import { useInquiries } from "@/lib/inquiries-store";
import { formatUsd } from "@/lib/utils";

export const Route = createFileRoute("/product/$slug")({
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const product = useFloorProduct(slug);
  const floor = useFloor();
  const raw = getProduct(slug);
  const add = useCart((s) => s.add);
  const addInquiry = useInquiries((s) => s.add);
  const [size, setSize] = useState(product?.sizes?.[0] ?? "");
  const [offerOpen, setOfferOpen] = useState(false);
  const [offer, setOffer] = useState({ name: "", email: "", amount: "", note: "" });

  if (!product) {
    return (
      <section className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl">
          {raw ? "Held in the backroom." : "Piece not on the floor."}
        </h1>
        <p className="mt-3 text-muted">
          {raw
            ? "This crown is scanned, but the house hasn’t confirmed it live. Ask, or check Gorras."
            : "It may have moved. Check the shop, or send a want-list."}
        </p>
        <Button asChild className="mt-6">
          <Link to="/shop" search={{ category: "all" }}>
            Back to shop
          </Link>
        </Button>
      </section>
    );
  }

  const item = product;
  const related = floor.filter((p) => p.slug !== item.slug && p.category === item.category).slice(0, 4);

  function addToBag() {
    if (item.sizes && !size) {
      toast("Choose a size first.");
      return;
    }
    add(item.slug, item.sizes ? size : undefined);
    toast(`Added — ${item.name}`);
  }

  function submitOffer(e: FormEvent) {
    e.preventDefault();
    const amount = Number(offer.amount);
    if (!offer.name.trim() || !offer.email.trim() || !amount) {
      toast("Name, email, and an amount.");
      return;
    }
    addInquiry({
      kind: "offer",
      name: offer.name.trim(),
      email: offer.email.trim(),
      message: offer.note.trim(),
      slug: item.slug,
      amount,
    });
    setOfferOpen(false);
    toast("Offer received. The house will reply.");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs text-subtle">
        <Link to="/shop" search={{ category: product.category }} className="hover:text-fg">
          {product.category === "hats" ? "Gorras" : product.category === "vault" ? "Vault" : "Street"}
        </Link>
        <span className="mx-2">/</span>
        {product.brand}
      </p>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="overflow-hidden rounded-2xl bg-surface p-2 shadow-[var(--shadow-border)]">
          <img
            src={product.image}
            alt={product.alt}
            className="img-flush aspect-portrait w-full rounded-xl object-cover"
          />
        </div>

        <div>
          <div className="flex flex-wrap gap-1.5">
            {product.badges.map((b) => (
              <Badge
                key={b}
                variant={b === "Chase" || b === "Grail" || b === "Enchanted" ? "brand" : "outline"}
              >
                {b}
              </Badge>
            ))}
          </div>
          <p className="mt-4 text-kicker tracking-kicker text-muted uppercase">{product.brand}</p>
          <h1 className="font-display mt-3 text-4xl sm:text-6xl">{product.name}</h1>
          <p className="mt-5 font-display text-4xl tabular-nums text-gold">
            {formatUsd(product.price)}
            {product.compareAt ? (
              <span className="ml-3 text-xl text-subtle line-through">
                {formatUsd(product.compareAt)}
              </span>
            ) : null}
          </p>
          <p className="mt-3 text-sm text-muted">
            {product.condition}
            {product.grade ? ` · ${product.grade}` : null}
            {product.stock === 1 ? " · Last one in the house" : ` · ${product.stock} in house`}
          </p>
          <p className="mt-6 leading-relaxed text-muted">{product.description}</p>
          <ul className="mt-5 space-y-2 text-sm text-fg">
            {product.details.map((d) => (
              <li key={d} className="flex gap-2">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-brand" />
                {d}
              </li>
            ))}
          </ul>

          {product.sizes ? (
            <div className="mt-8">
              <p className="text-xs tracking-[0.16em] text-muted uppercase">Size</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`h-11 min-w-11 rounded-md px-3 text-sm transition-colors duration-150 ${
                      size === s
                        ? "bg-accent text-accent-fg"
                        : "border border-border text-fg hover:bg-elevated"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button className="flex-1" onClick={addToBag} disabled={product.stock === 0}>
              {product.stock === 0 ? "Held" : "Hold this piece"}
            </Button>
            {product.tradeable ? (
              <Button variant="outline" className="flex-1" onClick={() => setOfferOpen(true)}>
                Make an offer
              </Button>
            ) : (
              <Button variant="outline" className="flex-1" asChild>
                <Link to="/trade">Ask the house</Link>
              </Button>
            )}
          </div>
          <p className="mt-5 text-xs leading-relaxed text-subtle">
            Authenticated and photographed in-house. Request a hold — we confirm by message. Montrose pickup or insured ship.
          </p>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-20">
          <h2 className="font-display text-3xl">From the same room</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      ) : null}

      <Dialog open={offerOpen} onOpenChange={setOfferOpen}>
        <DialogContent>
          <DialogTitle>Offer on {product.name}</DialogTitle>
          <DialogDescription>
            Serious numbers only. We’ll come back after hours with a yes, a no, or a counter.
          </DialogDescription>
          <form className="mt-6 flex flex-col gap-3" onSubmit={submitOffer}>
            <div>
              <Label htmlFor="offer-name">Name</Label>
              <Input
                id="offer-name"
                className="mt-1.5"
                value={offer.name}
                onChange={(e) => setOffer({ ...offer, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="offer-email">Email</Label>
              <Input
                id="offer-email"
                type="email"
                className="mt-1.5"
                value={offer.email}
                onChange={(e) => setOffer({ ...offer, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="offer-amount">Your number (USD)</Label>
              <Input
                id="offer-amount"
                type="number"
                min={1}
                className="mt-1.5"
                value={offer.amount}
                onChange={(e) => setOffer({ ...offer, amount: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="offer-note">Note</Label>
              <Textarea
                id="offer-note"
                className="mt-1.5"
                value={offer.note}
                onChange={(e) => setOffer({ ...offer, note: e.target.value })}
                placeholder="Pickup in Montrose? Trade on top?"
              />
            </div>
            <Button type="submit" className="mt-2">
              Send offer
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
