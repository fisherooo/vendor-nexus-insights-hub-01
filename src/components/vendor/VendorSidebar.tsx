
import { Package, BarChart3, Warehouse, Settings, Store, User, Tag } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface VendorSidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const menuItems = [
  {
    id: "products",
    title: "Products",
    icon: Package,
    description: "Manage your product catalog"
  },
  {
    id: "inventory",
    title: "Inventory",
    icon: Warehouse,
    description: "Track stock levels"
  },
  {
    id: "analytics",
    title: "Analytics & Sales",
    icon: BarChart3,
    description: "View performance metrics"
  },
  {
    id: "shop",
    title: "Shop Management",
    icon: Store,
    description: "Customize your store"
  },
  {
    id: "settings",
    title: "Settings",
    icon: Settings,
    description: "Account and team settings"
  }
];

export function VendorSidebar({ currentPage, onPageChange }: VendorSidebarProps) {
  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Store className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">VendorHub</h2>
            <p className="text-sm text-gray-600">Dashboard</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => onPageChange(item.id)}
                    isActive={currentPage === item.id}
                    className="w-full"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs text-gray-500 truncate">Vendor Admin</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
