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
        <h1 className={styles.title}>Cart (0)</h1>
        <p className={styles.muted}>Tu carrito está vacío</p>
        <div className={styles.footer}>
          <Link href="/" className={styles.continue}>
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Cart ({items.length})</h1>

      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.cartItemId} className={styles.row}>
            <div className={styles.thumb}>
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={`${item.brand} ${item.name}`}
                  width={262}
                  height={324}
                  className={styles.image}
                />
              ) : null}
            </div>

            <div className={styles.info}>
              <div>
                <p className={styles.name}>{item.name}</p>
                <p className={styles.meta}>
                  {item.storage} | {item.color}
                </p>
                <p className={styles.price}>{item.price} EUR</p>
              </div>
              <button
                type="button"
                className={styles.remove}
                onClick={() => removeItem(item.cartItemId)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.footer}>
        <Link href="/" className={styles.continue}>
          Continue shopping
        </Link>
        <div className={styles.checkout}>
          <p className={styles.total}>
            <span>Total</span>
            <span>{total} EUR</span>
          </p>
          <button type="button" className={styles.pay} disabled>
            Pay
          </button>
        </div>
      </div>
    </main>
  );
}
