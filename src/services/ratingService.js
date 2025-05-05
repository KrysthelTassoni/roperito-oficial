import apiClient from './apiClient';
import { API_CONFIG } from '../config/api.config';

export const ratingService = {
    create: async(ratingData) => {
        const response = await apiClient.post(API_CONFIG.ENDPOINTS.RATINGS.BASE, ratingData);
        return response.data;
    },

    getProductRatings: async(productId) => {
        const response = await apiClient.get(API_CONFIG.ENDPOINTS.PRODUCTS.RATINGS(productId));
        return response.data;
    }
};