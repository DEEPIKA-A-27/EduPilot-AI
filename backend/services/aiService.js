const axios = require('axios');

// Mock responses database
const mockResponses = {
  math: [
    'To solve this problem, break it down into smaller steps. Start by identifying what you know and what you need to find.',
    'Remember to follow the order of operations: Parentheses, Exponents, Multiplication/Division, Addition/Subtraction.',
    'Practice makes perfect! Try working through similar problems to strengthen your understanding.'
  ],
  science: [
    'Science is all about observation and experimentation. Try conducting experiments to verify theories.',
    'Remember that science is a process of asking questions and finding answers through investigation.',
    'Visual learning can help! Try drawing diagrams or creating mind maps to organize scientific concepts.'
  ],
  history: [
    'History teaches us about the past to help us understand the present. Always consider multiple perspectives.',
    'When studying history, try to understand causa and effect relationships between events.',
    'Timeline creation can be very helpful for understanding the sequence of historical events.'
  ],
  default: [
    'Great question! Let\'s break this down together. What specific aspect would you like to focus on?',
    'That\'s an interesting topic! I\'d recommend breaking it into smaller components to understand it better.',
    'Think about what you already know about this topic and build from there. What connections can you make?',
    'Remember, the best way to learn is by asking questions and exploring. You\'re on the right track!',
    'Would you like to discuss this topic in more detail? Feel free to ask follow-up questions.'
  ]
};

// Get category from prompt
const getCategory = (prompt) => {
  const lower = prompt.toLowerCase();
  if (lower.match(/math|algebra|geometry|calculus|equation|formula/i)) return 'math';
  if (lower.match(/science|physics|chemistry|biology|element|organism/i)) return 'science';
  if (lower.match(/history|war|revolution|century|ancient|medieval/i)) return 'history';
  return 'default';
};

// Get random response for category
const getMockResponse = (category) => {
  const responses = mockResponses[category] || mockResponses.default;
  return responses[Math.floor(Math.random() * responses.length)];
};

// Check if API key is valid (not placeholder)
const isValidOpenAIKey = () => {
  const key = process.env.OPENAI_API_KEY;
  return key && key !== 'your_openai_api_key_here' && key.startsWith('sk-');
};

exports.getAIResponse = async (prompt) => {
  // Try OpenAI API if valid key is configured
  if (isValidOpenAIKey()) {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are EduPilot, an intelligent study companion helping students with educational topics.' },
            { role: 'user', content: prompt }
          ],
          max_tokens: 150,
          temperature: 0.7
        },
        {
          headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
          timeout: 10000
        }
      );
      return response.data.choices[0].message.content.trim();
    } catch (error) {
      console.error('OpenAI API error:', error.message);
      // Fall through to mock response
    }
  }

  // Fallback: return intelligent mock response based on topic
  const category = getCategory(prompt);
  return getMockResponse(category);
};