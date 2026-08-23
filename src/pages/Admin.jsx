import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, LogOut, PencilLine, Percent, Package, RotateCcw, Shield, Tag } from 'lucide-react';
import { formatCurrency } from '../utils/currency';
import { getSalePrice, hasDiscount } from '../utils/productPricing';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useProducts } from '../context/ProductsContext';

const emptyCredentials = { username: '', password: '' };

export default function Admin() {
  const { adminUser, isAdminAuthenticated, loginAdmin, logoutAdmin } = useAdminAuth();
  const { products, updateProduct, resetProducts } = useProducts();
  const [credentials, setCredentials] = useState(emptyCredentials);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [draftProducts, setDraftProducts] = useState([]);

  useEffect(() => {
    setDraftProducts(products.map((product) => ({ ...product, discountPercent: Number(product.discountPercent) || 0 })));
  }, [products]);

  const discountCount = useMemo(
    () => products.filter((product) => hasDiscount(product)).length,
    [products],
  );

  const averagePrice = useMemo(() => {
    if (products.length === 0) {
      return 0;
    }

    const total = products.reduce((sum, product) => sum + getSalePrice(product), 0);
    return total / products.length;
  }, [products]);

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setCredentials((previous) => ({ ...previous, [name]: value }));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const result = loginAdmin(credentials);

    if (!result.success) {
      setMessage({ type: 'error', text: result.message });
      return;
    }

    setMessage({ type: 'success', text: 'Admin access granted.' });
  };

  const handleDraftChange = (productId, field, value) => {
    setDraftProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === productId ? { ...product, [field]: value } : product,
      ),
    );
  };

  const handleSaveProduct = (productId) => {
    const draft = draftProducts.find((product) => product.id === productId);

    if (!draft) {
      return;
    }

    updateProduct(productId, {
      discountPercent: Math.max(0, Number(draft.discountPercent) || 0),
      price: Math.max(0, Number(draft.price) || 0),
      title: draft.title.trim(),
    });
    setMessage({ type: 'success', text: `Saved changes for ${draft.title}.` });
  };

  const handleClearDiscount = (productId) => {
    handleDraftChange(productId, 'discountPercent', 0);
    updateProduct(productId, { discountPercent: 0 });
    setMessage({ type: 'success', text: 'Discount removed.' });
  };

  const handleResetCatalog = () => {
    resetProducts();
    setMessage({ type: 'success', text: 'Catalog restored to the default product list.' });
  };

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-[70vh] bg-gradient-to-br from-primary-50 via-white to-secondary-50 px-3 py-10 sm:py-16">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-soft">
              <Shield className="h-7 w-7" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Login</h1>
            <p className="mt-2 text-sm text-gray-600">Sign in to edit products, prices, and discounts.</p>
          </div>

          <form onSubmit={handleLogin} className="rounded-2xl bg-white p-6 shadow-soft sm:p-8">
            <div className="mb-4">
              <label className="mb-2 block text-sm font-semibold text-gray-900">Username</label>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleLoginChange}
                className="input-field w-full"
                placeholder="Enter username"
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-semibold text-gray-900">Password</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleLoginChange}
                className="input-field w-full"
                placeholder="Enter password"
                required
              />
            </div>

            <p className="mb-4 rounded-lg bg-primary-50 px-3 py-2 text-xs text-primary-700">
              Use username and password:
            </p>

            {message.text && (
              <p className={`mb-4 rounded-lg px-4 py-3 text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {message.text}
              </p>
            )}

            <button type="submit" className="btn-primary w-full">
              Enter Admin Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 px-3 py-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-soft sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
              <Shield className="h-4 w-4" />
              Admin Dashboard
            </div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Manage the catalog</h1>
            <p className="mt-1 text-sm text-gray-600">Logged in as {adminUser?.username}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to="/products" className="btn-outline inline-flex items-center gap-2">
              <Package className="h-4 w-4" />
              View Store
            </Link>
            <button type="button" onClick={handleResetCatalog} className="btn-outline inline-flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset Catalog
            </button>
            <button type="button" onClick={logoutAdmin} className="btn-primary inline-flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-4 shadow-soft">
            <p className="text-sm text-gray-500">Products</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{products.length}</p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-soft">
            <p className="text-sm text-gray-500">Discounted</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{discountCount}</p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-soft">
            <p className="text-sm text-gray-500">Average sale price</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{formatCurrency(averagePrice)}</p>
          </div>
        </div>

        {message.text && isAdminAuthenticated && (
          <div className={`mb-6 rounded-2xl px-4 py-3 text-sm shadow-soft ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {draftProducts.map((product) => {
            const salePrice = getSalePrice(product);
            const discountActive = hasDiscount(product);

            return (
              <div key={product.id} className="rounded-2xl bg-white p-4 shadow-soft sm:p-6">
                <div className="mb-4 flex gap-4">
                  <img src={product.image} alt={product.title} className="h-20 w-20 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary-700">
                      <PencilLine className="h-4 w-4" />
                      Product #{product.id}
                    </div>
                    <p className="line-clamp-2 text-lg font-bold text-gray-900">{product.title}</p>
                    <p className="text-sm text-gray-600">{product.category}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-gray-700">Name</label>
                    <input
                      type="text"
                      value={product.title}
                      onChange={(event) => handleDraftChange(product.id, 'title', event.target.value)}
                      className="input-field w-full text-sm"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-gray-700">Base price</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={product.price}
                      onChange={(event) => handleDraftChange(product.id, 'price', event.target.value)}
                      className="input-field w-full text-sm"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-gray-700">Discount %</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      value={product.discountPercent}
                      onChange={(event) => handleDraftChange(product.id, 'discountPercent', event.target.value)}
                      className="input-field w-full text-sm"
                    />
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-gray-50 p-3 text-sm text-gray-700">
                  <div className="flex items-center justify-between gap-3">
                    <span>Sale price</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(salePrice)}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between gap-3">
                    <span>Discount status</span>
                    <span className={`inline-flex items-center gap-1 font-semibold ${discountActive ? 'text-green-700' : 'text-gray-500'}`}>
                      <Percent className="h-4 w-4" />
                      {discountActive ? `${product.discountPercent}% off` : 'No discount'}
                    </span>
                  </div>
                  {discountActive && (
                    <div className="mt-1 flex items-center justify-between gap-3">
                      <span>Original price</span>
                      <span className="text-gray-500 line-through">{formatCurrency(product.price)}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <button type="button" onClick={() => handleSaveProduct(product.id)} className="btn-primary flex-1">
                    Save Changes
                  </button>
                  <button type="button" onClick={() => handleClearDiscount(product.id)} className="btn-outline flex-1">
                    Remove Discount
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}