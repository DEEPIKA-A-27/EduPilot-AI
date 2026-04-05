const axios = require('axios');

exports.getAIResponse = async (prompt) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: 'text-davinci-003',
      prompt,
      max_tokens: 100,
    }, {
      headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` }
    });
    return response.data.choices[0].text.trim();
  } catch (error) {
    return 'Sorry, I could not process your request.';
  }
};