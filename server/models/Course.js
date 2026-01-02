const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ['video', 'document', 'quiz', 'text'], required: true },
    content: { type: String, required: true }, // URL or text content
    duration: { type: String },
    isCompleted: { type: Boolean, default: false },
});

const moduleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    lessons: [lessonSchema],
});

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    thumbnail: {
        type: String,
        default: '',
    },
    category: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    modules: [moduleSchema],
    studentsEnrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    rating: {
        type: Number,
        default: 0,
    },
    reviews: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, required: true },
        comment: { type: String },
    }],
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
