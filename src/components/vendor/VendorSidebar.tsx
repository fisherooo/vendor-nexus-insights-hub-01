
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Package, BarChart3, Warehouse, Settings, Store, Bell, User } from "lucide-react";

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
    { id: "profile", label: "Profile & Team", icon: User },
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
                    ? 'text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                style={currentPage === item.id ? { backgroundColor: '#00B14F' } : {}}
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
