import apiClient from "./apiClient";
import { API_CONFIG } from "../config/api.config";

export const orderService = {
  //Enviar mensaje a Comprador
  sendMessage: async (product_id, message) => {
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.ORDERS.MESSAGE, {
      product_id,
      message,
    });
    return response.data;
  },

  getMessage: async () => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.ORDERS.MESSAGE);
    return response.data;
  },

  replyMessage: async (potential_buyer_id, seller_response) => {
    const response = await apiClient.put(API_CONFIG.ENDPOINTS.ORDERS.MESSAGE, {
      potential_buyer_id,
      seller_response,
    });
    return response.data;
  },

  ifsentMessage: async (product_id) => {
    const response = await apiClient.get(
      API_CONFIG.ENDPOINTS.ORDERS.IFSENT(product_id)
    );
    return response.data;
  },

  // Obtener todas las órdenes del usuario
  getOrders: async () => {
    const response = await apiClient.get(
      API_CONFIG.ENDPOINTS.ORDERS.USER_ORDERS
    );
    return response.data;
  },

  // Obtener una orden específica por ID
  getOrderById: async (id) => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.ORDERS.BY_ID(id));
    return response.data;
  },

  // Obtener compradors que enviaron mensajes sobre el producto
  getPotentialBuyers: async (product_id) => {
    const response = await apiClient.get(
      API_CONFIG.ENDPOINTS.ORDERS.POTENTIALBUYERS(product_id)
    );
    return response.data;
  },

  // Crear una nueva orden
  createOrder: async (product_id, buyer_id) => {
    // orderData debe tener: product_id, seller_id, price, contact_method
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.ORDERS.BASE, {
      product_id,
      buyer_id,
    });
    return response.data;
  },

  deleteOrder: async (product_id) => {
    const response = await apiClient.delete(
      API_CONFIG.ENDPOINTS.ORDERS.DELETE_ORDER(product_id)
    );
    return response.data;
  },

  // Obtener orden por ID de producto
  getOrderByProductId: async (productId) => {
    const response = await apiClient.get(`/api/orders/product/${productId}`);
    return response.data;
  },
};
