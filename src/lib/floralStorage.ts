import { FLORAL_PRODUCTS } from '../data/floralData';
export const CART_KEY = 'floral-edit-bag-v1';
export interface StoredCartItem { id: string; quantity: number }
export function readBag(value: string | null): StoredCartItem[] {
  try {
    const parsed: unknown = JSON.parse(value || '[]');
    if (!Array.isArray(parsed)) return [];
    const seen = new Set<string>();
    return parsed.filter((item): item is StoredCartItem => {
      if (!item || typeof item !== 'object' || !('id' in item) || !('quantity' in item)) return false;
      const valid = typeof item.id === 'string' && FLORAL_PRODUCTS.some(p => p.id === item.id) && Number.isInteger(item.quantity) && Number(item.quantity) > 0 && Number(item.quantity) <= 99 && !seen.has(item.id);
      if (valid) seen.add(item.id as string);
      return valid;
    });
  } catch { return []; }
}
