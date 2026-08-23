import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { BRAND_LOGO, BRAND_NAME } from '../utils/brand';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (formData.fullName.trim().length < 2) {
      setMessage({ type: 'error', text: 'Please enter your full name.' });
      return;
    }

    if (formData.password.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters.' });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    const result = signup(formData);
    if (!result.success) {
      setMessage({ type: 'error', text: result.message });
      return;
    }

    setMessage({ type: 'success', text: 'Account created successfully. Taking you home...' });
    setTimeout(() => navigate('/'), 600);
  };

  const handleSocialSignup = (provider) => {
    alert(`${provider} signup is coming soon! Use email registration for now.`);
  };

  const passwordStrength = formData.password.length > 8 ? 'strong' : formData.password.length > 0 ? 'medium' : '';

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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Join Us Today</h1>
          <p className="text-gray-600">Create your account to start shopping traditional snacks</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-soft p-8 mb-6">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
            <div className="relative">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="input-field pl-12 w-full"
                required
              />
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

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
            <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 8 characters"
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
            {passwordStrength && (
              <p className="text-xs text-gray-600 mt-2">
                Password strength:{' '}
                <span className={passwordStrength === 'strong' ? 'text-green-600' : 'text-yellow-600'}>
                  {passwordStrength}
                </span>
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">Confirm Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat your password"
                className="input-field pl-12 pr-12 w-full"
                required
              />
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <Check className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-600" />
              )}
            </div>
          </div>

          <label className="flex items-start gap-2 mb-6 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded mt-1" required />
            <span className="text-sm text-gray-700">
              I agree to the{' '}
              <Link to="/about#terms" className="text-primary-600 hover:text-primary-700">
                Terms & Conditions
              </Link>{' '}
              and{' '}
              <Link to="/about#terms" className="text-primary-600 hover:text-primary-700">
                Privacy Policy
              </Link>
            </span>
          </label>

          <button type="submit" className="btn-primary w-full mb-4 flex items-center justify-center gap-2">
            Create Account
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
            onClick={() => handleSocialSignup('Google')}
            className="btn border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Google
          </button>
          <button
            type="button"
            onClick={() => handleSocialSignup('GitHub')}
            className="btn border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            GitHub
          </button>
        </div>

        <p className="text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
