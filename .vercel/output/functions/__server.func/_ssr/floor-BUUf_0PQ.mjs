import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/floor-BUUf_0PQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var CATEGORIES = [
	{
		id: "all",
		label: "The floor",
		blurb: "The house — street, gorras, and the vault. Dios sobre todo."
	},
	{
		id: "street",
		label: "Street",
		blurb: "BAPE, Palm Angels, Coach. What you wear when you pull up."
	},
	{
		id: "hats",
		label: "Gorras",
		blurb: "Only what’s been scanned and confirmed in the backroom. No ghosts on the floor."
	},
	{
		id: "vault",
		label: "Vault",
		blurb: "Star Wars vinyls in box, Chase Funkos, the Pokémon book, graded slabs."
	}
];
var PRODUCTS = [
	{
		slug: "bape-1st-camo-shark-zip",
		name: "1st Camo Shark Full Zip",
		brand: "A Bathing Ape",
		category: "street",
		price: 890,
		compareAt: 980,
		condition: "Deadstock",
		sizes: [
			"M",
			"L",
			"XL"
		],
		image: "/products/camo-hoodie.jpg",
		alt: "Yellow-green 1st Camo shark full-zip hoodie folded on walnut",
		badges: ["Authenticated", "Featured"],
		featured: true,
		stock: 2,
		description: "The silhouette that still sets the room. Heavyweight Japanese fleece, yellow-green 1st Camo, shark hood — photographed from the piece on the floor. Montrose pickup preferred.",
		details: [
			"Full zip shark hood",
			"1st Camo, yellow / green",
			"Double-checked hardware and print"
		]
	},
	{
		slug: "palm-angels-track-jacket",
		name: "Classic Track Jacket",
		brand: "Palm Angels",
		category: "street",
		price: 720,
		condition: "Excellent",
		sizes: [
			"S",
			"M",
			"L",
			"XL"
		],
		image: "/products/track-jacket.jpg",
		alt: "Black nylon track jacket with white gothic sleeve lettering",
		badges: ["Authenticated"],
		featured: true,
		stock: 3,
		description: "Black nylon, white gothic sleeve lettering, the Palm Angels uniform. Clean collar, unstretched cuffs, no pilling. A closet staple that still reads expensive.",
		details: [
			"Nylon track cloth",
			"Gothic sleeve graphic",
			"Snap + zip front"
		]
	},
	{
		slug: "coach-pebbled-tote",
		name: "Pebbled Leather Tote",
		brand: "Coach",
		category: "street",
		price: 650,
		condition: "Like new",
		image: "/products/leather-tote.jpg",
		alt: "Cognac pebbled leather tote on a dark walnut table",
		badges: ["Authenticated", "One of one"],
		featured: true,
		stock: 1,
		description: "Cognac pebble grain, quiet hardware, no screaming logos. The kind of bag that makes a black hoodie look finished. Interior immaculate.",
		details: [
			"Full-grain pebble leather",
			"Unlined cognac interior",
			"Drop-in Montrose or ship insured"
		]
	},
	{
		slug: "bape-camo-cargo",
		name: "Shark Camo Cargo",
		brand: "A Bathing Ape",
		category: "street",
		price: 420,
		condition: "Excellent",
		sizes: [
			"M",
			"L",
			"XL"
		],
		image: "/products/camo-cargo.jpg",
		alt: "Olive camouflage cargo pants folded with a matching hoodie",
		badges: ["Authenticated"],
		stock: 2,
		description: "Cut to sit over sneakers, printed in the same 1st Camo family as the shark zip. Hem and pockets clean. Pair it or split the set.",
		details: [
			"Relaxed cargo cut",
			"Camo match to the shark zip",
			"Adjustable hem"
		]
	},
	{
		slug: "palm-angels-gothic-tee",
		name: "Gothic Sleeve Tee",
		brand: "Palm Angels",
		category: "street",
		price: 380,
		condition: "Deadstock",
		sizes: [
			"S",
			"M",
			"L",
			"XL"
		],
		image: "/products/gothic-tee.jpg",
		alt: "White oversized t-shirt with black gothic lettering on the sleeve",
		badges: ["New"],
		stock: 4,
		description: "Oversized white jersey, black gothic down the sleeve. The tee people clock from across the room. Still in bag.",
		details: [
			"Heavyweight jersey",
			"Oversized fit",
			"Deadstock, tags on"
		]
	},
	{
		slug: "coach-leather-trim-hoodie",
		name: "Leather-Trim Zip Hoodie",
		brand: "Coach",
		category: "street",
		price: 595,
		condition: "Like new",
		sizes: ["M", "L"],
		image: "/products/cream-hoodie.jpg",
		alt: "Cream leather-trim zip hoodie folded on walnut",
		badges: ["Authenticated"],
		stock: 1,
		description: "Cream fleece with pebble-leather sleeves — Coach doing quiet luxury without going office. Almost no wear on the leather.",
		details: [
			"Leather sleeve panels",
			"Full zip",
			"Warm-weather cream"
		]
	},
	{
		slug: "palm-angels-black-hoodie",
		name: "Heavyweight Black Hoodie",
		brand: "Palm Angels",
		category: "street",
		price: 490,
		condition: "Excellent",
		sizes: [
			"M",
			"L",
			"XL"
		],
		image: "/products/black-hoodie.jpg",
		alt: "Black heavyweight hoodie with a tonal chest patch",
		badges: ["Authenticated"],
		stock: 2,
		description: "The daily driver. Dense cotton, dropped shoulder, tonal chest mark. Washed once, never faded.",
		details: [
			"Heavyweight fleece",
			"Tonal chest",
			"Unisex cut"
		]
	},
	{
		slug: "bape-heavyweight-tee",
		name: "Heavyweight Ape Tee",
		brand: "A Bathing Ape",
		category: "street",
		price: 240,
		condition: "Like new",
		sizes: [
			"M",
			"L",
			"XL"
		],
		image: "/products/black-tee.jpg",
		alt: "Black heavyweight streetwear t-shirt draped on dark stone",
		badges: ["Authenticated"],
		stock: 3,
		description: "Black heavyweight with a tonal chest embroidery. The tee under the shark zip.",
		details: [
			"Heavy cotton",
			"Tonal embroidery",
			"Boxy cut"
		]
	},
	{
		slug: "dandy-el-mago",
		name: "El Mago",
		brand: "Dandy Hats",
		category: "hats",
		price: 245,
		condition: "New, full set",
		image: "/products/mago-cap.jpg",
		alt: "Black Dandy Hats El Mago cap with silver gothic lettering, stars, and hard case on walnut",
		badges: [
			"Full set",
			"Heritage",
			"Scanned"
		],
		featured: true,
		stock: 1,
		description: "The one that made Dandy a house name. Gothic EL MAGO, stars, lightning, moon — satin brim printed to match, crystals that catch every streetlight. Full set in the black hard case. Photographed from the piece on the floor.",
		details: [
			"Heritage El Mago embroidery",
			"Satin brim + crystals",
			"Hard case + card included"
		],
		scan: "IMG_3652.jpg"
	},
	{
		slug: "dandy-g5-crystal-set",
		name: "G5 Crystal",
		brand: "Dandy Hats",
		category: "hats",
		price: 225,
		condition: "New, full set",
		image: "/products/rhinestone-cap.jpg",
		alt: "Black Dandy Hats G5 cap with 3D DANDY lettering, crystals, and hard case on walnut",
		badges: [
			"Full set",
			"Featured",
			"Scanned"
		],
		featured: true,
		stock: 1,
		description: "Structured high crown, 3D DANDY, metallic G5, crystals across the front. The fifth-generation crown people ask for by name. Full set — cap, hard case, authenticity card.",
		details: [
			"High-crown structured G5",
			"3D DANDY + crystals",
			"Hard case + card included"
		],
		scan: "IMG_3653.jpg"
	},
	{
		slug: "dandy-el-jefe",
		name: "El Jefe",
		brand: "Dandy Hats",
		category: "hats",
		price: 215,
		condition: "New, full set",
		image: "/products/jefe-cap.jpg",
		alt: "Black Dandy Hats El Jefe cap with gothic lettering, roses, and hard case on walnut",
		badges: [
			"Full set",
			"Featured",
			"Scanned"
		],
		featured: true,
		stock: 1,
		description: "Gothic EL JEFE, roses, gold dollar signs, crystals. The cap you put on and the room already knows. Satin brim printed to match. Full set, unopened case.",
		details: [
			"Gothic EL JEFE embroidery",
			"Roses + crystals",
			"Hard case included"
		],
		scan: "IMG_4795.jpg"
	},
	{
		slug: "dandy-the-don",
		name: "The Don",
		brand: "Dandy Hats",
		category: "hats",
		price: 215,
		condition: "New, full set",
		image: "/products/don-cap.jpg",
		alt: "Black Dandy Hats The Don cap with gothic lettering, roses, and hard case on walnut",
		badges: ["Full set", "Scanned"],
		featured: true,
		stock: 1,
		description: "THE DON in gothic cream, roses, gold dollars. Quiet money on a high crown. Satin lining, matching under-brim, black hard case.",
		details: [
			"Gothic THE DON embroidery",
			"Roses + gold dollars",
			"Hard case included"
		],
		scan: "IMG_4794.jpg"
	},
	{
		slug: "dandy-the-boss",
		name: "The Boss",
		brand: "Dandy Hats",
		category: "hats",
		price: 215,
		condition: "New, full set",
		image: "/products/boss-cap.jpg",
		alt: "Black Dandy Hats The Boss cap with gothic lettering, roses, crystals, and hard case",
		badges: ["Full set", "Scanned"],
		featured: true,
		stock: 1,
		scan: "IMG_4798.jpg",
		description: "THE BOSS in gothic cream, roses, gold dollars, crystals. Full set in the black hard case — scanned from the piece on the floor. No stand-in.",
		details: [
			"Gothic THE BOSS embroidery",
			"Roses + crystals",
			"Hard case included"
		]
	},
	{
		slug: "dandy-pandillero",
		name: "Pandillero",
		brand: "Dandy Hats",
		category: "hats",
		price: 195,
		condition: "New, full set",
		image: "/products/pandillero-cap.jpg",
		alt: "Black Dandy Hats Pandillero cap with gold gothic lettering, roses, and hard case on walnut",
		badges: ["Full set", "Scanned"],
		stock: 1,
		description: "PANDILLERO in gold gothic, roses, dollar signs, DANDY HATS across the brim. Heavy in the hand. This is the one that does not come off at dinner.",
		details: [
			"Gold gothic PANDILLERO",
			"Roses + crystals",
			"Hard case included"
		],
		scan: "IMG_3821.jpg"
	},
	{
		slug: "dandy-la-gangstera",
		name: "La Gangstera",
		brand: "Dandy Hats",
		category: "hats",
		price: 195,
		condition: "New, full set",
		image: "/products/gangstera-cap.jpg",
		alt: "Black Dandy Hats La Gangstera cap with gothic lettering, roses, and hard case on walnut",
		badges: ["Full set", "Scanned"],
		stock: 1,
		description: "LA GANGSTERA in gothic cream on black. Roses, gold dollars, crystals. The sister piece — same house, same night.",
		details: [
			"Gothic LA GANGSTERA",
			"Roses + crystals",
			"Hard case included"
		],
		scan: "IMG_4791.jpg"
	},
	{
		slug: "dandy-la-gangstera-burgundy",
		name: "La Gangstera — Burgundy",
		brand: "Dandy Hats",
		category: "hats",
		price: 195,
		condition: "New, full set",
		image: "/products/gangstera-burgundy.jpg",
		alt: "Burgundy Dandy Hats La Gangstera cap with gold gothic lettering and hard case on walnut",
		badges: ["Full set", "Scanned"],
		stock: 1,
		description: "Burgundy crown, gold LA GANGSTERA, roses, crystals. The colorway that photographs like jewelry. Full set in the black case.",
		details: [
			"Burgundy structured crown",
			"Gold gothic + roses",
			"Hard case included"
		],
		scan: "IMG_4752.jpg"
	},
	{
		slug: "dandy-wordmark",
		name: "Dandy 3D Wordmark",
		brand: "Dandy Hats",
		category: "hats",
		price: 175,
		condition: "New, full set",
		image: "/products/dandy-wordmark.jpg",
		alt: "Black Dandy Hats 3D wordmark cap with cream DANDY lettering and hard case on walnut",
		badges: ["Full set", "Scanned"],
		stock: 2,
		description: "Raised cream DANDY, metallic HATS, crystals. The house wordmark — quieter than El Mago, still unmistakably Dandy. Full set.",
		details: [
			"3D DANDY wordmark",
			"Crystal scatter",
			"Hard case included"
		],
		scan: "IMG_4793.jpg"
	},
	{
		slug: "son-of-god-32",
		name: "Son of God 32",
		brand: "Son of God",
		category: "hats",
		price: 165,
		condition: "New",
		image: "/products/son-of-god.jpg",
		alt: "Black Son of God cap with white gothic lettering, number 32, and chrome cross charms",
		badges: [
			"Featured",
			"House",
			"Scanned"
		],
		featured: true,
		stock: 1,
		description: "The creed on a crown. White gothic SON OF GOD, 32 on the side, tribal flame, chrome crosses. Photographed from the crate on the floor. Dios sobre todo — this is the one that says it without talking.",
		details: [
			"Gothic SON OF GOD + 32",
			"Chrome cross charms",
			"Structured black crown"
		],
		scan: "CE3FB6D8.jpg"
	},
	{
		slug: "dandy-otb",
		name: "Only The Best",
		brand: "Dandy Hats",
		category: "hats",
		price: 155,
		condition: "New",
		image: "/products/otb-cap.jpg",
		alt: "Black Dandy Only The Best cap with gothic lettering and tonal 3D embroidery",
		badges: ["New", "Scanned"],
		featured: true,
		stock: 1,
		description: "OTB. Gothic Only The Best, heavy 3D tonal embroidery, crystals. The quiet-flex Dandy — black on black until the light hits.",
		details: [
			"Gothic Only The Best",
			"3D tonal front",
			"Crystals"
		],
		scan: "95B50775.jpg"
	},
	{
		slug: "dandy-gothic-stack",
		name: "DANDY Gothic",
		brand: "Dandy Hats",
		category: "hats",
		price: 125,
		condition: "New",
		image: "/products/dandy-gothic.jpg",
		alt: "Black cap with stacked white Old English DANDY lettering",
		badges: ["New", "Scanned"],
		stock: 1,
		description: "Stacked Old English DANDY in white on black. No case needed. The wordmark people clock from across the lot.",
		details: [
			"Old English DANDY",
			"White on black",
			"Structured crown"
		],
		scan: "95B50775.jpg"
	},
	{
		slug: "when-legends-rise",
		name: "When Legends Rise",
		brand: "Street Crown",
		category: "hats",
		price: 145,
		condition: "New",
		image: "/products/legends-cap.jpg",
		alt: "Black cap with white skeleton embroidery, script lettering, and flame side panels",
		badges: ["New", "Scanned"],
		stock: 1,
		description: "Skeleton, script, white flame panels, crystals. The night-ride crown. Heavy embroidery, sits like it means it.",
		details: [
			"Skeleton + script front",
			"White flame sides",
			"Crystal scatter"
		],
		scan: "95B50775.jpg"
	},
	{
		slug: "love-daisy",
		name: "LOVE Daisy",
		brand: "Street Crown",
		category: "hats",
		price: 135,
		condition: "New",
		image: "/products/love-cap.jpg",
		alt: "Black cap with white daisy embroidery, LOVE lettering, and crystals",
		badges: ["New", "Scanned"],
		stock: 1,
		description: "Daisy, LOVE, crystals. Soft name, hard crown. The one that still goes with a black hoodie.",
		details: [
			"White daisy embroidery",
			"LOVE lettering",
			"Crystals"
		],
		scan: "95B50775.jpg"
	},
	{
		slug: "chase-funko-street-chrome",
		name: "Street Chrome — Chase",
		brand: "Funko Chase",
		category: "vault",
		price: 185,
		condition: "Mint in box",
		image: "/products/funko-chrome.jpg",
		alt: "Metallic chrome vinyl figure in a streetwear hoodie",
		badges: ["Chase", "MIB"],
		featured: true,
		tradeable: true,
		stock: 1,
		description: "Metallic chrome chase, street hoodie, window box clean. Chase pieces move when the algorithm does — this one is already trending above retail.",
		details: [
			"Chase metallic paint",
			"Mint in box",
			"Open to trade for graded grails"
		]
	},
	{
		slug: "chase-funko-gitd-varsity",
		name: "GITD Varsity — Chase",
		brand: "Funko Chase",
		category: "vault",
		price: 160,
		condition: "Mint in box",
		image: "/products/funko-glow.jpg",
		alt: "Glow-in-the-dark teal vinyl figure in a varsity jacket",
		badges: ["Chase", "GITD"],
		tradeable: true,
		stock: 2,
		description: "Glow-in-the-dark teal chase, varsity jacket. Box corners sharp. A liquid chase — easy to flip or stack.",
		details: [
			"Glow-in-the-dark chase",
			"Mint window box",
			"Trades considered"
		]
	},
	{
		slug: "chase-funko-gold-tuxedo",
		name: "Gold Tuxedo — Chase",
		brand: "Funko Chase",
		category: "vault",
		price: 240,
		condition: "Mint in box",
		image: "/products/funko-gold.jpg",
		alt: "Metallic gold vinyl figure in a black tuxedo",
		badges: ["Chase", "Grail"],
		featured: true,
		tradeable: true,
		stock: 1,
		description: "Gold chase tuxedo. The one collectors screenshot. Box is museum-clean. Serious offers and graded-card trades only.",
		details: [
			"Metallic gold chase",
			"Mint in box",
			"Vault locked — ask to see it"
		]
	},
	{
		slug: "funko-ronin-deluxe",
		name: "The Ronin Deluxe",
		brand: "Funko · Star Wars",
		category: "vault",
		price: 75,
		condition: "Mint in box",
		image: "/products/funko-ronin.jpg",
		alt: "Deluxe boxed vinyl figure The Ronin and B5-56, Target exclusive, on the house shelf",
		badges: ["Deluxe", "MIB"],
		featured: true,
		tradeable: true,
		stock: 1,
		description: "Deluxe 502 — The Ronin and B5-56, Target exclusive. Window box clean, photographed on the shelf next to the rest of the Star Wars run. Trades considered.",
		details: [
			"Deluxe two-pack",
			"Target exclusive",
			"Mint in box"
		]
	},
	{
		slug: "funko-star-wars-shelf",
		name: "Star Wars Shelf — Six In Box",
		brand: "Funko · Star Wars",
		category: "vault",
		price: 210,
		condition: "Mint in box",
		image: "/products/funko-shelf.jpg",
		alt: "Six boxed Star Wars vinyl figures on a wooden shelf including Hunter, Cassian Andor, and Fennec Shand",
		badges: ["MIB", "Set"],
		tradeable: true,
		stock: 1,
		description: "The shelf as it sits. Hunter, Cassian Andor, Fennec Shand, The Mandalorian, Bo-Katan, Vader — in box, photographed in-house. Sold as a run. Split only if the house says so.",
		details: [
			"Six mint-in-box",
			"Photographed on the shelf",
			"Package trades welcome"
		]
	},
	{
		slug: "pokemon-raw-book",
		name: "The Book — Raw Mix",
		brand: "Pokémon",
		category: "vault",
		price: 95,
		condition: "Raw, mixed",
		image: "/products/pokemon-book.jpg",
		alt: "Tray of raw Pokémon cards including holos and energies, photographed in-house",
		badges: ["Raw", "Tradeable"],
		tradeable: true,
		stock: 1,
		description: "The tray. Modern holos, hits, energies — raw, not slabbed. Photographed from the floor. A liquid lot for the book, or a start toward something graded. Trades into slabs considered.",
		details: [
			"Raw mixed lot",
			"Holos in the mix",
			"Photographed in-house"
		]
	},
	{
		slug: "pokemon-charizard-base-psa8",
		name: "1999 Base Set Charizard Holo",
		brand: "Pokémon · PSA 8",
		category: "vault",
		price: 2850,
		condition: "Graded",
		grade: "PSA 8 NM-MT",
		image: "/products/card-dragon.jpg",
		alt: "Graded holographic fire-dragon trading card in a clear slab",
		badges: ["PSA 8", "Grail"],
		featured: true,
		tradeable: true,
		stock: 1,
		description: "The dragon. Unlimited Base Set holofoil Charizard, PSA 8. Clean slab, tight label, photographed in-house. A masterpiece of the hobby — priced as such. People fly into Montrose for this one.",
		details: [
			"1999 Base Set unlimited",
			"PSA 8 NM-MT",
			"In-house photographed slab"
		]
	},
	{
		slug: "pokemon-pikachu-sir-psa10",
		name: "Pikachu SIR — Surging Sparks",
		brand: "Pokémon · PSA 10",
		category: "vault",
		price: 640,
		condition: "Graded",
		grade: "PSA 10 GEM MT",
		image: "/products/card-electric.jpg",
		alt: "Graded holographic electric-creature trading card in a clear slab",
		badges: ["PSA 10", "Chase"],
		tradeable: true,
		stock: 1,
		description: "Modern electric chase in a perfect 10. Rainbow foil, gem mint, no haze. A liquid PSA 10 — hold it or trade it into a vintage slot.",
		details: [
			"Special illustration rare",
			"PSA 10 GEM MT",
			"Trades into vintage considered"
		]
	},
	{
		slug: "lorcana-enchanted-cgc10",
		name: "Enchanted Fox Sorcerer",
		brand: "Lorcana · CGC 10",
		category: "vault",
		price: 890,
		condition: "Graded",
		grade: "CGC 10 Pristine",
		image: "/products/card-fox.jpg",
		alt: "Graded enchanted-style trading card of a fox sorcerer in sapphire robes",
		badges: ["CGC 10", "Enchanted"],
		featured: true,
		tradeable: true,
		stock: 1,
		description: "Enchanted foil, CGC 10 Pristine. Lorcana’s luxury slot — gold stamp, sapphire robes, the card that made the TCG feel like a house piece.",
		details: [
			"Enchanted foil",
			"CGC 10 Pristine",
			"Vaulted until pickup"
		]
	},
	{
		slug: "lorcana-knight-psa10",
		name: "Moonlit Knight Wolf",
		brand: "Lorcana · PSA 10",
		category: "vault",
		price: 420,
		condition: "Graded",
		grade: "PSA 10 GEM MT",
		image: "/products/card-wolf.jpg",
		alt: "Graded holographic card of a silver armored wolf knight",
		badges: ["PSA 10"],
		tradeable: true,
		stock: 1,
		description: "Legendary foil in a PSA 10. Armored wolf, moonlight, rainbow. A sharp entry into the graded Lorcana book.",
		details: [
			"Legendary foil",
			"PSA 10 GEM MT",
			"Open to package trades"
		]
	}
];
function getProduct(slug) {
	return PRODUCTS.find((p) => p.slug === slug);
}
[...new Set(PRODUCTS.map((p) => p.brand.split(" · ")[0]))];
function patchOverlay(overlays, slug, patch) {
	return {
		...overlays,
		[slug]: {
			...overlays[slug],
			...patch
		}
	};
}
var useInventory = create()(persist((set, get) => ({
	overlays: {},
	incoming: [],
	setStatus: (slug, status) => set({ overlays: patchOverlay(get().overlays, slug, { status }) }),
	setStock: (slug, stock) => set({ overlays: patchOverlay(get().overlays, slug, { stock: Math.max(0, stock) }) }),
	setPrice: (slug, price) => set({ overlays: patchOverlay(get().overlays, slug, { price: Math.max(0, price) }) }),
	addIncoming: (scan) => {
		const row = {
			...scan,
			id: crypto.randomUUID(),
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			status: "draft"
		};
		set({ incoming: [row, ...get().incoming] });
		return row;
	},
	patchIncoming: (id, patch) => set({ incoming: get().incoming.map((s) => s.id === id ? {
		...s,
		...patch
	} : s) }),
	dropIncoming: (id) => set({ incoming: get().incoming.filter((s) => s.id !== id) })
}), { name: "casa-backroom" }));
function defaultStatus(p) {
	if (p.category !== "hats") return "live";
	return p.scan ? "live" : "draft";
}
function applyOverlay(p, overlay) {
	return {
		...p,
		status: overlay?.status ?? defaultStatus(p),
		stock: overlay?.stock ?? p.stock,
		price: overlay?.price ?? p.price
	};
}
function incomingToProduct(s) {
	return {
		slug: `scan-${s.id}`,
		name: s.name,
		brand: s.brand,
		category: "hats",
		price: s.price,
		condition: "New",
		image: s.image,
		alt: `${s.name} — scanned in the backroom`,
		badges: s.status === "live" ? ["Scanned"] : ["Draft"],
		description: "Scanned in the backroom. Hits the floor only after the house confirms it.",
		details: ["Photographed in-house", `Scan: ${s.scanName}`],
		stock: s.stock,
		scan: s.scanName,
		status: s.status,
		incoming: true
	};
}
function buildDesk(overlays, incoming) {
	const seeded = PRODUCTS.filter((p) => p.category === "hats").map((p) => applyOverlay(p, overlays[p.slug]));
	return [...incoming.map(incomingToProduct), ...seeded];
}
function buildFloor(overlays, incoming) {
	const seeded = PRODUCTS.map((p) => applyOverlay(p, overlays[p.slug]));
	const extras = incoming.filter((s) => s.status === "live").map(incomingToProduct);
	return [...seeded, ...extras].filter((p) => {
		if (p.stock <= 0) return false;
		if (p.category !== "hats") return true;
		return p.status === "live" && Boolean(p.scan);
	});
}
function useFloor() {
	const overlays = useInventory((s) => s.overlays);
	const incoming = useInventory((s) => s.incoming);
	return (0, import_react.useMemo)(() => buildFloor(overlays, incoming), [overlays, incoming]);
}
function useDesk() {
	const overlays = useInventory((s) => s.overlays);
	const incoming = useInventory((s) => s.incoming);
	return (0, import_react.useMemo)(() => buildDesk(overlays, incoming), [overlays, incoming]);
}
function useFloorProduct(slug) {
	return useFloor().find((p) => p.slug === slug);
}
//#endregion
export { useFloorProduct as a, useFloor as i, getProduct as n, useInventory as o, useDesk as r, CATEGORIES as t };
