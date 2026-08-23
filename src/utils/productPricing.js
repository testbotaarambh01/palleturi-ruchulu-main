export const getDiscountPercent = (product) => Number(product.discountPercent) || 0;

export const hasDiscount = (product) => getDiscountPercent(product) > 0;

export const getSalePrice = (product) => {
  const basePrice = Number(product.price) || 0;
  const discountPercent = getDiscountPercent(product);

  if (!discountPercent) {
    return basePrice;
  }

  return Number((basePrice * (1 - discountPercent / 100)).toFixed(2));
};

export const getOriginalPrice = (product) => Number(product.price) || 0;