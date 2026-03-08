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
    // Mapped to current parent Shopify products so kits resolve commerce immediately.
    "ceo-confessions": "how-to-become-a-mogul-while-falling-in-love",
    "emotional-intelligence": "how-to-become-a-mogul-while-falling-in-love",
    "leadership-and-love": "how-to-become-a-mogul-while-falling-in-love",
    "legacy-and-longevity": "how-to-become-a-mogul-while-falling-in-love",
    "paperwork-and-pillow-talk": "how-to-become-a-mogul-while-falling-in-love",
    "the-fatherhood-framework": "how-to-become-a-mogul-while-falling-in-love",
    "the-heart-ledger": "how-to-become-a-mogul-while-falling-in-love",
    "the-mogul-mindset-kit": "how-to-become-a-mogul-while-falling-in-love",
    "the-pre-trust-toolkit": "how-to-become-a-mogul-while-falling-in-love",
    "trust-before-touch": "how-to-become-a-mogul-while-falling-in-love",
    "universal-red-flags": "sign-here-blueprint-decoded",
    "the-signback": "sign-here-blueprint-decoded",
    "the-sync-bag": "sign-here-blueprint-decoded",
    "fan-funnel-kit": "sign-here-blueprint-decoded",
    "sample-clearance-kit": "sign-here-blueprint-decoded",
    "rollout-kit": "sign-here-blueprint-decoded",
    "label-deal-kit": "sign-here-blueprint-decoded",
    "how-to-start-an-indie-record-label": "sign-here-blueprint-decoded",
    "distribution-protection-kit": "sign-here-blueprint-decoded",
    "artist-legal-glossary": "sign-here-blueprint-decoded",
    "seven-steps-to-get-paid": "sign-here-blueprint-decoded",
    "seven-steps-to-find-every-dollar": "sign-here-blueprint-decoded",
    "seven-steps-to-claim-every-royalty": "sign-here-blueprint-decoded",
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

