
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Image, Settings } from 'lucide-react';

export function ShopSettingsPage() {
  const [shopSettings, setShopSettings] = useState({
    shopName: 'My Awesome Shop',
    description: 'We sell amazing products with great quality and service.',
    bannerImage: '/placeholder.svg',
    logoImage: '/placeholder.svg',
    discountRate: 10,
    shippingFee: 5.99,
    freeShippingThreshold: 50
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Shop settings saved:', shopSettings);
    // Here you would typically save to your backend
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Shop Settings</h1>
      
      <form onSubmit={handleSave} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Basic Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="shopName">Shop Name</Label>
              <Input
                id="shopName"
                value={shopSettings.shopName}
                onChange={(e) => setShopSettings({ ...shopSettings, shopName: e.target.value })}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="description">Shop Description</Label>
              <Textarea
                id="description"
                value={shopSettings.description}
                onChange={(e) => setShopSettings({ ...shopSettings, description: e.target.value })}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Visual Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Image className="w-5 h-5" />
              <span>Visual Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="bannerImage">Banner Image URL</Label>
              <Input
                id="bannerImage"
                type="url"
                value={shopSettings.bannerImage}
                onChange={(e) => setShopSettings({ ...shopSettings, bannerImage: e.target.value })}
                placeholder="https://example.com/banner.jpg"
              />
              {shopSettings.bannerImage && (
                <div className="mt-2">
                  <img
                    src={shopSettings.bannerImage}
                    alt="Banner Preview"
                    className="w-full h-32 object-cover rounded-md border"
                  />
                </div>
              )}
            </div>
            
            <div>
              <Label htmlFor="logoImage">Logo Image URL</Label>
              <Input
                id="logoImage"
                type="url"
                value={shopSettings.logoImage}
                onChange={(e) => setShopSettings({ ...shopSettings, logoImage: e.target.value })}
                placeholder="https://example.com/logo.jpg"
              />
              {shopSettings.logoImage && (
                <div className="mt-2">
                  <img
                    src={shopSettings.logoImage}
                    alt="Logo Preview"
                    className="w-20 h-20 object-cover rounded-md border"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Discounts */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing & Discounts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="discountRate">Default Discount Rate (%)</Label>
              <Input
                id="discountRate"
                type="number"
                min="0"
                max="100"
                value={shopSettings.discountRate}
                onChange={(e) => setShopSettings({ ...shopSettings, discountRate: parseInt(e.target.value) || 0 })}
              />
              <p className="text-sm text-gray-600 mt-1">
                This will be applied to new products by default
              </p>
            </div>
            
            <div>
              <Label htmlFor="shippingFee">Standard Shipping Fee ($)</Label>
              <Input
                id="shippingFee"
                type="number"
                step="0.01"
                min="0"
                value={shopSettings.shippingFee}
                onChange={(e) => setShopSettings({ ...shopSettings, shippingFee: parseFloat(e.target.value) || 0 })}
              />
            </div>
            
            <div>
              <Label htmlFor="freeShippingThreshold">Free Shipping Threshold ($)</Label>
              <Input
                id="freeShippingThreshold"
                type="number"
                step="0.01"
                min="0"
                value={shopSettings.freeShippingThreshold}
                onChange={(e) => setShopSettings({ ...shopSettings, freeShippingThreshold: parseFloat(e.target.value) || 0 })}
              />
              <p className="text-sm text-gray-600 mt-1">
                Orders above this amount get free shipping
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Current Settings Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Current Settings Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">Shop Name:</span>
              <span>{shopSettings.shopName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Default Discount:</span>
              <Badge style={{ backgroundColor: '#00B14F', color: 'white' }}>
                {shopSettings.discountRate}% OFF
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Shipping Fee:</span>
              <span>${shopSettings.shippingFee}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Free Shipping Above:</span>
              <span>${shopSettings.freeShippingThreshold}</span>
            </div>
          </CardContent>
        </Card>

        <Button 
          type="submit" 
          className="w-full" 
          style={{ backgroundColor: '#00B14F' }}
        >
          Save Shop Settings
        </Button>
      </form>
    </div>
  );
}
