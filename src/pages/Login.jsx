import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { BRAND_LOGO, BRAND_NAME } from '../utils/brand';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const { canResetPassword, login, rememberedEmail } = useAuth();
  const [formData, setFormData] = useState(() => {
    const savedEmail = rememberedEmail();
    return {
      email: savedEmail,
      password: '',
      remember: Boolean(savedEmail),
    };
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    const result = login(formData);
    if (!result.success) {
      setMessage({ type: 'error', text: result.message });
      return;
    }

    setMessage({ type: 'success', text: 'Signed in successfully. Taking you home...' });
    setTimeout(() => navigate('/'), 500);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!canResetPassword(resetEmail)) {
      setMessage({ type: 'error', text: 'No account was found for that email.' });
      setShowForgotModal(false);
      return;
    }

    setShowForgotModal(false);
    setMessage({
      type: 'success',
      text: `Password reset instructions are ready for ${resetEmail}.`,
    });
    setResetEmail('');
  };

  const handleSocialLogin = (provider) => {
    alert(`${provider} login is coming soon! Use email sign-in for now.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <img
              src={BRAND_LOGO}
              alt={`${BRAND_NAME} logo`}
              className="h-12 w-12 rounded-full border border-earth-200 object-cover shadow-soft"
            />
            <span className="text-2xl font-bold text-gray-900">{BRAND_NAME}</span>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-soft p-8 mb-6">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="input-field pl-12 w-full"
                required
              />
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-semibold text-gray-900">Password</label>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="input-field pl-12 pr-12 w-full"
                required
              />
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <label className="flex items-center gap-2 mb-6 cursor-pointer">
            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm text-gray-700">Remember me</span>
          </label>

          <button type="submit" className="btn-primary w-full mb-4 flex items-center justify-center gap-2">
            Sign In
            <ArrowRight className="w-5 h-5" />
          </button>
          {message.text && (
            <p
              className={`rounded-lg px-4 py-3 text-sm ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-700'
                  : 'bg-red-50 text-red-700'
              }`}
            >
              {message.text}
            </p>
          )}
        </form>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-600">or</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            type="button"
            onClick={() => handleSocialLogin('Google')}
            className="btn border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Google
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin('GitHub')}
            className="btn border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            GitHub
          </button>
        </div>

        <p className="text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary-600 hover:text-primary-700 font-semibold">
            Sign up
          </Link>
        </p>
      </div>

      {showForgotModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-soft p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h2>
            <p className="text-gray-600 mb-6 text-sm">Enter your email and we will send you a reset link.</p>
            <form onSubmit={handleForgotSubmit}>
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="you@example.com"
                className="input-field w-full mb-4"
                required
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="btn-outline flex-1"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1">
                  Send Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
