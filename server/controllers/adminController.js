const Course = require('../models/Course');

/**
 * @desc    Get all pending courses
 * @route   GET /api/admin/courses/pending
 * @access  Private/Admin
 */
const getPendingCourses = async (req, res) => {
    try {
        const courses = await Course.find({ status: 'pending' })
            .populate('instructor', 'name email')
            .select('title description thumbnail price instructor createdAt status');
        res.json(courses);
    } catch (error) {
        console.error('Error fetching pending courses:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

/**
 * @desc    Update course status (Approve/Reject)
 * @route   PUT /api/admin/courses/:id/status
 * @access  Private/Admin
 */
const updateCourseStatus = async (req, res) => {
    try {
        // Status can come from body (original way) or be set by specific handlers
        const { status } = req.body;

        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status. Must be approved or rejected.' });
        }

        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        course.status = status;
        course.actionTimestamp = Date.now();
        const updatedCourse = await course.save();

        res.json(updatedCourse);
    } catch (error) {
        console.error('Error updating course status:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const approveCourse = async (req, res) => {
    req.body.status = 'approved';
    await updateCourseStatus(req, res);
};

const rejectCourse = async (req, res) => {
    req.body.status = 'rejected';
    await updateCourseStatus(req, res);
};

module.exports = {
    getPendingCourses,
    updateCourseStatus,
    approveCourse,
    rejectCourse
};
