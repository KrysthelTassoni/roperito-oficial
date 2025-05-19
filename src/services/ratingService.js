import apiClient from "./apiClient";
import { API_CONFIG } from "../config/api.config";

export const ratingService = {
  create: async (order_id, value) => {
    // ratingData debe tener: product_id, value, comment
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.RATINGS.BASE, {
      order_id,
      value,
    });
    return response.data;
  },

  ifRatingSeller: async () => {
    const response = await apiClient.get(
      API_CONFIG.ENDPOINTS.RATINGS.IFRATINGSELLER
    );
    return response.data;
  },

  getRatings: async (userId) => {
    const response = await apiClient.get(
      API_CONFIG.ENDPOINTS.RATINGS.SELLERRATING(userId)
    );
    return response.data;
  },
};
