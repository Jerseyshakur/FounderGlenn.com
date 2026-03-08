export type ShopifyCategory = "books" | "kits" | "essays";

export type ShopifyProductSummary = {
  handle: string;
  title: string;
  description: string;
  productType: string;
  tags: string[];
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
}): ShopifyProductSummary {
  return {
    handle: node.handle,
    title: node.title,
    description: node.description ?? "",
    productType: node.productType ?? "",
    tags: node.tags ?? [],
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
        }
      }
    `,
    { handle },
  );

  return data.productByHandle ? toProductSummary(data.productByHandle) : null;
}

export async function getShopifyProductsByCategory(category: ShopifyCategory): Promise<{
  collectionHandle: string | null;
  products: ShopifyProductSummary[];
}> {
  const handles = CATEGORY_COLLECTION_CANDIDATES[category];

  // Prefer first-class Shopify collections when present.
  const collectionChecks = await Promise.all(
    handles.map(async (handle) => {
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
                }
              }
            }
          }
        `,
        { handle },
      );

      return data.collection;
    }),
  );

  const matchingCollection = collectionChecks.find((collection) => collection && collection.products.nodes.length > 0);
  if (matchingCollection) {
    return {
      collectionHandle: matchingCollection.handle,
      products: matchingCollection.products.nodes.map(toProductSummary),
    };
  }

  // Fallback for stores without category collections:
  // infer product grouping from productType/title/description/tags.
  const fallback = await storefrontFetch<{
    products: {
      nodes: Array<{
        handle: string;
        title: string;
        description: string;
        productType: string;
        tags: string[];
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
          }
        }
      }
    `,
  );

  const products = fallback.products.nodes.map(toProductSummary).filter((product) => inferCategory(product) === category);

  return {
    collectionHandle: null,
    products,
  };
}

