import apiClient from "./apiClient";
import { API_CONFIG } from "../config/api.config";

export const userService = {
  getProfile: async () => {
    try {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.USERS.PROFILE);
      // Analizar la estructura de datos que está devolviendo el backend

      return response.data;
    } catch (error) {
      console.error("[userService.getProfile] Error al obtener perfil:", error);
      throw error;
    }
  },

  updateProfile: async (updateData) => {
    // Depuración para ver los datos exactos que estamos recibiendo

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
        country: updateData.country || "Chile",
      },

      // Formato 2: Campos a nivel raíz
      city: updateData.city || "",
      region: updateData.region || "",
      country: updateData.country || "Chile",

      // Formato 3: String JSON serializado (algunos backends esperan esto)
      addressJson: JSON.stringify({
        city: updateData.city || "",
        region: updateData.region || "",
        country: updateData.country || "Chile",
      }),
    };

    try {
      const response = await apiClient.put(
        API_CONFIG.ENDPOINTS.USERS.UPDATE_PROFILE,
        userData
      );

      // Si la actualización fue exitosa, hacer inmediatamente un getProfile
      // para ver qué datos devuelve el backend

      const updatedProfile = await userService.getProfile();

      // Intentar una solución alternativa: si el backend no devuelve los datos actualizados
      // construir un perfil fusionado con los datos actuales y los enviados
      const mergedProfile = {
        ...updatedProfile,
        user: {
          ...updatedProfile.user,
          name: updateData.name || updatedProfile.user.name,
          phone_number:
            updateData.phone_number || updatedProfile.user.phone_number,
        },
        address: {
          city: updateData.city,
          region: updateData.region,
          country: updateData.country || "Chile",
        },
        city: updateData.city,
        region: updateData.region,
        country: updateData.country || "Chile",
      };

      // Devolvemos el perfil fusionado para asegurar que la UI tenga los datos actualizados
      return mergedProfile;
    } catch (error) {
      console.error(
        "[userService.updateProfile] Error en la solicitud:",
        error
      );
      throw error;
    }
  },

  getRatings: async () => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.USERS.RATINGS);
    return response.data;
  },
};
