const Career = require('../models/careerModel');
const axios = require('axios');

exports.getCareer = async (req, res) => {
  const career = await Career.findOne({ where: { user_id: req.user.id } });
  res.json(career || {});
};

exports.updateCareer = async (req, res) => {
  const { interests, skills } = req.body;
  // Simple prediction logic, in real app use AI service
  const predicted = interests.includes('tech') ? 'Software Engineer' : 'Teacher';
  await Career.upsert({ interests, skills, predicted_career: predicted, user_id: req.user.id });
  res.json({ message: 'Career updated' });
};