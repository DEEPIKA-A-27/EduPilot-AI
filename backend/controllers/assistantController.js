const { getAIResponse } = require('../services/aiService');

exports.chat = async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message cannot be empty' });
    }
    
    const response = await getAIResponse(message);
    res.json({ response });
  } catch (error) {
    console.error('Assistant chat error:', error);
    res.status(500).json({ error: 'Failed to process your request. Please try again.' });
  }
};