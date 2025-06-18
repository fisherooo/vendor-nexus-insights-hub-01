
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, ArrowLeft } from "lucide-react";

interface VendorHeaderProps {
  onBack: () => void;
  onProfileClick?: () => void;
}

export function VendorHeader({ onBack, onProfileClick }: VendorHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Vendor Dashboard</h1>
            <p className="text-sm text-gray-600">Manage your store and products</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="relative">
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Badge 
              className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs"
              style={{ backgroundColor: '#00B14F' }}
            >
              3
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
}
