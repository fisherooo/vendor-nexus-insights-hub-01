
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { VendorSidebar } from "@/components/vendor/VendorSidebar";
import { ProductsPage } from "@/components/vendor/pages/ProductsPage";
import { AnalyticsPage } from "@/components/vendor/pages/AnalyticsPage";
import { InventoryPage } from "@/components/vendor/pages/InventoryPage";
import { SettingsPage } from "@/components/vendor/pages/SettingsPage";
import { ShopManagementPage } from "@/components/vendor/pages/ShopManagementPage";
import { NotificationsPage } from "@/components/vendor/pages/NotificationsPage";
import { ProfilePage } from "@/components/vendor/pages/ProfilePage";

interface VendorDashboardProps {
  onBack: () => void;
}

const VendorDashboard = ({ onBack }: VendorDashboardProps) => {
  const [currentPage, setCurrentPage] = useState("products");

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "products":
        return <ProductsPage />;
      case "analytics":
        return <AnalyticsPage />;
      case "inventory":
        return <InventoryPage />;
      case "shop":
        return <ShopManagementPage />;
      case "notifications":
        return <NotificationsPage />;
      case "profile":
        return <ProfilePage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <ProductsPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <VendorSidebar currentPage={currentPage} onPageChange={setCurrentPage} />
          <div className="flex-1 flex flex-col">
            <main className="flex-1 p-6 bg-white/30 backdrop-blur-sm">
              <div className="max-w-7xl mx-auto">
                {renderCurrentPage()}
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default VendorDashboard;
