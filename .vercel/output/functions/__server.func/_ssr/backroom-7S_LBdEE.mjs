import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as HOUSE, o as Input, s as Button } from "./router-CNbG_BNr.mjs";
import { t as Badge } from "./badge-CT7Nndc0.mjs";
import { t as Label } from "./label-CvCPq3gA.mjs";
import { o as useInventory, r as useDesk } from "./floor-BUUf_0PQ.mjs";
import { t as useHydrated } from "./use-hydrated-BRQLb_xd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/backroom-7S_LBdEE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var HOUSE_KEY = "triplej";
var DOOR = "casa-desk-open";
function isOpen() {
	try {
		return sessionStorage.getItem(DOOR) === "1";
	} catch {
		return false;
	}
}
async function fileToJpeg(file) {
	const url = URL.createObjectURL(file);
	try {
		const img = await new Promise((resolve, reject) => {
			const el = new Image();
			el.onload = () => resolve(el);
			el.onerror = () => reject(/* @__PURE__ */ new Error("Could not read that photo."));
			el.src = url;
		});
		const scale = Math.min(1, 1200 / Math.max(img.width, img.height));
		const canvas = document.createElement("canvas");
		canvas.width = Math.max(1, Math.round(img.width * scale));
		canvas.height = Math.max(1, Math.round(img.height * scale));
		const ctx = canvas.getContext("2d");
		if (!ctx) throw new Error("No canvas");
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
		return canvas.toDataURL("image/jpeg", .82);
	} finally {
		URL.revokeObjectURL(url);
	}
}
function Backroom() {
	const hydrated = useHydrated();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [key, setKey] = (0, import_react.useState)("");
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto max-w-xl px-4 py-24 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Opening the backroom…"
		})
	});
	if (!open && !isOpen()) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-md px-4 py-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-kicker tracking-kicker text-gold uppercase",
				children: "The desk"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-3 text-5xl",
				children: "Backroom"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-muted leading-relaxed",
				children: "Scans come in here. Nothing hits the floor until the house confirms it. House key — the three J’s."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-8 space-y-4",
				onSubmit: (e) => {
					e.preventDefault();
					if (key.trim().toLowerCase() !== HOUSE_KEY) {
						toast("Wrong key.");
						return;
					}
					sessionStorage.setItem(DOOR, "1");
					setOpen(true);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "house-key",
						children: "House key"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "house-key",
						type: "password",
						autoComplete: "off",
						value: key,
						onChange: (e) => setKey(e.target.value),
						placeholder: "the three J’s"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						children: "Open the desk"
					})
				]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Desk, {});
}
function Desk() {
	const rows = useDesk();
	const addIncoming = useInventory((s) => s.addIncoming);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const counts = (0, import_react.useMemo)(() => {
		return {
			live: rows.filter((r) => r.status === "live" && r.stock > 0).length,
			hold: rows.filter((r) => r.status === "hold").length,
			sold: rows.filter((r) => r.status === "sold" || r.stock === 0).length,
			draft: rows.filter((r) => r.status === "draft").length
		};
	}, [rows]);
	async function onFiles(files) {
		if (!files?.length) return;
		setBusy(true);
		try {
			for (const file of Array.from(files)) {
				if (!file.type.startsWith("image/")) continue;
				const image = await fileToJpeg(file);
				const stem = file.name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ");
				addIncoming({
					name: stem || "Untitled scan",
					brand: "Unconfirmed",
					price: 0,
					stock: 1,
					image,
					scanName: file.name
				});
			}
			toast("Scan in. Name it, price it, then confirm.");
		} catch {
			toast("Couldn’t read that photo.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-kicker tracking-kicker text-gold uppercase",
				children: ["The desk · ", HOUSE.city]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-3 text-5xl sm:text-6xl",
				children: "Backroom"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-xl text-muted leading-relaxed",
				children: "Only scanned hats get a seat. Confirm a piece and it hits Gorras. Hold it and it disappears from the floor. No invented crowns."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: [
					["Live", counts.live],
					["Hold", counts.hold],
					["Sold", counts.sold],
					["Draft", counts.draft]
				].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-surface px-4 py-5 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-micro tracking-kicker text-muted uppercase",
						children: k
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display mt-1 text-3xl tabular-nums text-gold",
						children: v
					})]
				}, k))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-10 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface px-6 py-12 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl",
						children: "Drop a scan"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-sm text-sm text-muted",
						children: "Phone photo, case shot, crate shot. Lands as a draft until you confirm."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "file",
						accept: "image/*",
						multiple: true,
						className: "sr-only",
						disabled: busy,
						onChange: (e) => {
							onFiles(e.target.files);
							e.target.value = "";
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-5 inline-flex h-11 items-center rounded-md bg-brand px-5 text-sm font-medium text-brand-fg",
						children: busy ? "Reading…" : "Upload photos"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskCard, { row }, row.slug))
			})
		]
	});
}
function DeskCard({ row }) {
	const setStatus = useInventory((s) => s.setStatus);
	const setStock = useInventory((s) => s.setStock);
	const setPrice = useInventory((s) => s.setPrice);
	const patchIncoming = useInventory((s) => s.patchIncoming);
	const dropIncoming = useInventory((s) => s.dropIncoming);
	const incomingId = row.incoming ? row.slug.replace(/^scan-/, "") : null;
	function status(next) {
		if (incomingId) patchIncoming(incomingId, { status: next });
		else setStatus(row.slug, next);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-2xl bg-surface p-2 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: row.image,
			alt: row.alt,
			className: "img-flush aspect-portrait w-full rounded-xl object-cover"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-3 pt-4 pb-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: row.status === "live" ? "gold" : row.status === "sold" ? "brand" : "outline",
						children: row.status
					}), row.scan ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						children: "Scan"
					}) : null]
				}),
				incomingId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "mt-3",
					value: row.name,
					onChange: (e) => patchIncoming(incomingId, { name: e.target.value })
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display mt-3 text-2xl leading-snug",
					children: row.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-micro tracking-kicker text-muted uppercase",
					children: row.brand
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 truncate text-xs text-subtle",
					children: row.scan ?? "No scan on file"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Price" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						min: 0,
						className: "mt-1",
						value: row.price,
						onChange: (e) => {
							const n = Number(e.target.value);
							if (incomingId) patchIncoming(incomingId, { price: n });
							else setPrice(row.slug, n);
						}
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Stock" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						min: 0,
						className: "mt-1",
						value: row.stock,
						onChange: (e) => {
							const n = Number(e.target.value);
							if (incomingId) patchIncoming(incomingId, { stock: n });
							else setStock(row.slug, n);
						}
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => status("live"),
							children: "Confirm"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => status("hold"),
							children: "Hold"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => status("sold"),
							children: "Sold"
						}),
						incomingId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => dropIncoming(incomingId),
							children: "Drop"
						}) : null
					]
				})
			]
		})]
	});
}
//#endregion
export { Backroom as component };
