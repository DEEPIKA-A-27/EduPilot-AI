const express = require('express');
const { getCareer, updateCareer } = require('../controllers/careerController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getCareer);
router.post('/', authMiddleware, updateCareer);

module.exports = router;