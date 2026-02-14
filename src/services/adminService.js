import api from './api';

const adminService = {
    // Get all pending courses
    getPendingCourses: async () => {
        const response = await api.get('/admin/courses/pending');
        return response.data;
    },

    // Update course status (approve/reject)
    updateCourseStatus: async (id, status) => {
        const response = await api.put(`/admin/courses/${id}/status`, { status });
        return response.data;
    }
};

export default adminService;
