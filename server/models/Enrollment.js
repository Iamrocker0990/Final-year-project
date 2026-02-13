const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    // LINK 1: Who is the student?
    student: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },

    // LINK 2: Which course are they studying?
    course: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Course', 
        required: true 
    },

    // PROGRESS TRACKING:
    // Instead of marking the Course as "done", we save the ID of every lesson 
    // the student finishes here.
    // Example: ["lesson_id_1", "lesson_id_2"]
    completedLessons: [{ 
        type: mongoose.Schema.Types.ObjectId 
    }], 
    
    // We update this number (0-100) whenever they finish a lesson
    progress: { 
        type: Number, 
        default: 0 
    },
    
}, { timestamps: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);