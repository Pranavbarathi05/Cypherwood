import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock users - In a real app, this would be in your backend
const MOCK_USERS = {
  "admin": { password: "admin123", isAdmin: true },
  "user1": { password: "user123", isAdmin: false },
  "user2": { password: "user123", isAdmin: false }
};

export default function Login({ setCurrentUser, setIsAdmin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
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
    setLoginError('');

    // Simulate API call with mock data
    setTimeout(() => {
      const user = MOCK_USERS[formData.username];
      
      if (user && user.password === formData.password) {
        // Successful login
        setCurrentUser(formData.username);
        setIsAdmin(user.isAdmin);
        navigate('/');
      } else {
        // Failed login
        setLoginError('Invalid username or password');
        setIsSubmitting(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-black border-2 border-green-500 rounded-lg shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-green-500 mb-2 tracking-wider">
              &gt; LOGIN
            </h2>
            <p className="text-green-400 text-sm">Access your account to compete</p>
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

            {/* Login Error Message */}
            {loginError && (
              <div className="text-red-800 text-sm mb-4 font-mono border-2 border-red-800 p-3 rounded">
                &gt; ERROR: {loginError}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-4 rounded transition duration-200 tracking-wider ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'LOGGING IN...' : 'LOGIN'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-green-400 text-sm">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/auth/register')}
                className="text-green-300 hover:text-green-100 underline font-semibold"
              >
                Register here
              </button>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}