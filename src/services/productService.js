import apiClient from './apiClient';
import { API_CONFIG } from '../config/api.config';

export const productService = {
    create: async(productData) => {
        // productData debe tener: title, description, price, size, category, images (array de strings)
        const response = await apiClient.post(API_CONFIG.ENDPOINTS.PRODUCTS.CREATE, productData);
        return response.data;
    },

    getAll: async(filters = {}) => {
        // filters puede tener: category, size, minPrice, maxPrice, search
        const response = await apiClient.get(API_CONFIG.ENDPOINTS.PRODUCTS.BASE, { params: filters });
        return response.data;
    },

    getById: async(id) => {
        const response = await apiClient.get(API_CONFIG.ENDPOINTS.PRODUCTS.BY_ID(id));
        return response.data;
    },

    update: async(id, updateData) => {
        // updateData puede tener: title, description, price, status
        const response = await apiClient.put(API_CONFIG.ENDPOINTS.PRODUCTS.UPDATE(id), updateData);
        return response.data;
    },

    delete: async(id) => {
        const response = await apiClient.delete(API_CONFIG.ENDPOINTS.PRODUCTS.DELETE(id));
        return response.data;
    }
};