'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo} aria-label="MBST home">
        <Image
          src="/icons/mbst-logo.svg"
          alt="MBST"
          width={74}
          height={16}
          priority
          unoptimized
        />
      </Link>

      <Link
        href="/cart"
        className={styles.cart}
        aria-label={`Cart, ${cartCount} items`}
      >
        <Image
          src="/icons/bag.svg"
          alt=""
          width={12}
          height={16}
          className={styles.bag}
          unoptimized
          aria-hidden
        />
        <span className={styles.badge} aria-live="polite">
          {cartCount}
        </span>
      </Link>
    </header>
  );
}
