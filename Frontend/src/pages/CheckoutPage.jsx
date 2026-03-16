import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  Loader2, 
  CheckCircle2, 
  ShieldCheck, 
  Package, 
  AlertCircle 
} from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import apiPath from "../utils/apiPath";
import { useCart } from "../context/cartContext"; 
import { toast } from "react-hot-toast";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, subtotal, shipping, total, clearCart } = useCart();
  
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    phoneno: "",
    country: "Pakistan",
    paymentMethod: "Cash on Delivery"
  });

  // Extract user info from token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        // Check for 'id' or '_id' based on your JWT structure
        const userId = payload.id || payload._id;
        if (userId) setCurrentUserId(userId);
        if (payload.email) setFormData(prev => ({ ...prev, email: payload.email }));
      } catch (e) {
        console.error("Session identity check failed", e);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!cartItems || cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    if (!currentUserId) {
      toast.error("Authentication required. Please log in.");
      return;
    }
    
    setLoading(true);

    try {
      const orderData = {
        user: currentUserId, 
        orderItems: cartItems.map(item => ({
          product: item._id, 
          name: item.name,
          qty: Number(item.quantity) || 1,
          image: item.mainImage || (item.image && item.image[0]) || "",
          price: Number(item.price)
        })),
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          postalCode: String(formData.postalCode),
          country: formData.country,
          phoneno: String(formData.phoneno), // Force String here
        },
        paymentMethod: formData.paymentMethod || "Cash on Delivery",
        itemsPrice: Number(subtotal),
        shippingPrice: Number(shipping),
        taxPrice: 0, 
        totalPrice: Number(total),
      };

      // Debugging: Log the payload once to verify structure
      console.log("Placing Order Payload:", orderData);

      const response = await axiosInstance.post(apiPath.ORDERS.CREATE, orderData);

      if (response.status === 201 || response.data?._id) {
        setOrderSuccess(true);
        clearCart(); 
        toast.success("Order placed successfully!");
        setTimeout(() => navigate("/orders"), 3000);
      }
    } catch (err) {
      console.error("Order API Error:", err.response?.data);
      const errorMsg = err.response?.data?.error || err.response?.data?.message || "Order placement failed";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <CheckCircle2 size={64} className="text-yellow-400 mx-auto mb-6" />
          <h1 className="text-2xl font-light text-white uppercase tracking-[0.5em] mb-4">Registry Updated</h1>
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em]">Your acquisition has been recorded.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 flex flex-col lg:flex-row">
      {/* LEFT: FORM SECTION */}
      <div className="flex-1 px-6 md:px-20 py-20 lg:border-r border-white/5">
        <div className="max-w-xl ml-auto">
          <header className="mb-12">
            <nav className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-zinc-600 mb-8">
              <Link to="/cart" className="hover:text-yellow-400 transition-colors">Cart</Link>
              <ChevronLeft size={10} className="rotate-180 opacity-30" />
              <span className="text-white font-bold tracking-[0.2em]">Shipping Registry</span>
            </nav>
          </header>

          {cartItems.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-white/10 rounded-sm">
              <AlertCircle size={32} className="mx-auto mb-4 text-zinc-800" />
              <p className="text-[10px] uppercase tracking-widest text-zinc-500">Your manifest is empty</p>
              <Link to="/collection" className="text-yellow-400 text-[10px] uppercase mt-4 inline-block underline underline-offset-4">Return to Vault</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              <section className="space-y-4">
                <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-white opacity-40">Contact Identity</h2>
                <input 
                  name="email" required value={formData.email} onChange={handleInputChange} 
                  type="email" placeholder="EMAIL ADDRESS" 
                  className="w-full bg-white/5 border border-white/10 px-5 py-4 text-xs focus:border-yellow-500 outline-none rounded-sm transition-all" 
                />
              </section>

              <section className="space-y-4">
                <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-white opacity-40">Shipping Destination</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input name="firstName" value={formData.firstName} required onChange={handleInputChange} type="text" placeholder="FIRST NAME" className="bg-white/5 border border-white/10 px-5 py-4 text-xs outline-none focus:border-white/30 transition-colors" />
                  <input name="lastName" value={formData.lastName} required onChange={handleInputChange} type="text" placeholder="LAST NAME" className="bg-white/5 border border-white/10 px-5 py-4 text-xs outline-none focus:border-white/30 transition-colors" />
                  <input name="address" value={formData.address} required onChange={handleInputChange} type="text" placeholder="STREET ADDRESS" className="col-span-2 bg-white/5 border border-white/10 px-5 py-4 text-xs outline-none focus:border-white/30 transition-colors" />
                  <input name="city" value={formData.city} required onChange={handleInputChange} type="text" placeholder="CITY" className="bg-white/5 border border-white/10 px-5 py-4 text-xs outline-none focus:border-white/30 transition-colors" />
                  <input name="postalCode" value={formData.postalCode} required onChange={handleInputChange} type="text" placeholder="POSTAL CODE" className="bg-white/5 border border-white/10 px-5 py-4 text-xs outline-none focus:border-white/30 transition-colors" />
                  <input name="phoneno" value={formData.phoneno} required onChange={handleInputChange} type="text" placeholder="PHONE NUMBER" className="bg-white/5 border border-white/10 px-5 py-4 text-xs outline-none focus:border-white/30 transition-colors" />
                </div>
              </section>

              <section className="bg-white/[0.02] border border-white/5 p-6 flex items-center justify-between rounded-sm">
                 <div className="flex items-center gap-4">
                   <Package size={18} className="text-yellow-400" />
                   <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white">Cash on Delivery (COD)</span>
                 </div>
                 <div className="w-4 h-4 rounded-full border-4 border-yellow-400 bg-black shadow-[0_0_10px_rgba(250,204,21,0.2)]" />
              </section>

              <button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-white text-black py-6 text-[10px] font-bold tracking-[0.5em] uppercase hover:bg-yellow-400 transition-all duration-500 disabled:opacity-20 active:scale-[0.98]"
              >
                {loading ? <Loader2 className="animate-spin mx-auto" size={18} /> : "Finalize Acquisition"}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* RIGHT: SUMMARY SECTION */}
      <div className="w-full lg:w-[480px] bg-[#080808] px-6 md:px-12 py-20">
        <div className="max-w-sm mx-auto">
          <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-white mb-10 pb-4 border-b border-white/5">Order Summary</h2>
          <div className="space-y-8 mb-10 max-h-[50vh] overflow-y-auto pr-4 custom-scrollbar">
            {cartItems.map((item, idx) => (
              <div key={`${item._id}-${idx}`} className="flex items-center gap-6 group">
                <div className="relative shrink-0">
                  <div className="w-20 h-24 bg-zinc-900 border border-white/5 overflow-hidden">
                    <img 
                      src={item.mainImage || (item.image && item.image[0]) || "https://placehold.co/200x300?text=Luxe"} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                      alt={item.name} 
                    />
                  </div>
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-white text-black text-[10px] flex items-center justify-center rounded-full font-bold shadow-xl">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-[10px] font-bold text-white uppercase tracking-widest">{item.name}</h3>
                  <p className="text-[9px] text-zinc-600 mt-1 uppercase tracking-widest">Variant: {item.selectedSize || "Standard"}</p>
                </div>
                <span className="text-xs font-mono text-white">Rs {item.price?.toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/5 space-y-4">
            <div className="flex justify-between text-[10px] tracking-widest uppercase text-zinc-500">
              <span>Subtotal</span>
              <span className="text-white font-mono">Rs {subtotal.toLocaleString()}.00</span>
            </div>
            <div className="flex justify-between text-[10px] tracking-widest uppercase text-zinc-500">
              <span>Shipping</span>
              <span className="text-white font-mono">{shipping === 0 ? "Complimentary" : `Rs ${shipping}.00`}</span>
            </div>
            <div className="flex justify-between items-center pt-8 border-t border-white/5">
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-white">Total</span>
              <span className="text-2xl font-mono text-yellow-500">Rs {total.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="mt-16 flex items-center gap-4 opacity-30 hover:opacity-100 transition-opacity">
            <ShieldCheck size={20} className="text-yellow-500" />
            <p className="text-[8px] uppercase tracking-[0.3em] leading-tight font-light text-zinc-400">
              Secured Acquisition Protocol <br/> All Transactions Encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;