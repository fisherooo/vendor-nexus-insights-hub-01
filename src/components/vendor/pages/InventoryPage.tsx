
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Package, TrendingDown, TrendingUp, Plus, Minus } from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  reorderPoint: number;
  category: string;
  lastRestocked: string;
  status: "in_stock" | "low_stock" | "out_of_stock" | "overstocked";
}

export function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: "1",
      name: "Wireless Headphones",
      sku: "WH-001",
      currentStock: 45,
      minStock: 10,
      maxStock: 100,
      reorderPoint: 15,
      category: "Electronics",
      lastRestocked: "2024-01-15",
      status: "in_stock"
    },
    {
      id: "2",
      name: "Smart Watch",
      sku: "SW-002",
      currentStock: 5,
      minStock: 10,
      maxStock: 50,
      reorderPoint: 15,
      category: "Electronics",
      lastRestocked: "2024-01-10",
      status: "low_stock"
    },
    {
      id: "3",
      name: "Bluetooth Speaker",
      sku: "BS-003",
      currentStock: 0,
      minStock: 5,
      maxStock: 25,
      reorderPoint: 8,
      category: "Electronics",
      lastRestocked: "2024-01-05",
      status: "out_of_stock"
    }
  ]);

  const updateStock = (id: string, change: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        const newStock = Math.max(0, item.currentStock + change);
        let status: InventoryItem["status"] = "in_stock";
        
        if (newStock === 0) status = "out_of_stock";
        else if (newStock <= item.minStock) status = "low_stock";
        else if (newStock >= item.maxStock) status = "overstocked";
        
        return { ...item, currentStock: newStock, status };
      }
      return item;
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_stock": return "bg-green-100 text-green-800";
      case "low_stock": return "bg-yellow-100 text-yellow-800";
      case "out_of_stock": return "bg-red-100 text-red-800";
      case "overstocked": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "low_stock":
      case "out_of_stock":
        return <AlertTriangle className="w-4 h-4" />;
      case "overstocked":
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const totalItems = inventory.reduce((sum, item) => sum + item.currentStock, 0);
  const lowStockItems = inventory.filter(item => item.status === "low_stock" || item.status === "out_of_stock").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
        <p className="text-gray-600 mt-1">Track and manage your product stock levels</p>
      </div>

      {/* Inventory Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-2xl font-bold">{totalItems}</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Products</p>
                <p className="text-2xl font-bold">{inventory.length}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Package className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Low Stock Alerts</p>
                <p className="text-2xl font-bold">{lowStockItems}</p>
              </div>
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold">{inventory.filter(item => item.status === "out_of_stock").length}</p>
              </div>
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-4 h-4 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory List */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
          <CardDescription>Manage stock levels for all your products</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inventory.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    {getStatusIcon(item.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                      <span>SKU: {item.sku}</span>
                      <span>Category: {item.category}</span>
                      <span>Min: {item.minStock}</span>
                      <span>Max: {item.maxStock}</span>
                      <span>Reorder at: {item.reorderPoint}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{item.currentStock}</p>
                    <p className="text-xs text-gray-500">Current Stock</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateStock(item.id, -1)}
                      disabled={item.currentStock === 0}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateStock(item.id, 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="w-24">
                    <Input
                      type="number"
                      placeholder="Add stock"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          const value = parseInt((e.target as HTMLInputElement).value);
                          if (value > 0) {
                            updateStock(item.id, value);
                            (e.target as HTMLInputElement).value = "";
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
