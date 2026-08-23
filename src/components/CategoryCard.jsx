import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';

export default function CategoryCard({ category }) {
  const navigate = useNavigate();
  const { products } = useProducts();
  const count = products.filter((p) => p.category === category.name).length;

  const handleBrowse = () => {
    navigate(`/products?category=${encodeURIComponent(category.name)}`);
  };

  return (
    <div
      className="card-hover cursor-pointer overflow-hidden p-0 text-left"
      onClick={handleBrowse}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleBrowse()}
    >
      <img
        src={category.image}
        alt={category.name}
        className="h-20 sm:h-28 w-full object-cover"
        loading="lazy"
      />
      <div className="p-2 sm:p-4">
        <h3 className="mb-1 text-sm sm:text-lg font-semibold text-gray-900">{category.name}</h3>
        <p className="text-xs sm:text-sm text-gray-600">{count} product{count !== 1 ? 's' : ''}</p>
      </div>
    </div>
  );
}
