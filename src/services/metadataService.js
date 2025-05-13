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
            
            // Adaptar a la estructura esperada (value, label)
            let regions = [];
            
            if (response.data.regions && Array.isArray(response.data.regions)) {
                // Si tenemos { regions: [...] }
                regions = response.data.regions.map(region => ({
                    value: region.id || region.value || region.name?.toLowerCase() || region,
                    label: region.name || region.label || region
                }));
            } else if (Array.isArray(response.data)) {
                // Si tenemos directamente un array
                regions = response.data.map(region => ({
                    value: region.id || region.value || region.name?.toLowerCase() || region,
                    label: region.name || region.label || region
                }));
            }
            
            console.log("[metadataService] Regiones procesadas:", regions);
            return regions;
        } catch (error) {
            console.error("Error al obtener regiones:", error);
            // Fallback a regiones predefinidas en caso de error
            return [
                { value: "metropolitana", label: "Metropolitana de Santiago" },
                { value: "valparaiso", label: "Valparaíso" },
                { value: "biobio", label: "Biobío" },
                { value: "arica", label: "Arica y Parinacota" },
                { value: "tarapaca", label: "Tarapacá" },
                { value: "antofagasta", label: "Antofagasta" },
                { value: "atacama", label: "Atacama" },
                { value: "coquimbo", label: "Coquimbo" },
                { value: "ohiggins", label: "O'Higgins" },
                { value: "maule", label: "Maule" },
                { value: "nuble", label: "Ñuble" },
                { value: "araucania", label: "La Araucanía" },
                { value: "losrios", label: "Los Ríos" },
                { value: "loslagos", label: "Los Lagos" },
                { value: "aysen", label: "Aysén" },
                { value: "magallanes", label: "Magallanes" }
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