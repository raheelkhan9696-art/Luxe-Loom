import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, TrendingUp, Package, Wallet, Calendar, Info } from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import axios from "axios";
import apiPath from "../../utils/apiPath";
import { toast } from "react-hot-toast";

const BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

const Dashboard = () => {
  const [stats, setStats] = useState({
    revenue: "0",
    activeOrders: "0",
    inventoryValue: "0",
    chartData: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}${apiPath.ADMIN.DASHBOARD}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setStats({
          revenue: response.data.revenue?.toLocaleString() || "0",
          activeOrders: response.data.activeOrders || 0,
          inventoryValue: response.data.inventoryValue?.toLocaleString() || "0",
          chartData: response.data.chartData || []
        });
      } catch (err) {
        toast.error("Failed to sync live market data");
        console.error("Dashboard Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statConfig = [
    { label: "Revenue (Total)", value: `Rs ${stats.revenue}`, grow: "Live", icon: <Wallet size={14} className="text-yellow-400" /> },
    { label: "Active Orders", value: stats.activeOrders, grow: "Pending", icon: <Package size={14} className="text-yellow-400" /> },
    { label: "Inventory Value", value: `Rs ${stats.inventoryValue}`, grow: "Stock", icon: <TrendingUp size={14} className="text-yellow-400" /> },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0c0c0c] border border-white/10 p-4 shadow-2xl backdrop-blur-xl">
          <p className="text-[10px] tracking-widest text-zinc-500 uppercase mb-1 font-bold">
            {payload[0].payload.name} Daily Total
          </p>
          <p className="text-sm font-mono text-yellow-400">
            Rs {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) return (
    <div className="h-96 flex flex-col items-center justify-center gap-4 opacity-30">
      <Loader2 className="animate-spin text-yellow-400" />
      <p className="text-[10px] tracking-[0.5em] uppercase text-zinc-500 font-bold">Synchronizing Vault</p>
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      {/* --- Key Metrics --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statConfig.map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 bg-white/[0.02] border border-white/5 rounded-sm hover:border-yellow-400/20 transition-all group"
          >
            <div className="flex justify-between items-start mb-4 text-zinc-500">
              <p className="text-[10px] tracking-widest uppercase">{stat.label}</p>
              {stat.icon}
            </div>
            <div className="flex justify-between items-end">
              <h3 className="text-2xl font-light text-white tracking-tighter uppercase">{stat.value}</h3>
              <span className="text-[8px] text-yellow-500 font-bold tracking-[0.2em] uppercase mb-1">{stat.grow}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- Visual Analytics Chart --- */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white/[0.02] border border-white/5 p-8 rounded-sm overflow-hidden"
      >
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-10 gap-4">
          <div>
            <h4 className="text-[11px] tracking-[0.4em] uppercase text-white font-bold mb-1">Weekly Revenue Performance</h4>
            <p className="text-[9px] tracking-widest text-zinc-600 uppercase">Live data feed from order registry</p>
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
             <Info size={12} className="text-yellow-400" />
             <span className="text-[9px] text-zinc-400 uppercase tracking-widest">Orders: {stats.activeOrders} active</span>
          </div>
        </div>

        <div className="h-80 w-full pr-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.chartData} margin={{ top: 10, right: 0, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#52525b', fontSize: 9, letterSpacing: '0.1em'}} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#52525b', fontSize: 9}}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#eab308', strokeWidth: 1, strokeDasharray: '4 4' }} />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#eab308" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorValue)" 
                animationDuration={2500}
                dot={{ r: 4, fill: '#080808', stroke: '#eab308', strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 0, fill: '#fff' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;