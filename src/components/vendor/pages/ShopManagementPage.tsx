
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Upload, Store, Percent, Palette } from "lucide-react";
import { DiscountCodeForm } from "@/components/vendor/forms/DiscountCodeForm";

export function ShopManagementPage() {
  const [shopData, setShopData] = useState({
    name: "TechHub Electronics",
    description: "Your one-stop shop for the latest electronics and gadgets",
    logo: "shop_logo.jpg",
    banner: "shop_banner.jpg",
    theme: "green",
    discountEnabled: true,
    defaultDiscount: 10,
    welcomeMessage: "Welcome to our store! Enjoy free shipping on orders over $50.",
    returnPolicy: "30-day return policy on all items",
    shippingInfo: "Free shipping on orders over $50. Standard delivery 3-5 business days."
  });

  const [discounts, setDiscounts] = useState([
    {
      id: "1",
      name: "Welcome Discount",
      code: "WELCOME10",
      percentage: 10,
      minOrder: 0,
      maxUses: 100,
      currentUses: 45,
      active: true,
      expiryDate: "2024-12-31"
    },
    {
      id: "2",
      name: "Summer Sale",
      code: "SUMMER20",
      percentage: 20,
      minOrder: 100,
      maxUses: 500,
      currentUses: 234,
      active: true,
      expiryDate: "2024-08-31"
    }
  ]);

  const [showDiscountForm, setShowDiscountForm] = useState(false);

  const handleShopUpdate = (field: string, value: any) => {
    setShopData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string) => {
    // Simulate file upload
    const fileName = `${field}_${Date.now()}.jpg`;
    handleShopUpdate(field, fileName);
  };

  const toggleDiscount = (id: string) => {
    setDiscounts(prev => prev.map(discount => 
      discount.id === id ? { ...discount, active: !discount.active } : discount
    ));
  };

  const addNewDiscount = (newDiscount: any) => {
    setDiscounts(prev => [...prev, newDiscount]);
    setShowDiscountForm(false);
  };

  const themeColors = [
    { name: "Green", value: "green", color: "#00B14F" },
    { name: "Blue", value: "blue", color: "#3B82F6" },
    { name: "Purple", value: "purple", color: "#8B5CF6" },
    { name: "Red", value: "red", color: "#EF4444" }
  ];

  if (showDiscountForm) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shop Management</h1>
          <p className="text-gray-600 mt-1">Create a new discount code</p>
        </div>
        <DiscountCodeForm 
          onSubmit={addNewDiscount}
          onCancel={() => setShowDiscountForm(false)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Shop Management</h1>
        <p className="text-gray-600 mt-1">Customize your store appearance and settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Shop Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Store className="w-5 h-5" />
              <span>Shop Information</span>
            </CardTitle>
            <CardDescription>Update your store details and branding</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="shopName">Shop Name</Label>
              <Input
                id="shopName"
                value={shopData.name}
                onChange={(e) => handleShopUpdate("name", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="shopDescription">Shop Description</Label>
              <Textarea
                id="shopDescription"
                value={shopData.description}
                onChange={(e) => handleShopUpdate("description", e.target.value)}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="welcomeMessage">Welcome Message</Label>
              <Textarea
                id="welcomeMessage"
                value={shopData.welcomeMessage}
                onChange={(e) => handleShopUpdate("welcomeMessage", e.target.value)}
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Shop Logo</Label>
                <div className="mt-2">
                  <Button variant="outline" onClick={() => handleFileUpload("logo")} className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Logo
                  </Button>
                  {shopData.logo && (
                    <p className="text-sm text-gray-600 mt-1">Current: {shopData.logo}</p>
                  )}
                </div>
              </div>

              <div>
                <Label>Shop Banner</Label>
                <div className="mt-2">
                  <Button variant="outline" onClick={() => handleFileUpload("banner")} className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Banner
                  </Button>
                  {shopData.banner && (
                    <p className="text-sm text-gray-600 mt-1">Current: {shopData.banner}</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Theme Customization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="w-5 h-5" />
              <span>Theme & Appearance</span>
            </CardTitle>
            <CardDescription>Customize your store's visual appearance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Color Theme</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {themeColors.map((theme) => (
                  <Button
                    key={theme.value}
                    variant={shopData.theme === theme.value ? "default" : "outline"}
                    onClick={() => handleShopUpdate("theme", theme.value)}
                    className="justify-start"
                  >
                    <div
                      className="w-4 h-4 rounded-full mr-2"
                      style={{ backgroundColor: theme.color }}
                    />
                    {theme.name}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="returnPolicy">Return Policy</Label>
              <Textarea
                id="returnPolicy"
                value={shopData.returnPolicy}
                onChange={(e) => handleShopUpdate("returnPolicy", e.target.value)}
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="shippingInfo">Shipping Information</Label>
              <Textarea
                id="shippingInfo"
                value={shopData.shippingInfo}
                onChange={(e) => handleShopUpdate("shippingInfo", e.target.value)}
                rows={2}
              />
            </div>

            <Button className="w-full">Save Shop Settings</Button>
          </CardContent>
        </Card>
      </div>

      {/* Discount Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Percent className="w-5 h-5" />
            <span>Discount Management</span>
          </CardTitle>
          <CardDescription>Manage your store discounts and promotional codes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <Label htmlFor="defaultDiscount">Default Discount Rate (%)</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Switch
                  id="discountEnabled"
                  checked={shopData.discountEnabled}
                  onCheckedChange={(checked) => handleShopUpdate("discountEnabled", checked)}
                />
                <Input
                  type="number"
                  value={shopData.defaultDiscount}
                  onChange={(e) => handleShopUpdate("defaultDiscount", parseInt(e.target.value))}
                  className="w-20"
                  disabled={!shopData.discountEnabled}
                />
                <span className="text-sm text-gray-600">%</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Active Discount Codes</h4>
              <Button size="sm" onClick={() => setShowDiscountForm(true)}>Add New Code</Button>
            </div>

            {discounts.map((discount) => (
              <div key={discount.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium">{discount.name}</h4>
                    <Badge variant="outline" className="font-mono">{discount.code}</Badge>
                    <Badge variant={discount.active ? "default" : "secondary"}>
                      {discount.active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                    <span>{discount.percentage}% off</span>
                    <span>Min order: ${discount.minOrder}</span>
                    <span>Used: {discount.currentUses}/{discount.maxUses}</span>
                    <span>Expires: {discount.expiryDate}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={discount.active}
                    onCheckedChange={() => toggleDiscount(discount.id)}
                  />
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
