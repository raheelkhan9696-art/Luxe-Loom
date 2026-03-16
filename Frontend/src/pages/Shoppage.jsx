import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Added for navigation
import { motion } from "framer-motion";
import { LayoutGrid, List, Star, Loader2 } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import apiPath from "../utils/apiPath";
import banner from "../assets/banner.png";

const ShopPage = () => {
  const [view, setView] = useState("grid");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // --- 1. Fetch Products from Backend ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(apiPath.PRODUCT.GET_ALL);
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err); 
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // --- 2. Filter Logic ---
  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  if (loading) return (
    <div className="min-h-screen bg-[#0c0c0c] flex flex-col items-center justify-center text-yellow-400">
      <Loader2 className="animate-spin mb-4" size={40} />
      <p className="tracking-[0.3em] uppercase text-xs">Curating Collection...</p>
    </div>
  );

  return (
    <div className="bg-[#0c0c0c] text-zinc-300 min-h-screen font-sans">
      
      {/* --- Page Header --- */}
      <header className="relative h-64 flex items-center justify-center border-b border-zinc-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-[#0c0c0c] z-10" />
        <img 
          src={banner}
          className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale"
          alt="Banner"
        />
        <div className="relative z-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-light tracking-[0.2em] text-white uppercase"
          >
            Our Shop
          </motion.h1>
          <p className="text-yellow-400 text-xs tracking-widest mt-2 italic opacity-70">Something different, every day.</p>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto py-12 px-6 grid grid-cols-1 lg:grid-cols-4 gap-12">
        
        {/* --- Sidebar Filters --- */}
        <aside className="space-y-10">
          <div>
            <h3 className="text-sm font-bold tracking-widest uppercase border-b border-zinc-800 pb-4 mb-6">Product Categories</h3>
            <ul className="space-y-4">
              {["All", "Watches", "Jewellery", "Accessories"].map((cat) => (
                <li 
                  key={cat} 
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex justify-between items-center text-sm group cursor-pointer transition-colors ${selectedCategory === cat ? 'text-yellow-400' : 'hover:text-white'}`}
                >
                  <span>{cat}</span>
                  <span className="text-[10px] text-zinc-600 group-hover:text-yellow-400">
                    ({cat === "All" ? products.length : products.filter(p => p.category === cat).length})
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-widest uppercase border-b border-zinc-800 pb-4 mb-6">Filter By Price</h3>
            <div className="h-1 bg-zinc-800 rounded-full relative mb-4">
              <div className="absolute left-0 right-1/4 h-full bg-yellow-400 rounded-full" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-zinc-500 uppercase">Range: $0 — $10k+</span>
              <button className="text-[10px] bg-yellow-400 text-black px-4 py-1.5 font-bold rounded-sm uppercase">Filter</button>
            </div>
          </div>
        </aside>

        {/* --- Product Grid Container --- */}
        <section className="lg:col-span-3">
          
          <div className="flex justify-between items-center border-b border-zinc-800 pb-6 mb-8 text-xs tracking-widest text-zinc-500 uppercase">
            <span>Showing {filteredProducts.length} items</span>
            <div className="flex items-center space-x-6">
              <div className="flex space-x-2">
                <LayoutGrid size={16} className={view === "grid" ? "text-yellow-400" : "cursor-pointer"} onClick={() => setView("grid")} />
              </div>
            </div>
          </div>

          {error && <p className="text-red-500 bg-red-500/10 p-4 border border-red-500/20 text-center">{error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filteredProducts.map((product) => (
              <motion.div 
                key={product._id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="group relative text-center"
              >
                {product.countInStock === 0 && (
                  <span className="absolute top-4 left-4 z-20 bg-zinc-800 text-white text-[9px] font-bold px-2 py-1 uppercase rounded-sm">Sold Out</span>
                )}
                
                {/* Image Wrap with Link */}
                <Link to={`/product/${product._id}`}>
                  <div className="relative overflow-hidden mb-6 aspect-[4/5] bg-zinc-900 flex items-center justify-center">
                    <img 
                      src={product.mainImage} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      alt={product.name} 
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        disabled={product.countInStock === 0}
                        className="bg-white text-black text-[10px] tracking-widest font-bold px-6 py-3 uppercase hover:bg-yellow-400 transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </Link>
                
                <p className="text-[10px] text-yellow-400 tracking-widest uppercase mb-1">{product.category}</p>
                
                {/* Title Wrap with Link */}
                <Link to={`/product/${product._id}`}>
                  <h2 className="text-lg font-light text-zinc-100 mb-2 group-hover:text-yellow-400 transition-colors uppercase tracking-tight">
                    {product.name}
                  </h2>
                </Link>

                <p className="text-sm font-mono text-zinc-400">
                  ${product.price?.toLocaleString()}.00
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ShopPage;