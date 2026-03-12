import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="w-full">
      <form className="space-y-8">
        {/* Registry Email Input */}
        <div className="group relative border-b border-white/10 focus-within:border-gold transition-colors pb-2">
          <label className="text-[9px] text-zinc-600 uppercase tracking-widest block mb-2 font-bold">
            Registry Email
          </label>
          <input 
            type="email" 
            placeholder="abdullah@luxeandloom.com" 
            className="w-full bg-transparent outline-none text-white text-sm placeholder:text-zinc-800 py-2"
          />
        </div>

        {/* Passphrase Input */}
        <div className="group relative border-b border-white/10 focus-within:border-gold transition-colors pb-2">
          <div className="flex justify-between items-center mb-2">
            <label className="text-[9px] text-zinc-600 uppercase tracking-widest font-bold">
              Passphrase
            </label>
            <button type="button" className="text-[8px] text-gold/50 hover:text-gold uppercase tracking-widest transition-colors">
              Lost?
            </button>
          </div>
          <input 
            type="password" 
            placeholder="••••••••" 
            className="w-full bg-transparent outline-none text-white text-sm placeholder:text-zinc-800 py-2"
          />
        </div>

        {/* Action Button */}
        <button className="w-full flex items-center justify-between bg-white text-black px-8 py-5 text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-gold transition-all duration-500 rounded-sm group">
          Authenticate <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </form>

      {/* Navigation to Signup */}
      <div className="mt-8 text-center">
        <p className="text-[9px] text-zinc-600 uppercase tracking-widest">
          New to the Registry?{" "}
          <Link to="/auth/signup" className="text-white hover:text-gold transition-colors ml-2">
            Request Access
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;