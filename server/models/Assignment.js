const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dueDate: { type: Date, required: true },
    maxMarks: { type: Number, required: true },
    fileUrl: { type: String }, // Optional attachment from teacher
    submissionType: {
        type: String,
        enum: ['file', 'text', 'both', 'online'], // Added 'online' for question-based
        default: 'file'
    },
    questions: [{
        type: {
            type: String,
            enum: ['mcq', 'coding', 'text'],
            required: true
        },
        questionText: { type: String, required: true },
        marks: { type: Number, required: true },
        // MCQ specific
        options: [String],
        correctOptionIndex: Number,
        // Coding specific
        sampleInput: String,
        sampleOutput: String,
        testCases: [{
            input: String,
            expectedOutput: String
        }]
    }]
}, { timestamps: true });

module.exports = mongoose.model('Assignment', assignmentSchema);
