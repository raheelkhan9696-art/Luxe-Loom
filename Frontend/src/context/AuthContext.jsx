import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance"; // Import the configured axios instance
import apiPath from "../utils/apiPath";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


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
      <div className="min-h-screen bg-[#080808] p-8">
        {/* We use SkeletonTheme to match your dark/gold brand colors */}
        <SkeletonTheme baseColor="#1a1a1a" highlightColor="#262626">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Mimic a Header/Navbar */}
            <div className="flex justify-between items-center">
              <Skeleton width={150} height={40} borderRadius={8} />
              <div className="flex gap-4">
                <Skeleton circle width={40} height={40} />
                <Skeleton width={100} height={40} borderRadius={8} />
              </div>
            </div>

            {/* Mimic Page Title */}
            <Skeleton width={300} height={50} className="mb-4" />

            {/* Mimic Content Grid (The Vault) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 border border-white/5 rounded-2xl bg-[#0f0f0f]">
                  <Skeleton height={200} borderRadius={12} className="mb-4" />
                  <Skeleton count={2} className="mb-2" />
                  <Skeleton width="60%" />
                </div>
              ))}
            </div>
          </div>
        </SkeletonTheme>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};