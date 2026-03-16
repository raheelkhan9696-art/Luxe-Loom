import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, CheckCircle, X, Loader2, Plus, Info } from "lucide-react";
// 1. IMPORT YOUR CUSTOM INSTANCE
import axiosInstance from "../../utils/axiosInstance";
import apiPath from "../../utils/apiPath";
import { toast } from "react-hot-toast";

const NewEntryPage = () => {
  const [loading, setLoading] = useState(false);
  const [mainFile, setMainFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Watches",
    material: "18K Gold & Steel",
    countInStock: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMainFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setMainFile(file);
  };

  const handleGalleryFilesChange = (e) => {
    const files = Array.from(e.target.files);
    setGalleryFiles((prev) => [...prev, ...files]);
  };

  const removeGalleryFile = (index) => {
    setGalleryFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mainFile) return toast.error("Primary asset is required for curation.");
    
    setLoading(true);
    const data = new FormData();

    // Append Text Content
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });

    // Append Files
    data.append("mainImage", mainFile);
    galleryFiles.forEach((file) => {
      data.append("images", file); 
    });

    try {
      // 2. USE AXIOS INSTANCE
      // The headers (Authorization) are added automatically by the interceptor.
      // We only need to specify the content-type for this specific request.
      await axiosInstance.post(apiPath.ADMIN.PRODUCTS, data, {
        headers: { 
          "Content-Type": "multipart/form-data" 
        },
      });

      toast.success("Masterpiece synchronized with Archive");
      
      // Reset form
      setFormData({ name: "", description: "", price: "", category: "Watches", material: "18K Gold & Steel", countInStock: "" });
      setMainFile(null);
      setGalleryFiles([]);
    } catch (err) {
      // 3. IMPROVED ERROR HANDLING
      // axiosInstance interceptor likely returns err.response.data.message
      toast.error(err || "Acquisition Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 pt-24 pb-20 px-6 font-sans">
      <div className="max-w-[1000px] mx-auto">
        
        {/* Header */}
        <header className="mb-20">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-yellow-400 text-[9px] tracking-[0.6em] uppercase mb-4 font-bold">Luxe & Loom / Admin Portal</p>
            <h1 className="text-5xl md:text-6xl font-light text-white uppercase tracking-tighter mb-4">
              New <span className="italic font-serif">Acquisition</span>
            </h1>
            <div className="h-px w-24 bg-yellow-400/40" />
          </motion.div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-20">
          
          {/* Media Section */}
          <section className="space-y-8">
            <div className="flex items-center gap-4 border-b border-white/5 pb-4">
              <h2 className="text-[10px] tracking-[0.3em] uppercase text-white font-bold">Visual Documentation</h2>
              <Info size={12} className="text-zinc-700" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Main Image Upload */}
              <div className="md:col-span-2 space-y-4">
                <label className="text-[9px] uppercase tracking-widest text-zinc-500">Primary Showcase Asset</label>
                <div className="relative h-80 border border-white/10 flex flex-col items-center justify-center bg-white/[0.01] hover:bg-white/[0.03] transition-all overflow-hidden group rounded-sm">
                  {mainFile ? (
                    <img 
                      src={URL.createObjectURL(mainFile)} 
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                      alt="Preview"
                    />
                  ) : (
                    <div className="flex flex-col items-center">
                        <UploadCloud size={40} className="text-zinc-800 group-hover:text-yellow-400 transition-colors mb-4" strokeWidth={1} />
                        <span className="text-[10px] tracking-widest uppercase text-zinc-600">Drop masterpiece here</span>
                    </div>
                  )}
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleMainFileChange} accept="image/*" />
                </div>
              </div>

              {/* Gallery Upload */}
              <div className="space-y-4">
                <label className="text-[9px] uppercase tracking-widest text-zinc-500">Angle Gallery</label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="aspect-square border border-dashed border-white/10 flex items-center justify-center hover:bg-white/[0.02] relative cursor-pointer transition-colors group">
                      <Plus size={20} className="text-zinc-700 group-hover:text-yellow-400" />
                      <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleGalleryFilesChange} accept="image/*" />
                  </div>
                  <AnimatePresence>
                    {galleryFiles.map((file, idx) => (
                      <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, scale: 0.9 }} 
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative aspect-square border border-white/5 rounded-sm overflow-hidden group shadow-2xl"
                      >
                        <img src={URL.createObjectURL(file)} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="Gallery preview" />
                        <button type="button" onClick={() => removeGalleryFile(idx)} className="absolute top-1 right-1 bg-black/90 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md border border-white/10"><X size={10}/></button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </section>

          {/* Specifications Section */}
          <section className="space-y-12">
             <div className="flex items-center gap-4 border-b border-white/5 pb-4">
              <h2 className="text-[10px] tracking-[0.3em] uppercase text-white font-bold">Technical Specifications</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
              <div className="space-y-2 group">
                <label className="text-[9px] tracking-widest uppercase text-zinc-600 font-bold block transition-colors group-focus-within:text-yellow-400">Title of Acquisition</label>
                <input 
                  name="name" type="text" required value={formData.name} onChange={handleInputChange}
                  placeholder="E.G. PATEK PHILIPPE NAUTILUS" 
                  className="w-full bg-transparent border-b border-white/10 py-4 text-xl focus:border-yellow-400 outline-none transition-all placeholder:text-zinc-900 uppercase tracking-tight text-white font-light"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] tracking-widest uppercase text-zinc-600 font-bold block">Material Composition</label>
                <input 
                  name="material" type="text" value={formData.material} onChange={handleInputChange}
                  placeholder="E.G. OYSTERSTEEL AND EVEROSE GOLD" 
                  className="w-full bg-transparent border-b border-white/10 py-4 text-sm focus:border-yellow-400 outline-none transition-all placeholder:text-zinc-900 uppercase tracking-widest text-zinc-400"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-[9px] tracking-widest uppercase text-zinc-600 font-bold block">Curated Narrative</label>
                <textarea 
                  name="description" rows="3" required value={formData.description} onChange={handleInputChange}
                  placeholder="DESCRIBE THE HERITAGE, CONDITION, AND MOVEMENT..."
                  className="w-full bg-white/[0.02] border border-white/5 p-6 text-sm focus:border-yellow-400/30 outline-none transition-all placeholder:text-zinc-800 resize-none rounded-sm font-light italic leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-3 gap-6 md:col-span-2">
                <div className="space-y-2">
                  <label className="text-[9px] tracking-widest uppercase text-zinc-600 font-bold block">Category</label>
                  <select 
                    name="category" value={formData.category} onChange={handleInputChange}
                    className="w-full bg-white/[0.02] border border-white/5 p-4 text-[10px] uppercase tracking-[0.2em] focus:border-yellow-400 outline-none appearance-none rounded-sm cursor-pointer"
                  >
                    <option value="Watches" className="bg-black">Watches</option>
                    <option value="High Jewelry" className="bg-black">High Jewelry</option>
                    <option value="Timepieces" className="bg-black">Timepieces</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] tracking-widest uppercase text-zinc-600 font-bold block">Valuation (PKR)</label>
                  <input 
                    name="price" type="number" required value={formData.price} onChange={handleInputChange}
                    placeholder="AMOUNT"
                    className="w-full bg-white/[0.02] border border-white/5 p-4 text-sm outline-none focus:border-yellow-400 transition-all font-mono text-white rounded-sm" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] tracking-widest uppercase text-zinc-600 font-bold block">Vault Units</label>
                  <input 
                    name="countInStock" type="number" required value={formData.countInStock} onChange={handleInputChange}
                    placeholder="QTY"
                    className="w-full bg-white/[0.02] border border-white/5 p-4 text-sm outline-none focus:border-yellow-400 transition-all font-mono text-white rounded-sm" 
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="pt-12 border-t border-white/5">
            <button 
              type="submit" disabled={loading}
              className="w-full group flex items-center justify-center gap-4 bg-white text-black py-7 text-[10px] tracking-[0.6em] uppercase font-bold hover:bg-yellow-400 disabled:bg-zinc-900 disabled:text-zinc-700 transition-all duration-700 rounded-sm relative overflow-hidden"
            >
              <div className="relative z-10 flex items-center gap-4">
                {loading ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle size={18} />}
                {loading ? "Archiving to Vault..." : "Commit to Private Ledger"}
              </div>
              <div className="absolute inset-0 bg-yellow-400 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default NewEntryPage;