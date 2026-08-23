import { useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import { categories, testimonials, benefits } from '../utils/data';
import { BadgeCheck, Leaf, Mail, Sprout, Star, Truck } from 'lucide-react';
import { useProducts } from '../context/ProductsContext';
import { BRAND_NAME } from '../utils/brand';

const benefitIcons = {
  BadgeCheck,
  Leaf,
  Sprout,
  Truck,
};

export default function Home() {
  const [email, setEmail] = useState('');
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 6);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setEmail('');
    alert('Thank you for subscribing!');
  };

  return (
    <div>
      <HeroSection />

      <section className="section bg-white">
        <div className="container-mobile">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Featured Products</h2>
            <p className="text-xs sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Customer favorites with honest sourcing notes and produce-first packaging.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/products">
              <button type="button" className="btn-primary">View All Products</button>
            </Link>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="container-mobile">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Shop by Category</h2>
            <p className="text-xs sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Start with the aisle you need, then add the small extras that make the week easier.
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section id="why-choose-palleturi-ruchulu" className="section bg-[#fff8ea]">
        <div className="container-mobile">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Why Choose {BRAND_NAME}</h2>
            <p className="text-xs sm:text-lg text-gray-600 max-w-2xl mx-auto">
              The care behind every batch of traditional snacks and sweets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {benefits.map((benefit) => {
              const Icon = benefitIcons[benefit.icon] || Leaf;

              return (
                <div key={benefit.id} className="card text-left hover:shadow-soft-lg transition p-4 sm:p-6">
                  <div className="mb-3 sm:mb-4 inline-flex h-9 sm:h-11 w-9 sm:w-11 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                    <Icon className="h-5 sm:h-6 w-5 sm:w-6" />
                  </div>
                  <h3 className="text-base sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">{benefit.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-mobile">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">What Our Customers Say</h2>
            <p className="text-xs sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Notes from families who order {BRAND_NAME} for festivals, gifting, and everyday cravings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="card p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                  />
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base text-gray-900">{testimonial.name}</h4>
                    <p className="text-xs sm:text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-xs sm:text-base text-gray-700 leading-relaxed">"{testimonial.text}"</p>
                <div className="mt-3 sm:mt-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 sm:h-4 w-3 sm:w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container-mobile max-w-2xl">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-sm sm:text-lg opacity-90">
              Get festive snack updates, fresh batch announcements, and exclusive offers delivered to your inbox.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              required
            />
            <button
              type="submit"
              className="btn bg-white text-primary-600 hover:bg-gray-100 font-semibold flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Mail className="w-5 h-5" />
              Subscribe
            </button>
          </form>

          <p className="text-center text-sm opacity-75 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
}
