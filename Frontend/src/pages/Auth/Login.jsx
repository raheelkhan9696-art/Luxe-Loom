import React, { useState } from "react";
import { ArrowRight, Eye, EyeOff, ShieldCheck, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import apiPath from "../../utils/apiPath";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ email: "", password: "" });

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${BASE_URL}${apiPath.AUTH.LOGIN}`, {
        email: formData.email,
        password: formData.password
      });

      if (response.data.token) {
        // 1. Set Auth Data
        localStorage.setItem("token", response.data.token);
        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }

        // 2. Debugging & Smart Navigation
        const rawCart = localStorage.getItem("cart");
        let cartItems = [];
        
        try {
          // Parse only if rawCart actually contains something
          cartItems = rawCart ? JSON.parse(rawCart) : [];
        } catch (parseError) {
          console.error("Cart parse error:", parseError);
          cartItems = [];
        }

        console.log("Current Cart Items Count:", cartItems.length);

        // Small timeout ensures storage is synced before redirect
        setTimeout(() => {
          if (Array.isArray(cartItems) && cartItems.length > 0) {
            console.log("Redirecting to Checkout...");
            navigate("/checkout");
          } else {
            console.log("Cart empty, redirecting to Home...");
            navigate("/home");
          }
        }, 150);
      }
    } catch (err) {
      const serverMessage = err.response?.data?.message || "System error. Connection refused.";
      setError(serverMessage);
      console.error("Login Failure:", err.response?.data);
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
      <div className="flex items-center gap-3 mb-12">
        <div className="h-[1px] w-8 bg-yellow-500/50" />
        <span className="text-[10px] tracking-[0.5em] uppercase text-zinc-500 font-light">
          Secure Access
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
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

        {/* Email Field */}
        <div className="group relative">
          <label className="text-[9px] text-zinc-500 uppercase tracking-[0.3em] block mb-3 font-semibold group-focus-within:text-yellow-500 transition-colors">
            Registry Email
          </label>
          <input 
            type="email" 
            required
            autoComplete="email"
            disabled={loading}
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="identity@luxeandloom.com" 
            className="w-full bg-transparent border-b border-white/10 outline-none text-white text-sm py-3 focus:border-yellow-500 transition-all disabled:opacity-30"
          />
        </div>

        {/* Password Field */}
        <div className="group relative">
          <div className="flex justify-between items-center mb-3">
            <label className="text-[9px] text-zinc-500 uppercase tracking-[0.3em] font-semibold group-focus-within:text-yellow-500 transition-colors">
              Passphrase
            </label>
            <button type="button" className="text-[8px] text-zinc-600 hover:text-yellow-500 uppercase tracking-widest transition-colors italic">
              Forgotten?
            </button>
          </div>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              required
              autoComplete="current-password"
              disabled={loading}
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="••••••••••••" 
              className="w-full bg-transparent border-b border-white/10 outline-none text-white text-sm py-3 focus:border-yellow-500 disabled:opacity-30"
            />
            <button 
              type="button"
              disabled={loading}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-700 hover:text-white p-2 transition-colors"
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>

        <div className="pt-4">
          <button 
            type="submit"
            disabled={loading}
            className="w-full relative flex items-center justify-between bg-white text-black px-8 py-5 text-[10px] font-bold tracking-[0.4em] uppercase overflow-hidden group rounded-sm disabled:bg-zinc-900 disabled:text-zinc-600 transition-colors duration-300"
          >
            <span className="relative z-10 flex items-center gap-3">
              {loading ? (
                <>Establishing <Loader2 size={14} className="animate-spin" /></>
              ) : (
                "Establish Session"
              )}
            </span>
            {!loading && (
              <>
                <div className="absolute inset-0 bg-yellow-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </form>

      <div className="mt-12 flex flex-col items-center gap-6">
        <div className="flex items-center gap-4 w-full opacity-20">
          <div className="h-[1px] flex-1 bg-white" />
          <ShieldCheck size={12} className="text-white" />
          <div className="h-[1px] flex-1 bg-white" />
        </div>
        <p className="text-[9px] text-zinc-600 uppercase tracking-[0.2em] text-center">
          Not yet recognized? 
          <Link to="/auth/signup" className="text-white hover:text-yellow-500 transition-colors ml-2 font-bold underline underline-offset-4 decoration-white/10">
            Request Registry Access
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;