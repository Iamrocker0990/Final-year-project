const Course = require('../models/Course');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists for videos (referenced from original route logic)
const uploadDir = path.join(__dirname, '..', '..', 'uploads', 'videos');
// Note: recursive creation might be needed if moved logic relies on it, 
// but usually this is done at app startup or in the route definition where multer is configured.
// We'll assume the route file handles multer config, this controller handles business logic.

/**
 * @desc    Get all APPROVED courses (Public/Student view)
 * @route   GET /api/courses
 * @access  Public
 */
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({ status: 'approved' })
            .populate('instructor', 'name email')
            .select('title description thumbnail price instructor createdAt status');
        res.json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

/**
 * @desc    Get courses owned by the logged-in teacher
 * @route   GET /api/courses/mine
 * @access  Private/Teacher
 */
const getTeacherCourses = async (req, res) => {
    try {
        const courses = await Course.find({
            // Support both 'instructor' (ref) and 'createdBy' (ref) for backward compatibility/migration
            // The plan says `createdBy` in Course model, but original used `instructor`.
            // Let's check the Schema update. We added `createdBy` but didn't remove `instructor`.
            // The original Schema used `instructor` as the ref.
            // For safety, let's use `instructor` as it was the primary one, 
            // OR checks both if we want to migrate. 
            // implementation_plan.md specified `createdBy`.
            // Let's use `instructor` to match existing `Course.js` usage, or `createdBy` if we strictly follow plan.
            // The updated Course.js has BOTH `instructor` (line 27) and `createdBy` (line 44).
            // We should populate BOTH when creating to be safe.
            $or: [{ instructor: req.user._id }, { createdBy: req.user._id }]
        }).select('title description thumbnail createdAt status price');
        res.json(courses);
    } catch (error) {
        console.error('Error fetching teacher courses:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

/**
 * @desc    Get single course by ID
 * @route   GET /api/courses/:id
 * @access  Public
 */
const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate('instructor', 'name avatar');

        if (course) {
            // If student, check if approved or enrolled (logic can be expanded)
            // For now, allow viewing if they have the ID, or restrict if strictly needed.
            // Requirement: "Student: Can only GET courses where status: approved."
            // But if they bought it, maybe they can see it? For now enforce approval for public view.
            if (course.status !== 'approved' &&
                (!req.user || (req.user.role !== 'admin' && req.user._id.toString() !== course.instructor.toString()))) {
                return res.status(404).json({ message: 'Course not found or not available' });
            }
            res.json(course);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

/**
 * @desc    Create a course
 * @route   POST /api/courses
 * @access  Private/Teacher
 */
const createCourse = async (req, res) => {
    try {
        const { title, description, thumbnail, price } = req.body;

        const course = new Course({
            title,
            description,
            thumbnail,
            price,
            instructor: req.user._id, // Legacy support
            createdBy: req.user._id,  // New field
            status: 'pending',        // Default status
            modules: []
        });

        const createdCourse = await course.save();
        res.status(201).json(createdCourse);
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(400).json({ message: 'Invalid course data' });
    }
};

/**
 * @desc    Add a lesson to a course
 * @route   POST /api/courses/:id/lessons
 * @access  Private/Teacher
 */
const addLesson = async (req, res) => {
    try {
        const { moduleTitle, lessonTitle, type, content, duration } = req.body;
        const course = await Course.findById(req.params.id);

        if (course) {
            // Check ownership
            if (course.instructor.toString() !== req.user._id.toString() &&
                course.createdBy?.toString() !== req.user._id.toString() &&
                req.user.role !== 'admin') {
                return res.status(401).json({ message: 'Not authorized to update this course' });
            }

            const newLesson = {
                title: lessonTitle,
                type: type,
                content: content,
                duration: duration
            };

            // Simple module logic: Create new module for every lesson (MVP)
            // Ideally we'd find an existing module or create one
            const newModule = {
                title: moduleTitle || "Chapter 1",
                lessons: [newLesson]
            };

            course.modules.push(newModule);
            await course.save();

            res.status(201).json({ message: 'Lesson added' });
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        console.error('Error adding lesson:', error);
        res.status(400).json({ message: 'Error adding lesson' });
    }
};

// @desc    Upload a video file (Helper for route)
// Logic remains mostly in route for multer, but if we need a DB record for video, we do it here.
// For now, the existing route handles file upload and returns URL directly. 
// We might not need a controller method if the route just uses multer middleware + simple response.

module.exports = {
    getAllCourses,
    getTeacherCourses,
    getCourseById,
    createCourse,
    addLesson
};
