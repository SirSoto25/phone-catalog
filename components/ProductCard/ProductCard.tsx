import Image from 'next/image';
import Link from 'next/link';
import type { ProductListItem } from '@/lib/types/product';
import styles from './ProductCard.module.scss';

type Props = {
  product: ProductListItem;
  priority?: boolean;
};

export default function ProductCard({ product, priority }: Props) {
  return (
    <Link href={`/product/${product.id}`} className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          src={product.imageUrl}
          alt={`${product.brand} ${product.name}`}
          width={300}
          height={300}
          className={styles.image}
          priority={priority}
        />
      </div>
      <div className={styles.info}>
        <p className={styles.brand}>{product.brand}</p>
        <p className={styles.name}>{product.name}</p>
        <p className={styles.price}>{product.basePrice} EUR</p>
      </div>
    </Link>
  );
}