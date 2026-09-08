import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { u as formatUsd } from "./router-CNbG_BNr.mjs";
import { t as Badge } from "./badge-CT7Nndc0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product-card-B1h8PSjL.js
var import_jsx_runtime = require_jsx_runtime();
function badgeVariant(label) {
	if (label === "Chase" || label === "Grail" || label === "Enchanted") return "brand";
	if (label === "Featured" || label === "House") return "gold";
	if (label === "New") return "accent";
	return "outline";
}
function ProductCard({ product }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/product/$slug",
		params: { slug: product.slug },
		className: "group block rounded-2xl bg-surface p-2 shadow-[var(--shadow-border)] transition-[box-shadow] duration-200 ease-out hover:shadow-[var(--shadow-border-hover)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden rounded-xl bg-elevated",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: product.image,
					alt: product.alt,
					className: "img-flush aspect-portrait w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute top-3 left-3 flex flex-wrap gap-1.5",
					children: product.badges.slice(0, 2).map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: badgeVariant(b),
						children: b
					}, b))
				}),
				product.stock === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 flex items-center justify-center bg-bg/60 text-kicker tracking-kicker text-fg uppercase",
					children: "Held"
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-3 pt-5 pb-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-micro tracking-kicker text-muted uppercase",
					children: product.brand
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display mt-2 text-2xl leading-snug text-fg",
					children: product.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm tabular-nums tracking-wide text-gold",
					children: [formatUsd(product.price), product.compareAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-2 text-subtle line-through",
						children: formatUsd(product.compareAt)
					}) : null]
				})
			]
		})]
	});
}
//#endregion
export { ProductCard as t };
