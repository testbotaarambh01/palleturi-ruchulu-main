import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Search, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { BRAND_LOGO, BRAND_NAME } from '../utils/brand';


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount } = useCart();
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    navigate(q ? `/products?q=${encodeURIComponent(q)}` : '/products');
    setIsOpen(false);
  };

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-soft">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between sm:h-16">
          <Link to="/" className="flex min-w-0 items-center gap-2" onClick={closeMenu}>
            <img
              src={BRAND_LOGO}
              alt={`${BRAND_NAME} logo`}
              className="h-10 w-10 flex-shrink-0 rounded-full border border-earth-200 object-cover shadow-soft sm:h-11 sm:w-11"
            />
            <span className="hidden max-w-[12rem] truncate text-base font-bold text-gray-900 sm:inline lg:text-xl">
              {BRAND_NAME}
            </span>
          </Link>

          <div className="hidden items-center gap-4 lg:gap-8 md:flex">
            <Link to="/" className="text-gray-700 transition hover:text-primary-600">Home</Link>
            <Link to="/products" className="text-gray-700 transition hover:text-primary-600">Products</Link>
            <Link to="/about" className="text-gray-700 transition hover:text-primary-600">About</Link>
            <Link to="/contact" className="text-gray-700 transition hover:text-primary-600">Contact</Link>
            <Link to="/admin" className="text-gray-700 transition hover:text-primary-600">Admin</Link>
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <form onSubmit={handleSearch} className="relative hidden lg:block">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="input-field w-40 py-2 pl-10 pr-4 text-sm lg:w-48"
              />
              <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </form>

            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 transition hover:text-primary-600" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="max-w-32 truncate text-sm font-semibold text-gray-700">
                  Hi, {user.fullName.split(' ')[0]}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 hover:text-primary-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login">
                <button type="button" className="flex items-center gap-2 text-gray-700 transition hover:text-primary-600">
                  <User className="h-6 w-6" />
                </button>
              </Link>
            )}
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <Link to="/cart" className="relative" onClick={closeMenu}>
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs text-white">
                  {cartCount}
                </span>
              )}
            </Link>
            <button type="button" onClick={toggleMenu} aria-label="Toggle menu">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="max-h-[calc(100vh-56px)] overflow-y-auto border-t border-gray-200 pb-3 md:hidden">
            <form onSubmit={handleSearch} className="relative mb-3 mt-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="input-field w-full py-2 pl-9 pr-3 text-sm"
              />
              <Search className="pointer-events-none absolute left-2 top-2 h-4 w-4 text-gray-400" />
            </form>

            <Link to="/" className="block px-1 py-2 text-sm text-gray-700 hover:text-primary-600" onClick={closeMenu}>
              Home
            </Link>
            <Link to="/products" className="block px-1 py-2 text-sm text-gray-700 hover:text-primary-600" onClick={closeMenu}>
              Products
            </Link>
            <Link to="/about" className="block px-1 py-2 text-sm text-gray-700 hover:text-primary-600" onClick={closeMenu}>
              About
            </Link>
            <Link to="/contact" className="block px-1 py-2 text-sm text-gray-700 hover:text-primary-600" onClick={closeMenu}>
              Contact
            </Link>
            <Link to="/admin" className="block px-1 py-2 text-sm text-gray-700 hover:text-primary-600" onClick={closeMenu}>
              Admin
            </Link>

            {isAuthenticated ? (
              <div className="mt-3 rounded-lg bg-primary-50 p-2">
                <p className="mb-2 truncate text-xs font-semibold text-gray-800 sm:text-sm">
                  Hi, {user.fullName.split(' ')[0]}
                </p>
                <button type="button" onClick={handleLogout} className="btn-outline w-full py-2 text-xs sm:text-sm">
                  Logout
                </button>
              </div>
            ) : (
              <div className="mt-3 flex gap-2">
                <Link to="/login" className="flex-1" onClick={closeMenu}>
                  <button type="button" className="btn-outline w-full py-2 text-xs sm:text-sm">Login</button>
                </Link>
                <Link to="/signup" className="flex-1" onClick={closeMenu}>
                  <button type="button" className="btn-primary w-full py-2 text-xs sm:text-sm">Sign Up</button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
