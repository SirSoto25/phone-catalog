export function canAddToCart(
    colorName: string | null,
    storageCapacity: string | null
  ) {
    return Boolean(colorName && storageCapacity);
  }