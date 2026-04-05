import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StudyPlanner = () => {
  const [entries, setEntries] = useState([]);
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/api/planner', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEntries(res.data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  const addEntry = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/planner', { subject, date, time, description }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubject('');
      setDate('');
      setTime('');
      setDescription('');
      setIsOpen(false);
      fetchEntries();
    } catch (error) {
      console.error('Error creating entry:', error);
    }
  };

  const deleteEntry = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/planner/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchEntries();
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8 mb-8">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">📚 Study Planner</h1>
            <p className="opacity-90">Organize your study schedule</p>
          </div>
          <Link to="/" className="bg-white text-purple-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition">
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="container mx-auto p-8">
        {/* Add Entry Button */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="mb-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-bold hover:from-purple-600 hover:to-pink-600 transition transform hover:scale-105"
          >
            ➕ New Study Session
          </button>
        )}

        {/* Add Entry Form */}
        {isOpen && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <form onSubmit={addEntry} className="space-y-4">
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                  required
                />
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                  required
                />
              </div>
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors resize-none h-24"
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-2 rounded-lg font-bold hover:from-green-600 hover:to-teal-600 transition"
                >
                  Schedule
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-400 text-white px-8 py-2 rounded-lg font-bold hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Entries Timeline */}
        <div className="space-y-4">
          {entries.length > 0 ? (
            entries.map((entry) => (
              <div key={entry.id} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-all duration-300">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">📖 {entry.subject}</h3>
                    <p className="text-gray-600 mb-3">{entry.description}</p>
                    <div className="flex gap-6">
                      <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-semibold">📅 {entry.date}</span>
                      <span className="bg-pink-100 text-pink-700 px-4 py-2 rounded-lg font-semibold">⏰ {entry.time}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteEntry(entry.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-semibold ml-4"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg">
              <p className="text-xl text-gray-500">No study sessions scheduled yet. Create your first one!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyPlanner;