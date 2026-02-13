import api from './api';

const dashboardService = {
    // Student Dashboard
    getStudentDashboard: async () => {
        const response = await api.get('/student/dashboard');
        return response.data;
    },

    // Teacher Dashboard (if using backend endpoint)
    getTeacherDashboard: async () => {
        const response = await api.get('/teachers/dashboard');
        return response.data;
    }
};

export default dashboardService;
