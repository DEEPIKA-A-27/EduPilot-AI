const express = require('express');
const { getEntries, createEntry, updateEntry, deleteEntry } = require('../controllers/plannerController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getEntries);
router.post('/', authMiddleware, createEntry);
router.put('/:id', authMiddleware, updateEntry);
router.delete('/:id', authMiddleware, deleteEntry);

module.exports = router;