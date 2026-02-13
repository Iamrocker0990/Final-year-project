// server/routes/student.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const User = require('../models/User');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// @desc    Get student dashboard data (My Courses)
// @route   GET /api/student/dashboard
// @access  Private (Student)
router.get('/dashboard', protect, async (req, res) => {
    try {
        // 1. Find all enrollments for this student
        // We use the Enrollment model to find records where 'student' matches the logged-in user
        const enrollments = await Enrollment.find({ student: req.user._id })
            .populate({
                path: 'course',
                select: 'title thumbnail description instructor',
                populate: {
                    path: 'instructor',
                    select: 'name'
                }
            });

        // 2. Format the data for the frontend
        const myCourses = enrollments.map(enrollment => ({
            _id: enrollment.course._id,
            title: enrollment.course.title,
            thumbnail: enrollment.course.thumbnail,
            instructorName: enrollment.course.instructor.name,
            progress: enrollment.progress,
            completedLessons: enrollment.completedLessons
        }));

        res.json({
            user: {
                name: req.user.name,
                email: req.user.email,
                role: req.user.role
            },
            courses: myCourses
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error loading dashboard' });
    }
});

// @desc    Get a student's progress for a course
// @route   GET /api/student/courses/:courseId/progress
// @access  Private
router.get('/courses/:courseId/progress', protect, async (req, res) => {
    try {
        const enrollment = await Enrollment.findOne({
            student: req.user._id,
            course: req.params.courseId
        });

        if (!enrollment) {
            return res.json({ completedLessons: [], progress: 0 });
        }

        res.json({
            completedLessons: enrollment.completedLessons,
            progress: enrollment.progress
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error loading progress' });
    }
});

// @desc    Mark a lesson as completed and update progress
// @route   POST /api/student/courses/:courseId/lessons/:lessonId/complete
// @access  Private
router.post('/courses/:courseId/lessons/:lessonId/complete', protect, async (req, res) => {
    try {
        const { courseId, lessonId } = req.params;

        // Ensure course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Count total lessons to compute progress
        const totalLessons = course.modules.reduce((sum, module) => sum + module.lessons.length, 0);
        if (totalLessons === 0) {
            return res.status(400).json({ message: 'No lessons found for this course' });
        }

        // Find or create enrollment
        let enrollment = await Enrollment.findOne({ student: req.user._id, course: courseId });
        if (!enrollment) {
            enrollment = new Enrollment({
                student: req.user._id,
                course: courseId,
                completedLessons: [],
                progress: 0,
            });
        }

        // Avoid duplicates
        const alreadyCompleted = enrollment.completedLessons.some(
            (id) => id.toString() === lessonId.toString()
        );
        if (!alreadyCompleted) {
            enrollment.completedLessons.push(lessonId);
        }

        const completedCount = enrollment.completedLessons.length;
        enrollment.progress = Math.min(100, Math.round((completedCount / totalLessons) * 100));

        await enrollment.save();

        res.json({
            completedLessons: enrollment.completedLessons,
            progress: enrollment.progress,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error updating progress' });
    }
});

module.exports = router;