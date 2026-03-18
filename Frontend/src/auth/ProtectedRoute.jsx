import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

/**
 * ProtectedRoute
 * @param {boolean} adminOnly - If true, only users with 'admin' role can enter
 */
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();

  // 1. Luxury Skeleton Loading State
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

  // 2. Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if(user){
    return <Navigate to="/cart" replace />;
  }


  // 3. Authorization Check
  if (adminOnly && !isAdmin) {
    console.warn(`Access denied for ${user.email}: Administrative privileges required.`);
    return <Navigate to="/admin" replace />; 
  }

  // 4. Access Granted
  return children;
};

export default ProtectedRoute;