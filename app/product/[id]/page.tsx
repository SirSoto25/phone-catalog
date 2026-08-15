import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/api/products';
import SimilarProducts from '@/components/SimilarProducts/SimilarProducts';
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

  const specEntries: [string, string][] = [
    ['brand', product.brand],
    ['name', product.name],
    ['description', product.description],
    ...Object.entries(product.specs),
  ];

  return (
    <main className={styles.main}>
      <nav className={styles.back}>
        <Link href="/" className={styles.backLink}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icons/chevron-left.svg"
            alt=""
            width={20}
            height={20}
            aria-hidden="true"
          />
          BACK
        </Link>
      </nav>

      <div className={styles.layout}>
        <ProductConfigurator product={product} />
      </div>

      <section className={styles.specs}>
        <h2 className={styles.specsTitle}>SPECIFICATIONS</h2>
        <dl className={styles.specList}>
          {specEntries.map(([key, value]) => (
            <div key={key} className={styles.specRow}>
              <dt>{key}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <SimilarProducts products={product.similarProducts} />
    </main>
  );
}
