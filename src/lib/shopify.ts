import type { ShopifyProduct, ShopifyCollection } from '../types/shopify';
import { PRODUCTS_CATALOG, COLLECTIONS_DATA } from '../data/fashionData';

const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || '';
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '';
const SHOPIFY_API_VERSION = '2024-01';

/**
 * Shopify Storefront API Client
 * Seamlessly connects to real Shopify GraphQL endpoint if credentials are provided,
 * otherwise provides rich, responsive Atelier mock data.
 */
export async function shopifyFetch<T>({
  query,
  variables = {}
}: {
  query: string;
  variables?: Record<string, unknown>;
}): Promise<T | null> {
  if (!SHOPIFY_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    return null;
  }

  const endpoint = `https://${SHOPIFY_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!res.ok) {
      console.warn('Shopify Storefront API returned an error:', res.statusText);
      return null;
    }

    const { data } = await res.json();
    return data as T;
  } catch (error) {
    console.warn('Shopify Storefront fetch failed:', error);
    return null;
  }
}

/**
 * Fetch all products dynamically with fallback
 */
export async function getProducts(): Promise<ShopifyProduct[]> {
  const query = `
    query getProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            handle
            title
            vendor
            productType
            description
            availableForSale
            priceRange {
              minVariantPrice { amount currencyCode }
              maxVariantPrice { amount currencyCode }
            }
            featuredImage { id url altText width height }
            images(first: 5) {
              edges { node { id url altText width height } }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price { amount currencyCode }
                  selectedOptions { name value }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    products: { edges: { node: ShopifyProduct }[] };
  }>({ query, variables: { first: 20 } });

  if (data?.products?.edges) {
    return data.products.edges.map(edge => edge.node);
  }

  return PRODUCTS_CATALOG;
}

/**
 * Fetch collections
 */
export async function getCollections(): Promise<ShopifyCollection[]> {
  return COLLECTIONS_DATA;
}

/**
 * Build direct Shopify checkout URL
 */
export function buildShopifyCheckoutUrl(items: { variantId: string; quantity: number }[]): string {
  if (!SHOPIFY_DOMAIN) {
    // Atelier demo mode simulated checkout
    return 'https://velvetloom.com/checkout';
  }
  const cleanId = (id: string) => id.replace('gid://shopify/ProductVariant/', '');
  const permalink = items.map(item => `${cleanId(item.variantId)}:${item.quantity}`).join(',');
  return `https://${SHOPIFY_DOMAIN}/cart/${permalink}`;
}
