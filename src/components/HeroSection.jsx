import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BRAND_LOGO, BRAND_NAME, BRAND_TAGLINE } from '../utils/brand';

export default function HeroSection() {
  const scrollToBenefits = () => {
    document.getElementById('why-choose-palleturi-ruchulu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-[#fff8ea] py-8 sm:py-12 md:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
          <div className="animate-fade-in text-left">
            <div className="mb-4 sm:mb-6">
              <span className="badge-primary text-xs sm:text-sm">{BRAND_TAGLINE}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Village-style snacks made for every celebration
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed">
              {BRAND_NAME} brings traditional pindi vantalu, hot snacks, sweets, and festival packs with the taste of home.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link to="/products">
                <button type="button" className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 text-sm sm:text-base">
                  Shop Now
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </Link>
              <button type="button" onClick={scrollToBenefits} className="btn-outline w-full sm:w-auto text-sm sm:text-base">
                Learn More
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-6 sm:mt-12 pt-6 sm:pt-10 border-t border-primary-100">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-primary-600">10K+</p>
                <p className="text-xs sm:text-sm text-gray-600">Happy Customers</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-primary-600">30+</p>
                <p className="text-xs sm:text-sm text-gray-600">Snack Varieties</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-primary-600">100%</p>
                <p className="text-xs sm:text-sm text-gray-600">Traditional</p>
              </div>
            </div>
          </div>

          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[520px]">
            <img
              src={BRAND_LOGO}
              alt={`${BRAND_NAME} logo showing traditional pindi vantalu`}
              className="relative h-full w-full rounded-lg bg-white object-contain p-4 shadow-soft-xl"
            />
            <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 max-w-xs rounded-lg bg-white/92 p-2 sm:p-4 text-left shadow-soft backdrop-blur">
              <p className="text-xs sm:text-sm font-semibold text-gray-900">Prepared in small batches</p>
              <p className="mt-1 text-xs sm:text-sm leading-5 text-gray-600">
                Crunchy, festive favorites packed carefully so they reach your table fresh.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
