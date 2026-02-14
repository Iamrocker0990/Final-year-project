// server/routes/courses.js
const express = require('express');
const router = express.Router();
const { protect, teacher } = require('../middleware/auth');
<<<<<<< HEAD
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {
    getAllCourses,
    getTeacherCourses,
    getCourseById,
    createCourse,
    addLesson
} = require('../controllers/courseController');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '..', 'uploads', 'videos');
// Use synchronous mkdir for startup/init to ensure it exists before requests come in
try {
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
} catch (err) {
    console.error("Error creating upload directory:", err);
}
=======
const Course = require('../models/Course');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '..', 'uploads', 'videos');
fs.mkdirSync(uploadDir, { recursive: true });
>>>>>>> origin/otp-updates

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname) || '.mp4';
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 * 1024 }, // 2GB
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('video/')) {
            cb(null, true);
        } else {
            cb(new Error('Only video uploads are allowed'));
        }
    }
});

<<<<<<< HEAD
// Routes
router.get('/', getAllCourses);
router.get('/mine', protect, teacher, getTeacherCourses);
router.get('/:id', getCourseById);
router.post('/', protect, teacher, createCourse);
router.post('/:id/lessons', protect, teacher, addLesson);

// Video Upload Route (Kept inline as it's tightly coupled with multer middleware)
=======
// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
router.get('/', async (req, res) => {
    try {
        // Populate specific fields to keep the response light
        const courses = await Course.find({})
            .populate('instructor', 'name email')
            .select('title description thumbnail price instructor createdAt');
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get courses owned by the logged-in teacher
// @route   GET /api/courses/mine
// @access  Private/Teacher
router.get('/mine', protect, teacher, async (req, res) => {
    try {
        const courses = await Course.find({ instructor: req.user._id })
            .select('title description thumbnail createdAt');
        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get single course by ID
// @route   GET /api/courses/:id
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate('instructor', 'name avatar');
        
        if (course) {
            res.json(course);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Upload a video file and return its URL
// @route   POST /api/courses/upload/video
// @access  Private/Teacher
>>>>>>> origin/otp-updates
router.post('/upload/video', protect, teacher, upload.single('video'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No video file uploaded' });
        }
<<<<<<< HEAD
        // Construct URL based on server address (req.get('host'))
=======
>>>>>>> origin/otp-updates
        const url = `${req.protocol}://${req.get('host')}/uploads/videos/${req.file.filename}`;
        res.status(201).json({ url });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Upload failed' });
    }
});

<<<<<<< HEAD
=======
// @desc    Create a course
// @route   POST /api/courses
// @access  Private/Teacher
router.post('/', protect, teacher, async (req, res) => {
    try {
        // We expect the frontend to send this data
        const { title, description, thumbnail, price } = req.body;

        const course = new Course({
            title,
            description,
            thumbnail, // This will be the Firebase Image URL
            price,
            instructor: req.user._id, // Get ID from the logged-in user
            modules: [] // Start with empty modules
        });

        const createdCourse = await course.save();
        res.status(201).json(createdCourse);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Invalid course data' });
    }
});

// @desc    Add a lesson to a course (Simplest way to add content)
// @route   POST /api/courses/:id/lessons
// @access  Private/Teacher
router.post('/:id/lessons', protect, teacher, async (req, res) => {
    try {
        const { moduleTitle, lessonTitle, type, content, duration } = req.body;
        const course = await Course.findById(req.params.id);

        if (course) {
            // Check if user is the course owner
            if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                return res.status(401).json({ message: 'Not authorized to update this course' });
            }

            // Simple logic: If module doesn't exist, create it. 
            // If it exists, add lesson to it.
            // For MVP, we will just Create a NEW Module for every upload to keep it simple.
            
            const newLesson = {
                title: lessonTitle,
                type: type, // 'video', 'document', etc.
                content: content, // The Firebase URL
                duration: duration
            };

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
        res.status(400).json({ message: 'Error adding lesson' });
    }
});

>>>>>>> origin/otp-updates
module.exports = router;