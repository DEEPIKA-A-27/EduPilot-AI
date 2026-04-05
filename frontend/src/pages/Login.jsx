import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { 
        emailOrUsername, 
        password 
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">🎓 EduPilot AI</h1>
          <p className="text-gray-600 text-lg">Welcome back</p>
          <p className="text-gray-500 text-sm">Sign in to continue learning</p>
        </div>
        
        {error && (
          <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center">
            <span className="mr-2">⚠️</span>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email or Username</label>
            <input
              type="text"
              placeholder="Enter your email or username"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
              required
            />
            <p className="text-xs text-gray-500 mt-1">You can use either your email or username</p>
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '⏳ Signing in...' : '✨ Sign In'}
          </button>
        </form>
        
        <div className="mt-8 space-y-4">
          <div className="border-t border-gray-200 pt-6">
            <p className="text-center text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-bold text-green-600 hover:text-blue-600 transition-colors">
                Create Account
              </Link>
            </p>
          </div>
          
          <div className="text-center">
            <Link to="/login" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;