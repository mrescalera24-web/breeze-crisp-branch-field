import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as HOUSE, s as Button } from "./router-CNbG_BNr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-DPD-vpFC.js
var import_jsx_runtime = require_jsx_runtime();
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative min-h-[58vh] overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/scenes/salon.jpg",
					alt: "La Casa TripleJ — the salon",
					className: "img-flush absolute inset-0 size-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-bg via-bg/55 to-bg/30" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto flex min-h-[58vh] max-w-6xl flex-col justify-end px-4 pb-14 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-kicker tracking-kicker text-gold uppercase",
						children: "The house"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "font-display mt-4 max-w-3xl text-5xl sm:text-7xl",
						children: ["Dios ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "neon-rojo",
							children: "sobre todo."
						})]
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl leading-snug text-fg sm:text-3xl",
				children: "A father and two sons. Every name starts with J. We didn’t inherit a boutique — we built a house. Neon on. God first. La raza in the blood."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 space-y-5 text-muted leading-relaxed",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						HOUSE.name,
						" is a ",
						HOUSE.city,
						" floor for the culture we actually live in. Mexican roots, Western Slope nights. Gorras that close a night — only what’s been scanned and confirmed in the backroom. Dandy full sets: El Mago, El Jefe, The Don, The Boss, Pandillero, La Gangstera. Street crowns from the crate when they’re on the book. Barbas, 31, Gallo Fino wait for a scan."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "In the back: the vault. Chase Funkos, graded Pokémon, graded Lorcana. If it hits at a real number, it sits like it belongs. We don’t undercut the work. We don’t cheapen the room. Clean. Modern. Still ours." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Dios sobre todo — that’s not a slogan we put on for the site. That’s how we move. You request a piece, we confirm the hold, you pull up in ",
						HOUSE.city,
						" or we ship it quiet. Coming from the bottom means everybody with taste gets a seat. Becoming kings means we never forget who we are."
					] })
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-border bg-surface",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid max-w-6xl gap-px bg-border sm:grid-cols-3",
				children: [
					{
						k: "Street",
						v: "BAPE, Palm Angels, Coach — deadstock and excellent. What you wear when you pull up."
					},
					{
						k: "Gorras",
						v: "Scanned and confirmed only. El Mago, The Boss, Son of God, Only The Best. No ghosts."
					},
					{
						k: "Vault",
						v: "Star Wars vinyls in box. Chase pops. The Pokémon book. PSA and CGC slabs in the back."
					}
				].map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-surface px-8 py-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl",
						children: col.k
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm leading-relaxed text-muted",
						children: col.v
					})]
				}, col.k))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-elevated px-6 py-16 sm:px-16 sm:text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-4xl sm:text-5xl",
						children: "If you know, pull up."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mx-auto mt-5 max-w-md text-muted leading-relaxed",
						children: [HOUSE.city, ". Message the house. We look at every serious piece. We hold every serious bag."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 flex flex-wrap justify-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								search: { category: "all" },
								children: "Step inside"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/trade",
								children: "Bring a piece"
							})
						})]
					})
				]
			})
		})
	] });
}
//#endregion
export { About as component };
