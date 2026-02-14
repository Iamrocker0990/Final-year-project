const express = require('express');
const router = express.Router();
const { protect, teacher } = require('../middleware/auth');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const User = require('../models/User');

// @desc    Get Teacher Dashboard Stats
// @route   GET /api/teacher/dashboard
router.get('/dashboard', protect, teacher, async (req, res) => {
    try {
        const teacherId = req.user._id;

        // 1. Get all courses created by this teacher
        const courses = await Course.find({ instructor: teacherId });
        const courseIds = courses.map(course => course._id);

        // 2. Calculate Total Stats
        const totalCourses = courses.length;
        
        // Count total enrollments in these courses
        const totalEnrollments = await Enrollment.countDocuments({
            course: { $in: courseIds }
        });

        // 3. Get Recent Activity (Last 5 enrollments)
        const recentEnrollments = await Enrollment.find({ course: { $in: courseIds } })
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('student', 'name email')
            .populate('course', 'title');

        const recentActivity = recentEnrollments.map(enroll => ({
            type: 'enrollment',
            user: enroll.student.name,
            action: 'enrolled in',
            target: enroll.course.title,
            time: new Date(enroll.createdAt).toLocaleDateString()
        }));

        // 4. Calculate Data for "Active Students per Course" Chart
        // We group enrollments by course to see which is most popular
        const studentDistribution = await Enrollment.aggregate([
            { $match: { course: { $in: courseIds } } },
            { $group: { _id: "$course", count: { $sum: 1 } } }
        ]);

        // Map aggregation results back to course titles
        const chartData = studentDistribution.map(item => {
            const course = courses.find(c => c._id.toString() === item._id.toString());
            return {
                name: course ? course.title : 'Unknown Course',
                count: item.count,
                total: 100, // Capacity (arbitrary for online courses)
                color: 'bg-blue-500' 
            };
        });

        // 5. Send the Response
        res.json({
            stats: {
                totalCourses,
                totalStudents: totalEnrollments,
                totalAssignments: 0, // Placeholder until Assignment model exists
                pendingQuizzes: 0    // Placeholder until Quiz model exists
            },
            recentActivity,
            chartData,
            upcomingClasses: [] // Placeholder until Live Class model exists
        });

    } catch (error) {
        console.error("Dashboard Error:", error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;