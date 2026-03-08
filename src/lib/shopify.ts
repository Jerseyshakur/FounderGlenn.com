import { SHOPIFY_HANDLE_MAP } from "@/content/shopify-handle-map";

export type ShopifyCategory = "books" | "kits" | "essays";

export type ShopifyProductSummary = {
  handle: string;
  title: string;
  description: string;
  productType: string;
  tags: string[];
  featuredImageUrl?: string;
  priceAmount?: string;
  priceCurrencyCode?: string;
  variantId?: string;
  availableForSale?: boolean;
};

export type LocalCatalogItem = {
  slug: string;
  title: string;
  coverSrc?: string;
  description?: string;
};

export type HydratedCatalogItem<T extends LocalCatalogItem> = T & {
  shopify: ShopifyProductSummary | null;
  matchMethod: "handle" | "title" | null;
};

export type ShopifyHydrationResult<T extends LocalCatalogItem> = {
  source: "collection" | "inferred" | "none" | "error";
  usedFallback: boolean;
  items: HydratedCatalogItem<T>[];
  unmatchedLocal: string[];
  unmatchedShopify: string[];
};

type StorefrontResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

export const SHOPIFY_STORE_DOMAIN = "https://wu8ctw-1g.myshopify.com";
export const SHOPIFY_PUBLIC_STOREFRONT_TOKEN = "6d82559564b46dd7be0964e398a67f58";

const SHOPIFY_STOREFRONT_ENDPOINT = `${SHOPIFY_STORE_DOMAIN}/api/2025-04/graphql.json`;

const CATEGORY_COLLECTION_CANDIDATES: Record<ShopifyCategory, string[]> = {
  books: ["books", "book", "books-collection"],
  kits: ["kits", "kit", "kits-collection"],
  essays: ["essays", "essay", "essays-collection"],
};

const CATEGORY_KEYWORDS: Record<ShopifyCategory, string[]> = {
  books: ["book", "books"],
  kits: ["kit", "kits", "toolkit", "playbook"],
  essays: ["essay", "essays"],
};

async function storefrontFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(SHOPIFY_STOREFRONT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_PUBLIC_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Shopify storefront request failed: ${response.status}`);
  }

  const payload = (await response.json()) as StorefrontResponse<T>;
  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join(", "));
  }
  if (!payload.data) {
    throw new Error("Shopify storefront returned no data.");
  }

  return payload.data;
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function normalizeTitle(value: string): string {
  return normalize(value).replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
}

function normalizeKey(value: string): string {
  return normalize(value).replace(/[^a-z0-9]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

function isUsableProduct(product: ShopifyProductSummary): boolean {
  return Boolean(product.handle && product.title);
}

function inferCategory(product: ShopifyProductSummary): ShopifyCategory | null {
  const haystack = [
    product.productType,
    product.title,
    product.description,
    ...product.tags,
  ]
    .map(normalize)
    .join(" ");

  if (CATEGORY_KEYWORDS.kits.some((keyword) => haystack.includes(keyword))) return "kits";
  if (CATEGORY_KEYWORDS.essays.some((keyword) => haystack.includes(keyword))) return "essays";
  if (CATEGORY_KEYWORDS.books.some((keyword) => haystack.includes(keyword))) return "books";
  return null;
}

function toProductSummary(node: {
  handle: string;
  title: string;
  description: string;
  productType: string;
  tags: string[];
  featuredImage?: { url: string } | null;
  selectedOrFirstAvailableVariant?: {
    id: string;
    availableForSale: boolean;
    price?: { amount: string; currencyCode: string } | null;
  } | null;
}): ShopifyProductSummary {
  return {
    handle: node.handle,
    title: node.title,
    description: node.description ?? "",
    productType: node.productType ?? "",
    tags: node.tags ?? [],
    featuredImageUrl: node.featuredImage?.url,
    variantId: node.selectedOrFirstAvailableVariant?.id,
    availableForSale: node.selectedOrFirstAvailableVariant?.availableForSale,
    priceAmount: node.selectedOrFirstAvailableVariant?.price?.amount,
    priceCurrencyCode: node.selectedOrFirstAvailableVariant?.price?.currencyCode,
  };
}

export async function getShopifyProductByHandle(handle: string): Promise<ShopifyProductSummary | null> {
  const data = await storefrontFetch<{
    productByHandle: {
      handle: string;
      title: string;
      description: string;
      productType: string;
      tags: string[];
      featuredImage?: { url: string } | null;
      selectedOrFirstAvailableVariant?: {
        id: string;
        availableForSale: boolean;
        price?: { amount: string; currencyCode: string } | null;
      } | null;
    } | null;
  }>(
    `
      query ProductByHandle($handle: String!) {
        productByHandle(handle: $handle) {
          handle
          title
          description
          productType
          tags
          featuredImage {
            url
          }
          selectedOrFirstAvailableVariant {
            id
            availableForSale
            price {
              amount
              currencyCode
            }
          }
        }
      }
    `,
    { handle },
  );

  return data.productByHandle ? toProductSummary(data.productByHandle) : null;
}

async function getAllShopifyProducts(): Promise<ShopifyProductSummary[]> {
  const fallback = await storefrontFetch<{
    products: {
      nodes: Array<{
        handle: string;
        title: string;
        description: string;
        productType: string;
        tags: string[];
        featuredImage?: { url: string } | null;
        selectedOrFirstAvailableVariant?: {
          id: string;
          availableForSale: boolean;
          price?: { amount: string; currencyCode: string } | null;
        } | null;
      }>;
    };
  }>(
    `
      query AllProductsFallback {
        products(first: 200, sortKey: TITLE) {
          nodes {
            handle
            title
            description
            productType
            tags
            featuredImage {
              url
            }
            selectedOrFirstAvailableVariant {
              id
              availableForSale
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    `,
  );

  return fallback.products.nodes.map(toProductSummary);
}

async function getShopifyProductsByHandles(handles: string[]): Promise<ShopifyProductSummary[]> {
  const uniqueHandles = Array.from(new Set(handles.map((handle) => normalize(handle)).filter(Boolean)));
  if (uniqueHandles.length === 0) return [];

  const results = await Promise.all(
    uniqueHandles.map(async (handle) => {
      try {
        return await getShopifyProductByHandle(handle);
      } catch {
        return null;
      }
    }),
  );

  return results.filter((product): product is ShopifyProductSummary => Boolean(product));
}

export async function getShopifyProductsByCategory(category: ShopifyCategory): Promise<{
  source: "collection" | "inferred" | "none" | "error";
  collectionHandle: string | null;
  products: ShopifyProductSummary[];
}> {
  const handles = CATEGORY_COLLECTION_CANDIDATES[category];

  try {
    // Try collection-first, then fall back to inferred grouping.
    for (const handle of handles) {
      const data = await storefrontFetch<{
        collection: {
          handle: string;
          products: {
            nodes: Array<{
              handle: string;
              title: string;
              description: string;
              productType: string;
              tags: string[];
              featuredImage?: { url: string } | null;
              selectedOrFirstAvailableVariant?: {
                id: string;
                availableForSale: boolean;
                price?: { amount: string; currencyCode: string } | null;
              } | null;
            }>;
          };
        } | null;
      }>(
        `
          query CollectionProducts($handle: String!) {
            collection(handle: $handle) {
              handle
              products(first: 80) {
                nodes {
                  handle
                  title
                  description
                  productType
                  tags
                  featuredImage {
                    url
                  }
                  selectedOrFirstAvailableVariant {
                    id
                    availableForSale
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        `,
        { handle },
      );

      const products = (data.collection?.products.nodes ?? []).map(toProductSummary).filter(isUsableProduct);
      if (products.length > 0) {
        return {
          source: "collection",
          collectionHandle: data.collection?.handle ?? handle,
          products,
        };
      }
    }

    const inferred = (await getAllShopifyProducts()).filter((product) => inferCategory(product) === category && isUsableProduct(product));
    if (inferred.length > 0) {
      return {
        source: "inferred",
        collectionHandle: null,
        products: inferred,
      };
    }

    return {
      source: "none",
      collectionHandle: null,
      products: [],
    };
  } catch {
    return {
      source: "error",
      collectionHandle: null,
      products: [],
    };
  }
}

export async function hydrateLocalCatalogWithShopify<T extends LocalCatalogItem>(
  category: ShopifyCategory,
  localItems: T[],
): Promise<ShopifyHydrationResult<T>> {
  const categoryResult = await getShopifyProductsByCategory(category);
  const manualMap = SHOPIFY_HANDLE_MAP[category] ?? {};

  const mappedHandles = localItems
    .map((item) => {
      const candidateKeys = [item.slug, normalizeKey(item.slug), normalizeKey(item.title)];
      for (const key of candidateKeys) {
        if (key in manualMap) {
          return manualMap[key];
        }
      }
      return null;
    })
    .filter((value): value is string => Boolean(value));

  const mappedProducts = await getShopifyProductsByHandles(mappedHandles);
  const mappedHandleSet = new Set(mappedProducts.map((product) => normalize(product.handle)));
  const pool = [...mappedProducts, ...categoryResult.products.filter((product) => !mappedHandleSet.has(normalize(product.handle)))];

  const handleMap = new Map(pool.map((product) => [normalize(product.handle), product]));
  const titleCandidates = new Map<string, ShopifyProductSummary[]>();
  for (const product of pool) {
    const key = normalizeTitle(product.title);
    const existing = titleCandidates.get(key) ?? [];
    existing.push(product);
    titleCandidates.set(key, existing);
  }

  const usedHandles = new Set<string>();
  const hydrated = localItems.map((item) => {
    const candidateKeys = [item.slug, normalizeKey(item.slug), normalizeKey(item.title)];
    let mappedHandle: string | null = null;
    for (const key of candidateKeys) {
      if (key in manualMap) {
        mappedHandle = manualMap[key];
        break;
      }
    }

    if (mappedHandle) {
      const mappedProduct = handleMap.get(normalize(mappedHandle));
      if (mappedProduct) {
        usedHandles.add(mappedProduct.handle);
        return { ...item, shopify: mappedProduct, matchMethod: "handle" as const };
      }
    }

    const byHandle = handleMap.get(normalize(item.slug));
    if (byHandle) {
      usedHandles.add(byHandle.handle);
      return { ...item, shopify: byHandle, matchMethod: "handle" as const };
    }

    const titleKey = normalizeTitle(item.title);
    const candidates = titleCandidates.get(titleKey) ?? [];
    if (candidates.length === 1 && !usedHandles.has(candidates[0].handle)) {
      usedHandles.add(candidates[0].handle);
      return { ...item, shopify: candidates[0], matchMethod: "title" as const };
    }

    return { ...item, shopify: null, matchMethod: null };
  });

  const unmatchedLocal = hydrated.filter((item) => !item.shopify).map((item) => item.slug);
  const unmatchedShopify = pool.filter((product) => !usedHandles.has(product.handle)).map((product) => product.handle);
  const usedFallback = hydrated.every((item) => !item.shopify);

  if (process.env.NODE_ENV !== "production") {
    console.info(
      `[shopify][${category}] source=${categoryResult.source} matched=${hydrated.length - unmatchedLocal.length} localOnly=${unmatchedLocal.length} shopifyUnmatched=${unmatchedShopify.length} rendering=${usedFallback ? "legacy/manual fallback" : "local+shopify"}`,
    );
    for (const item of hydrated) {
      const candidateKeys = [item.slug, normalizeKey(item.slug), normalizeKey(item.title)];
      let mappedHandle: string | null = null;
      for (const key of candidateKeys) {
        if (key in manualMap) {
          mappedHandle = manualMap[key];
          break;
        }
      }
      const state = item.shopify ? (item.shopify.availableForSale ? "priced/live" : "matched/unavailable") : "local-only/coming-soon";
      console.info(
        `[shopify][${category}] slug=${item.slug} mappedHandle=${mappedHandle ?? "none"} matched=${item.shopify ? "yes" : "no"} state=${state}`,
      );
    }
    if (unmatchedLocal.length > 0) {
      console.info(`[shopify][${category}] local-only slugs: ${unmatchedLocal.join(", ")}`);
    }
    if (unmatchedShopify.length > 0) {
      console.info(`[shopify][${category}] unmatched shopify handles: ${unmatchedShopify.join(", ")}`);
    }
  }

  return {
    source: categoryResult.source,
    usedFallback,
    items: hydrated,
    unmatchedLocal,
    unmatchedShopify,
  };
}

