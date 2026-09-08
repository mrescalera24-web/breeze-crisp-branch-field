import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as useCart, c as HOUSE, i as cartCount, o as Input, s as Button, u as formatUsd } from "./router-CNbG_BNr.mjs";
import { t as Label } from "./label-CvCPq3gA.mjs";
import { i as useFloor } from "./floor-BUUf_0PQ.mjs";
import { t as useHydrated } from "./use-hydrated-BRQLb_xd.mjs";
import { n as useInquiries, t as Textarea } from "./inquiries-store-C95-GXOk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-fprt3Z2Y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CartPage() {
	const lines = useCart((s) => s.lines);
	const setQty = useCart((s) => s.setQty);
	const remove = useCart((s) => s.remove);
	const clear = useCart((s) => s.clear);
	const addInquiry = useInquiries((s) => s.add);
	const hydrated = useHydrated();
	const floor = useFloor();
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		email: "",
		method: "pickup",
		note: ""
	});
	const [sent, setSent] = (0, import_react.useState)(false);
	const rows = (0, import_react.useMemo)(() => lines.map((line) => {
		const product = floor.find((p) => p.slug === line.slug);
		return product ? {
			line,
			product
		} : null;
	}).filter((r) => r !== null), [lines, floor]);
	const total = rows.reduce((n, r) => n + r.product.price * r.line.qty, 0);
	const count = cartCount(lines);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto max-w-xl px-4 py-24 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Opening the bag…"
		})
	});
	function requestBag(e) {
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
				...rows.map((r) => `${r.product.brand} — ${r.product.name}${r.line.size ? ` (${r.line.size})` : ""} × ${r.line.qty} · ${formatUsd(r.product.price)}`),
				`Total ${formatUsd(total)}`
			].filter((x) => x !== void 0).join("\n"),
			amount: total
		});
		clear();
		setSent(true);
		toast("Request in. We’ll confirm the hold.");
	}
	if (sent) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-xl px-4 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-[0.22em] text-muted uppercase",
				children: "Hold requested"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-3 text-5xl",
				children: "It’s with the house."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-muted",
				children: [
					"We’ll confirm availability and a number. ",
					HOUSE.city,
					" pickup is fastest; we ship the pieces that deserve it."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/shop",
					search: { category: "all" },
					children: "Keep looking"
				})
			})
		]
	});
	if (rows.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-xl px-4 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-[0.22em] text-muted uppercase",
				children: "Bag"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-3 text-5xl",
				children: "Empty, for now."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-muted",
				children: "The floor is open. Street, gorras, vault."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/shop",
					search: { category: "all" },
					children: "Shop the house"
				})
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-[0.22em] text-muted uppercase",
				children: "Bag"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "font-display mt-2 text-4xl sm:text-5xl",
				children: [
					count,
					" ",
					count === 1 ? "piece" : "pieces"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-8 divide-y divide-border border-y border-border",
				children: rows.map(({ line, product }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-4 py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/product/$slug",
						params: { slug: product.slug },
						className: "size-24 shrink-0 overflow-hidden rounded-lg bg-elevated",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: product.image,
							alt: product.alt,
							className: "img-flush size-full object-cover"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] tracking-[0.16em] text-muted uppercase",
								children: product.brand
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/product/$slug",
								params: { slug: product.slug },
								className: "font-display text-xl",
								children: product.name
							}),
							line.size ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: ["Size ", line.size]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm tabular-nums",
								children: formatUsd(product.price)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "sr-only",
										htmlFor: `qty-${line.slug}`,
										children: "Quantity"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										id: `qty-${line.slug}`,
										value: line.qty,
										onChange: (e) => setQty(line.slug, Number(e.target.value), line.size),
										className: "h-10 rounded-md border border-border bg-elevated px-2 text-sm",
										children: [
											1,
											2,
											3,
											4
										].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: n,
											children: n
										}, n))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "text-xs text-muted underline-offset-4 hover:text-fg hover:underline",
										onClick: () => remove(line.slug, line.size),
										children: "Remove"
									})
								]
							})
						]
					})]
				}, `${line.slug}-${line.size ?? ""}`))
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: requestBag,
			className: "h-fit rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-border)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Request this hold"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: [
						"We confirm by message. No surprise charges. Total ",
						formatUsd(total),
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-3xl tabular-nums",
					children: formatUsd(total)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "cart-name",
							children: "Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "cart-name",
							className: "mt-1.5",
							value: form.name,
							onChange: (e) => setForm({
								...form,
								name: e.target.value
							}),
							required: true
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "cart-email",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "cart-email",
							type: "email",
							className: "mt-1.5",
							value: form.email,
							onChange: (e) => setForm({
								...form,
								email: e.target.value
							}),
							required: true
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-wide text-muted",
							children: "How you want it"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex gap-2",
							children: ["pickup", "ship"].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setForm({
									...form,
									method: m
								}),
								className: `h-10 flex-1 rounded-md text-xs font-medium tracking-[0.12em] uppercase ${form.method === m ? "bg-accent text-accent-fg" : "border border-border text-muted"}`,
								children: m === "pickup" ? "Montrose pickup" : "Ship"
							}, m))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "cart-note",
							children: "Note"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "cart-note",
							className: "mt-1.5",
							placeholder: "When you can pick up, or a shipping address.",
							value: form.note,
							onChange: (e) => setForm({
								...form,
								note: e.target.value
							})
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					className: "mt-6 w-full",
					children: "Request hold"
				})
			]
		})]
	});
}
//#endregion
export { CartPage as component };
