import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance"; // Import the configured axios instance
import apiPath from "../utils/apiPath";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ===============================
  // Load User Profile on Startup
  // ===============================
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Using axiosInstance automatically handles the Bearer token
        const { data } = await axiosInstance.get(apiPath.AUTH.PROFILE);
        setUser(data.user || data);
      } catch (err) {
        console.error("Auth initialization failed:", err);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // ===============================
  // Register New Client
  // ===============================
  const register = async (formData) => {
    try {
      const { data } = await axiosInstance.post(apiPath.AUTH.REGISTER, formData);
      
      localStorage.setItem("token", data.token);
      setUser(data.user || data);
      
      return { success: true };
    } catch (err) {
      // err is now the simplified string message from our axios interceptor
      return { success: false, message: err };
    }
  };

  // ===============================
  // Secure Login
  // ===============================
  const login = async (formData) => {
    try {
      const { data } = await axiosInstance.post(apiPath.AUTH.LOGIN, formData);
      
      localStorage.setItem("token", data.token);
      setUser(data.user || data);
      
      return { success: true };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  // ===============================
  // Logout & Session Cleanup
  // ===============================
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/auth/login";
  };

  // ===============================
  // Real-time UI Update
  // ===============================
  const updateUser = (newData) => {
    setUser((prev) => (prev ? { ...prev, ...newData } : null));
  };

  const value = {
    user,
    loading,
    isAdmin: user?.role === 'admin', // Quick check for Admin Dashboards
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
  };

  // High-end loading state for Luxe & Loom
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white tracking-[0.2em] font-light uppercase">Luxe & Loom</p>
        </div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};