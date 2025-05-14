import apiClient from "./apiClient";
import { API_CONFIG } from "../config/api.config";

export const favoriteService = {
  add: async (productId) => {
    const response = await apiClient.post(
      API_CONFIG.ENDPOINTS.FAVORITES.TOGGLE(productId)
    );
    return response.data;
  },

  remove: async (productId) => {
    const response = await apiClient.delete(
      API_CONFIG.ENDPOINTS.FAVORITES.TOGGLE(productId)
    );
    return response.data;
  },

  getAll: async () => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.FAVORITES.BASE);
    return response.data;
  },
};
