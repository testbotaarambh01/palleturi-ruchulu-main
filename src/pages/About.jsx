import { Link } from 'react-router-dom';
import { benefits } from '../utils/data';
import { ArrowRight, Award, BadgeCheck, Leaf, Sprout, Truck, Users } from 'lucide-react';
import { BRAND_NAME, BRAND_TAGLINE } from '../utils/brand';

const benefitIcons = {
  BadgeCheck,
  Leaf,
  Sprout,
  Truck,
};

export default function About() {
  return (
    <div>
      <section className="bg-gradient-to-r from-primary-50 to-secondary-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About {BRAND_NAME}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {BRAND_TAGLINE} made with the warmth, crunch, and flavor of home.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom max-w-3xl text-center">
          <Leaf className="w-12 h-12 text-primary-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            {BRAND_NAME} celebrates the pindi vantalu that are part of Telugu homes, village
            kitchens, festivals, and family gatherings.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Every batch is prepared with familiar ingredients, patient cooking, and careful
            packing so the snacks stay crisp from our kitchen to your table.
          </p>
        </div>
      </section>

      <section id="why-choose-palleturi-ruchulu" className="section bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefitIcons[benefit.icon] || Leaf;

              return (
                <div key={benefit.id} className="card text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="blog" className="section bg-white">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Blog</h2>
          <p className="text-gray-700 mb-6">
            Read festival snack notes, serving ideas, and stories from traditional Telugu kitchens.
          </p>
          <button
            onClick={() => alert('Blog posts coming soon! Check back for pindi vantalu stories and serving ideas.')}
            className="btn-outline flex items-center gap-2"
          >
            Browse Articles <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <section id="careers" className="section bg-gray-50">
        <div className="container-custom max-w-3xl">
          <Users className="w-10 h-10 text-primary-600 mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Careers</h2>
          <p className="text-gray-700 mb-6">
            Join our growing team. We are always looking for people who care about traditional
            food, careful packing, and dependable service.
          </p>
          <Link to="/contact">
            <button className="btn-primary">View Open Positions</button>
          </Link>
        </div>
      </section>

      <section id="press" className="section bg-white">
        <div className="container-custom max-w-3xl">
          <Award className="w-10 h-10 text-primary-600 mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Press</h2>
          <p className="text-gray-700 mb-6">
            For media inquiries, bulk orders, or collaboration requests, reach out through our
            contact page.
          </p>
          <Link to="/contact">
            <button className="btn-outline">Media Inquiries</button>
          </Link>
        </div>
      </section>

      <section id="terms" className="section bg-gray-50">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Terms & Privacy</h2>
          <p className="text-gray-700 leading-relaxed">
            By using {BRAND_NAME}, you agree to our terms of service. We protect your privacy
            and never share your personal data with third parties. All products are sold subject
            to our return policy and quality guarantee.
          </p>
        </div>
      </section>
    </div>
  );
}
