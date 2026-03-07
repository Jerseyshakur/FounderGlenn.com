export type KitParent = "mogul-while-falling-in-love" | "sign-here";

export type KitItem = {
  slug: string;
  title: string;
  type: "kit";
  parent: KitParent;
  coverSrc?: string;
};

export const KIT_PARENTS: { id: KitParent; title: string }[] = [
  {
    id: "mogul-while-falling-in-love",
    title: "How to Become a Mogul While Falling in Love",
  },
  {
    id: "sign-here",
    title: "Sign Here: The Blueprint Decoded",
  },
];

const KIT_COVER_OVERRIDES: Record<string, string> = {
  "distribution-protection-kit": "/covers/kits/distribution-protection-kit.jpg",
  "artist-legal-glossary": "/covers/kits/artist-legal-glossary.jpeg",
  "seven-steps-to-find-every-dollar": "/covers/kits/seven-steps-to-find-every-dollar.jpg",
};

const KIT_ITEMS: Omit<KitItem, "coverSrc">[] = [
  { slug: "ceo-confessions", title: "CEO Confessions", type: "kit", parent: "mogul-while-falling-in-love" },
  {
    slug: "emotional-intelligence",
    title: "Emotional Intelligence",
    type: "kit",
    parent: "mogul-while-falling-in-love",
  },
  {
    slug: "leadership-and-love",
    title: "Leadership & Love",
    type: "kit",
    parent: "mogul-while-falling-in-love",
  },
  {
    slug: "legacy-and-longevity",
    title: "Legacy & Longevity",
    type: "kit",
    parent: "mogul-while-falling-in-love",
  },
  {
    slug: "paperwork-and-pillow-talk",
    title: "Paperwork & Pillow Talk",
    type: "kit",
    parent: "mogul-while-falling-in-love",
  },
  {
    slug: "the-fatherhood-framework",
    title: "The Fatherhood Framework",
    type: "kit",
    parent: "mogul-while-falling-in-love",
  },
  {
    slug: "the-heart-ledger",
    title: "The Heart Ledger",
    type: "kit",
    parent: "mogul-while-falling-in-love",
  },
  {
    slug: "the-mogul-mindset-kit",
    title: "The Mogul Mindset Kit",
    type: "kit",
    parent: "mogul-while-falling-in-love",
  },
  {
    slug: "the-pre-trust-toolkit",
    title: "The Pre-Trust Toolkit",
    type: "kit",
    parent: "mogul-while-falling-in-love",
  },
  {
    slug: "trust-before-touch",
    title: "Trust Before Touch",
    type: "kit",
    parent: "mogul-while-falling-in-love",
  },
  {
    slug: "universal-red-flags",
    title: "Universal Red Flags",
    type: "kit",
    parent: "sign-here",
  },
  { slug: "the-signback", title: "The Signback", type: "kit", parent: "sign-here" },
  { slug: "fan-funnel-kit", title: "Fan Funnel Kit", type: "kit", parent: "sign-here" },
  {
    slug: "sample-clearance-kit",
    title: "Sample Clearance Kit",
    type: "kit",
    parent: "sign-here",
  },
  { slug: "rollout-kit", title: "Rollout Kit", type: "kit", parent: "sign-here" },
  { slug: "label-deal-kit", title: "Label Deal Kit", type: "kit", parent: "sign-here" },
  {
    slug: "how-to-start-an-indie-record-label",
    title: "How to Start an Indie Record Label",
    type: "kit",
    parent: "sign-here",
  },
  {
    slug: "distribution-protection-kit",
    title: "Distribution Protection Kit",
    type: "kit",
    parent: "sign-here",
  },
  {
    slug: "artist-legal-glossary",
    title: "Artist Legal Glossary",
    type: "kit",
    parent: "sign-here",
  },
  { slug: "seven-steps-to-get-paid", title: "Seven Steps to Get Paid", type: "kit", parent: "sign-here" },
  {
    slug: "seven-steps-to-find-every-dollar",
    title: "Seven Steps to Find Every Dollar",
    type: "kit",
    parent: "sign-here",
  },
  {
    slug: "seven-steps-to-claim-every-royalty",
    title: "Seven Steps to Claim Every Royalty",
    type: "kit",
    parent: "sign-here",
  },
];

export const KITS: KitItem[] = KIT_ITEMS.map((kit) => ({
  ...kit,
  coverSrc: KIT_COVER_OVERRIDES[kit.slug] || `/covers/kits/${kit.slug}.png`,
}));
