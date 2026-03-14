import React, { useState } from "react";
import Sidebar from "../Admin/Sidebar";
import AdminHeader from "../Admin/AdminHeader";
import DashboardView from "../Admin/Dashboard";
import InventoryView from "../Admin/Inventory";
import OrdersView from "../Admin/OrderView";
import NewEntryView from "../Admin/NewEntryView";
import ClientsView from "../Admin/ClientsView";
import SettingsView from "../Admin/Setting";
import { Menu, X } from "lucide-react"; // For mobile toggle

const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard": return <DashboardView />;
      case "Clients": return <ClientsView />;
      case "Inventory": return <InventoryView />;
      case "Orders": return <OrdersView />;
      case "Settings": return <SettingsView />;
      case "New Entry": return <NewEntryView onBack={() => setActiveTab("Inventory")} />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 flex overflow-x-hidden">
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-6 right-6 z-[100] p-3 bg-white text-black rounded-sm shadow-xl shadow-yellow-400/10"
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar with mobile responsiveness */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setIsMobileMenuOpen(false); // Auto-close on selection
        }} 
        isOpen={isMobileMenuOpen}
      />
      
      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[40] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content: Adjusted margin/padding for mobile */}
      <main className={`flex-1 transition-all duration-300 p-6 md:p-12 ${isMobileMenuOpen ? 'blur-sm lg:blur-none' : ''} lg:ml-64`}>
        <AdminHeader 
          activeTab={activeTab} 
          onAction={() => setActiveTab("New Entry")} 
        />
        <div className="mt-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;