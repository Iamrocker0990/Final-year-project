import api from './api';

const authService = {
    login: async (email, password, role) => {
        const response = await api.post('/auth/login', { email, password, role });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userInfo', JSON.stringify(response.data));
        }
        return response.data;
    },

    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userInfo', JSON.stringify(response.data));
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
    },

    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('userInfo'));
    },
};

export default authService;
