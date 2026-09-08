import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { o as Input, s as Button } from "./router-CNbG_BNr.mjs";
import { t as Label } from "./label-CvCPq3gA.mjs";
import { n as useInquiries, t as Textarea } from "./inquiries-store-C95-GXOk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/trade-Dzk6Jv5z.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KINDS = [
	{
		id: "sell",
		label: "Sell to the house"
	},
	{
		id: "trade",
		label: "Trade"
	},
	{
		id: "both",
		label: "Either"
	}
];
function Trade() {
	const add = useInquiries((s) => s.add);
	const [kind, setKind] = (0, import_react.useState)("trade");
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		email: "",
		item: "",
		asking: "",
		want: "",
		message: ""
	});
	const [sent, setSent] = (0, import_react.useState)(false);
	function onSubmit(e) {
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
				form.message
			].filter(Boolean).join("\n")
		});
		setSent(true);
		toast("Ticket received. The house will look tonight.");
	}
	if (sent) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-xl px-4 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-[0.22em] text-muted uppercase",
				children: "Received"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-3 text-5xl",
				children: "We’ll look at it tonight."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-muted",
				children: "Three J’s, after the day. If it’s a fit, you’ll get a number or a counter-piece."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-8",
				onClick: () => setSent(false),
				children: "Send another"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-kicker tracking-kicker text-muted uppercase",
				children: "The back door"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-3 text-5xl sm:text-6xl",
				children: "Bring a piece."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 leading-relaxed text-muted",
				children: "Chase Funkos, graded Pokémon, Lorcana, Dandy / Barbas / 31 / Gallo Fino full sets, BAPE, Palm Angels, Coach. If it belongs under glass, the house wants the first look."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-10 space-y-5 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-fg",
						children: "1. Present the piece"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-muted",
						children: "Brand, year, size, grade, whether it is a full set or slabbed."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-fg",
						children: "2. The house looks"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-muted",
						children: "Father and sons. We answer with a number or a pass — never a shrug."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-fg",
						children: "3. Cash, trade, or a mix"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-muted",
						children: "Montrose pickup keeps it clean. We ship when the piece earns the crate."
					})] })
				]
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-border)] sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: KINDS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setKind(k.id),
						className: `h-10 rounded-md px-3 text-xs font-medium tracking-[0.12em] uppercase transition-colors duration-150 ${kind === k.id ? "bg-accent text-accent-fg" : "border border-border text-muted hover:text-fg"}`,
						children: k.label
					}, k.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "name",
							children: "Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "name",
							className: "mt-1.5",
							value: form.name,
							onChange: (e) => setForm({
								...form,
								name: e.target.value
							}),
							required: true
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "email",
						children: "Email"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "email",
						type: "email",
						className: "mt-1.5",
						value: form.email,
						onChange: (e) => setForm({
							...form,
							email: e.target.value
						}),
						required: true
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "item",
						children: "What you have"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "item",
						className: "mt-1.5",
						placeholder: "e.g. Dandy El Mago full set, PSA 10 Charizard…",
						value: form.item,
						onChange: (e) => setForm({
							...form,
							item: e.target.value
						}),
						required: true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "asking",
						children: "Asking (optional)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "asking",
						className: "mt-1.5",
						placeholder: "$",
						value: form.asking,
						onChange: (e) => setForm({
							...form,
							asking: e.target.value
						})
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "want",
						children: "Want from the floor (optional)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "want",
						className: "mt-1.5",
						placeholder: "El Mago, Chase chrome, PSA Charizard…",
						value: form.want,
						onChange: (e) => setForm({
							...form,
							want: e.target.value
						})
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "message",
						children: "Notes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "message",
						className: "mt-1.5",
						placeholder: "Condition, photos you’ll send, Montrose vs ship.",
						value: form.message,
						onChange: (e) => setForm({
							...form,
							message: e.target.value
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					className: "mt-6 w-full",
					children: "Send to the house"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs text-subtle",
					children: "This is a ticket, not a listing. We’ll reply with a number or a pass."
				})
			]
		})]
	});
}
//#endregion
export { Trade as component };
