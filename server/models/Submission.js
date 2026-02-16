const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['assignment', 'quiz'], required: true },
    contentId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'modelType' },
    modelType: { type: String, enum: ['Assignment', 'Quiz'], required: true }, // For dynamic populating

    // Assignment fields
    submissionText: { type: String },
    fileUrl: { type: String },

    // Structured Answers (for Quizzes AND Assignments)
    answers: [{
        questionId: { type: mongoose.Schema.Types.ObjectId, default: null }, // Optional if using index
        questionIndex: { type: Number }, // To map back to assignment.questions index
        answer: { type: mongoose.Schema.Types.Mixed }, // String (text/code) or Number (MCQ index)
        marksObtained: { type: Number, default: 0 },
        status: {
            type: String,
            enum: ['pending', 'correct', 'incorrect'],
            default: 'pending'
        }
    }],

    // Grading
    marks: { type: Number }, // Total marks obtained
    feedback: { type: String },
    status: {
        type: String,
        enum: ['submitted', 'graded'],
        default: 'submitted'
    },
    submittedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);
