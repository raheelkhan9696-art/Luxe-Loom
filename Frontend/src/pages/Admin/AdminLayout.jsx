import React, { useState } from "react";
import Sidebar from "../Admin/Sidebar";
import AdminHeader from "../Admin/AdminHeader";
import DashboardView from "../Admin/Dashboard";
import InventoryView from "../Admin/Inventory";
import OrdersListView from "../Admin/OrderView"; // New: Table component
import OrdersView from "../Admin/OrderView";     // Detailed view
import NewEntryView from "../Admin/NewEntryView";
import ClientsView from "../Admin/ClientsView";
import SettingsView from "../Admin/Setting";
import { Menu, X } from "lucide-react";

const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Track selected order for detail view
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard": return <DashboardView />;
      case "Clients": return <ClientsView />;
      case "Inventory": return <InventoryView />;
      case "Orders": 
        // If an ID is selected, show the Detail View (OrdersView)
        // Otherwise, show the List View (OrdersListView)
        return selectedOrderId ? (
          <OrdersView 
            orderId={selectedOrderId} 
            onBack={() => setSelectedOrderId(null)} 
          />
        ) : (
          <OrdersListView onSelectOrder={(id) => setSelectedOrderId(id)} />
        );
      case "Settings": return <SettingsView />;
      case "New Entry": return <NewEntryView onBack={() => setActiveTab("Inventory")} />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 flex overflow-x-hidden">
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-6 right-6 z-[100] p-3 bg-white text-black rounded-sm"
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedOrderId(null); // Reset detail view when changing tabs
          setIsMobileMenuOpen(false);
        }} 
        isOpen={isMobileMenuOpen}
      />
      
      <main className={`flex-1 p-6 md:p-12 lg:ml-64 ${isMobileMenuOpen ? 'blur-sm' : ''}`}>
        <AdminHeader activeTab={activeTab} onAction={() => setActiveTab("New Entry")} />
        <div className="mt-8">{renderContent()}</div>
      </main>
    </div>
  );
};

export default AdminLayout;