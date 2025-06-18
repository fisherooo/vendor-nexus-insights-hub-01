
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter } from "@/components/ui/sidebar";
import { Package, BarChart3, Warehouse, Settings, Store, Bell } from "lucide-react";
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
                    ? 'bg-green-100 text-green-700 border-r-2 border-green-500' 
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
      <SidebarFooter className="p-4 border-t border-gray-200">
        <Button 
          variant="ghost" 
          className="w-full justify-start p-3"
          onClick={() => onPageChange("profile")}
        >
          <Avatar className="w-8 h-8 mr-3">
            <AvatarFallback className="text-sm">JD</AvatarFallback>
          </Avatar>
          <div className="text-left">
            <p className="text-sm font-medium text-gray-900">John Doe</p>
            <p className="text-xs text-gray-600">Store Owner</p>
          </div>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
