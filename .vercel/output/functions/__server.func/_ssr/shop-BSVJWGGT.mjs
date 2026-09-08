import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as cn, o as Input, r as Route$2 } from "./router-CNbG_BNr.mjs";
import { i as useFloor, t as CATEGORIES } from "./floor-BUUf_0PQ.mjs";
import { t as ProductCard } from "./product-card-B1h8PSjL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-BSVJWGGT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Shop() {
	const { category = "all", q } = Route$2.useSearch();
	const navigate = Route$2.useNavigate();
	const floor = useFloor();
	const [sort, setSort] = (0, import_react.useState)("featured");
	const [draft, setDraft] = (0, import_react.useState)(q ?? "");
	const items = (0, import_react.useMemo)(() => {
		let list = floor.slice();
		if (category && category !== "all") list = list.filter((p) => p.category === category);
		if (q) {
			const needle = q.toLowerCase();
			list = list.filter((p) => p.name.toLowerCase().includes(needle) || p.brand.toLowerCase().includes(needle) || p.badges.some((b) => b.toLowerCase().includes(needle)) || p.description.toLowerCase().includes(needle));
		}
		if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
		if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
		if (sort === "featured") list.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
		return list;
	}, [
		category,
		q,
		sort,
		floor
	]);
	const active = CATEGORIES.find((c) => c.id === category) ?? CATEGORIES[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-kicker tracking-kicker text-gold uppercase",
				children: "The floor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-3 text-5xl sm:text-6xl",
				children: active.label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-lg text-muted leading-relaxed",
				children: active.blurb
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-col gap-4 border-y border-border py-4 lg:flex-row lg:items-center lg:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						search: {
							category: c.id,
							q
						},
						className: cn("inline-flex h-11 items-center rounded-md px-4 text-xs font-medium tracking-kicker uppercase transition-colors duration-150", c.id === active.id ? "bg-gold text-gold-fg" : "border border-border text-muted hover:text-fg"),
						children: c.label
					}, c.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2 sm:flex-row sm:items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
							className: "sm:w-56",
							onSubmit: (e) => {
								e.preventDefault();
								const next = draft.trim();
								navigate({
									to: "/shop",
									search: {
										category,
										q: next || void 0
									}
								});
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: draft,
								onChange: (e) => setDraft(e.target.value),
								onKeyDown: (e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										const next = draft.trim();
										navigate({
											to: "/shop",
											search: {
												category,
												q: next || void 0
											}
										});
									}
								},
								placeholder: "Filter pieces",
								"aria-label": "Filter pieces"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "sr-only",
							htmlFor: "sort",
							children: "Sort"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							id: "sort",
							value: sort,
							onChange: (e) => setSort(e.target.value),
							className: "h-11 rounded-md border border-border bg-elevated px-3 text-sm text-fg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "featured",
									children: "Featured"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "price-desc",
									children: "Price · high"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "price-asc",
									children: "Price · low"
								})
							]
						})
					]
				})]
			}),
			items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "py-20 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl",
						children: "Nothing confirmed on the floor."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted",
						children: "Try another room — or if you’re the house, confirm a scan in the backroom."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/trade",
						className: "mt-6 inline-block text-sm text-accent underline-offset-4 hover:underline",
						children: "Send a want-list"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 text-xs tabular-nums text-subtle",
				children: [items.length, " pieces"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
				children: items.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.slug))
			})] })
		]
	});
}
//#endregion
export { Shop as component };
