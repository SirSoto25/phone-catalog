import { getProducts } from '@/lib/api/products';
import ProductCatalog from '@/components/ProductCatalog/ProductCatalog';
import styles from './page.module.scss';

export default async function Home() {
  const products = await getProducts({ limit: 20 });

  return (
    <main className={styles.main}>
      <ProductCatalog initialProducts={products} />
    </main>
  );
}