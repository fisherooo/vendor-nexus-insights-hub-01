
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter } from "@/components/ui/sidebar";
import { Package, BarChart3, Warehouse, Store, Bell, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

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
  ];

  return (
    <Sidebar className="border-r border-gray-200 bg-white/80 backdrop-blur-sm">
      <SidebarHeader className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
            <Store className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">VendorHub</h2>
            <p className="text-xs text-gray-500">Dashboard</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-4 py-6">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                onClick={() => onPageChange(item.id)}
                isActive={currentPage === item.id}
                className={`w-full justify-start mb-2 h-12 rounded-lg transition-all duration-200 ${
                  currentPage === item.id 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg transform scale-105' 
                    : 'text-gray-700 hover:bg-gray-100 hover:shadow-md'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-gray-100">
        <Button 
          variant="ghost" 
          className="w-full justify-start p-4 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => onPageChange("profile")}
        >
          <Avatar className="w-10 h-10 mr-3">
            <AvatarFallback className="text-sm bg-gradient-to-br from-blue-500 to-purple-600 text-white">JD</AvatarFallback>
          </Avatar>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-900">John Doe</p>
            <p className="text-xs text-gray-500">Store Owner</p>
          </div>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
