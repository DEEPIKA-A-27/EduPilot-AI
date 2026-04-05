const Note = require('../models/notesModel');

exports.getNotes = async (req, res) => {
  const notes = await Note.findAll({ where: { user_id: req.user.id } });
  res.json(notes);
};

exports.createNote = async (req, res) => {
  const { title, content } = req.body;
  const note = await Note.create({ title, content, user_id: req.user.id });
  res.status(201).json(note);
};

exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  await Note.update({ title, content }, { where: { id, user_id: req.user.id } });
  res.json({ message: 'Note updated' });
};

exports.deleteNote = async (req, res) => {
  const { id } = req.params;
  await Note.destroy({ where: { id, user_id: req.user.id } });
  res.json({ message: 'Note deleted' });
};