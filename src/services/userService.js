import apiClient from './apiClient';
import { API_CONFIG } from '../config/api.config';

export const userService = {
    getProfile: async() => {
        try {
            console.log("[userService.getProfile] Obteniendo perfil de usuario...");
            const response = await apiClient.get(API_CONFIG.ENDPOINTS.USERS.PROFILE);
            console.log("[userService.getProfile] Datos recibidos:", response.data);
            // Analizar la estructura de datos que está devolviendo el backend
            console.log("[userService.getProfile] Estructura de user:", 
                response.data?.user ? Object.keys(response.data.user) : "No hay datos de usuario");
            
            if (response.data?.user?.address) {
                console.log("[userService.getProfile] Objeto address:", response.data.user.address);
            } else {
                console.log("[userService.getProfile] El backend no devuelve un objeto address en el usuario");
            }
            
            return response.data;
        } catch (error) {
            console.error("[userService.getProfile] Error al obtener perfil:", error);
            throw error;
        }
    },

    updateProfile: async(updateData) => {
        // Depuración para ver los datos exactos que estamos recibiendo
        console.log("[userService.updateProfile] Datos recibidos:", updateData);
        
        // Basados en la depuración, formateamos los datos como el backend los espera
        // El problema parece ser que el backend espera los datos en un formato específico
        const userData = {
            // Datos de usuario básicos
            name: updateData.name || "",
            phone_number: updateData.phone_number || "",
            
            // Dirección - probar diferentes formatos para determinar cuál funciona con el backend
            // Formato 1: Objeto anidado address
            address: {
                city: updateData.city || "",
                region: updateData.region || "",
                country: updateData.country || "Chile"
            },
            
            // Formato 2: Campos a nivel raíz
            city: updateData.city || "",
            region: updateData.region || "",
            country: updateData.country || "Chile",
            
            // Formato 3: String JSON serializado (algunos backends esperan esto)
            addressJson: JSON.stringify({
                city: updateData.city || "",
                region: updateData.region || "",
                country: updateData.country || "Chile"
            })
        };
        
        console.log("[userService.updateProfile] Datos procesados para enviar al backend:", userData);
        
        try {
            const response = await apiClient.put(API_CONFIG.ENDPOINTS.USERS.UPDATE_PROFILE, userData);
            console.log("[userService.updateProfile] Respuesta del backend:", response.data);
            console.log("[userService.updateProfile] Headers de respuesta:", response.headers);
            
            // Si la actualización fue exitosa, hacer inmediatamente un getProfile
            // para ver qué datos devuelve el backend
            console.log("[userService.updateProfile] Verificando datos del perfil después de la actualización...");
            const updatedProfile = await userService.getProfile();
            console.log("[userService.updateProfile] Perfil actualizado según el backend:", updatedProfile);
            
            // Intentar una solución alternativa: si el backend no devuelve los datos actualizados
            // construir un perfil fusionado con los datos actuales y los enviados
            const mergedProfile = {
                ...updatedProfile,
                user: {
                    ...updatedProfile.user,
                    name: updateData.name || updatedProfile.user.name,
                    phone_number: updateData.phone_number || updatedProfile.user.phone_number
                },
                address: {
                    city: updateData.city,
                    region: updateData.region,
                    country: updateData.country || "Chile"
                },
                city: updateData.city,
                region: updateData.region,
                country: updateData.country || "Chile"
            };
            
            console.log("[userService.updateProfile] Perfil fusionado:", mergedProfile);
            
            // Devolvemos el perfil fusionado para asegurar que la UI tenga los datos actualizados
            return mergedProfile;
        } catch (error) {
            console.error("[userService.updateProfile] Error en la solicitud:", error);
            throw error;
        }
    },

    getRatings: async() => {
        const response = await apiClient.get(API_CONFIG.ENDPOINTS.USERS.RATINGS);
        return response.data;
    }
};