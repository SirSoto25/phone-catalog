import { getProducts } from '@/lib/api/products';
import ProductCard from '@/components/ProductCard/ProductCard';
import styles from './page.module.scss';

export default async function Home() {
  const products = await getProducts({ limit: 20 });

  return (
    <main className={styles.main}>
      <ul className={styles.grid}>
        {products.map((product, index) => (
          <li key={`${product.id}-${index}`}>
            <ProductCard product={product} priority={index < 4} />
          </li>
        ))}
      </ul>
    </main>
  );
}