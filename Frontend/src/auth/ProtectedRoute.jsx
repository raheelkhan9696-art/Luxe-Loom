import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute
 * @param {boolean} adminOnly - If true, only users with 'admin' role can enter
 */
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();

  // 1. Maintain the luxury brand aesthetic during auth checks
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // 2. Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // 3. Authorization Check: Redirect if page is admin-only and user is not an admin
  if (adminOnly && !isAdmin) {
    console.warn(`Access denied for ${user.email}: Administrative privileges required.`);
    return <Navigate to="/" replace />; // Send unauthorized users to home
  }

  // 4. Access Granted
  return children;
};

export default ProtectedRoute;