import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useInquiries } from "@/lib/inquiries-store";

export const Route = createFileRoute("/trade")({ component: Trade });

const KINDS = [
  { id: "sell", label: "Sell to the house" },
  { id: "trade", label: "Trade" },
  { id: "both", label: "Either" },
] as const;

function Trade() {
  const add = useInquiries((s) => s.add);
  const [kind, setKind] = useState<(typeof KINDS)[number]["id"]>("trade");
  const [form, setForm] = useState({
    name: "",
    email: "",
    item: "",
    asking: "",
    want: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.item.trim()) {
      toast("Name, email, and what you have.");
      return;
    }
    add({
      kind: "trade",
      name: form.name.trim(),
      email: form.email.trim(),
      message: [
        `Intent: ${kind}`,
        `Item: ${form.item}`,
        form.asking ? `Asking: ${form.asking}` : "",
        form.want ? `Looking for: ${form.want}` : "",
        form.message,
      ]
        .filter(Boolean)
        .join("\n"),
    });
    setSent(true);
    toast("Ticket received. The house will look tonight.");
  }

  if (sent) {
    return (
      <section className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="text-[11px] tracking-[0.22em] text-muted uppercase">Received</p>
        <h1 className="font-display mt-3 text-5xl">We’ll look at it tonight.</h1>
        <p className="mt-4 text-muted">
          Three J’s, after the day. If it’s a fit, you’ll get a number or a counter-piece.
        </p>
        <Button className="mt-8" onClick={() => setSent(false)}>
          Send another
        </Button>
      </section>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-20">
      <div>
        <p className="text-kicker tracking-kicker text-muted uppercase">The back door</p>
        <h1 className="font-display mt-3 text-5xl sm:text-6xl">Bring a piece.</h1>
        <p className="mt-5 leading-relaxed text-muted">
          Chase Funkos, graded Pokémon, Lorcana, Dandy / Barbas / 31 / Gallo Fino full sets, BAPE, Palm Angels, Coach. If it belongs under glass, the house wants the first look.
        </p>
        <ul className="mt-10 space-y-5 text-sm">
          <li>
            <p className="font-medium text-fg">1. Present the piece</p>
            <p className="mt-1 text-muted">Brand, year, size, grade, whether it is a full set or slabbed.</p>
          </li>
          <li>
            <p className="font-medium text-fg">2. The house looks</p>
            <p className="mt-1 text-muted">Father and sons. We answer with a number or a pass — never a shrug.</p>
          </li>
          <li>
            <p className="font-medium text-fg">3. Cash, trade, or a mix</p>
            <p className="mt-1 text-muted">Montrose pickup keeps it clean. We ship when the piece earns the crate.</p>
          </li>
        </ul>
      </div>

      <form
        onSubmit={onSubmit}
        className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-border)] sm:p-8"
      >
        <div className="flex flex-wrap gap-2">
          {KINDS.map((k) => (
            <button
              key={k.id}
              type="button"
              onClick={() => setKind(k.id)}
              className={`h-10 rounded-md px-3 text-xs font-medium tracking-[0.12em] uppercase transition-colors duration-150 ${
                kind === k.id
                  ? "bg-accent text-accent-fg"
                  : "border border-border text-muted hover:text-fg"
              }`}
            >
              {k.label}
            </button>
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              className="mt-1.5"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              className="mt-1.5"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <Label htmlFor="item">What you have</Label>
          <Input
            id="item"
            className="mt-1.5"
            placeholder="e.g. Dandy El Mago full set, PSA 10 Charizard…"
            value={form.item}
            onChange={(e) => setForm({ ...form, item: e.target.value })}
            required
          />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="asking">Asking (optional)</Label>
            <Input
              id="asking"
              className="mt-1.5"
              placeholder="$"
              value={form.asking}
              onChange={(e) => setForm({ ...form, asking: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="want">Want from the floor (optional)</Label>
            <Input
              id="want"
              className="mt-1.5"
              placeholder="El Mago, Chase chrome, PSA Charizard…"
              value={form.want}
              onChange={(e) => setForm({ ...form, want: e.target.value })}
            />
          </div>
        </div>
        <div className="mt-4">
          <Label htmlFor="message">Notes</Label>
          <Textarea
            id="message"
            className="mt-1.5"
            placeholder="Condition, photos you’ll send, Montrose vs ship."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </div>
        <Button type="submit" className="mt-6 w-full">
          Send to the house
        </Button>
        <p className="mt-3 text-xs text-subtle">
          This is a ticket, not a listing. We’ll reply with a number or a pass.
        </p>
      </form>
    </div>
  );
}
