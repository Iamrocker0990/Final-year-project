const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

const teacherUser = {
    name: 'Test Teacher',
    email: 'teacher_' + Date.now() + '@test.com',
    password: 'password123',
    role: 'teacher'
};

const adminUser = {
    name: 'Test Admin',
    email: 'admin_' + Date.now() + '@test.com',
    password: 'password123',
    role: 'admin'
};

const studentUser = {
    name: 'Test Student',
    email: 'student_' + Date.now() + '@test.com',
    password: 'password123',
    role: 'student'
};

let teacherToken, adminToken, studentToken;
let courseId;

const runVerification = async () => {
    try {
        console.log('--- STARTING VERIFICATION ---');

        // 1. REGISTER USERS
        console.log('1. Registering Users...');

        // Register Teacher
        let res = await axios.post(`${API_URL}/auth/register`, teacherUser);
        teacherToken = res.data.token;
        console.log('   - Teacher Registered');

        // Register Admin
        res = await axios.post(`${API_URL}/auth/register`, adminUser);
        adminToken = res.data.token;
        console.log('   - Admin Registered');

        // Register Student
        res = await axios.post(`${API_URL}/auth/register`, studentUser);
        studentToken = res.data.token;
        console.log('   - Student Registered');


        // 2. TEACHER CREATES COURSE
        console.log('\n2. Teacher Creating Course...');
        const courseData = {
            title: 'Test Course ' + Date.now(),
            description: 'This is a test course.',
            price: 100,
            thumbnail: 'http://example.com/image.jpg'
        };
        res = await axios.post(`${API_URL}/courses`, courseData, {
            headers: { Authorization: `Bearer ${teacherToken}` }
        });
        courseId = res.data._id;
        console.log('   - Course Created. ID:', courseId);
        console.log('   - Initial Status:', res.data.status);

        if (res.data.status !== 'pending') throw new Error('Course status should be pending');


        // 3. VERIFY STUDENT CANNOT SEE PENDING COURSE
        console.log('\n3. Verifying Student view (should be empty/not include pending)...');
        res = await axios.get(`${API_URL}/courses`); // Public endpoint
        const foundPending = res.data.find(c => c._id === courseId);
        if (foundPending) throw new Error('Student should NOT see pending course');
        console.log('   - Pending course not visible to public.');


        // 4. ADMIN SEES PENDING COURSE
        console.log('\n4. Admin Checking Pending Queue...');
        res = await axios.get(`${API_URL}/admin/courses/pending`, {
            headers: { Authorization: `Bearer ${adminToken}` }
        });
        const pendingCourse = res.data.find(c => c._id === courseId);
        if (!pendingCourse) throw new Error('Admin should see the pending course');
        console.log('   - Admin sees pending course.');


        // 5. ADMIN APPROVES COURSE
        console.log('\n5. Admin Approving Course...');
        res = await axios.put(`${API_URL}/admin/courses/${courseId}/status`,
            { status: 'approved' },
            { headers: { Authorization: `Bearer ${adminToken}` } }
        );
        console.log('   - Course Status Updated to:', res.data.status);


        // 6. VERIFY STUDENT CAN SEE APPROVED COURSE
        console.log('\n6. Verifying Student view (should see approved)...');
        res = await axios.get(`${API_URL}/courses`);
        const foundApproved = res.data.find(c => c._id === courseId);
        if (!foundApproved) throw new Error('Student SHOULD see approved course');
        console.log('   - Approved course is visible to public!');

        console.log('\n--- VERIFICATION SUCCESSFUL ---');

    } catch (error) {
        console.error('\n--- VERIFICATION FAILED ---');
        console.error(error.message);
        if (error.response) {
            console.error('Response:', error.response.data);
        }
    }
};

runVerification();
