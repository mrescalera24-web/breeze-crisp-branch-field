import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { HOUSE } from "@/lib/brand";

export const Route = createFileRoute("/about")({ component: About });

function About() {
  return (
    <div>
      <section className="relative min-h-[58vh] overflow-hidden">
        <img
          src="/scenes/salon.jpg"
          alt="La Casa TripleJ — the salon"
          className="img-flush absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/55 to-bg/30" />
        <div className="relative mx-auto flex min-h-[58vh] max-w-6xl flex-col justify-end px-4 pb-14 sm:px-6">
          <p className="text-kicker tracking-kicker text-gold uppercase">The house</p>
          <h1 className="font-display mt-4 max-w-3xl text-5xl sm:text-7xl">
            You won’t <span className="neon-gold">find it twice.</span>
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="font-display text-2xl leading-snug text-fg sm:text-3xl">
          A father and two sons. Every name starts with J. We didn’t inherit a boutique — we built a private floor for pieces that don’t sit on every site.
        </p>
        <div className="mt-10 space-y-5 text-muted leading-relaxed">
          <p>
            {HOUSE.name} is a {HOUSE.city} house for scanned gorras, authenticated street, and vault grails. Dandy full sets when they’re on the book. El Mago, El Jefe, The Don, The Boss. If it isn’t scanned, it isn’t for sale.
          </p>
          <p>
            In the back: the vault. Chase vinyls, graded Pokémon, graded Lorcana. If it hits at a real number, it sits like it belongs. We don’t undercut the work. We don’t cheapen the room.
          </p>
          <p>
            You request a piece, we confirm the hold, you pull up in {HOUSE.city} or we ship it quiet. {HOUSE.creed}
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-px bg-border sm:grid-cols-3">
          {[
            { k: "Street", v: "BAPE, Palm Angels, Coach — deadstock and excellent. What you wear when you pull up." },
            { k: "Gorras", v: "Scanned and confirmed only. El Mago, The Boss, Son of God, Only The Best. No ghosts." },
            { k: "Vault", v: "Star Wars vinyls in box. Chase pops. The Pokémon book. PSA and CGC slabs in the back." },
          ].map((col) => (
            <div key={col.k} className="bg-surface px-8 py-12">
              <h2 className="font-display text-3xl">{col.k}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">{col.v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-2xl bg-elevated px-6 py-16 sm:px-16 sm:text-center">
          <h2 className="font-display text-4xl sm:text-5xl">If you know, pull up.</h2>
          <p className="mx-auto mt-5 max-w-md text-muted leading-relaxed">
            {HOUSE.city}. Message the house. We look at every serious piece. We hold every serious bag.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link to="/shop" search={{ category: "all" }}>
                Step inside
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/trade">Bring a piece</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
