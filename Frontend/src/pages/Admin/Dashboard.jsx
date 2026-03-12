import React from 'react';

const Dashboard = () => (
  <div className="space-y-10">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { label: "Revenue (MTD)", value: "Rs 4.2M", grow: "+12.5%" },
        { label: "Active Orders", value: "24", grow: "8 Pending" },
        { label: "Inventory Value", value: "Rs 18.5M", grow: "320 Items" },
      ].map((stat, i) => (
        <div key={i} className="p-8 bg-white/[0.02] border border-white/5 rounded-sm">
          <p className="text-[10px] tracking-widest text-zinc-500 uppercase mb-4">{stat.label}</p>
          <div className="flex justify-between items-end">
            <h3 className="text-3xl font-mono text-white">{stat.value}</h3>
            <span className="text-[10px] text-gold font-bold">{stat.grow}</span>
          </div>
        </div>
      ))}
    </div>
    <div className="bg-white/[0.02] border border-white/5 p-10 rounded-sm h-80 flex items-center justify-center italic text-zinc-600 border-dashed">
      [ Performance Analytics Chart ]
    </div>
  </div>
);

export default Dashboard;