import React from "react";
import { motion } from "framer-motion";
import { Wrench, ShieldCheck, Heart, MessageSquare, Star, LifeBuoy, Sparkles } from "lucide-react";

const CarePage = () => {
  const testimonials = [
    { name: "Julian V.", role: "Collector", text: "The restoration service for my 1950s heritage piece was flawless. They treat every watch like a museum artifact.", rating: 5 },
    { name: "Elena R.", role: "Client", text: "Exceptional support. The concierge helped me navigate a custom engraving for my anniversary with such patience.", rating: 5 },
    { name: "Marcus T.", role: "Architect", text: "Luxe & Loom defines what modern service should be—discreet, expert, and incredibly thorough.", rating: 5 },
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-zinc-300 pt-32 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* --- Header: The Promise --- */}
        <div className="max-w-3xl mb-24">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gold text-[10px] tracking-[0.5em] uppercase mb-4"
          >
            Preservation & Support
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-light text-white uppercase tracking-tighter mb-8"
          >
            A Lifetime of <span className="italic font-serif">Brilliance</span>
          </motion.h1>
          <p className="text-sm font-light leading-relaxed opacity-60">
            A Luxe & Loom piece is designed to transcend generations. To ensure its 
            mechanical integrity and aesthetic luster, our master artisans offer 
            unparalleled care and restoration services.
          </p>
        </div>

        {/* --- Section 1: Care Modules --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {[
            { icon: <Wrench size={24} />, title: "Technical Service", desc: "Complete movement overhaul and pressure testing every 3–5 years." },
            { icon: <Sparkles size={24} />, title: "Aesthetic Care", desc: "Professional polishing and ultrasonic cleaning to restore original luster." },
            { icon: <ShieldCheck size={24} />, title: "Authentication", desc: "Official certification and valuation for your private collection." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-10 bg-white/[0.02] border border-white/5 hover:border-gold/30 transition-all group"
            >
              <div className="text-gold mb-6 group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
              <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-white mb-4">{item.title}</h3>
              <p className="text-xs font-light leading-relaxed opacity-50">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* --- Section 2: Testimonials (The Archive of Trust) --- */}
        <section className="mb-32">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-[10px] tracking-[0.5em] uppercase text-gold mb-2">The Archive of Trust</h2>
            <div className="h-px w-20 bg-gold/30" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {testimonials.map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative p-8 text-center"
              >
                <div className="flex justify-center text-gold/40 mb-6 italic font-serif text-4xl leading-none">“</div>
                <p className="text-sm font-light italic leading-relaxed text-zinc-400 mb-8 italic">
                  {t.text}
                </p>
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={10} className="text-gold" fill="currentColor" />)}
                </div>
                <h4 className="text-[10px] tracking-widest uppercase text-white font-bold">{t.name}</h4>
                <p className="text-[9px] tracking-[0.2em] uppercase text-zinc-600 mt-1">{t.role}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Section 3: Bespoke Support Channels --- */}
        <div className="bg-white/[0.02] border border-white/5 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 blur-[120px] rounded-full -translate-y-1/2" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 lg:p-20 border-b lg:border-b-0 lg:border-r border-white/5">
              <h2 className="text-2xl font-light text-white uppercase tracking-widest mb-6">Immediate Support</h2>
              <p className="text-xs font-light leading-relaxed opacity-50 mb-10">
                Speak directly with a Luxe & Loom concierge representative. 
                Our team is available for real-time guidance on care and acquisition.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <MessageSquare size={18} strokeWidth={1.2} />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-zinc-500">Live Concierge</p>
                    <p className="text-sm text-white">Available Mon–Fri, 9am–6pm</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <LifeBuoy size={18} strokeWidth={1.2} />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-zinc-500">Global Assistance</p>
                    <p className="text-sm text-white">support@luxeandloom.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-12 lg:p-20 flex flex-col justify-center bg-white/[0.01]">
              <h2 className="text-2xl font-light text-white uppercase tracking-widest mb-6">Ownership Warranty</h2>
              <p className="text-xs font-light leading-relaxed opacity-50 mb-8">
                Every timepiece and jewel carries a digital certificate of authenticity 
                secured on our private ledger. Register your piece to activate 
                your extended 5-year global warranty.
              </p>
              <button className="w-fit px-10 py-4 border border-white/20 text-[10px] tracking-[0.4em] uppercase text-white hover:bg-white hover:text-black transition-all">
                Register Collection
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CarePage;