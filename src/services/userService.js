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
    const userData = {
      name: updateData.name || "",
      phone_number: updateData.phone_number || "",
      address: {
        city: updateData.cityLabel || "",
        region: updateData.regionLabel || "",
        country: updateData.country || "Chile",
        province: updateData.provinceLabel || "",
      },
    };

    try {
      await apiClient.put(API_CONFIG.ENDPOINTS.USERS.UPDATE_PROFILE, userData);
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
