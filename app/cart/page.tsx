'use client';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { addItem, cartCount } = useCart();
  return (
    <main style={{ padding: '1.5rem' }}>
      <p>Cart ({cartCount})</p>
      <button
        type="button"
        onClick={() =>
          addItem({
            id: 'test',
            brand: 'Test',
            name: 'Phone',
            imageUrl: '',
            color: 'Black',
            storage: '128 GB',
            price: 100,
          })
        }
      >
        +1 fake
      </button>
    </main>
  );
}