export type ShopifyHandleCategory = "books" | "kits" | "essays" | "comics";

export type ShopifyHandleMap = Record<ShopifyHandleCategory, Record<string, string | null>>;

/**
 * Manual Shopify handle mapping (highest-priority matcher).
 * Fill handle strings as products are published in Shopify.
 * Keep null when a local item is not yet in Shopify.
 */
export const SHOPIFY_HANDLE_MAP: ShopifyHandleMap = {
  books: {
    // Explicit mismatch fixes
    "founder-glenn-by-elias-marlowe": "founder-glenn-architect-of-inevitability",
    "nation-inside-a-nation-the-empire-signs-back": "nation-inside-a-nation-empire-signs-back",
    "supreme-dictionary": "supreme-dictionary",
    "the-prince": "the-prince",
    "the-64-laws-of-black-power": "the-64-laws-of-black-power",
    "the-unit": "the-unit",
  },
  kits: {
    // Direct one-to-one kit slug -> Shopify product handle mapping.
    "ceo-confessions": "ceo-confessions",
    "emotional-intelligence": "emotional-intelligence",
    "leadership-and-love": "leadership-and-love",
    "legacy-and-longevity": "legacy-and-longevity",
    "paperwork-and-pillow-talk": "paperwork-and-pillow-talk",
    "the-fatherhood-framework": "the-fatherhood-framework",
    "the-heart-ledger": "the-heart-ledger",
    "the-mogul-mindset-kit": "the-mogul-mindset-kit",
    "the-pre-trust-toolkit": "the-pre-trust-toolkit",
    "trust-before-touch": "trust-before-touch",
    "universal-red-flags": "universal-red-flags",
    "the-signback": "the-sync-bag",
    "the-sync-bag": "the-sync-bag",
    "fan-funnel-kit": "fan-funnel-kit",
    "sample-clearance-kit": "sample-clearance-kit",
    "rollout-kit": "rollout-kit",
    "label-deal-kit": "label-deal-kit",
    "how-to-start-an-indie-record-label": "how-to-start-an-indie-record-label",
    "distribution-protection-kit": "distribution-protection-kit",
    "artist-legal-glossary": "artist-legal-glossary",
    "seven-steps-to-get-paid": "seven-steps-to-get-paid",
    "seven-steps-to-find-every-dollar": "seven-steps-to-find-every-dollar",
    "seven-steps-to-claim-every-royalty": "seven-steps-to-claim-every-royalty",
    "trust-fund-game": "trust-fund-game",
    "artist-management-starter-kit": "artist-management-starter-kit",
    "indie-artist-legal-kit": "indie-artist-legal-kit",
  },
  essays: {
    // Add essay mappings here as needed.
  },
  comics: {
    // Comics included and explicitly mappable.
    "the-river-in-the-sea-the-voyage-of-mansa-muhammad": "the-river-in-the-sea",
    "black-caesar-the-adventures-of-blackbeard": "black-caesar",
    "dorian-vaughn-vaudeville-villain": "dorian-vaughn-vaudeville-villain",
    "dorian-vaughn-venomous-villain": "dorian-vaughn-venomous-villain",
    "dorian-vaughn-vale-take-me-to-your-leader": "take-me-to-your-leader",
    "dr-daniel-dorian-vale-operation-special-herbs": "dr-daniel-dorian-vale-special-operations",
    "dr-daniel-dorian-vale-iron-fingers": "dr-daniel-dorian-vale-iron-fingers",
    "dr-daniel-dorian-vale-madvillainy": "dr-daniel-dorian-vale-mad-villainy",
    "dr-daniel-dorian-vale-operation-vail": "dr-daniel-dorian-vale-operation-vale",
    "dr-daniel-dorian-vale-rap-sorcery": "dr-daniel-dorian-vale-rap-sorcery",
    "dr-daniel-dorian-vale-take-me-to-your-leader-ii": "take-me-to-your-leader-2",
    "dr-daniel-dorian-vale-operation-food": "dr-daniel-dorian-vale-operation-food",
    "juice": "juice",
    "new-atlantis": "new-atlantis",
    "the-advantages-of-crackman": "the-adventures-of-crackman",
    "ultraman": "ultraman",
    "ultraman-the-outliers": "ultraman-the-outliers",
  },
};

