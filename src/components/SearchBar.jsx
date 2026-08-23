import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SearchBar({ onSearch, placeholder = 'Search products...', initialValue = '' }) {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-full sm:max-w-md">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="input-field pl-9 sm:pl-12 pr-16 sm:pr-24 w-full text-sm"
        />
        <Search className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
        <button
          type="submit"
          className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-primary-700 transition text-xs sm:text-sm font-semibold"
        >
          Search
        </button>
      </div>
    </form>
  );
}
