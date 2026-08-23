import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useState } from 'react';
import { formatCurrency } from '../utils/currency';
import { getOriginalPrice, getSalePrice, hasDiscount } from '../utils/productPricing';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [added, setAdded] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="card-hover group flex h-full flex-col text-left">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative mb-3 sm:mb-4 overflow-hidden rounded-lg bg-primary-50">
          <img
            src={product.image}
            alt={product.title}
            className="h-40 sm:h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <button
            type="button"
            onClick={handleWishlist}
            className={`absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full shadow-soft transition ${
              wishlisted ? 'bg-red-50' : 'bg-white hover:bg-primary-50'
            }`}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              className={`w-4 h-4 sm:w-5 sm:h-5 ${wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-700'}`}
            />
          </button>
          {product.inStock && (
            <span className="absolute left-2 top-2 sm:left-3 sm:top-3 rounded-full bg-white/90 px-2 py-0.5 sm:px-3 sm:py-1 text-xs font-semibold text-primary-700 shadow-soft backdrop-blur">
              In Stock
            </span>
          )}
        </div>

        <div className="mb-2 flex items-center justify-between gap-2 text-xs sm:text-sm">
          <span className="font-semibold text-primary-700 truncate">{product.category}</span>
          <span className="truncate text-gray-500">{product.origin}</span>
        </div>

        <h3 className="mb-1 sm:mb-2 line-clamp-2 text-sm sm:text-lg font-semibold text-gray-900 transition group-hover:text-primary-700">
          {product.title}
        </h3>

        <div className="flex items-center gap-1 mb-2 sm:mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 sm:w-4 sm:h-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs sm:text-sm text-gray-600">({product.rating})</span>
        </div>

        <p className="mb-3 sm:mb-4 line-clamp-2 text-xs sm:text-sm leading-5 sm:leading-6 text-gray-600">{product.description}</p>
      </Link>

      <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3 sm:pt-4">
        <div>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{formatCurrency(getSalePrice(product))}</p>
          {hasDiscount(product) && (
            <p className="text-xs sm:text-sm text-gray-500 line-through">{formatCurrency(getOriginalPrice(product))}</p>
          )}
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className={`p-1.5 sm:p-2 rounded-lg transition shadow-soft text-white ${
            added ? 'bg-green-600' : 'bg-primary-600 hover:bg-primary-700'
          }`}
          aria-label="Add to cart"
        >
          <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
}
