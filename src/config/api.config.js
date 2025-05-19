export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:3001",
  ENDPOINTS: {
    AUTH: {
      REGISTER: "/api/auth/register",
      LOGIN: "/api/auth/login",
    },
    PRODUCTS: {
      BASE: "/api/products",
      BY_ID: (id) => `/api/products/${id}`,
      CREATE: "/api/products",
      UPDATE: (id) => `/api/products/${id}`,
      DELETE: (id) => `/api/products/${id}`,
      RATINGS: (id) => `/api/products/${id}/ratings`,
      UPDATE_IMAGES: (id) => `/api/products/${id}/images`,
      STATUS: (id) => `/api/products/${id}/status`,
    },
    USERS: {
      PROFILE: "/api/users/me",
      UPDATE_PROFILE: "/api/users/me",
      RATINGS: "/api/users/ratings",
    },
    RATINGS: {
      BASE: "/api/ratings",
      SELLERRATING: (userId) => `/api/ratings/user/${userId}`,
      IFRATINGSELLER: "/api/ratings/ifrating",
    },
    FAVORITES: {
      BASE: "/api/favorites",
      TOGGLE: (productId) => `/api/favorites/${productId}`,
    },
    METADATA: {
      CATEGORIES: "/api/metadata/categories",
      SIZES: "/api/metadata/sizes",
    },
    ORDERS: {
      BASE: "/api/orders",
      MESSAGE: "/api/orders/message",
      IFSENT: (product_id) =>
        `/api/orders/messagesent?product_id=${product_id}`,
      BY_ID: (id) => `/api/orders/${id}`,
      UPDATE_STATUS: (id) => `/api/orders/${id}/status`,
      USER_ORDERS: "/api/users/orders",
      DELETE_ORDER: (id_product) => `/api/orders/${id_product}`,
      POTENTIALBUYERS: (product_id) =>
        `/api/orders/potential-buyers/${product_id}`,
    },
    ADDRESS: {
      REGIONS: "/api/address/regions",
      PROVINCE: (regionCode) =>
        `/api/address/provinces?regionCode=${regionCode}`,
      CITY: (provinceCode) =>
        `/api/address/cities?provinceCode=${provinceCode}`,
      GETCODE: (type, name) => `/api/address/getCode?type=${type}&name=${name}`,
    },
  },
  STATUS: {
    AVAILABLE: "disponible",
    SOLD: "vendido",
  },
  ORDER_STATUS: {
    COMPLETED: "completed",
  },
};
