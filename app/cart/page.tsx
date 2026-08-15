'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './page.module.scss';

export default function CartPage() {
  const { items, total, removeItem, hydrated } = useCart();

  if (!hydrated) {
    return (
      <main className={styles.main}>
        <p className={styles.muted}>Cargando carrito...</p>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className={styles.main}>
        <h1 className={styles.title}>Cart</h1>
        <p className={styles.muted}>Tu carrito está vacío</p>
        <Link href="/" className={styles.continue}>
          Continuar comprando
        </Link>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.top}>
        <h1 className={styles.title}>Cart ({items.length})</h1>
        <Link href="/" className={styles.continue}>
          Continuar comprando
        </Link>
      </div>

      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.cartItemId} className={styles.row}>
            <div className={styles.thumb}>
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={`${item.brand} ${item.name}`}
                  width={96}
                  height={96}
                  className={styles.image}
                />
              ) : null}
            </div>

            <div className={styles.info}>
              <p className={styles.name}>
                {item.brand} {item.name}
              </p>
              <p className={styles.meta}>
                {item.storage} | {item.color}
              </p>
              <p className={styles.price}>{item.price} EUR</p>
            </div>

            <button
              type="button"
              className={styles.remove}
              onClick={() => removeItem(item.cartItemId)}
              aria-label="Eliminar producto"
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.footer}>
        <p className={styles.totalLabel}>Total</p>
        <p className={styles.totalValue}>{total} EUR</p>
      </div>
    </main>
  );
}