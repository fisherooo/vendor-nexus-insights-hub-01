
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Package, BarChart3, Warehouse, Settings, Store, Bell } from "lucide-react";

interface VendorSidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function VendorSidebar({ currentPage, onPageChange }: VendorSidebarProps) {
  const menuItems = [
    { id: "products", label: "Products", icon: Package },
    { id: "inventory", label: "Inventory", icon: Warehouse },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "shop", label: "Shop Settings", icon: Store },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-6">
        <h2 className="text-lg font-semibold" style={{ color: '#00B14F' }}>
          Vendor Panel
        </h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                onClick={() => onPageChange(item.id)}
                isActive={currentPage === item.id}
                className={`w-full justify-start ${
                  currentPage === item.id 
                    ? 'bg-green-50 text-green-700 border-r-2 border-green-500' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.label}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
