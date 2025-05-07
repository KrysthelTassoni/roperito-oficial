import apiClient from './apiClient';
import { API_CONFIG } from '../config/api.config';

export const productImageService = {
    // Obtener imágenes de un producto
    getProductImages: async (productId) => {
        const response = await apiClient.get(API_CONFIG.ENDPOINTS.PRODUCTS.IMAGES(productId));
        return response.data;
    },

    // Subir nueva imagen
    uploadImage: async (productId, imageData) => {
        const formData = new FormData();
        formData.append('image', imageData);
        const response = await apiClient.post(
            API_CONFIG.ENDPOINTS.PRODUCTS.IMAGES(productId),
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        return response.data;
    },

    // Establecer imagen principal
    setMainImage: async (productId, imageId) => {
        const response = await apiClient.patch(
            `${API_CONFIG.ENDPOINTS.PRODUCTS.IMAGES(productId)}/${imageId}/main`
        );
        return response.data;
    },

    // Eliminar imagen
    deleteImage: async (productId, imageId) => {
        const response = await apiClient.delete(
            `${API_CONFIG.ENDPOINTS.PRODUCTS.IMAGES(productId)}/${imageId}`
        );
        return response.data;
    }
}; 