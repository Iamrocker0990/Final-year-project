// server/debug_user_details.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const run = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/edusync');
        console.log('Connected to DB.');

        const userId = "698f59cab635c4ceb4041ea1"; // The Instructor ID from previous step
        const user = await mongoose.connection.db.collection('users').findOne({ _id: new mongoose.Types.ObjectId(userId) });

        if (user) {
            console.log('User Found:');
            console.log(`ID: ${user._id}`);
            console.log(`Name: ${user.name}`);
            console.log(`Email: ${user.email}`);
            console.log(`Role: ${user.role}`);
        } else {
            console.log(`User with ID ${userId} not found.`);
        }

    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.connection.close();
    }
};

run();
