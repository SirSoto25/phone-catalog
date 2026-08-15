import type { ProductListItem } from '@/lib/types/product';
import ProductCard from '@/components/ProductCard/ProductCard';
import styles from './SimilarProducts.module.scss';

type Props = {
  products: ProductListItem[];
};

export default function SimilarProducts({ products }: Props) {
  if (!products.length) return null;

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Similar items</h2>
      <ul className={styles.row}>
        {products.map((product, index) => (
          <li key={`${product.id}-${index}`} className={styles.item}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}