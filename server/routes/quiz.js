const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createQuiz,
  getCourseQuizzes,
  submitQuiz
} = require('../controllers/quizController');

router.post('/', protect, createQuiz);
router.get('/course/:courseId', protect, getCourseQuizzes);
router.post('/:id/submit', protect, submitQuiz);

module.exports = router;
