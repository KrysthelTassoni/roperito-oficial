import apiClient from './apiClient';
import { API_CONFIG } from '../config/api.config';

export const metadataService = {
    getRegions: async () => {
        try {
            const endpoint = API_CONFIG.ENDPOINTS.METADATA.REGIONS;
            // Log para ver la URL completa que se usa
            const fullUrl = `${API_CONFIG.BASE_URL}${endpoint}`;
            console.log("[metadataService] Intentando GET a:", fullUrl);
            const response = await apiClient.get(endpoint);
            // Log para ver la estructura de response.data
            console.log("[metadataService] response.data:", response.data);
            // Adaptar a la estructura del backend que devuelve { regions: [...] }
            return response.data.regions || [];
        } catch (error) {
            console.error("Error al obtener regiones:", error);
            // Fallback a regiones predefinidas en caso de error
            return [
                { value: "metropolitana", label: "Metropolitana de Santiago" },
                { value: "valparaiso", label: "Valparaíso" },
                { value: "biobio", label: "Biobío" },
                // Regiones básicas como fallback
            ];
        }
    },
    
    getCategories: async () => {
        const response = await apiClient.get(API_CONFIG.ENDPOINTS.METADATA.CATEGORIES);
        return response.data;
    },
    
    getSizes: async () => {
        const response = await apiClient.get(API_CONFIG.ENDPOINTS.METADATA.SIZES);
        return response.data;
    }
};