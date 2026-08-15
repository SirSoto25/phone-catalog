import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/api/products';
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

  const src = product.colorOptions[0]?.imageUrl;
  
  if (!src) notFound();

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
        <div className={styles.gallery}>
          <Image
            src={src}
            alt={`${product.brand} ${product.name}`}
            width={480}
            height={480}
            className={styles.image}
            priority
          />
        </div>

        <div className={styles.info}>
          <p className={styles.brand}>{product.brand}</p>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.price}>{product.basePrice} EUR</p>
          <p className={styles.description}>{product.description}</p>

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
        </div>
      </div>
    </main>
  );
}