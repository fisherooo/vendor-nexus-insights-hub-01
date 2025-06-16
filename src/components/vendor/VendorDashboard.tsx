
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { VendorNavigation } from './VendorNavigation';
import { ProductsPage } from './pages/ProductsPage';
import { InventoryPage } from './pages/InventoryPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { RatingsPage } from './pages/RatingsPage';
import { ShopSettingsPage } from './pages/ShopSettingsPage';
import { TeamManagementPage } from './pages/TeamManagementPage';
import { SettingsPage } from './pages/SettingsPage';

export function VendorDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <VendorNavigation />
      <Routes>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/ratings" element={<RatingsPage />} />
        <Route path="/shop-settings" element={<ShopSettingsPage />} />
        <Route path="/team" element={<TeamManagementPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/" element={<ProductsPage />} />
      </Routes>
    </div>
  );
}
