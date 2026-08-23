import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { BadgeCheck, Check, Heart, RotateCcw, Share2, ShoppingCart, Star, Truck } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { shareProduct } from '../utils/share';
import { formatCurrency } from '../utils/currency';
import { getOriginalPrice, getSalePrice, hasDiscount } from '../utils/productPricing';
import { useProducts } from '../context/ProductsContext';

export default function ProductDetails() {
  const { id } = useParams();
  const { products } = useProducts();
  const product = products.find((p) => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const relatedProducts = products
    .filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 3);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link to="/products">
            <button type="button" className="btn-primary">Back to Products</button>
          </Link>
        </div>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleShare = async () => {
    const result = await shareProduct(product);
    if (result.success && result.method === 'clipboard') {
      setShareMessage('Link copied to clipboard!');
    } else if (result.success) {
      setShareMessage('Shared successfully!');
    } else if (result.method !== 'cancelled') {
      setShareMessage('Could not share. Try copying the URL manually.');
    }
    if (result.success || result.method !== 'cancelled') {
      setTimeout(() => setShareMessage(''), 3000);
    }
  };

  return (
    <div>
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-4 flex items-center gap-2 text-xs sm:text-sm overflow-x-auto">
          <Link to="/" className="text-primary-600 hover:text-primary-700 truncate">Home</Link>
          <span className="text-gray-400 flex-shrink-0">/</span>
          <Link to="/products" className="text-primary-600 hover:text-primary-700 truncate">Products</Link>
          <span className="text-gray-400 flex-shrink-0">/</span>
          <span className="text-gray-600 truncate">{product.title}</span>
        </div>
      </div>

      <section className="py-6 sm:py-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-8 md:mb-12">
            <div className="flex items-center justify-center">
              <div className="bg-gray-100 rounded-2xl w-full aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            <div className="text-left">
              <div className="mb-4 sm:mb-6">
                <Link to={`/products?category=${encodeURIComponent(product.category)}`}>
                  <span className="badge-primary mb-2 sm:mb-4 hover:bg-primary-200 transition cursor-pointer">
                    {product.category}
                  </span>
                </Link>
                {product.inStock && (
                  <span className="ml-2 badge bg-green-100 text-green-700">In Stock</span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">{product.title}</h1>
              <div className="mb-4 sm:mb-6 grid grid-cols-1 gap-2 sm:gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-gray-200 bg-white p-3 sm:p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Origin</p>
                  <p className="mt-1 font-semibold text-sm sm:text-base text-gray-900">{product.origin}</p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-3 sm:p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Good to know</p>
                  <p className="mt-1 font-semibold text-sm sm:text-base text-gray-900">{product.note}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex items-center gap-1 sm:gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-base sm:text-lg font-semibold text-gray-900">{product.rating}</span>
                <span className="text-xs sm:text-base text-gray-600">(128 reviews)</span>
              </div>

              <p className="text-sm sm:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed">{product.description}</p>

              <div className="flex items-baseline gap-2 sm:gap-4 mb-6 sm:mb-8">
                <p className="text-3xl sm:text-4xl font-bold text-gray-900">{formatCurrency(getSalePrice(product))}</p>
                {hasDiscount(product) ? (
                  <>
                    <p className="text-lg sm:text-xl text-gray-500 line-through">{formatCurrency(getOriginalPrice(product))}</p>
                    <span className="text-xs sm:text-sm font-semibold text-primary-600 bg-primary-100 px-2 sm:px-3 py-1 rounded-full">
                      Save {product.discountPercent}%
                    </span>
                  </>
                ) : (
                  <span className="text-xs sm:text-sm font-semibold text-primary-600 bg-primary-100 px-2 sm:px-3 py-1 rounded-full">
                    Best price
                  </span>
                )}
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <label className="text-sm sm:text-base text-gray-700 font-semibold">Quantity:</label>
                  <div className="flex items-center border-2 border-gray-300 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2 sm:px-4 py-1 sm:py-2 text-gray-600 hover:text-primary-600 transition text-sm"
                    >
                      -
                    </button>
                    <span className="px-3 sm:px-6 py-1 sm:py-2 font-semibold text-sm sm:text-base text-gray-900">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2 sm:px-4 py-1 sm:py-2 text-gray-600 hover:text-primary-600 transition text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className={`flex-1 btn text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition ${
                      added ? 'bg-green-600 hover:bg-green-700' : 'bg-primary-600 hover:bg-primary-700'
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4 sm:w-6 sm:h-6" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 sm:w-6 sm:h-6" />
                        Add to Cart
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    className={`btn border-2 text-sm sm:text-base flex items-center justify-center gap-2 ${
                      wishlisted
                        ? 'bg-red-50 border-red-300 text-red-600'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Heart className={`w-6 h-6 ${wishlisted ? 'fill-red-500' : ''}`} />
                    <span className="hidden sm:inline">{wishlisted ? 'Saved' : 'Save'}</span>
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
              >
                <Share2 className="w-5 h-5" />
                Share Product
              </button>
              {shareMessage && (
                <p className="text-sm text-green-600 mt-2">{shareMessage}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mb-12 py-12 border-y border-gray-200 sm:grid-cols-3">
            <div className="text-center">
              <Truck className="mx-auto mb-3 h-8 w-8 text-primary-700" />
              <h4 className="font-semibold text-gray-900 mb-2">Free Shipping</h4>
              <p className="text-sm text-gray-600">On orders over ₹499</p>
            </div>
            <div className="text-center">
              <RotateCcw className="mx-auto mb-3 h-8 w-8 text-primary-700" />
              <h4 className="font-semibold text-gray-900 mb-2">Easy Returns</h4>
              <p className="text-sm text-gray-600">30-day return policy</p>
            </div>
            <div className="text-center">
              <BadgeCheck className="mx-auto mb-3 h-8 w-8 text-primary-700" />
              <h4 className="font-semibold text-gray-900 mb-2">Guaranteed Fresh</h4>
              <p className="text-sm text-gray-600">Quality assured</p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
