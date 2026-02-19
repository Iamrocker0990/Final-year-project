const Assignment = require('../models/Assignment');
const Submission = require('../models/Submission');
const Course = require('../models/Course');

// Helper Functions
const calculateTotalMarks = (questions) => {
    return questions.reduce((sum, q) => sum + parseInt(q.marks || 0), 0);
};

const evaluateQuestion = (question, answer) => {
    let marksObtained = 0;
    let status = 'pending';

    if (question && question.type === 'mcq') {
        if (parseInt(answer.answer) === question.correctOptionIndex) {
            marksObtained = question.marks;
            status = 'correct';
        } else {
            status = 'incorrect';
        }
    }
    // Add other question types here if needed

    return { marksObtained, status };
};

// @desc    Create a new assignment
// @route   POST /api/assignments
// @access  Private (Teacher)
const createAssignment = async (req, res) => {
    try {
        const { title, description, courseId, dueDate, maxMarks, fileUrl, submissionType, questions } = req.body;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        if (course.instructor.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to add assignments to this course' });
        }

        // Validation: Check if questions total marks equals maxMarks
        if (questions && questions.length > 0) {
            const totalQuestionMarks = calculateTotalMarks(questions);
            if (totalQuestionMarks !== parseInt(maxMarks)) {
                return res.status(400).json({
                    message: `Total marks of questions (${totalQuestionMarks}) does not match assignment max marks (${maxMarks})`
                });
            }
        }

        const assignment = new Assignment({
            title,
            description,
            courseId,
            teacherId: req.user._id,
            dueDate,
            maxMarks,
            fileUrl,
            submissionType,
            questions: questions || []
        });

        const createdAssignment = await assignment.save();
        res.status(201).json(createdAssignment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all assignments for a course
// @route   GET /api/assignments/course/:courseId
// @access  Private
const getCourseAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find({ courseId: req.params.courseId }).sort({ createdAt: -1 });
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Submit an assignment
// @route   POST /api/assignments/:id/submit
// @access  Private (Student)
const submitAssignment = async (req, res) => {
    try {
        const { submissionText, fileUrl, answers } = req.body;
        const assignmentId = req.params.id;
        const studentId = req.user._id;

        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        // Check deadline
        if (new Date() > new Date(assignment.dueDate)) {
            return res.status(400).json({ message: 'Submission deadline has passed' });
        }

        // Check if already submitted
        const existingSubmission = await Submission.findOne({
            student: studentId,
            contentId: assignmentId,
            modelType: 'Assignment'
        });

        if (existingSubmission) {
            return res.status(400).json({ message: 'Assignment already submitted' });
        }

        // Auto-evaluation logic
        let totalMarks = 0;
        let processedAnswers = [];
        let status = 'submitted';

        if (answers && answers.length > 0 && assignment.questions && assignment.questions.length > 0) {
            processedAnswers = answers.map(ans => {
                const question = assignment.questions.find(q => q._id.toString() === ans.questionId || assignment.questions.indexOf(q) === ans.questionIndex);

                const { marksObtained, status: ansStatus } = evaluateQuestion(question, ans);
                totalMarks += marksObtained;

                return {
                    questionId: ans.questionId,
                    questionIndex: ans.questionIndex,
                    answer: ans.answer,
                    marksObtained,
                    status: ansStatus
                };
            });

            // If all are MCQs, we can mark as graded
            const allMcq = assignment.questions.every(q => q.type === 'mcq');
            if (allMcq) {
                status = 'graded';
            }
        }

        const submission = new Submission({
            student: studentId,
            type: 'assignment',
            contentId: assignmentId,
            modelType: 'Assignment',
            submissionText,
            fileUrl,
            answers: processedAnswers,
            marks: totalMarks,
            status
        });

        await submission.save();
        res.status(201).json({ message: 'Assignment submitted successfully', submission });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get submissions for an assignment
// @route   GET /api/assignments/:id/submissions
// @access  Private (Teacher)
const getSubmissions = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        if (assignment.teacherId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const submissions = await Submission.find({
            contentId: req.params.id,
            modelType: 'Assignment'
        }).populate('student', 'name email');

        res.json(submissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Grade a submission
// @route   PUT /api/assignments/submissions/:id/grade
// @access  Private (Teacher)
const gradeSubmission = async (req, res) => {
    try {
        const { marks, feedback } = req.body;
        const submission = await Submission.findById(req.params.id);

        if (!submission) {
            return res.status(404).json({ message: 'Submission not found' });
        }

        submission.marks = marks;
        submission.feedback = feedback;
        submission.status = 'graded';

        await submission.save();
        res.json(submission);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get my submission for an assignment
// @route   GET /api/assignments/:id/my-submission
// @access  Private (Student)
const getMySubmission = async (req, res) => {
    try {
        const submission = await Submission.findOne({
            student: req.user._id,
            contentId: req.params.id,
            modelType: 'Assignment'
        });

        if (!submission) {
            return res.status(200).json(null); // No submission yet
        }

        res.json(submission);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createAssignment,
    getCourseAssignments,
    submitAssignment,
    getSubmissions,
    gradeSubmission,
    getMySubmission
};
