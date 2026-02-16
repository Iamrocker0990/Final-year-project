const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
    createAssignment,
    getCourseAssignments,
    submitAssignment,
    getSubmissions,
    gradeSubmission,
    getMySubmission
} = require('../controllers/assignmentController');

router.post('/', protect, createAssignment);
router.get('/course/:courseId', protect, getCourseAssignments);
router.post('/:id/submit', protect, submitAssignment);
router.get('/:id/my-submission', protect, getMySubmission);
router.get('/:id/submissions', protect, getSubmissions);
router.put('/submissions/:id/grade', protect, gradeSubmission);

module.exports = router;
