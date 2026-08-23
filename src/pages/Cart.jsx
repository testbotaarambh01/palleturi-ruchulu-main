import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';
import { getSalePrice } from '../utils/productPricing';
import { useProducts } from '../context/ProductsContext';

const FREE_SHIPPING_MINIMUM = 499;
const SHIPPING_FEE = 50;

export default function Cart() {
  const { cartItems, updateQuantity, removeItem } = useCart();
  const { products } = useProducts();
  const navigate = useNavigate();

  const cartProducts = cartItems
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean);

  const subtotal = cartProducts.reduce((sum, item) => sum + getSalePrice(item) * item.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_MINIMUM ? 0 : SHIPPING_FEE;
  const tax = (subtotal + shipping) * 0.08;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-8 sm:py-12 px-3">
        <div className="text-center max-w-md">
          <div className="text-5xl sm:text-7xl mb-4 sm:mb-6 opacity-50">🛒</div>
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Your Cart is Empty</h1>
          <p className="text-sm sm:text-lg text-gray-600 mb-6 sm:mb-8">
            Add some traditional snacks to get started!
          </p>
          <Link to="/products">
            <button type="button" className="btn-primary">Continue Shopping</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-sm sm:text-lg text-gray-600 mt-2">
            You have {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-3 sm:space-y-4">
              {cartProducts.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-soft p-3 sm:p-6 flex flex-col sm:flex-row gap-3 sm:gap-6 hover:shadow-soft-lg transition"
                >
                  <Link to={`/products/${item.id}`} className="w-full sm:w-24 h-40 sm:h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="flex-1 text-left">
                    <Link to={`/products/${item.id}`}>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 hover:text-primary-600">{item.title}</h3>
                    </Link>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">{item.category}</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{formatCurrency(getSalePrice(item))}</p>
                  </div>

                  <div className="flex flex-row sm:flex-col items-center justify-between sm:items-end gap-3">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-700 transition"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>

                    <div className="flex items-center border-2 border-gray-300 rounded-lg">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 sm:px-3 py-1 text-gray-600 hover:text-primary-600 transition text-sm"
                      >
                        <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <span className="px-3 py-1 font-semibold text-gray-900 text-sm">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 sm:px-3 py-1 text-gray-600 hover:text-primary-600 transition text-sm"
                      >
                        <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>

                    <p className="text-lg sm:text-lg font-semibold text-gray-900 min-w-fit">
                      {formatCurrency(getSalePrice(item) * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/products" className="inline-block mt-6 sm:mt-8">
              <button type="button" className="btn-outline">Continue Shopping</button>
            </Link>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-4 sm:p-8 sticky top-20 h-fit">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Order Summary</h2>

              <div className="space-y-3 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b-2 border-primary-200">
                <div className="flex justify-between text-sm sm:text-base text-gray-700">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base text-gray-700">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600 font-semibold">FREE</span>
                    ) : (
                      formatCurrency(shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm sm:text-base text-gray-700">
                  <span>Tax (8%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4 sm:mb-8">
                <span className="text-base sm:text-xl font-bold text-gray-900">Total</span>
                <span className="text-2xl sm:text-3xl font-bold text-primary-600">{formatCurrency(total)}</span>
              </div>

              <button
                type="button"
                onClick={() => navigate('/checkout')}
                className="btn-primary w-full mb-3 sm:mb-4 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                Proceed to Checkout
              </button>

              {subtotal < FREE_SHIPPING_MINIMUM && (
                <p className="text-xs sm:text-sm text-center text-green-600 bg-green-50 rounded-lg p-2 sm:p-3">
                  Free shipping on orders over {formatCurrency(FREE_SHIPPING_MINIMUM)}. Add {formatCurrency(FREE_SHIPPING_MINIMUM - subtotal)} more!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
