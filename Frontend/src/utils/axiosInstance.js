import axios from 'axios';

/**
 * Luxe & Loom API Instance
 * Configured for secure, interceptor-based communication with Render fail-safes.
 */

// 1. Defensive URL Handling
const getBaseURL = () => {
    const envURL = import.meta.env.VITE_API_URL;
    
    // Fallback directly to your Render URL if the env variable is missing/undefined
    const activeURL = envURL && envURL !== 'undefined' 
        ? envURL 
        : "https://luxe-loom.onrender.com";

    // Ensure no trailing slash to prevent double slashes (e.g. .com//api)
    return activeURL.replace(/\/$/, "");
};

const axiosInstance = axios.create({
    baseURL: getBaseURL(),
    timeout: 15000, 
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

// --- REQUEST INTERCEPTOR ---
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Debugging log for development (You can remove this later)
        if (import.meta.env.DEV) {
            console.log(`[Luxe & Loom API] Outgoing: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// --- RESPONSE INTERCEPTOR ---
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { response } = error;

        if (response) {
            // 401: Unauthorized
            if (response.status === 401) {
                console.warn('Vault Access Expired. Resetting credentials...');
                localStorage.removeItem('token');
                localStorage.removeItem('userInfo');
                
                if (!window.location.pathname.includes('/auth/login')) {
                    window.location.href = '/auth/login';
                }
            }

            // 403: Forbidden
            if (response.status === 403) {
                console.error('Administrative privileges required for this sector.');
            }
        }

        // Always return a clean error string to prevent component crashes
        const message = response?.data?.message || error.message || "An unexpected error occurred in the Loom";
        return Promise.reject(message);
    }
);

export default axiosInstance;