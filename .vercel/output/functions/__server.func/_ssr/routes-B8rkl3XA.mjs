import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { o as ArrowRight } from "../_libs/lucide-react.mjs";
import { c as HOUSE, s as Button, u as formatUsd } from "./router-CNbG_BNr.mjs";
import { i as useFloor } from "./floor-BUUf_0PQ.mjs";
import { t as ProductCard } from "./product-card-B1h8PSjL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B8rkl3XA.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const floor = useFloor();
	const featured = floor.filter((p) => p.featured);
	const masterpiece = floor.find((p) => p.slug === "son-of-god-32") ?? featured.find((p) => p.category === "hats") ?? featured[0];
	const rest = featured.filter((p) => p.slug !== masterpiece?.slug).slice(0, 4);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative min-h-dvh overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/scenes/salon.jpg",
					alt: "La Casa TripleJ — Virgen, Cristo, gold, mural, the drip",
					className: "img-flush absolute inset-0 size-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto flex min-h-dvh max-w-6xl flex-col justify-end px-4 pb-20 pt-28 sm:px-6 sm:pb-24",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-kicker font-medium tracking-kicker text-accent uppercase",
							children: [
								HOUSE.raza,
								" ",
								HOUSE.city
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "font-display mt-5 max-w-4xl text-5xl text-fg sm:text-7xl lg:text-8xl",
							children: [
								"La Casa",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "neon-gold",
									children: "TripleJ"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-6 max-w-lg text-base leading-relaxed text-fg/85",
							children: [HOUSE.creed, " Miami cool. Street fresco. Gold on the neck. You pulled the curtain — now the house looks back."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/shop",
									search: { category: "hats" },
									children: "The crowns"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/about",
									children: "The altar"
								})
							})]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "grid md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
				className: "relative min-h-[70vh] overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/scenes/mural.jpg",
					alt: "Clean street mural, La Virgen, gold-framed Cristo",
					className: "img-flush absolute inset-0 size-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
					className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg to-transparent p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-kicker tracking-kicker text-gold uppercase",
							children: "The wall"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display mt-2 text-4xl",
							children: "Street and chapel."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-sm text-sm leading-relaxed text-fg/85",
							children: "Clean mural. La Virgen. Cristo in gold. Motivating — not messy. The culture we actually live in."
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
				className: "relative min-h-[70vh] overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/scenes/gold.jpg",
					alt: "Cuban link, gold watch, classic runners, baggy hoodie",
					className: "img-flush absolute inset-0 size-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
					className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg to-transparent p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-kicker tracking-kicker text-accent uppercase",
							children: "The ice"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display mt-2 text-4xl",
							children: "24k and Cortez."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-sm text-sm leading-relaxed text-fg/85",
							children: "Cubans. A gold face. Baggy hoodie. Classic runners. Controlled heat — Miami night, mountain town."
						})
					]
				})]
			})]
		}),
		masterpiece ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/product/$slug",
					params: { slug: masterpiece.slug },
					className: "overflow-hidden rounded-2xl bg-surface p-2 shadow-[var(--shadow-border)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: masterpiece.image,
						alt: masterpiece.alt,
						className: "img-flush aspect-portrait w-full rounded-xl object-cover"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-kicker tracking-kicker text-gold uppercase",
						children: "On the pedestal"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-kicker tracking-kicker text-muted uppercase",
						children: masterpiece.brand
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display mt-2 text-4xl sm:text-5xl",
						children: masterpiece.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-md text-muted",
						children: masterpiece.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 font-display text-4xl tabular-nums text-gold",
						children: formatUsd(masterpiece.price)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-subtle",
						children: [
							masterpiece.condition,
							masterpiece.grade ? ` · ${masterpiece.grade}` : "",
							" · Scanned. Confirmed."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/product/$slug",
							params: { slug: masterpiece.slug },
							children: ["Hold this piece", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
						})
					})
				] })]
			})
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-kicker tracking-kicker text-muted uppercase",
					children: "The floor"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display mt-2 text-4xl sm:text-5xl",
					children: "What’s live."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "ghost",
					className: "hidden sm:inline-flex",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/shop",
						search: { category: "hats" },
						children: ["All gorras", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2",
				children: rest.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/scenes/salon.jpg",
					alt: "",
					className: "img-flush absolute inset-0 size-full object-cover opacity-30"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-bg/70" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative mx-auto grid max-w-6xl gap-8 px-4 py-20 sm:px-6 md:grid-cols-3",
					children: [
						{
							to: "/shop",
							search: { category: "hats" },
							k: "Gorras",
							v: "Scanned crowns only."
						},
						{
							to: "/shop",
							search: { category: "street" },
							k: "Street",
							v: "The rack. Pull-up cloth."
						},
						{
							to: "/shop",
							search: { category: "vault" },
							k: "Vault",
							v: "Pops, slabs, the book."
						}
					].map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: d.to,
						search: d.search,
						className: "rounded-2xl border border-border bg-bg/60 px-6 py-10 backdrop-blur-sm transition-colors duration-200 hover:border-gold",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-micro tracking-kicker text-gold uppercase",
								children: "Enter"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display mt-3 text-3xl",
								children: d.k
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted",
								children: d.v
							})
						]
					}, d.k))
				})
			]
		})
	] });
}
//#endregion
export { Home as component };
