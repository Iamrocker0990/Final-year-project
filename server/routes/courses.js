// server/routes/courses.js
const express = require('express');
const router = express.Router();
const { protect, teacher } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {
    getAllCourses,
    getTeacherCourses,
    getCourseById,
    createCourse,
    addLesson,
    updateCourse,
    deleteCourse
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
        if (file.mimetype.startsWith('video/') || file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only video and image uploads are allowed'));
        }
    }
});

// Routes
router.get('/', getAllCourses);
router.get('/mine', protect, teacher, getTeacherCourses);
router.get('/:id', getCourseById);
router.post('/', protect, teacher, createCourse);
router.post('/:id/lessons', protect, teacher, addLesson);
router.put('/:id', protect, teacher, updateCourse);
router.delete('/:id', protect, teacher, deleteCourse);

// Video Upload Route (Kept inline as it's tightly coupled with multer middleware)
router.post('/upload/video', protect, teacher, upload.single('video'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        // Construct URL based on server address (req.get('host'))
        const url = `${req.protocol}://${req.get('host')}/uploads/videos/${req.file.filename}`;
        res.status(201).json({ url });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Upload failed' });
    }
});

// Image Upload Route
router.post('/upload/image', protect, teacher, upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image file uploaded' });
        }
        const url = `${req.protocol}://${req.get('host')}/uploads/videos/${req.file.filename}`;
        res.status(201).json({ url });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Upload failed' });
    }
});

module.exports = router;