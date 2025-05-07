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
            RATINGS: (id) => `/api/products/${id}/ratings`,
            IMAGES: (id) => `/api/products/${id}/images`,
            UPDATE_STATUS: (id) => `/api/products/${id}/status`
        },
        USERS: {
            PROFILE: '/api/users/me',
            ADDRESS: '/api/users/address',
            RATINGS: '/api/users/ratings'
        },
        RATINGS: {
            BASE: '/api/ratings'
        },
        FAVORITES: {
            BASE: '/api/favorites',
            TOGGLE: (id) => `/api/favorites/${id}`
        },
        METADATA: {
            CATEGORIES: '/api/metadata/categories',
            SIZES: '/api/metadata/sizes'
        },
        ORDERS: {
            BASE: '/api/orders',
            BY_ID: (id) => `/api/orders/${id}`,
            STATUS: (id) => `/api/orders/${id}/status`,
            USER_ORDERS: '/api/users/orders',
            CHECK_PRODUCT: (id) => `/api/orders/check/${id}`
        }
    },
    STATUS: {
        AVAILABLE: 'disponible',
        SOLD: 'vendido',
        INACTIVE: 'inactivo'
    },
    ORDER_STATUS: {
        COMPLETED: 'completed',
        CANCELLED: 'cancelled',
        PENDING: 'pending'
    }
};