export type ShopifyHandleCategory = "books" | "kits" | "essays" | "comics";

export type ShopifyHandleMap = Record<ShopifyHandleCategory, Record<string, string | null>>;

/**
 * Manual Shopify handle mapping (highest-priority matcher).
 * Fill handle strings as products are published in Shopify.
 * Keep null when a local item is not yet in Shopify.
 */
export const SHOPIFY_HANDLE_MAP: ShopifyHandleMap = {
  books: {
    // Known currently unmatched books (seeded for easy filling)
    "founder-glenn-by-elias-marlowe": null, // founder-glenn-architect-of-inevitability
    "nation-inside-a-nation-the-empire-signs-back": null,
    "supreme-dictionary": null,
    "the-prince": null,
    "the-64-laws-of-black-power": null,
    "the-unit": null,
  },
  kits: {
    // Known currently unmatched kits (seeded for easy filling)
    "ceo-confessions": null,
    "emotional-intelligence": null,
    "leadership-and-love": null, // leadership-love
    "legacy-and-longevity": null, // legacy-longevity
    "paperwork-and-pillow-talk": null, // paperwork-pillow-talk
    "the-fatherhood-framework": null,
    "the-heart-ledger": null,
    "the-mogul-mindset-kit": null,
    "the-pre-trust-toolkit": null,
    "trust-before-touch": null,
    "universal-red-flags": null,
    "the-signback": null, // the-sync-bag
    "fan-funnel-kit": null,
    "sample-clearance-kit": null,
    "rollout-kit": null,
    "label-deal-kit": null,
    "how-to-start-an-indie-record-label": null,
    "distribution-protection-kit": null,
    "artist-legal-glossary": null,
    "seven-steps-to-get-paid": null,
    "seven-steps-to-find-every-dollar": null,
    "seven-steps-to-claim-every-royalty": null,
  },
  essays: {
    // Add essay mappings here as needed.
  },
  comics: {
    // Comics included in mapping structure (seeded for future matching)
    "the-river-in-the-sea-the-voyage-of-mansa-muhammad": null,
    "black-caesar-the-adventures-of-blackbeard": null,
    "dorian-vaughn-vaudeville-villain": null,
    "dorian-vaughn-venomous-villain": null,
    "dorian-vaughn-vale-take-me-to-your-leader": null,
    "dr-daniel-dorian-vale-operation-special-herbs": null,
    "dr-daniel-dorian-vale-iron-fingers": null,
    "dr-daniel-dorian-vale-madvillainy": null,
    "dr-daniel-dorian-vale-operation-vail": null,
    "dr-daniel-dorian-vale-rap-sorcery": null,
    "dr-daniel-dorian-vale-take-me-to-your-leader-ii": null,
    "dr-daniel-dorian-vale-operation-food": null,
    "juice": null,
    "new-atlantis": null,
    "the-advantages-of-crackman": null,
    "ultraman": null,
    "ultraman-the-outliers": null,
  },
};

