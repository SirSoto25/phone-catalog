'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import type { ProductDetail } from '@/lib/types/product';
import { canAddToCart } from '@/lib/cart/helpers';
import styles from './ProductConfigurator.module.scss';

type Props = {
  product: ProductDetail;
};

export default function ProductConfigurator({ product }: Props) {
  const [colorName, setColorName] = useState<string | null>(null);
  const [storageCapacity, setStorageCapacity] = useState<string | null>(null);

  const selectedColor = useMemo(
    () => product.colorOptions.find((c) => c.name === colorName) ?? null,
    [product.colorOptions, colorName]
  );

  const selectedStorage = useMemo(
    () =>
      product.storageOptions.find((s) => s.capacity === storageCapacity) ??
      null,
    [product.storageOptions, storageCapacity]
  );

  const imageSrc =
    selectedColor?.imageUrl || product.colorOptions[0]?.imageUrl || '';

  const price = selectedStorage?.price ?? product.basePrice;
  const canAdd = canAddToCart(colorName, storageCapacity);

  function handleAdd() {
    if (!canAdd || !selectedColor || !selectedStorage) return;
    // feature 09: meter en CartContext
    console.log('add', {
      id: product.id,
      color: selectedColor.name,
      storage: selectedStorage.capacity,
      price: selectedStorage.price,
    });
  }

  return (
    <>
      <div className={styles.gallery}>
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={`${product.brand} ${product.name}`}
            width={480}
            height={480}
            className={styles.image}
            priority
          />
        )}
      </div>

      <div className={styles.info}>
        <p className={styles.brand}>{product.brand}</p>
        <h1 className={styles.name}>{product.name}</h1>
        <p className={styles.price}>{price} EUR</p>
        <p className={styles.description}>{product.description}</p>

        <div className={styles.block}>
          <p className={styles.label}>
            storage{storageCapacity ? ` | ${storageCapacity}` : ''}
          </p>
          <div className={styles.storageList}>
            {product.storageOptions.map((opt) => (
              <button
                key={opt.capacity}
                type="button"
                className={`${styles.storageBtn} ${
                  storageCapacity === opt.capacity ? styles.storageActive : ''
                }`}
                onClick={() => setStorageCapacity(opt.capacity)}
              >
                {opt.capacity}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.block}>
          <p className={styles.label}>
            color{colorName ? ` | ${colorName}` : ''}
          </p>
          <div className={styles.colorList}>
            {product.colorOptions.map((opt) => (
              <button
                key={opt.name}
                type="button"
                className={`${styles.swatch} ${
                  colorName === opt.name ? styles.swatchActive : ''
                }`}
                style={{ backgroundColor: opt.hexCode }}
                aria-label={opt.name}
                title={opt.name}
                onClick={() => setColorName(opt.name)}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          className={styles.addBtn}
          disabled={!canAdd}
          onClick={handleAdd}
        >
          AÑADIR
        </button>
      </div>
    </>
  );
}