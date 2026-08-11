import Link from 'next/link';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const cartCount = 0;

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        MBST
      </Link>

      <Link href="/cart" className={styles.cart} aria-label="Cart">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M6 6h15l-1.5 9h-12L6 6z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M6 6L5 3H2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="9" cy="20" r="1.25" fill="currentColor" />
          <circle cx="18" cy="20" r="1.25" fill="currentColor" />
        </svg>
        <span className={styles.badge}>{cartCount}</span>
      </Link>
    </header>
  );
}