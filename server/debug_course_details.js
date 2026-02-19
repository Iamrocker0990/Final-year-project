const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const run = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/edusync');
        console.log('Connected to DB.');

        const course = await mongoose.connection.db.collection('courses').findOne({ title: "31231" });

        if (course) {
            console.log('Course Found:');
            console.log(`ID: ${course._id}`);
            console.log(`Title: ${course.title}`);
            console.log(`Instructor: ${course.instructor}`);
            console.log(`CreatedBy: ${course.createdBy}`);
            console.log(`Status: ${course.status}`);
        } else {
            console.log('Course "31231" not found.');
        }

    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.connection.close();
    }
};

run();
