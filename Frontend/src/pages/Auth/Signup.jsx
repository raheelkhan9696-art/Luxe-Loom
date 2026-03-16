import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import apiPath from "../../utils/apiPath";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await axios.post(`${BASE_URL}${apiPath.AUTH.REGISTER}`, payload);

      // FIX: Check for EITHER success boolean OR the existence of a token
      if (response.data.success || response.data.token) {
        
        // 1. Store Credentials
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
        
        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }

        // 2. Navigation Logic
        const cartData = localStorage.getItem("cart");
        const cartItems = cartData ? JSON.parse(cartData) : [];
        
        console.log("Signup successful, navigating...");

        // Use a small timeout to ensure localStorage is written before navigation
        setTimeout(() => {
          if (cartItems.length > 0) {
            navigate("/checkout");
          } else {
            navigate("/home");
          }
        }, 100);
      } else {
        setError("Account created, but session could not be established. Please login.");
      }
    } catch (err) {
      const serverMessage = err.response?.data?.message || err.response?.data?.error;
      setError(serverMessage || "Registry request failed.");
      console.error("Navigation Blocked - Server Error:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="flex items-center gap-3 mb-10">
        <div className="h-[1px] w-8 bg-yellow-500/50" />
        <span className="text-[10px] tracking-[0.5em] uppercase text-zinc-500 font-light">
          Membership Request
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="text-[10px] text-red-400 tracking-widest uppercase border-l border-red-500/50 pl-4 py-2 italic bg-red-500/5"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-2 gap-8">
          <div className="group relative border-b border-white/10 focus-within:border-yellow-500 transition-colors pb-2">
            <label className="text-[9px] text-zinc-500 uppercase tracking-[0.3em] block mb-2 font-bold group-focus-within:text-yellow-500 transition-colors">
              First Name
            </label>
            <input 
              required
              type="text" 
              disabled={loading}
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              placeholder="Abdullah"
              className="w-full bg-transparent outline-none text-white text-sm placeholder:text-zinc-800 py-1" 
            />
          </div>
          <div className="group relative border-b border-white/10 focus-within:border-yellow-500 transition-colors pb-2">
            <label className="text-[9px] text-zinc-500 uppercase tracking-[0.3em] block mb-2 font-bold group-focus-within:text-yellow-500 transition-colors">
              Last Name
            </label>
            <input 
              required
              type="text" 
              disabled={loading}
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              placeholder="Developer"
              className="w-full bg-transparent outline-none text-white text-sm placeholder:text-zinc-800 py-1" 
            />
          </div>
        </div>

        <div className="group relative border-b border-white/10 focus-within:border-yellow-500 transition-colors pb-2">
          <label className="text-[9px] text-zinc-500 uppercase tracking-[0.3em] block mb-2 font-bold group-focus-within:text-yellow-500 transition-colors">
            Email Address
          </label>
          <input 
            required
            type="email" 
            disabled={loading}
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="identity@luxeandloom.com"
            className="w-full bg-transparent outline-none text-white text-sm placeholder:text-zinc-800 py-1" 
          />
        </div>

        <div className="group relative border-b border-white/10 focus-within:border-yellow-500 transition-colors pb-2">
          <label className="text-[9px] text-zinc-500 uppercase tracking-[0.3em] block mb-2 font-bold group-focus-within:text-yellow-500 transition-colors">
            New Passphrase
          </label>
          <input 
            required
            type="password" 
            minLength={8}
            disabled={loading}
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            placeholder="MIN 8 CHARACTERS" 
            className="w-full bg-transparent outline-none text-white text-sm placeholder:text-zinc-800 py-1" 
          />
        </div>

        <div className="pt-6">
          <button 
            type="submit"
            disabled={loading}
            className="w-full relative flex items-center justify-between bg-white text-black px-8 py-5 text-[10px] font-bold tracking-[0.4em] uppercase overflow-hidden group rounded-sm disabled:bg-zinc-900 disabled:text-zinc-600 transition-colors"
          >
            <span className="relative z-10 flex items-center gap-3">
              {loading ? <>Validating <Loader2 size={14} className="animate-spin" /></> : "Establish Account"}
            </span>
            {!loading && (
              <>
                <div className="absolute inset-0 bg-yellow-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
          
          <div className="mt-12 flex flex-col items-center gap-6">
            <div className="flex items-center gap-4 w-full opacity-10">
              <div className="h-[1px] flex-1 bg-white" />
              <ShieldCheck size={12} className="text-white" />
              <div className="h-[1px] flex-1 bg-white" />
            </div>

            <p className="text-[9px] text-zinc-600 uppercase tracking-[0.2em] text-center">
              Already have credentials?{" "}
              <Link to="/auth/login" className="text-white hover:text-yellow-500 transition-colors ml-2 font-bold underline underline-offset-4 decoration-white/10">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default Signup;