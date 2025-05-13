import apiClient from './apiClient';
import { API_CONFIG } from '../config/api.config';

export const userService = {
    getProfile: async() => {
        const response = await apiClient.get(API_CONFIG.ENDPOINTS.USERS.PROFILE);
        return response.data;
    },

    updateProfile: async(updateData) => {
        // Separa los datos de usuario y dirección para coincidir con la estructura de la DB
        const userData = {
            name: updateData.name,
            phone_number: updateData.phone_number
        };
        
        // Crear objeto de dirección si existen datos de ubicación
        userData.address = {
            city: updateData.city || "",
            region: updateData.region || "",
            country: "Chile" // para forzar siempre Chile como país (por ahora)
        };
        
        console.log("Datos enviados al backend:", userData);
        
        const response = await apiClient.put(API_CONFIG.ENDPOINTS.USERS.UPDATE_PROFILE, userData);
        return response.data;
    },

    getRatings: async() => {
        const response = await apiClient.get(API_CONFIG.ENDPOINTS.USERS.RATINGS);
        return response.data;
    }
};