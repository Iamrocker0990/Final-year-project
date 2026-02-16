const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const { getPendingCourses, updateCourseStatus, approveCourse, rejectCourse } = require('../controllers/adminController');

// All routes here are protected and require admin role
router.use(protect, admin);

router.get('/courses/pending', getPendingCourses);
router.put('/courses/:id/status', updateCourseStatus); // Keep generic route
router.put('/courses/:id/approve', approveCourse);
router.put('/courses/:id/reject', rejectCourse);

module.exports = router;
