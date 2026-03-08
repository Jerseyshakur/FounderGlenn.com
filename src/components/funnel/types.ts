export type FunnelLinkAction = {
  type: "link";
  label: string;
  href: string;
  external?: boolean;
};

export type FunnelOpenCartAction = {
  type: "open-cart";
  label: string;
};

export type FunnelShopifyAction = {
  type: "shopify-add" | "shopify-buy-now";
  label: string;
  variantId: string;
  productHandle?: string;
  productTitle?: string;
  productCategory?: string;
  priceAmount?: string;
  priceCurrencyCode?: string;
};

export type FunnelAction = FunnelLinkAction | FunnelOpenCartAction | FunnelShopifyAction;

export type FunnelHeroData = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryAction?: FunnelAction;
  secondaryAction?: FunnelAction;
  proofPoints?: string[];
};

export type FunnelProblemData = {
  eyebrow?: string;
  title: string;
  description?: string;
  points: string[];
};

export type FunnelOfferItem = {
  title: string;
  description: string;
};

export type FunnelOfferData = {
  eyebrow?: string;
  title: string;
  description?: string;
  items: FunnelOfferItem[];
};

export type FunnelOfferStackItem = {
  label: string;
  detail?: string;
};

export type FunnelOfferStackData = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: FunnelOfferStackItem[];
};

export type FunnelAuthorityData = {
  eyebrow?: string;
  title: string;
  body: string;
  trustPoints?: string[];
  quote?: string;
  quoteAttribution?: string;
};

export type FunnelTransformationData = {
  eyebrow?: string;
  title: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforePoints: string[];
  afterPoints: string[];
};

export type FunnelCtaData = {
  eyebrow?: string;
  title: string;
  body?: string;
  primaryAction: FunnelAction;
  secondaryAction?: FunnelAction;
};

export type FunnelUpsellItem = {
  title: string;
  description: string;
  action?: FunnelAction;
};

export type FunnelUpsellData = {
  eyebrow?: string;
  title: string;
  description?: string;
  items: FunnelUpsellItem[];
};

export type FunnelFaqItem = {
  question: string;
  answer: string;
};

export type FunnelFaqData = {
  eyebrow?: string;
  title: string;
  items: FunnelFaqItem[];
};

export type FunnelLeadCaptureData = {
  eyebrow?: string;
  title: string;
  body?: string;
  ctaLabel?: string;
  placeholder?: string;
  formActionUrl?: string;
  integrationNote?: string;
};

export type FunnelPageConfig = {
  slug: string;
  hero: FunnelHeroData;
  problem?: FunnelProblemData;
  offer?: FunnelOfferData;
  offerStack?: FunnelOfferStackData;
  authority?: FunnelAuthorityData;
  transformation?: FunnelTransformationData;
  cta?: FunnelCtaData;
  upsells?: FunnelUpsellData;
  faq?: FunnelFaqData;
  leadCapture?: FunnelLeadCaptureData;
};
