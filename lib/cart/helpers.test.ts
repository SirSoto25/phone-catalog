import { describe, expect, it } from 'vitest';
import {
  canAddToCart,
  getCartCount,
  getCartTotal,
} from './helpers';
import type { CartItem } from '@/lib/types/cart';

const sampleItems: CartItem[] = [
  {
    cartItemId: '1',
    id: 'a',
    brand: 'Samsung',
    name: 'S24',
    imageUrl: '',
    color: 'Black',
    storage: '256 GB',
    price: 100,
  },
  {
    cartItemId: '2',
    id: 'b',
    brand: 'Apple',
    name: 'iPhone',
    imageUrl: '',
    color: 'Blue',
    storage: '128 GB',
    price: 250.5,
  },
];

describe('canAddToCart', () => {
  it('returns false if color missing', () => {
    expect(canAddToCart(null, '256 GB')).toBe(false);
  });

  it('returns false if storage missing', () => {
    expect(canAddToCart('Black', null)).toBe(false);
  });

  it('returns true when both selected', () => {
    expect(canAddToCart('Black', '256 GB')).toBe(true);
  });
});

describe('getCartCount', () => {
  it('returns 0 for empty cart', () => {
    expect(getCartCount([])).toBe(0);
  });

  it('counts items', () => {
    expect(getCartCount(sampleItems)).toBe(2);
  });
});

describe('getCartTotal', () => {
  it('returns 0 for empty cart', () => {
    expect(getCartTotal([])).toBe(0);
  });

  it('sums prices', () => {
    expect(getCartTotal(sampleItems)).toBe(350.5);
  });
});