
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Package, ArrowUp, ArrowDown } from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  lastUpdated: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

export function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: '1',
      name: 'Sample Product',
      currentStock: 150,
      minStock: 50,
      maxStock: 500,
      lastUpdated: '2024-01-15',
      status: 'in_stock'
    },
    {
      id: '2',
      name: 'Low Stock Item',
      currentStock: 25,
      minStock: 50,
      maxStock: 300,
      lastUpdated: '2024-01-14',
      status: 'low_stock'
    }
  ]);

  const [stockUpdates, setStockUpdates] = useState<Record<string, string>>({});

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock': return '#00B14F';
      case 'low_stock': return '#FFA500';
      case 'out_of_stock': return '#FF0000';
      default: return '#6B7280';
    }
  };

  const updateStock = (id: string, adjustment: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        const newStock = Math.max(0, item.currentStock + adjustment);
        let newStatus: 'in_stock' | 'low_stock' | 'out_of_stock' = 'in_stock';
        
        if (newStock === 0) newStatus = 'out_of_stock';
        else if (newStock <= item.minStock) newStatus = 'low_stock';
        
        return {
          ...item,
          currentStock: newStock,
          status: newStatus,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return item;
    }));
  };

  const setStock = (id: string, newStock: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        let newStatus: 'in_stock' | 'low_stock' | 'out_of_stock' = 'in_stock';
        
        if (newStock === 0) newStatus = 'out_of_stock';
        else if (newStock <= item.minStock) newStatus = 'low_stock';
        
        return {
          ...item,
          currentStock: newStock,
          status: newStatus,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return item;
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Inventory Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inventory.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{item.name}</span>
                <Badge 
                  variant="secondary" 
                  style={{ backgroundColor: getStatusColor(item.status), color: 'white' }}
                >
                  {item.status.replace('_', ' ').toUpperCase()}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Current Stock:</span>
                  <span className="font-semibold">{item.currentStock}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Min Stock:</span>
                  <span>{item.minStock}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Max Stock:</span>
                  <span>{item.maxStock}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Last Updated:</span>
                  <span>{item.lastUpdated}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateStock(item.id, -1)}
                    className="flex-1"
                  >
                    <ArrowDown className="w-4 h-4 mr-1" />
                    -1
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateStock(item.id, 1)}
                    className="flex-1"
                  >
                    <ArrowUp className="w-4 h-4 mr-1" />
                    +1
                  </Button>
                </div>
                
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="Set stock"
                    value={stockUpdates[item.id] || ''}
                    onChange={(e) => setStockUpdates(prev => ({
                      ...prev,
                      [item.id]: e.target.value
                    }))}
                    className="flex-1"
                  />
                  <Button
                    size="sm"
                    onClick={() => {
                      const newStock = parseInt(stockUpdates[item.id] || '0');
                      if (!isNaN(newStock)) {
                        setStock(item.id, newStock);
                        setStockUpdates(prev => ({ ...prev, [item.id]: '' }));
                      }
                    }}
                    style={{ backgroundColor: '#00B14F' }}
                    className="text-white"
                  >
                    Set
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
