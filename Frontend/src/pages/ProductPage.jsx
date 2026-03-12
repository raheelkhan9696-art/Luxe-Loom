import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShieldCheck, Truck, Lock, ChevronRight, Heart, Share2 } from "lucide-react";

const ProductPage = () => {
  const [selectedSize, setSelectedSize] = useState("42mm");
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  // Mock data inspired by your imagery
  const product = {
    name: "Cosmograph Daytona",
    brand: "Luxe & Loom Heritage",
    price: 1599.00,
    oldPrice: 3000.00,
    description: "A precision-engineered masterpiece featuring a high-contrast tachymetric scale and triple-register chronograph. Designed for the modern professional who values both mechanical excellence and aesthetic distinction.",
    images: [
      "https://images.unsplash.com/photo-1547996160-81dfa63595dd?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1522338140262-f46f5913618a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1508685096489-725f4fd3f106?auto=format&fit=crop&q=80&w=800"
    ]
  };

  return (
    <div className="min-h-screen bg-[#080808] text-zinc-300 pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* --- Left: Cinematic Gallery --- */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-[4/5] w-full bg-zinc-900 overflow-hidden relative group"
          >
            <img 
              src={product.images[activeImg]} 
              alt="Product" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute top-6 right-6 flex flex-col gap-4">
              <button className="p-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10 hover:bg-gold transition-colors">
                <Heart size={18} strokeWidth={1.2} />
              </button>
              <button className="p-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10 hover:bg-gold transition-colors">
                <Share2 size={18} strokeWidth={1.2} />
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-3 gap-4">
            {product.images.map((img, i) => (
              <div 
                key={i} 
                onClick={() => setActiveImg(i)}
                className={`aspect-square cursor-pointer overflow-hidden border-2 transition-all ${activeImg === i ? 'border-gold' : 'border-transparent opacity-50'}`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* --- Right: Product Details --- */}
        <div className="flex flex-col justify-center">
          <header className="mb-8">
            <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-2">{product.brand}</p>
            <h1 className="text-4xl md:text-5xl font-light text-white tracking-tight mb-4 uppercase">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-gold">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <span className="text-[10px] tracking-widest text-zinc-500 uppercase">8 Verified Reviews</span>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-mono text-white">Rs {product.price.toLocaleString()}</span>
              <span className="text-lg font-mono text-zinc-600 line-through">Rs {product.oldPrice.toLocaleString()}</span>
              <span className="bg-gold/10 text-gold text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider">-45% Off</span>
            </div>
          </header>

          <div className="space-y-8">
            {/* Size Selector */}
            <div>
              <div className="flex justify-between mb-3 text-[10px] tracking-widest uppercase font-bold">
                <span>Case Diameter</span>
                <button className="text-gold underline">Size Guide</button>
              </div>
              <div className="flex gap-3">
                {["36mm", "40mm", "42mm", "44mm"].map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex-1 py-3 text-xs tracking-widest uppercase border transition-all ${
                      selectedSize === size ? 'bg-white text-black border-white' : 'border-white/10 text-zinc-500 hover:border-gold'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="flex gap-4">
              <div className="flex items-center border border-white/10 px-4 py-3">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-2 hover:text-gold">-</button>
                <span className="px-6 text-sm font-mono">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-2 hover:text-gold">+</button>
              </div>
              <button className="flex-1 bg-white text-black font-bold text-[11px] tracking-[0.3em] uppercase hover:bg-gold transition-colors">
                Add To Cart
              </button>
            </div>

            <button className="w-full bg-gold text-black font-bold text-[11px] tracking-[0.3em] uppercase py-4 hover:bg-[#b89120] transition-colors">
              Buy It Now
            </button>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 py-8 border-y border-white/5">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-gold" size={20} strokeWidth={1.2} />
                <span className="text-[10px] tracking-widest uppercase text-zinc-400">2 Year Warranty</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="text-gold" size={20} strokeWidth={1.2} />
                <span className="text-[10px] tracking-widest uppercase text-zinc-400">Complimentary Shipping</span>
              </div>
            </div>

            <p className="text-sm text-zinc-500 leading-relaxed font-light italic">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {/* --- Tabbed Details / Reviews Section --- */}
      <section className="mt-24 border-t border-white/5 pt-16">
        <div className="flex justify-center gap-12 mb-12 text-[11px] tracking-[0.5em] uppercase text-zinc-500">
          <button className="text-white border-b border-gold pb-2">Description</button>
          <button className="hover:text-white transition-colors">Material</button>
          <button className="hover:text-white transition-colors">Reviews (8)</button>
        </div>
        
        {/* Simple Review Mockup based on image */}
        <div className="max-w-3xl mx-auto space-y-12">
          {[1, 2].map((review) => (
            <div key={review} className="border-b border-white/5 pb-8">
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-[10px] text-zinc-500">US</div>
                  <div>
                    <p className="text-xs font-bold text-white uppercase tracking-widest">Urooj S.</p>
                    <div className="flex text-gold scale-75 origin-left">
                       {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] text-zinc-600 uppercase tracking-widest">1 Year Ago</span>
              </div>
              <p className="text-sm text-zinc-400 font-light italic">"High quality fast delivery and trustful 10/10. Exactly as shown in the pictures."</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductPage;