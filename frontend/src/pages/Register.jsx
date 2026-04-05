import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    // Basic Information
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    mobileNumber: '',
    
    // Optional Information
    dateOfBirth: '',
    gender: '',
    city: '',
    state: '',
    country: '',
    
    // ID Proof
    idProofType: '',
    idProofNumber: '',
    
    // Additional Details
    educationDetails: '',
    profilePicture: '',
    preferences: ''
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Basic validation
      if (!formData.email || !formData.password) {
        setError('Email and password are required');
        setLoading(false);
        return;
      }

      if (!formData.firstName || !formData.lastName) {
        setError('First name and last name are required');
        setLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }

      await axios.post('http://localhost:5000/api/auth/register', formData);
      
      setSuccess('✅ Registered successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setError(error.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 text-center">
          <h1 className="text-4xl font-bold mb-2">🎓 EduPilot AI</h1>
          <p className="text-lg">Create Your Account</p>
          <p className="text-sm mt-2 opacity-90">Join our community of learners</p>
        </div>

        {/* Content */}
        <div className="p-8">
          {error && (
            <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
              <span className="mr-2">⚠️</span>
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 border-2 border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center">
              <span className="mr-2">✅</span>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information Section */}
            <div className="bg-blue-50 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">📋 Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john.doe@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                {/* Username */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Username (Optional)</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="john_doe"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Mobile Number</label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    placeholder="+91 98765 43210"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Password *</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Min. 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Confirm Password *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Re-enter password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Additional Information Toggle */}
            <div>
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center justify-center w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-4 rounded-lg transition-all"
              >
                {showAdvanced ? '▼' : '▶'} Advanced Information (Optional)
              </button>
            </div>

            {/* Advanced Information Section */}
            {showAdvanced && (
              <div className="bg-purple-50 p-6 rounded-xl space-y-6">
                
                {/* Personal Details */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">👤 Personal Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Date of Birth</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Gender</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">📍 Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        placeholder="Your City"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">State</label>
                      <input
                        type="text"
                        name="state"
                        placeholder="Your State"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Country</label>
                      <input
                        type="text"
                        name="country"
                        placeholder="Your Country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>

                {/* ID Proof */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">🆔 ID Proof (Optional)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">ID Proof Type</label>
                      <select
                        name="idProofType"
                        value={formData.idProofType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                      >
                        <option value="">Select ID Type</option>
                        <option value="Aadhar">Aadhar</option>
                        <option value="PAN">PAN</option>
                        <option value="Passport">Passport</option>
                        <option value="Driving License">Driving License</option>
                        <option value="Voter ID">Voter ID</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">ID Number</label>
                      <input
                        type="text"
                        name="idProofNumber"
                        placeholder="Your ID Number"
                        value={formData.idProofNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Education & Career */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">🎯 Education & Career</h3>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Education Details</label>
                    <textarea
                      name="educationDetails"
                      placeholder="E.g., Currently studying B.Tech in Computer Science at XYZ University"
                      value={formData.educationDetails}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                      rows="3"
                    />
                  </div>
                </div>

                {/* Preferences */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">⚙️ Preferences</h3>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Your Learning Interests</label>
                    <input
                      type="text"
                      name="preferences"
                      placeholder="E.g., Web Development, Data Science, Machine Learning"
                      value={formData.preferences}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {loading ? '⏳ Creating Account...' : '✨ Create Account'}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-8 border-t border-gray-200 pt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-blue-600 hover:text-purple-600 transition-colors text-lg">
                Sign In Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;