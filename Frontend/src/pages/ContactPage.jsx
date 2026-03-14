import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-[#080808] text-zinc-300 pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        
        {/* --- Header Section --- */}
        <header className="mb-20">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-yellow-400 text-[10px] tracking-[0.5em] uppercase mb-4"
          >
            Concierge Service
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-light text-white uppercase tracking-tighter"
          >
            Get in <span className="italic font-serif">Touch</span>
          </motion.h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          
          {/* --- Left: The Inquiry Form --- */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <label className="text-[10px] tracking-widest uppercase text-zinc-500 block mb-2">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-transparent border-b border-white/10 py-3 text-sm focus:border-yellow-400 outline-none transition-colors placeholder:text-zinc-800"
                    placeholder="E.G. ABDULLAH"
                  />
                </div>
                <div className="relative group">
                  <label className="text-[10px] tracking-widest uppercase text-zinc-500 block mb-2">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-transparent border-b border-white/10 py-3 text-sm focus:border-yellow-400 outline-none transition-colors placeholder:text-zinc-800"
                    placeholder="HELLO@LUXEANDLOOM.COM"
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="text-[10px] tracking-widest uppercase text-zinc-500 block mb-2">Subject</label>
                <select className="w-full bg-transparent border-b border-white/10 py-3 text-sm focus:border-yellow-400 outline-none transition-colors appearance-none">
                  <option className="bg-black">General Inquiry</option>
                  <option className="bg-black">Bespoke Watch Commission</option>
                  <option className="bg-black">Jewelry Customization</option>
                  <option className="bg-black">Press & Media</option>
                </select>
              </div>

              <div className="relative group">
                <label className="text-[10px] tracking-widest uppercase text-zinc-500 block mb-2">Message</label>
                <textarea 
                  rows="4"
                  className="w-full bg-transparent border-b border-white/10 py-3 text-sm focus:border-yellow-400 outline-none transition-colors placeholder:text-zinc-800 resize-none"
                  placeholder="HOW CAN OUR CONCIERGE ASSIST YOU?"
                />
              </div>

              <button className="flex items-center gap-4 group">
                <span className="text-[11px] tracking-[0.4em] uppercase font-bold text-white group-hover:text-yellow-400 transition-colors">
                  Send Inquiry
                </span>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-all">
                  <ArrowRight size={16} />
                </div>
              </button>
            </form>
          </motion.div>

          {/* --- Right: Global Atelier Info --- */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-16"
          >
            {/* Contact Points */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-yellow-400">
                  <MapPin size={16} strokeWidth={1.5} />
                  <h4 className="text-[10px] tracking-[0.3em] uppercase font-bold">Atelier</h4>
                </div>
                <p className="text-sm font-light leading-relaxed">
                  124 Luxury Row, Mayfair<br />
                  London, W1J 7JZ<br />
                  United Kingdom
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-yellow-400">
                  <Phone size={16} strokeWidth={1.5} />
                  <h4 className="text-[10px] tracking-[0.3em] uppercase font-bold">Client Support</h4>
                </div>
                <p className="text-sm font-light leading-relaxed">
                  +44 (0) 20 7946 0123<br />
                  concierge@luxeandloom.com
                </p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-sm">
              <div className="flex items-center gap-3 text-yellow-400 mb-6">
                <Clock size={16} strokeWidth={1.5} />
                <h4 className="text-[10px] tracking-[0.3em] uppercase font-bold">Viewing Hours</h4>
              </div>
              <ul className="space-y-4 text-xs tracking-widest uppercase">
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-zinc-500">Mon — Fri</span>
                  <span className="text-white">10:00 — 19:00</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-zinc-500">Saturday</span>
                  <span className="text-white">11:00 — 17:00</span>
                </li>
                <li className="flex justify-between text-zinc-600">
                  <span>Sunday</span>
                  <span>By Appointment Only</span>
                </li>
              </ul>
            </div>

            {/* Social Connection */}
            <div className="pt-8">
              <p className="text-[9px] tracking-[0.5em] uppercase text-zinc-600 mb-6 text-center lg:text-left">
                Follow our Journey
              </p>
              <div className="flex justify-center lg:justify-start gap-12">
                {["Instagram", "Vimeo", "LinkedIn"].map((social) => (
                  <a 
                    key={social} 
                    href="#" 
                    className="text-[11px] tracking-widest uppercase text-white/40 hover:text-yellow-400 transition-colors"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;