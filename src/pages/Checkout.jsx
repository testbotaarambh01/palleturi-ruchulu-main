import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { submitOrder } from '../utils/ordersApi';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import { formatCurrency } from '../utils/currency';
import { getSalePrice } from '../utils/productPricing';
import { useProducts } from '../context/ProductsContext';

const FREE_SHIPPING_MINIMUM = 499;
const SHIPPING_FEE = 50;

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const { products } = useProducts();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[+()\d\s-]{7,20}$/;

    if (formData.fullName.trim().length < 2) errors.fullName = 'Full name is required.';
    if (!emailPattern.test(formData.email.trim())) errors.email = 'A valid email is required.';
    if (!phonePattern.test(formData.phone.trim())) errors.phone = 'A valid phone number is required.';
    if (formData.address.trim().length < 8) errors.address = 'Full delivery address is required.';
    if (formData.city.trim().length < 2) errors.city = 'City is required.';
    if (formData.zip.trim().length < 3) errors.zip = 'ZIP code is required.';

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      await submitOrder({
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          zip: formData.zip,
        },
        items: cartProducts.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      });

      clearCart();
      setOrderPlaced(true);
    } catch (error) {
      setFieldErrors(error.details || {});
      setSubmitError(error.message || 'Unable to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartProducts.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-8 sm:py-12 px-3">
        <ShoppingBag className="w-12 sm:w-16 h-12 sm:h-16 text-gray-300 mb-4 sm:mb-6" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Nothing to Checkout</h1>
        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">Add items to your cart first.</p>
        <Link to="/products">
          <button className="btn-primary">Shop Products</button>
        </Link>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-8 sm:py-12 px-3">
        <CheckCircle className="w-16 sm:w-20 h-16 sm:h-20 text-green-600 mb-4 sm:mb-6" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">✅ Order Confirmed Successfully</h1>
        <p className="text-sm sm:text-base text-gray-600 mb-2 text-center">Thank you for your order, {formData.fullName || 'Customer'}.</p>
        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 text-center">Your order has been received and the store owner has been notified.</p>
        <button onClick={() => navigate('/')} className="btn-primary">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-gray-50 border-b border-gray-200 py-6 sm:py-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">Checkout</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Shipping Details</h2>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="input-field w-full"
                required
              />
              {fieldErrors.fullName && <p className="text-sm text-red-600 mt-1">{fieldErrors.fullName}</p>}
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field w-full text-sm"
                required
              />
              {fieldErrors.email && <p className="text-xs sm:text-sm text-red-600 mt-1">{fieldErrors.email}</p>}
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input-field w-full text-sm"
                required
              />
              {fieldErrors.phone && <p className="text-xs sm:text-sm text-red-600 mt-1">{fieldErrors.phone}</p>}
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">Full Delivery Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="input-field w-full text-sm"
                required
              />
              {fieldErrors.address && <p className="text-xs sm:text-sm text-red-600 mt-1">{fieldErrors.address}</p>}
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="input-field w-full text-sm"
                  required
                />
                {fieldErrors.city && <p className="text-xs sm:text-sm text-red-600 mt-1">{fieldErrors.city}</p>}
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">ZIP Code</label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  className="input-field w-full text-sm"
                  required
                />
                {fieldErrors.zip && <p className="text-xs sm:text-sm text-red-600 mt-1">{fieldErrors.zip}</p>}
              </div>
            </div>

            {submitError && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-red-700">
                {submitError}
              </div>
            )}

            <button type="submit" className="btn-primary w-full text-sm sm:text-base" disabled={isSubmitting}>
              {isSubmitting ? 'Placing Order...' : `Place Order - ${formatCurrency(total)}`}
            </button>
            <Link to="/cart" className="block text-center text-primary-600 hover:text-primary-700 text-xs sm:text-sm">
              Back to Cart
            </Link>
          </form>

          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-4 sm:p-8 h-fit">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Order Summary</h2>
            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              {cartProducts.map((item) => (
                <div key={item.id} className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-700">
                    {item.title} x {item.quantity}
                  </span>
                  <span className="font-semibold">{formatCurrency(getSalePrice(item) * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-primary-200 pt-3 sm:pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-xs sm:text-sm text-gray-700">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm text-gray-700">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : formatCurrency(shipping)}</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm text-gray-700">
                <span>Tax</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between text-lg sm:text-xl font-bold text-gray-900 pt-2">
                <span>Total</span>
                <span className="text-primary-600">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
