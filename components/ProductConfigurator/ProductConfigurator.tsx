'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import type { ProductDetail } from '@/lib/types/product';
import { canAddToCart } from '@/lib/cart/helpers';
import { useCart } from '@/context/CartContext';
import styles from './ProductConfigurator.module.scss';

type Props = {
  product: ProductDetail;
};

export default function ProductConfigurator({ product }: Props) {
  const [colorName, setColorName] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState(false);
  const [storageCapacity, setStorageCapacity] = useState<string | null>(null);
  const { addItem } = useCart();

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
    addItem({
      id: product.id,
      brand: product.brand,
      name: product.name,
      imageUrl: selectedColor.imageUrl,
      color: selectedColor.name,
      storage: selectedStorage.capacity,
      price: selectedStorage.price,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 800);
  }

  return (
    <>
      <div className={styles.gallery}>
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={`${product.brand} ${product.name}`}
            width={510}
            height={630}
            className={styles.image}
            priority
          />
        )}
      </div>

      <div className={styles.info}>
        <div className={styles.titleBlock}>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.price}>{price} EUR</p>
        </div>

        <div className={styles.selectors}>
          <div className={styles.block}>
            <p className={styles.label}>
              Storage ¿how much space do you need?
            </p>
            <div className={styles.storageList}>
              {product.storageOptions.map((opt) => (
                <button
                  key={opt.capacity}
                  type="button"
                  className={`${styles.storageBtn} ${
                    storageCapacity === opt.capacity ? styles.storageActive : ''
                  }`}
                  aria-pressed={storageCapacity === opt.capacity}
                  onClick={() => setStorageCapacity(opt.capacity)}
                >
                  {opt.capacity}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.block}>
            <p className={styles.label}>color. pick your favourite.</p>
            <div className={styles.colorList}>
              {product.colorOptions.map((opt) => (
                <button
                  key={opt.name}
                  type="button"
                  className={`${styles.swatch} ${
                    colorName === opt.name ? styles.swatchActive : ''
                  }`}
                  aria-label={opt.name}
                  aria-pressed={colorName === opt.name}
                  title={opt.name}
                  onClick={() => setColorName(opt.name)}
                >
                  <span
                    className={styles.swatchFill}
                    style={{ backgroundColor: opt.hexCode }}
                  />
                </button>
              ))}
            </div>
            {selectedColor && (
              <p className={styles.colorName}>{selectedColor.name}</p>
            )}
          </div>
        </div>

        <button
          type="button"
          className={styles.addBtn}
          disabled={!canAdd}
          onClick={handleAdd}
          aria-disabled={!canAdd}
          title={!canAdd ? 'Selecciona color y almacenamiento' : undefined}
        >
          {justAdded ? 'AÑADIDO' : 'AÑADIR'}
        </button>
      </div>
    </>
  );
}
