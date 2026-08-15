import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/api/products';
import ProductConfigurator from '@/components/ProductConfigurator/ProductConfigurator';
import styles from './page.module.scss';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  let product;
  try {
    product = await getProductById(id);
  } catch {
    notFound();
  }

  if (!product.colorOptions?.length) notFound();

  const specEntries = Object.entries(product.specs);

  return (
    <main className={styles.main}>
      <nav className={styles.breadcrumb}>
        <Link href="/">Home</Link>
        <span> / </span>
        <span>
          {product.brand} {product.name}
        </span>
      </nav>

      <div className={styles.layout}>
        <ProductConfigurator product={product} />
      </div>

      <section className={styles.specs}>
        <h2 className={styles.specsTitle}>Specifications</h2>
        <dl className={styles.specList}>
          {specEntries.map(([key, value]) => (
            <div key={key} className={styles.specRow}>
              <dt>{key}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}