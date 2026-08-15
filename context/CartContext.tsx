'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { CartItem } from '@/lib/types/cart';
import { getCartCount, getCartTotal } from '@/lib/cart/helpers';

const STORAGE_KEY = 'mbst-cart';

type CartContextValue = {
  items: CartItem[];
  cartCount: number;
  total: number;
  addItem: (item: Omit<CartItem, 'cartItemId'> & { cartItemId?: string }) => void;
  removeItem: (cartItemId: string) => void;
  clear: () => void;
  hydrated: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      // ignore bad json
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback(
    (item: Omit<CartItem, 'cartItemId'> & { cartItemId?: string }) => {
      const cartItemId =
        item.cartItemId ||
        `${item.id}__${item.color}__${item.storage}__${Date.now()}`;
      setItems((prev) => [...prev, { ...item, cartItemId }]);
    },
    []
  );

  const removeItem = useCallback((cartItemId: string) => {
    setItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({
      items,
      cartCount: getCartCount(items),
      total: getCartTotal(items),
      addItem,
      removeItem,
      clear,
      hydrated,
    }),
    [items, addItem, removeItem, clear, hydrated]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}