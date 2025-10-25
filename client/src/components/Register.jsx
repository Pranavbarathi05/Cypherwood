import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Registration data:', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      
      // TODO: Replace with actual API call to backend
      // After successful registration, redirect to login/home
      navigate('/'); // Change to '/auth/login' when login page is created
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-black border-2 border-green-500 rounded-lg shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-green-500 mb-2 tracking-wider">
              &gt; REGISTER
            </h2>
            <p className="text-green-400 text-sm">Create your account to compete</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-green-500 text-sm font-semibold mb-2">
                &gt; USERNAME
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full bg-black border-2 ${
                  errors.username ? 'border-red-800' : 'border-green-500'
                } text-green-400 rounded px-4 py-3 focus:outline-none focus:border-green-300 font-mono placeholder-green-700`}
                placeholder="enter_username"
                disabled={isSubmitting}
              />
              {errors.username && (
                <p className="text-red-800 text-xs mt-1 font-mono">&gt; ERROR: {errors.username}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-green-500 text-sm font-semibold mb-2">
                &gt; EMAIL
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full bg-black border-2 ${
                  errors.email ? 'border-red-800' : 'border-green-500'
                } text-green-400 rounded px-4 py-3 focus:outline-none focus:border-green-300 font-mono placeholder-green-700`}
                placeholder="user@gmail.com"
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-red-800 text-xs mt-1 font-mono">&gt; ERROR: {errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-green-500 text-sm font-semibold mb-2">
                &gt; PASSWORD
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full bg-black border-2 ${
                  errors.password ? 'border-red-800' : 'border-green-500'
                } text-green-400 rounded px-4 py-3 focus:outline-none focus:border-green-300 font-mono placeholder-green-700`}
                placeholder="********"
                disabled={isSubmitting}
              />
              {errors.password && (
                <p className="text-red-800 text-xs mt-1 font-mono">&gt; ERROR: {errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-green-500 text-sm font-semibold mb-2">
                &gt; CONFIRM PASSWORD
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full bg-black border-2 ${
                  errors.confirmPassword ? 'border-red-800' : 'border-green-500'
                } text-green-400 rounded px-4 py-3 focus:outline-none focus:border-green-300 font-mono placeholder-green-700`}
                placeholder="********"
                disabled={isSubmitting}
              />
              {errors.confirmPassword && (
                <p className="text-red-800 text-xs mt-1 font-mono">&gt; ERROR: {errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-4 rounded transition duration-200 tracking-wider ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'PROCESSING...' : 'SUBMIT'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-green-400 text-sm">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-green-300 hover:text-green-100 underline font-semibold"
              >
                Login here
              </button>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
