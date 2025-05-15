import apiClient from "./apiClient";
import { API_CONFIG } from "../config/api.config";

export const addressService = {
  // Obtener todas las regiones
  getRegions: async () => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.ADDRESS.REGIONS);
    return response.data;
  },

  getProvinces: async (regionCode) => {
    const response = await apiClient.get(
      API_CONFIG.ENDPOINTS.ADDRESS.PROVINCE(regionCode)
    );
    return response.data;
  },

  getCities: async (provinceCode) => {
    const response = await apiClient.get(
      API_CONFIG.ENDPOINTS.ADDRESS.CITY(provinceCode)
    );
    return response.data;
  },

  getCodeByName: async (type, name) => {
    const response = await apiClient.get(
      API_CONFIG.ENDPOINTS.ADDRESS.GETCODE(type, name)
    );
    return response.data;
  },
};
