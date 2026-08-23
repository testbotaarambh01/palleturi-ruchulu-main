import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { categories } from '../utils/data';
import { Filter } from 'lucide-react';
import { useProducts } from '../context/ProductsContext';
import { getSalePrice } from '../utils/productPricing';

export default function Products() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    const category = searchParams.get('category') || 'All';
    const q = searchParams.get('q') || '';
    setSelectedCategory(category);
    setSearchTerm(q);
  }, [searchParams]);

  const updateParams = (category, search) => {
    const params = {};
    if (category && category !== 'All') params.category = category;
    if (search) params.q = search;
    setSearchParams(params);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    updateParams(category, searchTerm);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    updateParams(selectedCategory, term);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return getSalePrice(a) - getSalePrice(b);
      case 'price-high':
        return getSalePrice(b) - getSalePrice(a);
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchTerm('');
    setSearchParams({});
  };

  return (
    <div>
      <section className="bg-gradient-to-r from-primary-50 to-secondary-50 py-6 sm:py-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">Our Products</h1>
          <p className="text-sm sm:text-lg text-gray-600 mb-6 sm:mb-8">
            Explore traditional pindi vantalu, savory snacks, sweets, and festive packs
          </p>
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search products..."
            initialValue={searchTerm}
          />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-8">
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-soft p-4 sm:p-6 sticky top-20 h-fit">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600" />
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Filters</h3>
              </div>

              <div className="mb-4 sm:mb-6">
                <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2 sm:mb-3">Categories</h4>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer text-sm sm:text-base">
                    <input
                      type="radio"
                      name="category"
                      value="All"
                      checked={selectedCategory === 'All'}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className="mr-2 w-3 h-3 sm:w-4 sm:h-4"
                    />
                    <span className="text-gray-700">All Categories</span>
                  </label>
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center cursor-pointer text-sm sm:text-base">
                      <input
                        type="radio"
                        name="category"
                        value={category.name}
                        checked={selectedCategory === category.name}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="mr-2 w-3 h-3 sm:w-4 sm:h-4"
                      />
                      <span className="text-gray-700">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2 sm:mb-3">Sort By</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-field w-full text-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="mb-4 sm:mb-6 flex items-center justify-between">
              <p className="text-xs sm:text-base text-gray-600">
                Showing <span className="font-semibold">{sortedProducts.length}</span> products
              </p>
            </div>

            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600 mb-4">No products found</p>
                <button type="button" onClick={resetFilters} className="btn-primary">
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
