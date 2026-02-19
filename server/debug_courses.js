const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '.env') });

const run = async () => {
    try {
        console.log('Connecting to DB...');
        // Use 127.0.0.1 instead of localhost to avoid IPv6 issues
        await mongoose.connect('mongodb://127.0.0.1:27017/edusync', {
            serverSelectionTimeoutMS: 5000
        });
        console.log('Connected.');

        // Access collection directly to bypass schema strictness
        const courses = await mongoose.connection.db.collection('courses').find({}).toArray();
        console.log(`Found ${courses.length} courses.`);

        courses.forEach(c => {
            console.log('---');
            console.log(`ID: ${c._id}`);
            console.log(`Title: "${c.title}"`);
            console.log(`Thumbnail: "${c.thumbnail}"`);
            // Check for potential "31231" matches in any field
            if (JSON.stringify(c).includes('31231')) {
                console.log('*** FOUND "31231" IN THIS DOCUMENT ***');
            }
        });

    } catch (err) {
        console.error(err);
    } finally {
        if (mongoose.connection.readyState === 1) {
            await mongoose.connection.close();
        }
        console.log('Done.');
    }
};

run();
