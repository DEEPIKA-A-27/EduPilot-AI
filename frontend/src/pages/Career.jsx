import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Career = () => {
  const [data, setData] = useState({});
  const [interests, setInterests] = useState('');
  const [skills, setSkills] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchCareer();
  }, []);

  const fetchCareer = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/api/career', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(res.data);
      if (res.data.interests) setInterests(res.data.interests);
      if (res.data.skills) setSkills(res.data.skills);
    } catch (error) {
      console.error('Error fetching career:', error);
    }
  };

  const updateCareer = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/career', { interests, skills }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsEditing(false);
      fetchCareer();
    } catch (error) {
      console.error('Error updating career:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white p-8 mb-8">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">🎯 Career Guide</h1>
            <p className="opacity-90">Discover your perfect career path</p>
          </div>
          <Link to="/" className="bg-white text-pink-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition">
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Edit Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Update Profile</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-3 rounded-lg font-bold hover:from-pink-600 hover:to-orange-600 transition"
                >
                  Edit Profile
                </button>
              ) : (
                <form onSubmit={updateCareer} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Interests</label>
                    <textarea
                      value={interests}
                      onChange={(e) => setInterests(e.target.value)}
                      placeholder="e.g., Technology, Business, Science"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-500 transition-colors resize-none h-20"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Skills</label>
                    <textarea
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      placeholder="e.g., Programming, Writing, Leadership"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-500 transition-colors resize-none h-20"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-lg font-bold hover:from-green-600 hover:to-teal-600 transition"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 bg-gray-400 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-500 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Career Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Career Profile</h2>
              
              {data.interests || data.skills ? (
                <div className="space-y-6">
                  {data.interests && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">💡 Your Interests</h3>
                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl">
                        <p className="text-gray-700">{data.interests}</p>
                      </div>
                    </div>
                  )}
                  
                  {data.skills && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">⭐ Your Skills</h3>
                      <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl">
                        <p className="text-gray-700">{data.skills}</p>
                      </div>
                    </div>
                  )}
                  
                  {data.predicted_career && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">🚀 Recommended Career</h3>
                      <div className="bg-gradient-to-r from-pink-50 to-orange-100 p-6 rounded-xl border-2 border-pink-200">
                        <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text">{data.predicted_career}</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-500 mb-4">Complete your profile to get career recommendations</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;