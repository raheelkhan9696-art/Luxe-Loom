import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="w-full">
      <form className="space-y-6">
        {/* Name Grid */}
        <div className="grid grid-cols-2 gap-6">
          <div className="border-b border-white/10 focus-within:border-yellow-400 pb-2 transition-colors">
            <label className="text-[9px] text-zinc-600 uppercase tracking-widest block mb-2 font-bold">
              First Name
            </label>
            <input type="text" className="w-full bg-transparent outline-none text-white text-sm" />
          </div>
          <div className="border-b border-white/10 focus-within:border-yellow-400 pb-2 transition-colors">
            <label className="text-[9px] text-zinc-600 uppercase tracking-widest block mb-2 font-bold">
              Last Name
            </label>
            <input type="text" className="w-full bg-transparent outline-none text-white text-sm" />
          </div>
        </div>

        {/* Email Input */}
        <div className="border-b border-white/10 focus-within:border-yellow-400 pb-2 transition-colors">
          <label className="text-[9px] text-zinc-600 uppercase tracking-widest block mb-2 font-bold">
            Email Address
          </label>
          <input type="email" className="w-full bg-transparent outline-none text-white text-sm" />
        </div>

        {/* Passphrase Input */}
        <div className="border-b border-white/10 focus-within:border-yellow-400 pb-2 transition-colors">
          <label className="text-[9px] text-zinc-600 uppercase tracking-widest block mb-2 font-bold">
            New Passphrase
          </label>
          <input 
            type="password" 
            placeholder="MIN 8 CHARACTERS" 
            className="w-full bg-transparent outline-none text-white text-sm placeholder:text-zinc-800" 
          />
        </div>

        {/* Submission Area */}
        <div className="pt-6">
          <button className="w-full bg-white text-black px-8 py-5 text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-yellow-400 transition-all duration-500 rounded-sm">
            Request Registry
          </button>
          
          <div className="mt-8 text-center space-y-4">
            <p className="text-[9px] text-zinc-600 uppercase tracking-[0.2em]">
              Already have credentials?{" "}
              <Link to="/auth/login" className="text-white hover:text-yellow-400 transition-colors ml-2">
                Sign In
              </Link>
            </p>
            <p className="text-[8px] text-zinc-700 uppercase tracking-[0.2em]">
              By clicking Request, you agree to the <span className="text-zinc-500 underline">L&L Private Terms</span>.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;