const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// Get all quizzes or by course
router.get('/all', async (req, res) => {
  try {
    const { courseId } = req.query;
    let query = {};
    if (courseId) {
      query.course = courseId;
    }
    const quizzes = await Quiz.find(query).sort({ createdAt: -1 });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Save a new quiz
router.post('/save', async (req, res) => {
  const { title, questions, courseId } = req.body;
  
  const quiz = new Quiz({
    title,
    questions,
    course: courseId
  });

  try {
    const newQuiz = await quiz.save();
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
