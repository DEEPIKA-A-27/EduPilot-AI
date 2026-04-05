import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/api/notes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(res.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const addNote = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/notes', { title, content }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTitle('');
      setContent('');
      setIsOpen(false);
      fetchNotes();
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const deleteNote = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-8 mb-8">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">📝 My Notes</h1>
            <p className="opacity-90">Create and organize your study notes</p>
          </div>
          <Link to="/" className="bg-white text-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition">
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="container mx-auto p-8">
        {/* Add Note Button */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="mb-8 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-lg font-bold hover:from-blue-600 hover:to-cyan-600 transition transform hover:scale-105"
          >
            ➕ New Note
          </button>
        )}

        {/* Add Note Form */}
        {isOpen && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <form onSubmit={addNote} className="space-y-4">
              <input
                type="text"
                placeholder="Note Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-lg font-semibold"
                required
              />
              <textarea
                placeholder="Note Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none h-32"
                required
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-2 rounded-lg font-bold hover:from-green-600 hover:to-teal-600 transition"
                >
                  Save Note
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

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.length > 0 ? (
            notes.map((note) => (
              <div key={note.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{note.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{note.content}</p>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-semibold"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-gray-500">No notes yet. Create your first note!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;