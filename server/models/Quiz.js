const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  option1: { type: String, required: true },
  option2: { type: String, required: true },
  option3: { type: String, required: true },
  option4: { type: String, required: true },
  ans: { type: Number, required: true }, // 1, 2, 3, or 4
});

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [QuestionSchema],
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Quiz || mongoose.model('Quiz', QuizSchema);
