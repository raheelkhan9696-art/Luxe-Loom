import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { motion } from "framer-motion";
import { Star, ShieldCheck, Truck, Heart, Share2, Loader2, Check } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import apiPath from "../utils/apiPath";
import { useCart } from "../context/cartContext.jsx";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);
  
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(apiPath.PRODUCT.GET_BY_ID(id));
        setProduct(data);
        if (data.sizes?.length > 0) setSelectedSize(data.sizes[0]);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center text-yellow-400">
      <Loader2 className="animate-spin mb-4" size={40} />
      <p className="tracking-widest uppercase text-xs">Unveiling Masterpiece...</p>
    </div>
  );

  if (error || !product) return <div className="text-white text-center pt-40 uppercase tracking-widest">Product Not Found</div>;

  const allImages = [product.mainImage, ...(product.images || [])];

  return (
    <div className="min-h-screen bg-[#080808] text-zinc-300 pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Gallery */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="aspect-[4/5] bg-zinc-900 overflow-hidden relative group">
            <img src={allImages[activeImg]} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
          </motion.div>
          <div className="grid grid-cols-3 gap-4">
            {allImages.map((img, i) => (
              <div key={i} onClick={() => setActiveImg(i)} className={`aspect-square cursor-pointer border-2 transition-all ${activeImg === i ? 'border-yellow-400' : 'border-transparent opacity-50'}`}>
                <img src={img} className="w-full h-full object-cover" alt="thumb" />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <header className="mb-8">
            <p className="text-yellow-400 text-[10px] tracking-[0.4em] uppercase mb-2">{product.category}</p>
            <h1 className="text-4xl md:text-5xl font-light text-white tracking-tight mb-4 uppercase">{product.name}</h1>
            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-mono text-white">Rs {product.price?.toLocaleString()}</span>
            </div>
          </header>

          <div className="space-y-8">
            {product.sizes?.length > 0 && (
              <div>
                <p className="mb-3 text-[10px] tracking-widest uppercase font-bold">Select Variant</p>
                <div className="flex gap-3">
                  {product.sizes.map(size => (
                    <button key={size} onClick={() => setSelectedSize(size)}
                      className={`flex-1 py-3 text-xs border transition-all ${selectedSize === size ? 'bg-white text-black border-white' : 'border-white/10 text-zinc-500 hover:border-yellow-400'}`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <div className="flex items-center border border-white/10 px-4 py-3">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-2 hover:text-yellow-400">-</button>
                <span className="px-6 text-sm font-mono">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-2 hover:text-yellow-400">+</button>
              </div>
              <button 
                onClick={handleAddToCart}
                disabled={product.countInStock === 0}
                className="flex-1 bg-white text-black font-bold text-[11px] tracking-[0.3em] uppercase hover:bg-yellow-400 transition-colors disabled:bg-zinc-800"
              >
                {added ? <span className="flex items-center justify-center gap-2"><Check size={14}/> Added</span> : "Add To Cart"}
              </button>
            </div>

            <button onClick={() => navigate('/cart')} className="w-full border border-white/10 text-white font-bold text-[11px] tracking-[0.3em] uppercase py-4 hover:bg-white hover:text-black transition-all">
              View Shopping Bag
            </button>

            <div className="grid grid-cols-2 gap-4 py-8 border-y border-white/5">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-yellow-400" size={20} strokeWidth={1.2} />
                <span className="text-[10px] tracking-widest uppercase text-zinc-400">2 Year Warranty</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="text-yellow-400" size={20} strokeWidth={1.2} />
                <span className="text-[10px] tracking-widest uppercase text-zinc-400">Free Shipping over 15k</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;