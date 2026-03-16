import axios from 'axios';

/**
 * Luxe & Loom API Instance
 * Fail-safe configuration for Render & Vercel environments.
 */

const getBaseURL = () => {
    const envURL = import.meta.env.VITE_API_URL;
    
    // Explicitly check for the string "undefined" which often happens in Vercel builds
    const activeURL = (envURL && envURL !== 'undefined') 
        ? envURL 
        : "https://luxe-loom.onrender.com";

    // Strip trailing slash to keep paths clean
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

        // Sanity Check: Ensure URL starts with a single slash
        if (config.url && !config.url.startsWith('/')) {
            config.url = `/${config.url}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// --- RESPONSE INTERCEPTOR ---
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error;

        if (response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('userInfo');
            if (!window.location.pathname.includes('/auth/login')) {
                window.location.href = '/auth/login';
            }
        }

        // Return a clear error string for the UI
        const message = response?.data?.message || error.message || "Connection to the Loom failed.";
        return Promise.reject(message);
    }
);

export default axiosInstance;