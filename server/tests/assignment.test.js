const request = require('supertest');
const app = require('../index'); // Assuming your express app is exported from index.js
const mongoose = require('mongoose');
const User = require('../models/User');
const Course = require('../models/Course');
const Assignment = require('../models/Assignment');

// Mock Data
let teacherToken;
let studentToken;
let courseId;
let assignmentId;

beforeAll(async () => {
    // Connect to a test database (or use your existing one carefully)
    // Ideally, use a separate test DB URI in your .env.test
    await mongoose.connect(process.env.MONGO_URI);

    // Login as Teacher (Replace with valid credentials or create one)
    const teacherLogin = await request(app).post('/api/auth/login').send({
        email: 'teacher@example.com',
        password: 'password123'
    });
    teacherToken = teacherLogin.body.token;

    // Login as Student
    const studentLogin = await request(app).post('/api/auth/login').send({
        email: 'student@example.com',
        password: 'password123'
    });
    studentToken = studentLogin.body.token;

    // Create a Course first
    const courseRes = await request(app)
        .post('/api/courses')
        .set('Authorization', `Bearer ${teacherToken}`)
        .send({ title: 'Test Course', category: 'Test', level: 'Beginner', description: 'Test', price: 0 });
    courseId = courseRes.body._id;
});

afterAll(async () => {
    // Cleanup
    if (assignmentId) await Assignment.deleteMany({ _id: assignmentId });
    if (courseId) await Course.deleteMany({ _id: courseId });
    // await mongoose.connection.close(); // Keep open if watch mode, or close
});

describe('Assignment API', () => {
    it('should create a new assignment', async () => {
        const res = await request(app)
            .post('/api/assignments')
            .set('Authorization', `Bearer ${teacherToken}`)
            .send({
                title: 'Test Assignment',
                description: 'Test Desc',
                courseId: courseId,
                dueDate: new Date(Date.now() + 86400000), // Tomorrow
                maxMarks: 10,
                questions: [{
                    type: 'mcq',
                    questionText: 'Q1',
                    marks: 10,
                    options: ['A', 'B'],
                    correctOptionIndex: 0
                }]
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body.title).toEqual('Test Assignment');
        assignmentId = res.body._id;
    });

    it('should submit an assignment', async () => {
        const res = await request(app)
            .post(`/api/assignments/${assignmentId}/submit`)
            .set('Authorization', `Bearer ${studentToken}`)
            .send({
                answers: [{
                    questionIndex: 0,
                    answer: '0'
                }]
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body.submission.marks).toEqual(10); // Auto-eval check
    });
});
