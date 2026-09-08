import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as X } from "../_libs/lucide-react.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as useCart, l as cn, n as Route, o as Input, s as Button, u as formatUsd } from "./router-CNbG_BNr.mjs";
import { t as Badge } from "./badge-CT7Nndc0.mjs";
import { t as Label } from "./label-CvCPq3gA.mjs";
import { a as useFloorProduct, i as useFloor, n as getProduct } from "./floor-BUUf_0PQ.mjs";
import { n as useInquiries, t as Textarea } from "./inquiries-store-C95-GXOk.mjs";
import { t as ProductCard } from "./product-card-B1h8PSjL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product._slug-Bv_Xio1V.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		className: cn("fixed inset-0 z-50 scrim", className),
		...props
	});
}
function DialogContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed top-1/2 left-1/2 z-50 w-[min(92vw,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-surface p-6 text-fg shadow-[var(--shadow-border)]", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
			className: "absolute top-4 right-4 rounded-md p-2 text-muted transition-colors duration-150 hover:bg-elevated hover:text-fg",
			"aria-label": "Close",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
		})]
	})] });
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("font-display text-2xl text-fg", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("mt-2 text-sm text-muted", className),
		...props
	});
}
function ProductPage() {
	const { slug } = Route.useParams();
	const product = useFloorProduct(slug);
	const floor = useFloor();
	const raw = getProduct(slug);
	const add = useCart((s) => s.add);
	const addInquiry = useInquiries((s) => s.add);
	const [size, setSize] = (0, import_react.useState)(product?.sizes?.[0] ?? "");
	const [offerOpen, setOfferOpen] = (0, import_react.useState)(false);
	const [offer, setOffer] = (0, import_react.useState)({
		name: "",
		email: "",
		amount: "",
		note: ""
	});
	if (!product) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-xl px-4 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl",
				children: raw ? "Held in the backroom." : "Piece not on the floor."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: raw ? "This crown is scanned, but the house hasn’t confirmed it live. Ask, or check Gorras." : "It may have moved. Check the shop, or send a want-list."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/shop",
					search: { category: "all" },
					children: "Back to shop"
				})
			})
		]
	});
	const item = product;
	const related = floor.filter((p) => p.slug !== item.slug && p.category === item.category).slice(0, 4);
	function addToBag() {
		if (item.sizes && !size) {
			toast("Choose a size first.");
			return;
		}
		add(item.slug, item.sizes ? size : void 0);
		toast(`Added — ${item.name}`);
	}
	function submitOffer(e) {
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
			amount
		});
		setOfferOpen(false);
		toast("Offer received. The house will reply.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-subtle",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						search: { category: product.category },
						className: "hover:text-fg",
						children: product.category === "hats" ? "Gorras" : product.category === "vault" ? "Vault" : "Street"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mx-2",
						children: "/"
					}),
					product.brand
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-2xl bg-surface p-2 shadow-[var(--shadow-border)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: product.image,
						alt: product.alt,
						className: "img-flush aspect-portrait w-full rounded-xl object-cover"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1.5",
						children: product.badges.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: b === "Chase" || b === "Grail" || b === "Enchanted" ? "brand" : "outline",
							children: b
						}, b))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-kicker tracking-kicker text-muted uppercase",
						children: product.brand
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display mt-3 text-4xl sm:text-6xl",
						children: product.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-5 font-display text-4xl tabular-nums text-gold",
						children: [formatUsd(product.price), product.compareAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-3 text-xl text-subtle line-through",
							children: formatUsd(product.compareAt)
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm text-muted",
						children: [
							product.condition,
							product.grade ? ` · ${product.grade}` : null,
							product.stock === 1 ? " · Last one in the house" : ` · ${product.stock} in house`
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 leading-relaxed text-muted",
						children: product.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-5 space-y-2 text-sm text-fg",
						children: product.details.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 size-1 shrink-0 rounded-full bg-brand" }), d]
						}, d))
					}),
					product.sizes ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-[0.16em] text-muted uppercase",
							children: "Size"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: product.sizes.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setSize(s),
								className: `h-11 min-w-11 rounded-md px-3 text-sm transition-colors duration-150 ${size === s ? "bg-accent text-accent-fg" : "border border-border text-fg hover:bg-elevated"}`,
								children: s
							}, s))
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-col gap-3 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "flex-1",
							onClick: addToBag,
							disabled: product.stock === 0,
							children: product.stock === 0 ? "Held" : "Hold this piece"
						}), product.tradeable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							className: "flex-1",
							onClick: () => setOfferOpen(true),
							children: "Make an offer"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							className: "flex-1",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/trade",
								children: "Ask the house"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-xs leading-relaxed text-subtle",
						children: "Authenticated and photographed in-house. Request a hold — we confirm by message. Montrose pickup or insured ship."
					})
				] })]
			}),
			related.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl",
					children: "From the same room"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: related.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.slug))
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: offerOpen,
				onOpenChange: setOfferOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: ["Offer on ", product.name] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Serious numbers only. We’ll come back after hours with a yes, a no, or a counter." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-6 flex flex-col gap-3",
						onSubmit: submitOffer,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "offer-name",
								children: "Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "offer-name",
								className: "mt-1.5",
								value: offer.name,
								onChange: (e) => setOffer({
									...offer,
									name: e.target.value
								}),
								required: true
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "offer-email",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "offer-email",
								type: "email",
								className: "mt-1.5",
								value: offer.email,
								onChange: (e) => setOffer({
									...offer,
									email: e.target.value
								}),
								required: true
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "offer-amount",
								children: "Your number (USD)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "offer-amount",
								type: "number",
								min: 1,
								className: "mt-1.5",
								value: offer.amount,
								onChange: (e) => setOffer({
									...offer,
									amount: e.target.value
								}),
								required: true
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "offer-note",
								children: "Note"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "offer-note",
								className: "mt-1.5",
								value: offer.note,
								onChange: (e) => setOffer({
									...offer,
									note: e.target.value
								}),
								placeholder: "Pickup in Montrose? Trade on top?"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "mt-2",
								children: "Send offer"
							})
						]
					})
				] })
			})
		]
	});
}
//#endregion
export { ProductPage as component };
