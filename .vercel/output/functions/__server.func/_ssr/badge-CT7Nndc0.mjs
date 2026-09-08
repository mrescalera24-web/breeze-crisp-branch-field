import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as cn } from "./router-CNbG_BNr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-CT7Nndc0.js
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-sm px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em]", {
	variants: { variant: {
		default: "bg-elevated text-muted",
		brand: "bg-brand text-brand-fg",
		outline: "border border-border text-muted",
		accent: "bg-accent text-accent-fg",
		gold: "bg-gold text-gold-fg"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
//#endregion
export { Badge as t };
