export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
    ENDPOINTS: {
        AUTH: {
            REGISTER: '/api/auth/register',
            LOGIN: '/api/auth/login'
        },
        PRODUCTS: {
            BASE: '/api/products',
            BY_ID: (id) => `/api/products/${id}`,
            CREATE: '/api/products',
            UPDATE: (id) => `/api/products/${id}`,
            DELETE: (id) => `/api/products/${id}`,
            RATINGS: (id) => `/api/products/${id}/ratings`,
            IMAGES: (id) => `/api/products/${id}/images`,
            IMAGE_SET_MAIN: (productId, imageId) => `/api/products/${productId}/images/${imageId}/set-main`,
            IMAGE_REORDER: (productId) => `/api/products/${productId}/images/reorder`,
            IMAGE_DELETE: (productId, imageId) => `/api/products/${productId}/images/${imageId}`
        },
        USERS: {
            PROFILE: '/api/users/me',
            UPDATE_PROFILE: '/api/users/me',
            RATINGS: '/api/users/ratings',
        },
        RATINGS: {
            BASE: '/api/ratings',
            PRODUCT: (id) => `/api/products/${id}/ratings`,
            USER: '/api/users/ratings',
        },
        FAVORITES: {
            BASE: '/api/favorites',
            TOGGLE: (productId) => `/api/favorites/${productId}`
        },
        METADATA: {
            CATEGORIES: '/api/metadata/categories',
            SIZES: '/api/metadata/sizes',
            REGIONS: '/api/metadata/regions'
        },
        ORDERS: {
            BASE: '/api/orders',
            BY_ID: (id) => `/api/orders/${id}`,
            UPDATE_STATUS: (id) => `/api/orders/${id}/status`,
            USER_ORDERS: '/api/users/orders',
        }
    },
    STATUS: {
        AVAILABLE: 'disponible',
        SOLD: 'vendido',
    },
    ORDER_STATUS: {
        COMPLETED: 'completed',
    }
};