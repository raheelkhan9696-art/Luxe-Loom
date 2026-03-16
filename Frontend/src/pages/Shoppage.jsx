import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutGrid, Loader2, AlertCircle } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import apiPath from "../utils/apiPath";
import banner from "../assets/banner.png";

const ShopPage = () => {
  const [view, setView] = useState("grid");
  // 1. Always initialize as an empty array to prevent .filter crashes
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get(apiPath.PRODUCT.GET_ALL);
        
        // 2. Defensive Data Extraction
        // Handles cases where API returns [items] OR { products: [items] }
        const rawData = response.data?.products || response.data;
        
        if (Array.isArray(rawData)) {
          setProducts(rawData);
        } else {
          console.error("API did not return an array:", rawData);
          setProducts([]);
        }
      } catch (err) {
        // 3. Extract the string message from your interceptor reject
        setError(typeof err === "string" ? err : "Connection to Vault failed");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 4. Defensive Filter Logic
  // Ensure products is an array before filtering
  const safeProducts = Array.isArray(products) ? products : [];
  
  const filteredProducts = selectedCategory === "All" 
    ? safeProducts 
    : safeProducts.filter(p => p.category === selectedCategory);

  if (loading) return (
    <div className="min-h-screen bg-[#0c0c0c] flex flex-col items-center justify-center text-yellow-400">
      <Loader2 className="animate-spin mb-4" size={40} />
      <p className="tracking-[0.3em] uppercase text-xs">Curating Collection...</p>
    </div>
  );

  return (
    <div className="bg-[#0c0c0c] text-zinc-300 min-h-screen font-sans">
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
        <aside className="space-y-10">
          <div>
            <h3 className="text-sm font-bold tracking-widest uppercase border-b border-zinc-800 pb-4 mb-6">Categories</h3>
            <ul className="space-y-4">
              {["All", "Watches", "Jewellery", "Accessories"].map((cat) => (
                <li 
                  key={cat} 
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex justify-between items-center text-sm group cursor-pointer transition-colors ${selectedCategory === cat ? 'text-yellow-400' : 'hover:text-white'}`}
                >
                  <span>{cat}</span>
                  <span className="text-[10px] text-zinc-600 group-hover:text-yellow-400">
                    ({cat === "All" ? safeProducts.length : safeProducts.filter(p => p.category === cat).length})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section className="lg:col-span-3">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-6 mb-8 text-xs tracking-widest text-zinc-500 uppercase">
            <span>Showing {filteredProducts.length} items</span>
            <LayoutGrid size={16} className="text-yellow-400" />
          </div>

          {/* 5. Improved Error Display */}
          {error && (
            <div className="flex flex-col items-center justify-center py-20 border border-red-500/10 bg-red-500/5 rounded-sm">
                <AlertCircle className="text-red-500 mb-4" size={30} />
                <p className="text-red-500 text-xs uppercase tracking-widest">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 text-[10px] border border-red-500/30 px-4 py-2 hover:bg-red-500/10 transition-all uppercase"
                >
                  Retry Connection
                </button>
            </div>
          )}

          {!error && (
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
                  
                  <Link to={`/product/${product._id}`}>
                    <div className="relative overflow-hidden mb-6 aspect-[4/5] bg-zinc-900 flex items-center justify-center">
                      <img 
                        src={product.mainImage} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        alt={product.name} 
                        onError={(e) => { e.target.src = "https://via.placeholder.com/400x500?text=Luxe+Loom"; }}
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="bg-white text-black text-[10px] tracking-widest font-bold px-6 py-3 uppercase">View Details</span>
                      </div>
                    </div>
                  </Link>
                  
                  <p className="text-[10px] text-yellow-400 tracking-widest uppercase mb-1">{product.category}</p>
                  
                  <Link to={`/product/${product._id}`}>
                    <h2 className="text-lg font-light text-zinc-100 mb-2 group-hover:text-yellow-400 transition-colors uppercase tracking-tight">
                      {product.name}
                    </h2>
                  </Link>

                  <p className="text-sm font-mono text-zinc-400">
                    Rs {product.price?.toLocaleString()}
                  </p>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && !error && filteredProducts.length === 0 && (
            <div className="py-20 text-center opacity-40 italic text-xs tracking-widest">
              No pieces found in this collection.
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ShopPage;