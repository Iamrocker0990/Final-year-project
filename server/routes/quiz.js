const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createQuiz,
  getCourseQuizzes,
  getMyQuizzes,
  getQuizById,
  submitQuiz
} = require('../controllers/quizController');

router.post('/', protect, createQuiz);
router.get('/mine', protect, getMyQuizzes);
router.get('/course/:courseId', protect, getCourseQuizzes);
router.get('/:id', protect, getQuizById);
router.post('/:id/submit', protect, submitQuiz);

module.exports = router;
