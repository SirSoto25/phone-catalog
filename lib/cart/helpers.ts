import type { CartItem } from '@/lib/types/cart';

export function canAddToCart(
  colorName: string | null,
  storageCapacity: string | null
) {
  return Boolean(colorName && storageCapacity);
}

export function getCartCount(items: CartItem[]) {
  return items.length;
}

export function getCartTotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

export function createCartItemId(id: string, color: string, storage: string) {
  return `${id}__${color}__${storage}__${Date.now()}`;
}