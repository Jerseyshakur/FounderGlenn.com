import type { DetailedHTMLProps, HTMLAttributes } from "react";

type ShopifyElementProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  query?: string;
  handle?: string;
  gid?: string;
  type?: string;
  first?: string;
  sortKey?: string;
  "sort-key"?: string;
  "reverse-order"?: boolean;
  "wait-for-update"?: boolean;
  "store-domain"?: string;
  "public-access-token"?: string;
  country?: string;
  language?: string;
  format?: string;
  width?: string | number;
  height?: string | number;
  slot?: string;
  onclick?: string;
  "shopify-loading-placeholder"?: string | boolean;
  [key: `shopify-attr--${string}`]: string | boolean | undefined;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "shopify-store": ShopifyElementProps;
      "shopify-context": ShopifyElementProps;
      "shopify-list-context": ShopifyElementProps;
      "shopify-data": ShopifyElementProps;
      "shopify-media": ShopifyElementProps;
      "shopify-money": ShopifyElementProps;
      "shopify-cart": ShopifyElementProps;
      "shopify-variant-selector": ShopifyElementProps;
    }
  }
}

export {};

