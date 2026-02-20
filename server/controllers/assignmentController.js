const Assignment = require('../models/Assignment');
const AssignmentSubmission = require('../models/AssignmentSubmission');
const Course = require('../models/Course');
const fs = require('fs');
const path = require('path');

// @desc    Create a new assignment
// @route   POST /api/assignments
// @access  Private (Teacher/Admin)
exports.createAssignment = async (req, res) => {
    try {
        const { title, description, courseId, dueDate, totalPoints } = req.body;

        // Verify course exists and user is instructor
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to add assignments to this course' });
        }

        let documentUrl = '';
        if (req.file) {
            documentUrl = `/uploads/assignments/${req.file.filename}`;
        }

        const assignment = new Assignment({
            title,
            description,
            documentUrl,
            course: courseId,
            dueDate,
            totalPoints,
            createdBy: req.user._id
        });

        const createdAssignment = await assignment.save();
        res.status(201).json(createdAssignment);
    } catch (error) {
        console.error('Error creating assignment:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get teacher's assignments
// @route   GET /api/assignments/teacher
// @access  Private (Teacher)
exports.getTeacherAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find({ createdBy: req.user._id })
            .populate('course', 'title')
            .sort({ createdAt: -1 });

        // Get submission counts for each assignment
        const assignmentsWithCounts = await Promise.all(assignments.map(async (assignment) => {
            const submissionCount = await AssignmentSubmission.countDocuments({ assignment: assignment._id });
            return {
                ...assignment.toObject(),
                submissionCount
            };
        }));

        res.json(assignmentsWithCounts);
    } catch (error) {
        console.error('Error fetching teacher assignments:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get student's assignments
// @route   GET /api/assignments/student
// @access  Private (Student)
exports.getStudentAssignments = async (req, res) => {
    try {
        // 1. Get courses student is enrolled in
        const Enrollment = require('../models/Enrollment');
        const enrollments = await Enrollment.find({ student: req.user._id });
        const courseIds = enrollments.map(e => e.course);

        // 2. Get assignments for those courses
        const assignments = await Assignment.find({ course: { $in: courseIds } })
            .populate('course', 'title instructor')
            .sort({ dueDate: 1 });

        // 3. Get student's submissions to map status
        const submissions = await AssignmentSubmission.find({
            student: req.user._id,
            assignment: { $in: assignments.map(a => a._id) }
        });

        const assignmentData = assignments.map(assignment => {
            const submission = submissions.find(s => s.assignment.toString() === assignment._id.toString());
            let status = 'Pending';
            let score = null;
            let submissionId = null;

            if (submission) {
                status = submission.status === 'graded' ? 'Graded' : 'Submitted';
                score = submission.score;
                submissionId = submission._id;
            } else if (new Date(assignment.dueDate) < new Date()) {
                status = 'Overdue';
            }

            return {
                ...assignment.toObject(),
                studentStatus: status,
                score,
                submissionId,
                submission: submission || null
            };
        });

        res.json(assignmentData);
    } catch (error) {
        console.error('Error fetching student assignments:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Submit an assignment
// @route   POST /api/assignments/:id/submit
// @access  Private (Student)
exports.submitAssignment = async (req, res) => {
    try {
        const assignmentId = req.params.id;
        const { submissionText } = req.body;

        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        // Check if already submitted
        const existingSubmission = await AssignmentSubmission.findOne({
            assignment: assignmentId,
            student: req.user._id
        });

        if (existingSubmission) {
            return res.status(400).json({ message: 'Assignment already submitted' });
        }

        let submissionFile = '';
        if (req.file) {
            submissionFile = `/uploads/submissions/${req.file.filename}`;
        }

        const newSubmission = new AssignmentSubmission({
            assignment: assignmentId,
            student: req.user._id,
            submissionText: submissionText || '',
            submissionFile,
            status: 'submitted'
        });

        const savedSubmission = await newSubmission.save();
        res.status(201).json(savedSubmission);
    } catch (error) {
        console.error('Error submitting assignment:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get submissions for an assignment
// @route   GET /api/assignments/:id/submissions
// @access  Private (Teacher)
exports.getAssignmentSubmissions = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        if (assignment.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const submissions = await AssignmentSubmission.find({ assignment: req.params.id })
            .populate('student', 'name email avatar')
            .sort({ createdAt: -1 });

        res.json(submissions);
    } catch (error) {
        console.error('Error fetching submissions:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Grade a submission
// @route   PUT /api/assignments/submissions/:id/grade
// @access  Private (Teacher)
exports.gradeSubmission = async (req, res) => {
    try {
        const { score, feedback } = req.body;
        const submissionId = req.params.id;

        const submission = await AssignmentSubmission.findById(submissionId).populate('assignment');
        if (!submission) {
            return res.status(404).json({ message: 'Submission not found' });
        }

        if (submission.assignment.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        submission.score = score;
        submission.feedback = feedback;
        submission.status = 'graded';

        const updatedSubmission = await submission.save();
        res.json(updatedSubmission);
    } catch (error) {
        console.error('Error grading submission:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
