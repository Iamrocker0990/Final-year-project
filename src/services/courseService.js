import api from './api';

const courseService = {
    // Public/Student: Get all approved courses
    getAllApprovedCourses: async () => {
        const response = await api.get('/courses');
        return response.data;
    },

    // Teacher: Get my courses (pending & approved)
    getTeacherCourses: async () => {
        const response = await api.get('/courses/mine');
        return response.data;
    },

    // Public/Student: Get course details
    getCourseById: async (id) => {
        const response = await api.get(`/courses/${id}`);
        return response.data;
    },

    // Teacher: Create new course
    createCourse: async (courseData) => {
        const response = await api.post('/courses', courseData);
        return response.data;
    },

    // Teacher: Add lesson to course
    addLesson: async (courseId, lessonData) => {
        const response = await api.post(`/courses/${courseId}/lessons`, lessonData);
        return response.data;
    },

    // Teacher: Upload video (returns URL)
    uploadVideo: async (formData) => {
        const response = await api.post('/courses/upload/video', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Student: Enroll in course
    enrollInCourse: async (courseId) => {
        const response = await api.post(`/enrollments/${courseId}`);
        return response.data;
    },

    // Student: Get my enrollments
    getMyEnrollments: async () => {
        const response = await api.get('/enrollments/my-enrollments');
        return response.data;
    }
};

export default courseService;
