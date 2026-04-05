const { getAIResponse } = require('../services/aiService');

exports.chat = async (req, res) => {
  const { message } = req.body;
  const response = await getAIResponse(message);
  res.json({ response });
};