import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, CheckCircle, MoreVertical, X } from "lucide-react";

const NewEntryPage = () => {
  const [selectedSizes, setSelectedSizes] = useState(["42mm", "44mm"]);
  const [isBestseller, setIsBestseller] = useState(false);
  
  // Size options tailored for high-end watches
  const sizes = ["36mm", "40mm", "42mm", "44mm", "46mm"];

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 pt-16 pb-20 px-6 md:px-12">
      <div className="max-w-[800px] mx-auto">
        
        {/* --- Header & Context --- */}
        <header className="mb-16 pb-8 border-b border-white/5">
          <p className="text-yellow-400 text-[10px] tracking-[0.5em] uppercase mb-3">Portfolio Curation</p>
          <h1 className="text-4xl md:text-5xl font-light text-white uppercase tracking-tighter mb-2">
            New <span className="italic font-serif">Aquisition</span>
          </h1>
          <p className="text-xs font-light leading-relaxed opacity-50 max-w-lg">
            Introduce a new masterpiece to the Luxe & Loom private catalog. Ensure high-resolution imagery and precise specifications.
          </p>
        </header>

        <form className="space-y-12">
          
          {/* --- Cinematic Image Upload --- */}
          <section>
            <div className="flex justify-between items-end mb-6">
              <label className="text-sm font-bold tracking-[0.2em] uppercase text-white">Upload Media</label>
              <p className="text-[9px] text-zinc-600 tracking-widest uppercase">Max: 16MB / RAW/JPEG/PNG</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Primary Drop Zone */}
              <div className="md:col-span-2 group relative h-40 md:h-full aspect-[1/1] border-2 border-dashed border-white/10 hover:border-yellow-400/40 rounded-sm flex flex-col items-center justify-center cursor-pointer transition-all bg-white/[0.01]">
                <UploadCloud size={24} className="text-yellow-400 mb-3 opacity-60 group-hover:opacity-100 transition-opacity" strokeWidth={1.2} />
                <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-bold">Main Focus</span>
                <span className="text-[9px] text-zinc-700 tracking-wider">Drag or Click</span>
              </div>
              
              {/* Secondary Thumbnails */}
              {[1, 2].map((thumb) => (
                <div key={thumb} className="relative aspect-square border-2 border-dashed border-white/10 group flex items-center justify-center rounded-sm bg-white/[0.01]">
                   <MoreVertical size={16} className="text-zinc-700 opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </section>

          {/* --- Naming & Description --- */}
          <div className="space-y-8">
            <div className="relative group">
              <label className="text-[10px] tracking-widest uppercase text-zinc-500 block mb-3 font-bold">Aquisition Title</label>
              <input 
                type="text" 
                placeholder="E.G. HERITAGE COSMOGRAPH DAYTONA" 
                className="w-full bg-white/[0.02] border border-white/10 px-5 py-4 text-sm focus:border-yellow-400 outline-none transition-all placeholder:text-zinc-800 rounded-sm"
              />
            </div>

            <div className="relative group">
              <label className="text-[10px] tracking-widest uppercase text-zinc-500 block mb-3 font-bold">Narrative Description</label>
              <textarea 
                rows="5"
                placeholder="THE ARTISANAL HISTORY, MECHANICS, AND SIGNIFICANCE OF THE PIECE..."
                className="w-full bg-white/[0.02] border border-white/10 px-5 py-4 text-sm focus:border-yellow-400 outline-none transition-all placeholder:text-zinc-800 resize-none rounded-sm font-light italic"
              />
            </div>
          </div>

          {/* --- Specifics Grid --- */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative group">
              <label className="text-[10px] tracking-widest uppercase text-zinc-500 block mb-3 font-bold">Curation Category</label>
              <select className="w-full bg-white/[0.02] border border-white/10 px-5 py-4 text-sm focus:border-yellow-400 outline-none appearance-none rounded-sm">
                <option className="bg-black">Watches</option>
                <option className="bg-black">High Jewelry</option>
                <option className="bg-black">Archival Goods</option>
              </select>
            </div>

            <div className="relative group">
              <label className="text-[10px] tracking-widest uppercase text-zinc-500 block mb-3 font-bold">Material Focus</label>
              <select className="w-full bg-white/[0.02] border border-white/10 px-5 py-4 text-sm focus:border-yellow-400 outline-none appearance-none rounded-sm">
                <option className="bg-black">yellow-400 / Steel</option>
                <option className="bg-black">Platinum</option>
                <option className="bg-black">Diamond Pave</option>
              </select>
            </div>

            <div className="relative group">
              <label className="text-[10px] tracking-widest uppercase text-zinc-500 block mb-3 font-bold">Valuation (PKR)</label>
              <input 
                type="text" 
                placeholder="RS 1,599,000.00" 
                className="w-full bg-white/[0.02] border border-white/10 px-5 py-4 text-sm focus:border-yellow-400 outline-none transition-all placeholder:text-zinc-800 rounded-sm font-mono text-white"
              />
            </div>
          </section>

          {/* --- Case Diameter (Refined Size Guide) --- */}
          <section>
            <label className="text-sm font-bold tracking-[0.2em] uppercase text-white block mb-5">Case Diameter (MM)</label>
            <div className="flex gap-4">
              {sizes.map(size => (
                <button 
                  key={size}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent form submission
                    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
                  }}
                  className={`relative flex-1 py-4 text-xs tracking-widest uppercase border rounded-sm transition-all ${
                    selectedSizes.includes(size) ? 'bg-white text-black border-white' : 'border-white/10 text-zinc-500 hover:border-yellow-400'
                  }`}
                >
                  {selectedSizes.includes(size) && (
                    <div className="absolute top-1 right-1 text-yellow-400"><X size={12} strokeWidth={1} /></div>
                  )}
                  {size}
                </button>
              ))}
            </div>
          </section>

          {/* --- Ledger / Visibility --- */}
          <div className="pt-8 border-t border-white/5 space-y-8">
            <div className="flex items-center gap-4">
              <div 
                onClick={() => setIsBestseller(!isBestseller)} 
                className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors ${isBestseller ? 'bg-yellow-400' : 'bg-zinc-800 border border-white/10'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform ${isBestseller ? 'translate-x-7' : 'translate-x-1'}`} />
              </div>
              <label className="text-[11px] tracking-[0.3em] uppercase text-zinc-400 font-bold">Showcase on Private Ledger (Bestseller)</label>
            </div>

            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-white text-black py-5 text-[11px] tracking-[0.4em] uppercase font-bold hover:bg-yellow-400 transition-colors duration-500 rounded-sm">
              <CheckCircle size={14} /> Commit to Portfolio
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default NewEntryPage;