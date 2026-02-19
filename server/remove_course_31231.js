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

const removeCourse = async () => {
    await connectDB();
    try {
        const courseTitle = '31231';
        const course = await Course.findOne({ title: courseTitle });

        if (course) {
            console.log(`Found course: "${course.title}" (ID: ${course._id})`);

            // Delete the course
            await Course.findByIdAndDelete(course._id);
            console.log(`Course "${courseTitle}" deleted successfully.`);

            // Optional: Check if any enrollments exist for this course and warn or delete
            // For now, we rely on dashboard controller filtering out null courses.
        } else {
            console.log(`Course with title "${courseTitle}" not found.`);
        }
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.connection.close();
        console.log('MongoDB Disconnected');
    }
};

removeCourse();
