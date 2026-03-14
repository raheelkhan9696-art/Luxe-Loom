import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] text-zinc-400 pt-24 pb-12 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* --- Top Section: Branding & Newsletter --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-24">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-light tracking-[0.4em] text-white uppercase">
              LUXE<span className="italic font-serif font-normal text-zinc-500">&</span>LOOM
            </h2>
            <p className="max-w-md text-sm leading-relaxed font-light italic opacity-70">
              Defining the pinnacle of horological excellence and artisanal jewelry. 
              Our pieces are more than accessories; they are legacy instruments 
              crafted for the discerning few.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-[10px] tracking-[0.5em] uppercase text-white font-bold">
              The Ledger (Newsletter)
            </h3>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="w-full bg-transparent border-b border-white/10 py-4 text-xs tracking-widest outline-none focus:border-yellow-400 transition-colors placeholder:text-zinc-700"
              />
              <button className="absolute right-0 bottom-4 text-yellow-400 hover:text-white transition-colors">
                <ArrowUpRight size={20} />
              </button>
            </div>
            <p className="text-[9px] tracking-widest uppercase opacity-40">
              Join the inner circle for bespoke releases & private viewings.
            </p>
          </div>
        </div>

        {/* --- Middle Section: Links Grid --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
          <div className="space-y-6">
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-white">Boutique</h4>
            <ul className="space-y-4 text-xs tracking-widest uppercase">
              <li><Link to="/shop" className="hover:text-yellow-400 transition-colors">All Timepieces</Link></li>
              <li><Link to="/shop" className="hover:text-yellow-400 transition-colors">Jewelry</Link></li>
              <li><Link to="/shop" className="hover:text-yellow-400 transition-colors">Bespoke Service</Link></li>
              <li><Link to="/shop" className="hover:text-yellow-400 transition-colors">Accessories</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-white">Curation</h4>
            <ul className="space-y-4 text-xs tracking-widest uppercase">
              <li><Link to="/about" className="hover:text-yellow-400 transition-colors">Our Story</Link></li>
              <li><Link to="/journals" className="hover:text-yellow-400 transition-colors">The Journal</Link></li>
              <li><Link to="/archive" className="hover:text-yellow-400 transition-colors">Archive</Link></li>
              <li><Link to="/sustainability" className="hover:text-yellow-400 transition-colors">Ethics</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-white">Concierge</h4>
            <ul className="space-y-4 text-xs tracking-widest uppercase">
              <li><Link to="/shipping" className="hover:text-yellow-400 transition-colors">Shipping</Link></li>
              <li><Link to="/returns" className="hover:text-yellow-400 transition-colors">Returns</Link></li>
              <li><Link to="/care" className="hover:text-yellow-400 transition-colors">Product Care</Link></li>
              <li><Link to="/contact" className="hover:text-yellow-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-white">Social</h4>
            <div className="flex gap-6">
              <Instagram className="w-5 h-5 hover:text-yellow-400 cursor-pointer transition-colors" strokeWidth={1.2} />
              <Twitter className="w-5 h-5 hover:text-yellow-400 cursor-pointer transition-colors" strokeWidth={1.2} />
              <Facebook className="w-5 h-5 hover:text-yellow-400 cursor-pointer transition-colors" strokeWidth={1.2} />
            </div>
          </div>
        </div>

        {/* --- Bottom Section: Legal --- */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-8 text-[9px] tracking-[0.3em] uppercase opacity-40">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Cookie Policy</span>
          </div>
          
          <div className="text-[10px] tracking-[0.4em] uppercase text-zinc-600">
            &copy; {currentYear} Luxe <span className="italic font-serif">&</span> Loom. Built for the modern era.
          </div>

          <div className="flex items-center gap-4 grayscale opacity-30 hover:opacity-100 transition-opacity">
            <div className="w-8 h-5 bg-zinc-800 rounded-sm flex items-center justify-center text-[7px] font-bold">VISA</div>
            <div className="w-8 h-5 bg-zinc-800 rounded-sm flex items-center justify-center text-[7px] font-bold">AMEX</div>
            <div className="w-8 h-5 bg-zinc-800 rounded-sm flex items-center justify-center text-[7px] font-bold">PP</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;





