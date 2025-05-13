import apiClient from "./apiClient";
import { API_CONFIG } from "../config/api.config";

export const productService = {
  create: async (productData) => {
    const formData = new FormData();

    formData.append("title", productData.title);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("size_id", productData.size_id);
    formData.append("category_id", productData.category_id);

    // Agrega todas las imágenes con el mismo campo "images"
    productData.images.forEach((img) => {
      formData.append("images", img.file);
    });

    // Agrega los valores de is_main y orden en paralelo como arrays
    const isMainArray = productData.images.map((img) => img.is_main);
    formData.append("is_main", JSON.stringify(isMainArray));

    // [Opcional] Ver el contenido en consola
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    const response = await apiClient.post(
      API_CONFIG.ENDPOINTS.PRODUCTS.CREATE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  },

  getAll: async (filters = {}) => {
    // filters puede tener: category, size, minPrice, maxPrice, search
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.PRODUCTS.BASE, {
      params: filters,
    });
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(
      API_CONFIG.ENDPOINTS.PRODUCTS.BY_ID(id)
    );
    return response.data;
  },

  update: async (id, updateData) => {
    // updateData puede tener: title, description, price, status
    const response = await apiClient.put(
      API_CONFIG.ENDPOINTS.PRODUCTS.UPDATE(id),
      updateData
    );
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(
      API_CONFIG.ENDPOINTS.PRODUCTS.DELETE(id)
    );
    return response.data;
  },
};
