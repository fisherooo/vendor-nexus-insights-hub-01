
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Package, Users, Star } from 'lucide-react';

export function AnalyticsPage() {
  const salesData = [
    { period: 'Today', sales: 1250, orders: 15, rate: '+12%' },
    { period: 'This Week', sales: 8750, orders: 89, rate: '+8%' },
    { period: 'This Month', sales: 35600, orders: 342, rate: '+15%' },
    { period: 'This Year', sales: 425000, orders: 4200, rate: '+22%' },
  ];

  const topProducts = [
    { name: 'Sample Product A', sales: 156, revenue: 4680 },
    { name: 'Sample Product B', sales: 143, revenue: 4290 },
    { name: 'Sample Product C', sales: 128, revenue: 3840 },
    { name: 'Sample Product D', sales: 95, revenue: 2850 },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Analytics & Reports</h1>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$425,000</div>
            <Badge className="mt-1" style={{ backgroundColor: '#00B14F', color: 'white' }}>
              +22% from last year
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,200</div>
            <Badge className="mt-1" style={{ backgroundColor: '#00B14F', color: 'white' }}>
              +18% from last year
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <Badge className="mt-1" style={{ backgroundColor: '#00B14F', color: 'white' }}>
              +25% from last year
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <Badge className="mt-1" style={{ backgroundColor: '#00B14F', color: 'white' }}>
              +0.3 from last month
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Sales Rate Table */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {salesData.map((data, index) => (
              <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">{data.period}</h3>
                  <p className="text-sm text-gray-600">{data.orders} orders</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">${data.sales.toLocaleString()}</p>
                  <Badge style={{ backgroundColor: '#00B14F', color: 'white' }}>
                    {data.rate}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.sales} units sold</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">${product.revenue.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
