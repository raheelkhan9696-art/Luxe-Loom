import axios from 'axios';

/**
 * Luxe & Loom API Instance
 * Configured for secure, interceptor-based communication
 */
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
    timeout: 15000, // 15 seconds timeout for premium responsiveness
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

// --- REQUEST INTERCEPTOR ---
// Automatically injects the JWT token into every request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// --- RESPONSE INTERCEPTOR ---
// Handles global status codes (401, 403, 500)
axiosInstance.interceptors.response.use(
    (response) => {
        // You can return response.data here to simplify your components,
        // but returning the full response is standard for flexibility.
        return response;
    },
    (error) => {
        const { response } = error;

        if (response) {
            // 401: Unauthorized (Token expired or missing)
            if (response.status === 401) {
                console.warn('Session expired. Evicting user to login...');
                localStorage.removeItem('token');
                localStorage.removeItem('userInfo');
                
                // Avoid infinite redirect loops if already on login
                if (!window.location.pathname.includes('/auth/login')) {
                    window.location.href = '/auth/login';
                }
            }

            // 403: Forbidden (User is not an admin)
            if (response.status === 403) {
                console.error('Access Denied: Administrative privileges required.');
            }
        }

        // Return a simplified error message for your UI
        const message = response?.data?.message || error.message || "An unexpected error occurred";
        return Promise.reject(message);
    }
);

export default axiosInstance;