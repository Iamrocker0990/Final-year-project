const mongoose = require('mongoose');

// 1. Lesson Schema (The Pages)
// This is a "sub-document". It lives inside the Course, not on its own.
const lessonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    // We strictly limit types to 'video', 'document', etc.
    type: { type: String, enum: ['video', 'document', 'quiz', 'text'], required: true },
    content: { type: String, required: true },
    duration: { type: String }, // e.g., "10 min"
});

// 2. Module Schema (The Chapters)
// A course is made of modules, and modules are made of lessons.
const moduleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    lessons: [lessonSchema], // This is an array (list) of the lessons above
});

// 3. The Main Course Schema (The Book)
const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },

    // LINKING: This connects the course to a specific Instructor (User)
    // "ref: 'User'" tells Mongoose to look in the User collection for this ID.
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    thumbnail: { type: String, default: '' }, // URL to the image
    modules: [moduleSchema], // The list of chapters defined above

    price: { type: Number, default: 0 },
    category: { type: String, required: true },
    level: { type: String, required: true },
    duration: { type: String, required: true },

    // COURSE LIFECYCLE & RBAC
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true }); // Automatically adds "createdAt" and "updatedAt"

module.exports = mongoose.model('Course', courseSchema);