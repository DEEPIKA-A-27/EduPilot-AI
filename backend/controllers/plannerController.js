const Planner = require('../models/plannerModel');

exports.getEntries = async (req, res) => {
  const entries = await Planner.findAll({ where: { user_id: req.user.id } });
  res.json(entries);
};

exports.createEntry = async (req, res) => {
  const { subject, date, time, description } = req.body;
  const entry = await Planner.create({ subject, date, time, description, user_id: req.user.id });
  res.status(201).json(entry);
};

exports.updateEntry = async (req, res) => {
  const { id } = req.params;
  const { subject, date, time, description } = req.body;
  await Planner.update({ subject, date, time, description }, { where: { id, user_id: req.user.id } });
  res.json({ message: 'Entry updated' });
};

exports.deleteEntry = async (req, res) => {
  const { id } = req.params;
  await Planner.destroy({ where: { id, user_id: req.user.id } });
  res.json({ message: 'Entry deleted' });
};