import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { l as cn } from "./router-CNbG_BNr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inquiries-store-C95-GXOk.js
var import_jsx_runtime = require_jsx_runtime();
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-28 w-full rounded-lg border border-border bg-elevated px-3 py-3 text-sm text-fg placeholder:text-subtle", "transition-[box-shadow,border-color] duration-150 ease-out", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40", "disabled:cursor-not-allowed disabled:opacity-40", className),
		...props
	});
}
var useInquiries = create()(persist((set, get) => ({
	items: [],
	add: (inquiry) => {
		const row = {
			...inquiry,
			id: crypto.randomUUID(),
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		set({ items: [row, ...get().items] });
		return row;
	}
}), { name: "after-hours-inquiries" }));
//#endregion
export { useInquiries as n, Textarea as t };
