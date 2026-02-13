const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const { getPendingCourses, updateCourseStatus } = require('../controllers/adminController');

// All routes here are protected and require admin role
router.use(protect, admin);

router.get('/courses/pending', getPendingCourses);
router.put('/courses/:id/status', updateCourseStatus);

module.exports = router;
