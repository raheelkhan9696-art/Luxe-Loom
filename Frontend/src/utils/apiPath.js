const apiPath = {
  // --- USER & AUTHENTICATION ---
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    PROFILE: "/api/auth/profile",
    ALL_USERS: "/api/auth/all-users", // Added for admin user listing
  },

  // --- CLIENT PERSONALIZATION ---
  CLIENT: {
    GET_PROFILE: "/api/client/profile",
    UPDATE_PROFILE: "/api/client/profile",
    ADD_ADDRESS: "/api/client/address",
    DELETE_ADDRESS: (id) => `/api/client/address/${id}`,
  },

  // --- PRODUCTS ---
  PRODUCT: {
    GET_ALL: "/api/products",
    GET_BY_ID: (id) => `/api/products/${id}`,
    GET_BY_SLUG: (slug) => `/api/products/slug/${slug}`,
    
  },

  // --- ORDERS ---
  ORDERS: { // Changed from ORDER to ORDERS to match your component call
    CREATE: "/api/orders",
    GET_USER_ORDERS: "/api/orders/myorders", // Mapped from MY_ORDERS to match component
    GET_BY_ID: (id) => `/api/orders/${id}`,
    DELETE_ORDER: (id) => `/api/orders/${id}`,
      GET_ALL: "/api/orders/all", // Added for admin order listing

  },

  // --- PAYMENTS ---
  PAYMENT: {
    INITIATE_MOBILE: "/api/payments/initiate",
    VERIFY: "/api/payments/verify",
    STRIPE_INTENT: "/api/payments/create-intent",
  },

  // --- ADMINISTRATIVE POWER ---
  ADMIN: {
    DASHBOARD: "/api/admin/dashboard-stats",
    DELETE_PRODUCT: (id) => `/api/admin/products/${id}`,
    PRODUCTS: "/api/admin/products",
    UPDATE_PRODUCT: (id) => `/api/admin/products/${id}`,
    ORDERS: "/api/admin/orders",
    UPDATE_ORDER_STATUS: (id) => `/api/admin/orders/${id}/status`,
    DELETE_USER: (id) => `/api/admin/users/${id}`,
  },
};

export default apiPath;