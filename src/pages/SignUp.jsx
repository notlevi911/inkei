import React, { useState } from 'react';
import { BackgroundBeams } from '../components/ui/background-beams';
import Input from '../components/ui/input';
import Button from '../components/ui/button';
import axios from 'axios';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [role,setRole] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (name === 'agreeTerms') {
        setAgreeTerms(checked);
      }
    } else {
      if (name === 'fullName') setFullName(value);
      if (name === 'email') setEmail(value);
      if (name === 'password') setPassword(value);
      if (name === 'confirmPassword') setConfirmPassword(value);
    }

    // Reset errors for that specific field
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if(!role){
      newErrors.role = 'Role is required';
    }

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and privacy policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data before submitting
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Send the correct field names as expected by the backend
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        fullName,
        email,
        password, // Changed from passwordHash to password to match backend expectations
        role
      });

      setSuccessMessage(response.data.message || 'Account created successfully!');
      
      // Reset form fields after successful submission
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setAgreeTerms(false);
      
      // Redirect after a short delay to show success message
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
      
    } catch (err) {
      console.error('SignUp Error:', err);
      const errorMessage = err.response?.data?.message || 'Something went wrong';
      setErrors({ 
        ...errors, 
        submit: errorMessage 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="h-full w-full bg-gradient-to-b from-slate-900 to-slate-800 absolute inset-0">
        <BackgroundBeams />
      </div>

      <div className="relative z-10 w-full max-w-md px-4 sm:px-0">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900">Create Your Account</h1>
              <p className="text-slate-600 mt-2">Join Zenith and elevate your experience</p>
            </div>

            {successMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                {successMessage}
              </div>
            )}

            {errors.submit && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {errors.submit}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                type="text"
                name="fullName"
                value={fullName}
                onChange={handleChange}
                placeholder="John Doe"
                error={errors.fullName}
                required
              />

              <Input
                label="Email Address"
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="you@example.com"
                error={errors.email}
                required
              />

              <Input
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                error={errors.password}
                placeholder="••••••••"
                required
              />

              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                placeholder="••••••••"
                required
              />

<div>
  <label htmlFor="role" className="block text-sm font-medium text-slate-700">
    Select Your Role
  </label>
  <select
    id="role"
    name="role"
    value={role}
    onChange={(e) => {
      setRole(e.target.value);
      if (errors.role) setErrors({ ...errors, role: null });
    }}
    className="mt-1 block w-full py-2 px-3 border border-slate-300 text-black bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    required
  >
    <option value="">-- Select Role --</option>
    <option value="CEO">CEO</option>
    <option value="Senior Manager">Senior Manager</option>
    <option value="Product Manager">Product Manager</option>
  </select>
  {errors.role && (
    <p className="mt-1 text-sm text-red-500">{errors.role}</p>
  )}
</div>


              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="agreeTerms"
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-slate-600">
                    I agree to the
                    <a href="#" className="text-indigo-600 hover:text-indigo-700 mx-1">
                      Terms of Service
                    </a>
                    and
                    <a href="#" className="text-indigo-600 hover:text-indigo-700 ml-1">
                      Privacy Policy
                    </a>
                  </label>
                  {errors.agreeTerms && (
                    <p className="mt-1 text-sm text-red-500">{errors.agreeTerms}</p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full py-3 mt-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-slate-500">Or sign up with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-slate-300 rounded-md shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                  </svg>
                  Google
                </button>

                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-slate-300 rounded-md shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387..."></path>
                  </svg>
                  GitHub
                </button>
              </div>
            </div>
          </div>

          <div className="px-8 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-slate-600">Already have an account?</p>
            <a href="/login" className="mt-3 sm:mt-0 text-sm font-medium text-indigo-600 hover:text-indigo-700">
              Sign in instead
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;