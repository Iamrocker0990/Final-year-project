const mongoose = require('mongoose');
const Course = require('./models/Course');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/edusync')
    .then(async () => {
        console.log('Connected');
        const courses = await Course.find({});
        courses.forEach(c => {
            console.log(`Course: ${c.title}`);
            c.modules.forEach(m => {
                m.lessons.forEach(l => {
                    if (l.type === 'video') {
                        console.log(`  Lesson: ${l.title} - URL: ${l.content}`);
                    }
                });
            });
        });
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
