import { i as __toESM } from "../_runtime.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as createRootRoute, b as useRouter, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Menu, i as Search, n as TriangleAlert, r as ShoppingBag, t as X } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { a as DialogOverlay, l as Slot, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-DkLeoOwu.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatUsd(centsOrDollars) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0
	}).format(centsOrDollars);
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-CNbG_BNr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var HOUSE = {
	name: "Casa TripleJ",
	short: "TripleJ",
	house: "La Casa",
	city: "Montrose",
	region: "Western Slope",
	tagline: "From G’s to Gents.",
	creed: "Dios sobre todo.",
	raza: "La raza.",
	description: "La Casa TripleJ — a Miami-cool house in Montrose for scanned gorras, street luxury, and faith over everything. Dios sobre todo. La raza. From G’s to Gents."
};
var KEY = "casa-door";
var useDoor = create((set) => ({
	closed: true,
	ready: false,
	hydrate: () => {
		try {
			set({
				closed: sessionStorage.getItem(KEY) !== "open",
				ready: true
			});
		} catch {
			set({
				closed: true,
				ready: true
			});
		}
	},
	open: () => {
		try {
			sessionStorage.setItem(KEY, "open");
		} catch {}
		set({ closed: false });
	}
}));
function Curtain() {
	const closed = useDoor((s) => s.closed);
	const open = useDoor((s) => s.open);
	const [gone, setGone] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!closed) {
			const t = window.setTimeout(() => setGone(true), 950);
			return () => window.clearTimeout(t);
		}
	}, [closed]);
	if (gone) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("fixed inset-0 z-50", !closed && "pointer-events-none"),
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "The door to La Casa TripleJ",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("curtain-panel curtain-left absolute inset-y-0 left-0 w-1/2", !closed && "is-open") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("curtain-panel curtain-right absolute inset-y-0 right-0 w-1/2", !closed && "is-open") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "absolute inset-0 z-10 cursor-pointer bg-transparent",
				onClick: open,
				onKeyDown: (e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						open();
					}
				},
				"aria-label": "Pull the curtain. Enter La Casa TripleJ."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("pointer-events-none absolute inset-y-0 left-1/2 z-20 flex w-px -translate-x-1/2 flex-col items-center justify-center transition-opacity duration-500", !closed && "opacity-0"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "gold-rail h-24 w-px" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-4 size-3 rounded-full bg-gold shadow-[var(--shadow-neon)]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "gold-rail mt-4 h-24 w-px" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("pointer-events-none absolute inset-x-0 bottom-16 z-20 px-6 text-center transition-opacity duration-500", !closed && "opacity-0"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-kicker tracking-kicker text-gold uppercase",
						children: HOUSE.house
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display mt-3 text-4xl text-fg sm:text-6xl",
						children: HOUSE.short
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted",
						children: "Pull the curtain."
					})
				]
			})
		]
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-auto border-t border-border bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-micro font-medium tracking-kicker text-muted uppercase",
						children: HOUSE.house
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display mt-1 text-3xl text-fg",
						children: HOUSE.short
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-xs text-sm text-muted",
						children: HOUSE.creed
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							HOUSE.raza,
							" ",
							HOUSE.tagline
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-subtle",
						children: HOUSE.city
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-micro font-medium tracking-kicker text-muted uppercase",
							children: "Rooms"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							search: { category: "street" },
							className: "text-fg hover:text-gold",
							children: "Street — BAPE, Palm Angels, Coach"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							search: { category: "hats" },
							className: "text-fg hover:text-gold",
							children: "Gorras — scanned Dandy, Son of God"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							search: { category: "vault" },
							className: "text-fg hover:text-gold",
							children: "Vault — Chase, Pokémon, Lorcana"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-micro font-medium tracking-kicker text-muted uppercase",
							children: "House"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/trade",
							className: "text-fg hover:text-gold",
							children: "Sell or trade"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/about",
							className: "text-fg hover:text-gold",
							children: "The family"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/backroom",
							className: "text-fg hover:text-gold",
							children: "Backroom"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-xs leading-relaxed text-subtle",
							children: "Authenticated drip. Montrose pickup or insured ship. Private offers and trades."
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mx-auto max-w-6xl px-4 py-4 text-xs text-subtle sm:px-6",
				children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" ",
					HOUSE.name,
					". ",
					HOUSE.creed,
					" ",
					HOUSE.raza,
					" From G’s to Gents."
				]
			})
		})]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[opacity,transform,background-color,color,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-gold text-gold-fg hover:opacity-90",
			brand: "bg-accent text-accent-fg hover:opacity-90",
			outline: "border border-border bg-transparent text-fg shadow-[var(--shadow-border)] hover:bg-elevated",
			ghost: "text-fg hover:bg-elevated",
			link: "text-muted underline-offset-4 hover:text-fg hover:underline"
		},
		size: {
			default: "h-11 px-5",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-7 text-base",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("flex h-11 w-full rounded-md border border-border bg-elevated px-3 text-sm text-fg placeholder:text-subtle", "transition-[box-shadow,border-color] duration-150 ease-out", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40", "disabled:cursor-not-allowed disabled:opacity-40", className),
		...props
	});
}
var Sheet = Dialog;
var SheetPortal = DialogPortal;
function SheetOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
		className: cn("fixed inset-0 z-50 scrim", className),
		...props
	});
}
function SheetContent({ className, children, side = "right", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed z-50 flex h-full w-[min(100vw,22rem)] flex-col bg-surface text-fg shadow-[var(--shadow-border)]", "transition-transform duration-[var(--motion-slow,400ms)] ease-[cubic-bezier(0.22,1,0.36,1)]", side === "right" ? "top-0 right-0 border-l border-border" : "top-0 left-0 border-r border-border", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
			className: "absolute top-3 right-3 rounded-md p-2 text-muted transition-colors duration-150 hover:bg-elevated hover:text-fg",
			"aria-label": "Close",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
		})]
	})] });
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		className: cn("font-display text-2xl", className),
		...props
	});
}
function sameLine(a, slug, size) {
	return a.slug === slug && (a.size ?? "") === (size ?? "");
}
var useCart = create()(persist((set, get) => ({
	lines: [],
	add: (slug, size) => {
		const lines = [...get().lines];
		const i = lines.findIndex((l) => sameLine(l, slug, size));
		if (i >= 0) lines[i] = {
			...lines[i],
			qty: lines[i].qty + 1
		};
		else lines.push({
			slug,
			size,
			qty: 1
		});
		set({ lines });
	},
	setQty: (slug, qty, size) => {
		if (qty <= 0) {
			set({ lines: get().lines.filter((l) => !sameLine(l, slug, size)) });
			return;
		}
		set({ lines: get().lines.map((l) => sameLine(l, slug, size) ? {
			...l,
			qty
		} : l) });
	},
	remove: (slug, size) => set({ lines: get().lines.filter((l) => !sameLine(l, slug, size)) }),
	clear: () => set({ lines: [] })
}), { name: "after-hours-cart" }));
function cartCount(lines) {
	return lines.reduce((n, l) => n + l.qty, 0);
}
var NAV = [
	{
		to: "/shop",
		label: "Shop",
		search: { category: "all" }
	},
	{
		to: "/shop",
		label: "Street",
		search: { category: "street" }
	},
	{
		to: "/shop",
		label: "Gorras",
		search: { category: "hats" }
	},
	{
		to: "/shop",
		label: "Vault",
		search: { category: "vault" }
	},
	{
		to: "/trade",
		label: "Trade"
	},
	{
		to: "/about",
		label: "The house"
	}
];
function TripleMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		"aria-hidden": true,
		className: cn("inline-flex items-end gap-0.5", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block h-3.5 w-0.5 bg-gold shadow-[var(--shadow-neon)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block h-4 w-0.5 bg-accent shadow-[var(--shadow-aqua)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block h-2.5 w-0.5 bg-fg" })
		]
	});
}
function Wordmark({ compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: "flex items-center gap-3 text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TripleMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex flex-col leading-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-micro font-medium tracking-kicker text-muted uppercase",
				children: HOUSE.house
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("font-display tracking-tight", compact ? "text-lg" : "text-xl sm:text-2xl"),
				children: HOUSE.short
			})]
		})]
	});
}
function SiteHeader() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const search = useRouterState({ select: (s) => s.location.searchStr });
	const navigate = useNavigate();
	const lines = useCart((s) => s.lines);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setMounted(true), []);
	(0, import_react.useEffect)(() => setOpen(false), [pathname, search]);
	const count = mounted ? cartCount(lines) : 0;
	function submitSearch(e) {
		e.preventDefault();
		const q = query.trim();
		navigate({
			to: "/shop",
			search: {
				category: "all",
				q: q || void 0
			}
		});
		setSearchOpen(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "header-rule sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:h-[4.5rem] sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "lg:hidden",
							"aria-label": "Open menu",
							onClick: () => setOpen(true),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "hidden items-center gap-1 lg:flex",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								search: { category: "all" },
								className: "rounded-md px-3 py-2 text-xs font-medium tracking-[0.14em] text-muted uppercase transition-colors duration-150 hover:text-fg",
								children: "Shop"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								search: { category: "street" },
								className: "rounded-md px-3 py-2 text-xs font-medium tracking-[0.14em] text-muted uppercase transition-colors duration-150 hover:text-fg",
								children: "Street"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								search: { category: "hats" },
								className: "rounded-md px-3 py-2 text-xs font-medium tracking-[0.14em] text-muted uppercase transition-colors duration-150 hover:text-fg",
								children: "Gorras"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								search: { category: "vault" },
								className: "rounded-md px-3 py-2 text-xs font-medium tracking-[0.14em] text-muted uppercase transition-colors duration-150 hover:text-fg",
								children: "Vault"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/trade",
								className: "rounded-md px-3 py-2 text-xs font-medium tracking-[0.14em] text-muted uppercase transition-colors duration-150 hover:text-fg",
								children: "Trade"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/about",
								className: "rounded-md px-3 py-2 text-xs font-medium tracking-[0.14em] text-muted uppercase transition-colors duration-150 hover:text-fg",
								children: "The house"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							"aria-label": "Search",
							onClick: () => setSearchOpen((v) => !v),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/cart",
							className: "relative inline-flex size-11 items-center justify-center rounded-md text-fg transition-colors duration-150 hover:bg-elevated",
							"aria-label": count === 1 ? "Bag, 1 item" : `Bag, ${count} items`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "size-5" }), count > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute top-1.5 right-1.5 flex size-4 items-center justify-center rounded-full bg-brand text-[10px] font-medium text-brand-fg tabular-nums",
								children: count
							}) : null]
						})]
					})
				]
			}),
			searchOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submitSearch,
				className: "mx-auto flex max-w-6xl items-center gap-2 border-t border-border px-4 py-3 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					autoFocus: true,
					value: query,
					onChange: (e) => setQuery(e.target.value),
					placeholder: "Search the collection — El Mago, BAPE, Charizard…",
					className: "border-0 bg-transparent focus-visible:ring-0"
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
					side: "left",
					className: "p-6 pt-14",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
							className: "sr-only",
							children: "Menu"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, { compact: true }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "mt-8 flex flex-col gap-1",
							children: NAV.map((item) => item.to === "/shop" && "search" in item ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								search: item.search,
								className: "rounded-lg px-3 py-3 text-sm tracking-[0.12em] text-fg uppercase hover:bg-elevated",
								children: item.label
							}, item.label) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.to,
								className: "rounded-lg px-3 py-3 text-sm tracking-[0.12em] text-fg uppercase hover:bg-elevated",
								children: item.label
							}, item.label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-auto pt-10 text-xs text-subtle",
							children: [
								HOUSE.creed,
								" ",
								HOUSE.raza
							]
						})
					]
				})
			})
		]
	});
}
function SiteShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const closed = useDoor((s) => s.closed);
	const ready = useDoor((s) => s.ready);
	const hydrate = useDoor((s) => s.hydrate);
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	const atDoor = pathname === "/" && (!ready || closed);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-bg text-fg",
		children: [
			!atDoor ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1",
				children
			}),
			!atDoor ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}) : null,
			pathname === "/" && ready && closed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Curtain, {}) : null,
			pathname === "/" && !ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 bg-bg",
				"aria-hidden": true
			}) : null
		]
	});
}
var styles_default = "/assets/styles-BgJ1Y5qu.css";
var Route$7 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: HOUSE.name },
			{
				name: "description",
				content: HOUSE.description
			},
			{
				name: "theme-color",
				content: "#07080c"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Outfit:wght@300;400;500;600&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: Root,
	notFoundComponent: NotFound
});
function Root() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				theme: "dark",
				position: "top-center",
				toastOptions: { style: {
					background: "#181e28",
					color: "#f6ecdc",
					border: "1px solid #2a2e38"
				} }
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
function NotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-xl px-4 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] tracking-[0.28em] text-muted uppercase",
				children: "404"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-3 text-5xl",
				children: "This piece isn’t here."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-muted",
				children: "It moved, or it never made the house. Back to the floor."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mt-8 inline-flex h-11 items-center rounded-md bg-gold px-5 text-sm font-medium text-gold-fg",
				children: "Return home"
			})
		]
	});
}
var $$splitComponentImporter$6 = () => import("./routes-B8rkl3XA.mjs");
var Route$6 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./about-DPD-vpFC.mjs");
var Route$5 = createFileRoute("/about")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./backroom-7S_LBdEE.mjs");
var Route$4 = createFileRoute("/backroom")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./cart-fprt3Z2Y.mjs");
var Route$3 = createFileRoute("/cart")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
function parseShopSearch(s) {
	const category = s.category;
	return {
		...category === "street" || category === "hats" || category === "vault" || category === "all" ? { category } : {},
		...typeof s.q === "string" && s.q.trim() ? { q: s.q } : {}
	};
}
var $$splitComponentImporter$2 = () => import("./shop-BSVJWGGT.mjs");
var Route$2 = createFileRoute("/shop")({
	validateSearch: parseShopSearch,
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./trade-Dzk6Jv5z.mjs");
var Route$1 = createFileRoute("/trade")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./product._slug-Bv_Xio1V.mjs");
var Route = createFileRoute("/product/$slug")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$6.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$7
	}),
	AboutRoute: Route$5.update({
		id: "/about",
		path: "/about",
		getParentRoute: () => Route$7
	}),
	BackroomRoute: Route$4.update({
		id: "/backroom",
		path: "/backroom",
		getParentRoute: () => Route$7
	}),
	CartRoute: Route$3.update({
		id: "/cart",
		path: "/cart",
		getParentRoute: () => Route$7
	}),
	ShopRoute: Route$2.update({
		id: "/shop",
		path: "/shop",
		getParentRoute: () => Route$7
	}),
	TradeRoute: Route$1.update({
		id: "/trade",
		path: "/trade",
		getParentRoute: () => Route$7
	}),
	ProductSlugRoute: Route.update({
		id: "/product/$slug",
		path: "/product/$slug",
		getParentRoute: () => Route$7
	})
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { useCart as a, HOUSE as c, cartCount as i, cn as l, Route as n, Input as o, Route$2 as r, Button as s, router_exports as t, formatUsd as u };
