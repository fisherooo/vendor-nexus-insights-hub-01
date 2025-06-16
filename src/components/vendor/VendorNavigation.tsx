
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Package, 
  Settings, 
  Users, 
  Star, 
  DollarSign, 
  Box,
  Image
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  {
    name: 'Products',
    href: '/vendor/products',
    icon: Package,
  },
  {
    name: 'Inventory',
    href: '/vendor/inventory',
    icon: Box,
  },
  {
    name: 'Analytics',
    href: '/vendor/analytics',
    icon: DollarSign,
  },
  {
    name: 'Ratings',
    href: '/vendor/ratings',
    icon: Star,
  },
  {
    name: 'Shop Settings',
    href: '/vendor/shop-settings',
    icon: Image,
  },
  {
    name: 'Team Management',
    href: '/vendor/team',
    icon: Users,
  },
  {
    name: 'Settings',
    href: '/vendor/settings',
    icon: Settings,
  },
];

export function VendorNavigation() {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold" style={{ color: '#00B14F' }}>
                Vendor Dashboard
              </h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
                      isActive
                        ? 'border-current text-gray-900'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    )}
                    style={isActive ? { borderColor: '#00B14F', color: '#00B14F' } : {}}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
