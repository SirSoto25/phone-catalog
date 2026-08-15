'use client';

import { useEffect, useState } from 'react';
import { getProducts } from '@/lib/api/products';
import type { ProductListItem } from '@/lib/types/product';
import ProductCard from '@/components/ProductCard/ProductCard';
import SearchBar from '@/components/SearchBar/SearchBar';
import styles from './ProductCatalog.module.scss';

type Props = {
  initialProducts: ProductListItem[];
};

export default function ProductCatalog({ initialProducts }: Props) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!debouncedQuery) {
        setProducts(initialProducts);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await getProducts({ search: debouncedQuery });
        if (!cancelled) setProducts(data);
      } catch {
        if (!cancelled) setError('No se pudieron cargar los resultados');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [debouncedQuery, initialProducts]);

  return (
    <div>
      <div className={styles.toolbar}>
        <SearchBar value={query} onChange={setQuery} />
        <p className={styles.count}>{products.length} RESULTS</p>
      </div>

      {loading && <p className={styles.status}>Buscando...</p>}
      {error && <p className={styles.status}>{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p className={styles.status}>No hay resultados</p>
      )}

      <ul className={styles.grid}>
        {products.map((product, index) => (
          <li key={`${product.id}-${index}`}>
            <ProductCard product={product} priority={index < 4} />
          </li>
        ))}
      </ul>
    </div>
  );
}