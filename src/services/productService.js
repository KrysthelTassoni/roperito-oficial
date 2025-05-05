import apiClient from './apiClient';
import { API_CONFIG } from '../config/api.config';

export const productService = {
    create: async(productData) => {
        const response = await apiClient.post(API_CONFIG.ENDPOINTS.PRODUCTS.BASE, productData);
        return response.data;
    },

    getAll: async(filters = {}) => {
        const response = await apiClient.get(API_CONFIG.ENDPOINTS.PRODUCTS.BASE, { params: filters });
        return response.data;
    },

    getById: async(id) => {
        const response = await apiClient.get(API_CONFIG.ENDPOINTS.PRODUCTS.BY_ID(id));
        return response.data;
    },

    update: async(id, updateData) => {
        const response = await apiClient.put(API_CONFIG.ENDPOINTS.PRODUCTS.BY_ID(id), updateData);
        return response.data;
    },

    delete: async(id) => {
        const response = await apiClient.delete(API_CONFIG.ENDPOINTS.PRODUCTS.BY_ID(id));
        return response.data;
    }
};