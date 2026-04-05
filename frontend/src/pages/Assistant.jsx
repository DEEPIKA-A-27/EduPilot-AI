import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Assistant = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;
    
    setLoading(true);
    const token = localStorage.getItem('token');
    
    // Add user message to chat
    setChat([...chat, { user: message, ai: null }]);
    
    try {
      const res = await axios.post('http://localhost:5000/api/assistant/chat', { message }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Update with AI response
      setChat(prevChat => [
        ...prevChat.slice(0, -1),
        { user: message, ai: res.data.response }
      ]);
    } catch (error) {
      setChat(prevChat => [
        ...prevChat.slice(0, -1),
        { user: message, ai: 'Sorry, I encountered an error. Please try again.' }
      ]);
    } finally {
      setMessage('');
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">🤖 AI Assistant</h1>
            <p className="opacity-90">Your intelligent study companion</p>
          </div>
          <Link to="/" className="bg-white text-green-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition">
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 container mx-auto p-8 flex flex-col">
        {/* Messages */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 mb-6 overflow-y-auto space-y-4">
          {chat.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-4xl mb-4">👋</p>
                <p className="text-xl text-gray-500">Start chatting with your AI assistant!</p>
                <p className="text-gray-400 mt-2">Ask questions, get help with studies, and more</p>
              </div>
            </div>
          ) : (
            chat.map((c, i) => (
              <div key={i} className="space-y-3">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl rounded-tr-none max-w-xs lg:max-w-md">
                    {c.user}
                  </div>
                </div>
                
                {/* AI Response */}
                {c.ai && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 px-6 py-3 rounded-2xl rounded-tl-none max-w-xs lg:max-w-md">
                      {c.ai}
                    </div>
                  </div>
                )}
                
                {/* Loading indicator */}
                {c.ai === null && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 px-6 py-3 rounded-2xl rounded-tl-none">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Input Area */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex gap-4">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your studies..."
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors resize-none"
              rows="1"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !message.trim()}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-lg font-bold hover:from-green-600 hover:to-emerald-700 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '⏳' : '📤'} Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assistant;