import apiClient from './apiClient';
import { API_CONFIG } from '../config/api.config';

export const userService = {
    getProfile: async() => {
        const response = await apiClient.get(API_CONFIG.ENDPOINTS.USERS.PROFILE);
        return response.data;
    },

    updateProfile: async(updateData) => {
        const response = await apiClient.put(API_CONFIG.ENDPOINTS.USERS.PROFILE, updateData);
        return response.data;
    },

    getRatings: async() => {
        const response = await apiClient.get(API_CONFIG.ENDPOINTS.USERS.RATINGS);
        return response.data;
    }
};