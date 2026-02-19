const Quiz = require('../models/Quiz');
const Submission = require('../models/Submission');
const Course = require('../models/Course');

// @desc    Create a new quiz
// @route   POST /api/quizzes
// @access  Private (Teacher)
const createQuiz = async (req, res) => {
    try {
        const { title, questions, courseId, timeLimit, totalMarks, passingMarks } = req.body;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        if (course.instructor.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const quiz = new Quiz({
            title,
            questions,
            course: courseId,
            instructor: req.user._id,
            timeLimit,
            totalMarks,
            passingMarks
        });

        const createdQuiz = await quiz.save();
        res.status(201).json(createdQuiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all quizzes for courses the student is enrolled in
// @route   GET /api/quizzes/mine
// @access  Private (Student)
const getMyQuizzes = async (req, res) => {
    try {
        const Enrollment = require('../models/Enrollment');
        // 1. Get student's enrollments
        const enrollments = await Enrollment.find({ student: req.user._id });
        const courseIds = enrollments.map(e => e.course);

        // 2. Find quizzes for these courses
        const quizzes = await Quiz.find({ course: { $in: courseIds } })
            .populate('course', 'title thumbnail')
            .sort({ createdAt: -1 });

        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all quizzes for a course
// @route   GET /api/quizzes/course/:courseId
// @access  Private
const getCourseQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find({ course: req.params.courseId }).sort({ createdAt: -1 });
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single quiz by ID
// @route   GET /api/quizzes/:id
// @access  Private
const getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Submit a quiz
// @route   POST /api/quizzes/:id/submit
// @access  Private (Student)
const submitQuiz = async (req, res) => {
    try {
        const { answers } = req.body; // Array of { questionId, selectedOption }
        const quizId = req.params.id;
        const studentId = req.user._id;

        const quiz = await Quiz.findById(quizId);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

        // Calculate score
        let score = 0;
        quiz.questions.forEach(q => {
            const studentLink = answers.find(a => a.questionId === q._id.toString());
            // Need to handle option index vs value matching. Assuming simplified checking for now.
            // If quiz model uses opt1..4 and ans 1..4
            if (studentLink && parseInt(studentLink.selectedOption) === q.ans) {
                score += (quiz.totalMarks / quiz.questions.length); // Distribute marks evenly
            }
        });

        const submission = new Submission({
            student: studentId,
            type: 'quiz',
            contentId: quizId,
            modelType: 'Quiz',
            answers,
            marks: score,
            status: 'graded' // Auto-graded
        });

        await submission.save();
        res.status(201).json({ message: 'Quiz submitted', score, totalMarks: quiz.totalMarks });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createQuiz,
    getCourseQuizzes,
    getMyQuizzes,
    getQuizById,
    submitQuiz
};
