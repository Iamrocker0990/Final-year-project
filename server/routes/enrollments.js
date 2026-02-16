const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { enrollInCourse, getMyEnrollments } = require('../controllers/enrollmentController');

// All routes are protected
router.use(protect);

// Apply to a course
router.post('/:courseId', enrollInCourse);

// Get my enrollments
router.get('/my-enrollments', getMyEnrollments);

module.exports = router;
