import React, { useState } from "react";
import { motion } from "framer-motion";
import { Filter, LayoutGrid, List, ChevronRight, Star } from "lucide-react";
import banner from "../assets/banner.png";
import Navbar from "../component/Navbar";

// Mock Data based on the image
const products = [
  { id: 1, name: "Laminar Marina", category: "Ladies Watches", price: 3400, img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=400" },
  { id: 2, name: "Montbrilliant", category: "Mens Watches", price: 6200, img: "https://images.unsplash.com/photo-1547996160-81dfa63595dd?auto=format&fit=crop&q=80&w=400", sale: true },
  { id: 3, name: "Tag Heuer Carrera", category: "Ladies Watches", price: 5050, img: "https://images.unsplash.com/photo-1522338140262-f46f5913618a?auto=format&fit=crop&q=80&w=400" },
  { id: 4, name: "Possession Chain Ring", category: "Jewellery", price: 1100, img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=400" },
  { id: 5, name: "Seamaster 300 Spectre", category: "Mens Watches", price: 6400, img: "https://images.unsplash.com/photo-1508685096489-725f4fd3f106?auto=format&fit=crop&q=80&w=400" },
  { id: 6, name: "Panthère De Ring", category: "Jewellery", price: 7550, img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=400", sale: true },
];

const ShopPage = () => {
  const [view, setView] = useState("grid");

  return (
    <>
    <Navbar />
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
          <h1 className="text-4xl md:text-5xl font-light tracking-[0.2em] text-white uppercase">Our Shop</h1>
          <p className="text-gold text-xs tracking-widest mt-2 italic opacity-70">Something different, every day.</p>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto py-12 px-6 grid grid-cols-1 lg:grid-cols-4 gap-12">
        
        {/* --- Sidebar Filters --- */}
        <aside className="space-y-10">
          {/* Categories */}
          <div>
            <h3 className="text-sm font-bold tracking-widest uppercase border-b border-zinc-800 pb-4 mb-6">Product Categories</h3>
            <ul className="space-y-4">
              {["Watches", "Jewellery", "Accessories", "Smartwatch"].map((cat) => (
                <li key={cat} className="flex justify-between items-center text-sm group cursor-pointer hover:text-white transition-colors">
                  <span>{cat}</span>
                  <span className="text-[10px] text-zinc-600 group-hover:text-gold transition-colors">(12)</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Filter */}
          <div>
            <h3 className="text-sm font-bold tracking-widest uppercase border-b border-zinc-800 pb-4 mb-6">Filter By Price</h3>
            <div className="h-1 bg-zinc-800 rounded-full relative mb-4">
              <div className="absolute left-0 right-1/4 h-full bg-gold rounded-full" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-zinc-500 uppercase">Price: $299 — $8400</span>
              <button className="text-[10px] bg-gold text-black px-4 py-1.5 font-bold rounded-sm uppercase">Filter</button>
            </div>
          </div>

          {/* Top Rated Mini-List */}
          <div>
            <h3 className="text-sm font-bold tracking-widest uppercase border-b border-zinc-800 pb-4 mb-6">Top Rated</h3>
            <div className="space-y-6">
              {products.slice(0, 3).map((p) => (
                <div key={p.id} className="flex gap-4 items-center">
                  <img src={p.img} className="w-16 h-16 object-cover rounded-sm grayscale hover:grayscale-0 transition-all" alt={p.name} />
                  <div>
                    <h4 className="text-[11px] font-bold text-zinc-400 leading-tight">{p.name}</h4>
                    <div className="flex text-gold my-1 scale-75 origin-left">
                      {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                    </div>
                    <span className="text-xs font-mono text-zinc-500">${p.price.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* --- Product Grid Container --- */}
        <section className="lg:col-span-3">
          
          {/* Grid Toolbar */}
          <div className="flex justify-between items-center border-b border-zinc-800 pb-6 mb-8 text-xs tracking-widest text-zinc-500 uppercase">
            <span>Showing 1–12 of 16 products</span>
            <div className="flex items-center space-x-6">
              <div className="flex space-x-2">
                <LayoutGrid size={16} className={view === "grid" ? "text-gold" : "cursor-pointer"} onClick={() => setView("grid")} />
                <List size={16} className={view === "list" ? "text-gold" : "cursor-pointer"} onClick={() => setView("list")} />
              </div>
              <select className="bg-transparent border-none focus:ring-0 cursor-pointer">
                <option>Default Sorting</option>
                <option>Price: Low to High</option>
                <option>Newest Arrivals</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {products.map((product) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative text-center"
              >
                {product.sale && (
                  <span className="absolute top-4 left-4 z-20 bg-gold text-black text-[9px] font-bold px-2 py-1 uppercase rounded-sm">Sale</span>
                )}
                <div className="relative overflow-hidden mb-6 aspect-[4/5] bg-zinc-900 flex items-center justify-center">
                  <img 
                    src={product.img} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    alt={product.name} 
                  />
                  {/* Quick Add Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white text-black text-[10px] tracking-widest font-bold px-6 py-3 uppercase">Add to Cart</button>
                  </div>
                </div>
                
                <p className="text-[10px] text-gold tracking-widest uppercase mb-1">{product.category}</p>
                <h2 className="text-lg font-light text-zinc-100 mb-2 group-hover:text-gold transition-colors">{product.name}</h2>
                <p className="text-sm font-mono text-zinc-400">
                  ${product.price.toLocaleString()}.00
                </p>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-16 pt-8 border-t border-zinc-800 flex justify-center space-x-4">
            <span className="w-10 h-10 flex items-center justify-center bg-gold text-black rounded-full font-bold text-xs">1</span>
            <span className="w-10 h-10 flex items-center justify-center border border-zinc-800 hover:border-gold transition-colors rounded-full font-bold text-xs cursor-pointer">2</span>
            <span className="w-10 h-10 flex items-center justify-center border border-zinc-800 hover:border-gold transition-colors rounded-full font-bold text-xs cursor-pointer italic font-serif leading-none">→</span>
          </div>
        </section>
      </main>

      {/* --- Simple Premium Footer Segment --- */}
      <footer className="bg-black py-20 border-t border-zinc-800 px-6">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-[0.3em] text-white">WOODSTOCK</h2>
            <p className="text-xs text-zinc-500 leading-loose">A modern fully responsive retina ready WooCommerce theme for luxury items.</p>
          </div>
          <div className="space-y-4">
             <h3 className="text-xs font-bold uppercase tracking-widest">Newsletter</h3>
             <div className="flex border-b border-zinc-700 pb-2">
                <input type="text" placeholder="Your email address" className="bg-transparent border-none focus:ring-0 text-xs flex-1" />
                <button className="text-[10px] text-gold uppercase tracking-widest font-bold">Subscribe</button>
             </div>
          </div>
          <div className="flex justify-center md:justify-end items-center gap-4">
             {["VISA", "PAYPAL", "AMEX", "STRIPE"].map(card => (
               <div key={card} className="w-10 h-6 bg-zinc-800 flex items-center justify-center rounded-sm text-[8px] font-bold text-zinc-500">{card}</div>
             ))}
          </div>
        </div>
      </footer>
    </div>
    </>
  );
};

export default ShopPage;