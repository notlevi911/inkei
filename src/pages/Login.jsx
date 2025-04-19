import React, { useState, useEffect } from 'react';
import { BackgroundBeams } from '../components/ui/background-beams';
import Input from '../components/ui/input';
import Button from '../components/ui/button';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
    role:''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.role) {
      newErrors.role = 'Role is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setLoggedInUser(response.data.user);

        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      }
    } catch (err) {
      console.error('Login Error:', err);
      const errorMessage = err.response?.data?.message || 'Failed to login. Please try again.';
      setErrors({ ...errors, submit: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLoggedInUser(null);
  };

  if (loggedInUser) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="h-full w-full bg-gradient-to-b from-slate-900 to-slate-800 absolute inset-0">
          <BackgroundBeams />
        </div>
        <div className="relative z-10 w-full max-w-md px-4 sm:px-0">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden p-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Welcome, {loggedInUser.fullName}!</h1>
            <p className="text-slate-600 mb-6">
              You are logged in as a <span className="font-semibold text-indigo-600">{loggedInUser.role}</span>.
            </p>
            <div className="flex flex-col space-y-4">
              <Button onClick={() => window.location.href = '/'} variant="primary" className="w-full py-3">
                Go to Dashboard
              </Button>
              <Button onClick={handleLogout} variant="secondary" className="w-full py-3">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="h-full w-full bg-gradient-to-b from-slate-900 to-slate-800 absolute inset-0">
        <BackgroundBeams />
      </div>
      <div className="relative z-10 w-full max-w-md px-4 sm:px-0">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
              <p className="text-slate-600 mt-2">Sign in to your Zenith account</p>
            </div>

            {errors.submit && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {errors.submit}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="you@example.com"
                required
              />
              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                placeholder="••••••••"
                required
              />
              <div>
  <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="role">Role</label>
  <select
    name="role"
    value={formData.role}
    onChange={handleChange}
    required
    className="block w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  >
    <option value="">Select your role</option>
    <option value="CEO">CEO</option>
    <option value="Senior Manager">Senior Manager</option>
    <option value="Product Manager">Product Manager</option>
  </select>
  {errors.role && <p className="text-sm text-red-600 mt-1">{errors.role}</p>}
</div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-slate-600">Remember me</span>
                </label>
                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                  Forgot password?
                </a>
              </div>
              <Button type="submit" variant="primary" className="w-full py-3" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-slate-500">Or continue with</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-6">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-slate-300 rounded-md shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Google
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-slate-300 rounded-md shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  GitHub
                </button>
              </div>
            </div>
          </div>

          <div className="px-8 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-slate-600">Don't have an account?</p>
            <a href="/signup" className="mt-3 sm:mt-0 text-sm font-medium text-indigo-600 hover:text-indigo-700">
              Create a free account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
