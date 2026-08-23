import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { products as defaultProducts } from '../utils/data';

const PRODUCTS_KEY = 'palleturi-ruchulu-products';

const ProductsContext = createContext(null);

const readJson = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

const normalizeProduct = (product) => ({
  ...product,
  price: Number(product.price) || 0,
  discountPercent: Number(product.discountPercent) || 0,
});

const normalizeProducts = (items) => items.map(normalizeProduct);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const savedProducts = readJson(PRODUCTS_KEY, null);
    return normalizeProducts(savedProducts || defaultProducts);
  });

  useEffect(() => {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  }, [products]);

  const updateProduct = (productId, updates) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === productId
          ? normalizeProduct({ ...product, ...updates })
          : product,
      ),
    );
  };

  const resetProducts = () => {
    setProducts(normalizeProducts(defaultProducts));
  };

  const value = useMemo(
    () => ({
      products,
      resetProducts,
      updateProduct,
    }),
    [products],
  );

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export const useProducts = () => useContext(ProductsContext);
