import React from 'react';
import { MoreHorizontal } from "lucide-react";

const InventoryView = () => {
  const stock = [
    { name: "Cosmograph Daytona", sku: "LL-WAT-001", cat: "Watches", stock: 12, price: "Rs 1,599" },
    { name: "Heritage Gold Ring", sku: "LL-JWL-042", cat: "Jewelry", stock: 5, price: "Rs 850" },
  ];

  return (
    <div className="bg-white/[0.02] border border-white/5 overflow-hidden">
      <table className="w-full text-left">
        <thead className="border-b border-white/5 bg-white/[0.01]">
          <tr>
            {["Product", "SKU", "Category", "Stock", "Price", ""].map((h) => (
              <th key={h} className="px-8 py-5 text-[9px] tracking-[0.3em] uppercase text-zinc-500 font-bold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-xs tracking-wide">
          {stock.map((item, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
              <td className="px-8 py-6 text-white uppercase font-light">{item.name}</td>
              <td className="px-8 py-6 font-mono text-zinc-500">{item.sku}</td>
              <td className="px-8 py-6 text-zinc-500">{item.cat}</td>
              <td className={`px-8 py-6 ${item.stock < 10 ? "text-gold font-bold" : "text-zinc-500"}`}>{item.stock}</td>
              <td className="px-8 py-6 font-mono text-white">{item.price}</td>
              <td className="px-8 py-6 text-right cursor-pointer"><MoreHorizontal size={16} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryView;