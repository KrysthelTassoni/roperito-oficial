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

    // Si no hay imágenes, agregar la imagen por defecto
    if (!productData.images || productData.images.length === 0) {
      const defaultImage = new File(
        [await fetch('/logo2.PNG').then(r => r.blob())],
        'logo2.PNG',
        { type: 'image/png' }
      );
      formData.append("images", defaultImage);
    } else {
      // Agrega todas las imágenes con el mismo campo "images"
      productData.images.forEach((img) => {
        if (img instanceof File) {
          formData.append("images", img);
        } else if (img.file instanceof File) {
          formData.append("images", img.file);
        }
      });
    }

    try {
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
    } catch (error) {
      console.error("Error en productService.create:", error);
      throw error;
    }
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

  update: async (id, productData) => {
    // 1. Actualizar los datos básicos
    const fieldsToUpdate = {
      title: productData.title,
      description: productData.description,
      price: productData.price,
      size_id: productData.size_id,
      category_id: productData.category_id,
      status: productData.status,
    };

    await apiClient.put(
      API_CONFIG.ENDPOINTS.PRODUCTS.UPDATE(id),
      fieldsToUpdate
    );

    // 2. Preparar imágenes
    const newImages = productData.images?.filter(
      (img) => img?.file instanceof File
    );

    const existingImageUrls = productData.images
      ?.filter((img) => typeof img === "string" || img?.image_url)
      .map((img) => (typeof img === "string" ? img : img.image_url));

    const formData = new FormData();
    newImages.forEach((img) => {
      formData.append("images", img.file);
    });
    formData.append("existing_images", JSON.stringify(existingImageUrls));

    await apiClient.put(
      API_CONFIG.ENDPOINTS.PRODUCTS.UPDATE_IMAGES(id),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },

  delete: async (id) => {
    const response = await apiClient.delete(
      API_CONFIG.ENDPOINTS.PRODUCTS.DELETE(id)
    );
    return response.data;
  },

  status: async (id, status) => {
    const response = await apiClient.patch(
      API_CONFIG.ENDPOINTS.PRODUCTS.STATUS(id),
      { status }
    );
    return response.data;
  },
};
