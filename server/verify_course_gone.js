const mongoose = require('mongoose');
const Course = require('./models/Course');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('Connection Error:', err.message);
        process.exit(1);
    }
};

const verifyCourseGone = async () => {
    await connectDB();
    try {
        const courseTitle = '31231';
        const course = await Course.findOne({ title: courseTitle });

        if (course) {
            console.log(`Course "${courseTitle}" still exists! (ID: ${course._id})`);
            process.exit(1);
        } else {
            console.log(`Course "${courseTitle}" is gone.`);
            process.exit(0);
        }
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        console.log('MongoDB Disconnected');
    }
};

verifyCourseGone();
