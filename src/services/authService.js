import apiClient from './apiClient';
import { API_CONFIG } from '../config/api.config';

export const authService = {
    register: async(userData) => {
        const response = await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, userData);
        return response.data;
    },

    login: async(credentials) => {
        const response = await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, credentials);
        return response.data;
    }
};