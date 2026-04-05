import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const features = [
    { icon: '📝', title: 'Notes', description: 'Organize and manage your study notes', color: 'from-blue-400 to-blue-600', link: '/notes' },
    { icon: '📅', title: 'Study Planner', description: 'Plan your study schedule', color: 'from-purple-400 to-purple-600', link: '/planner' },
    { icon: '🎯', title: 'Career Guide', description: 'Get career recommendations', color: 'from-pink-400 to-pink-600', link: '/career' },
    { icon: '🤖', title: 'AI Assistant', description: 'Chat with your study assistant', color: 'from-green-400 to-green-600', link: '/assistant' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-2">Welcome to EduPilot AI</h1>
          <p className="text-xl opacity-90">Your intelligent educational companion</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-8">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Link key={index} to={feature.link}>
              <div className={`bg-gradient-to-br ${feature.color} rounded-2xl shadow-lg p-8 text-white transform hover:scale-105 transition-all duration-300 cursor-pointer h-full`}>
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                <p className="opacity-90">{feature.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Learning Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
              <div className="text-4xl font-bold text-blue-600">5</div>
              <p className="text-gray-600 mt-2">Notes Created</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
              <div className="text-4xl font-bold text-purple-600">3</div>
              <p className="text-gray-600 mt-2">Study Sessions</p>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-xl">
              <div className="text-4xl font-bold text-pink-600">2</div>
              <p className="text-gray-600 mt-2">Skill Goals</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;