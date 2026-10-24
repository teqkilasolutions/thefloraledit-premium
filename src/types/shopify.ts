/**
 * Shopify Storefront API v2024-01 Compatible Type Definitions
 * Designed for seamless headless Shopify / Hydrogen / Storefront integration.
 */

export interface ShopifyImage {
  id: string;
  url: string;
  altText: string | null;
  width?: number;
  height?: number;
}

export interface ShopifyPrice {
  amount: string;
  currencyCode: 'INR' | 'USD' | 'GBP' | 'EUR' | 'AED';
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: ShopifyPrice;
  compareAtPrice?: ShopifyPrice | null;
  sku?: string;
  image?: ShopifyImage;
}

export interface ShopifyProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  vendor: 'VELVET LOOM';
  productType: 'Anarkali' | 'Sharara Suit' | 'Straight Suit' | 'Indo-Western' | 'Draped Saree' | 'Atelier Cape';
  category: string;
  description: string;
  descriptionHtml?: string;
  tags: string[];
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: ShopifyPrice;
    maxVariantPrice: ShopifyPrice;
  };
  compareAtPriceRange?: {
    minVariantPrice: ShopifyPrice;
    maxVariantPrice: ShopifyPrice;
  };
  featuredImage: ShopifyImage;
  images: ShopifyImage[];
  options: ShopifyProductOption[];
  variants: ShopifyProductVariant[];
  // Editorial atelier metadata
  atelierDetails?: {
    fabric: string;
    technique: string;
    lining: string;
    careInstruction: string;
    modelStats: string;
    leadTime: string;
    bestseller?: boolean;
    occasion?: 'Wedding' | 'Festive' | 'Celebration' | 'Everyday';
  };
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyImage;
  productsCount: number;
}

export interface CartItem {
  id: string;
  product: ShopifyProduct;
  variant: ShopifyProductVariant;
  quantity: number;
  selectedSize: string;
  selectedColor?: string;
}

export interface WishlistItem {
  productId: string;
  product: ShopifyProduct;
  addedAt: number;
}
