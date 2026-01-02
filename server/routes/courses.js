const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const { protect, teacher } = require('../middleware/auth');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find({}).populate('instructor', 'name');
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('instructor', 'name');
        if (course) {
            res.json(course);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @desc    Create a course
// @route   POST /api/courses
// @access  Private/Teacher
router.post('/', protect, teacher, async (req, res) => {
    const { title, description, category, level, price, thumbnail } = req.body;

    try {
        const course = new Course({
            title,
            description,
            category,
            level,
            price,
            thumbnail,
            instructor: req.user._id,
            modules: [],
        });

        const createdCourse = await course.save();
        res.status(201).json(createdCourse);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private/Teacher
router.put('/:id', protect, teacher, async (req, res) => {
    const { title, description, category, level, price, thumbnail } = req.body;

    try {
        const course = await Course.findById(req.params.id);

        if (course) {
            if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                return res.status(401).json({ message: 'Not authorized to update this course' });
            }

            course.title = title || course.title;
            course.description = description || course.description;
            course.category = category || course.category;
            course.level = level || course.level;
            course.price = price || course.price;
            course.thumbnail = thumbnail || course.thumbnail;

            const updatedCourse = await course.save();
            res.json(updatedCourse);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private/Teacher
router.delete('/:id', protect, teacher, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (course) {
            if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                return res.status(401).json({ message: 'Not authorized to delete this course' });
            }

            await course.deleteOne();
            res.json({ message: 'Course removed' });
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
