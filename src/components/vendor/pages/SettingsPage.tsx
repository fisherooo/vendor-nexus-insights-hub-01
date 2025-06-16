
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Bell, User, DollarSign } from 'lucide-react';

export function SettingsPage() {
  const [notifications, setNotifications] = useState({
    orderAlerts: true,
    inventoryAlerts: true,
    reviewAlerts: true,
    emailMarketing: false
  });

  const [profile, setProfile] = useState({
    businessName: 'My Business',
    contactEmail: 'contact@mybusiness.com',
    phone: '+1-234-567-8900',
    address: '123 Business St, City, State 12345'
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4" />
            <span>Billing</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Advanced</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Business Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={profile.businessName}
                  onChange={(e) => setProfile({ ...profile, businessName: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={profile.contactEmail}
                  onChange={(e) => setProfile({ ...profile, contactEmail: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="address">Business Address</Label>
                <Input
                  id="address"
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                />
              </div>
              <Button style={{ backgroundColor: '#00B14F' }} className="text-white">
                Save Profile
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Order Alerts</h3>
                  <p className="text-sm text-gray-600">Get notified when you receive new orders</p>
                </div>
                <Switch
                  checked={notifications.orderAlerts}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, orderAlerts: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Inventory Alerts</h3>
                  <p className="text-sm text-gray-600">Get notified when stock is running low</p>
                </div>
                <Switch
                  checked={notifications.inventoryAlerts}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, inventoryAlerts: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Review Alerts</h3>
                  <p className="text-sm text-gray-600">Get notified when you receive new reviews</p>
                </div>
                <Switch
                  checked={notifications.reviewAlerts}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, reviewAlerts: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Marketing Emails</h3>
                  <p className="text-sm text-gray-600">Receive marketing tips and updates</p>
                </div>
                <Switch
                  checked={notifications.emailMarketing}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, emailMarketing: checked })}
                />
              </div>
              <Button style={{ backgroundColor: '#00B14F' }} className="text-white">
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium">Current Plan: Professional</h3>
                <p className="text-sm text-gray-600">$29.99/month</p>
                <p className="text-sm text-gray-600">Next billing: February 15, 2024</p>
              </div>
              <div className="space-y-4">
                <div>
                  <Label>Payment Method</Label>
                  <div className="p-3 border rounded-lg flex justify-between items-center">
                    <span>**** **** **** 1234</span>
                    <Button variant="outline" size="sm">Update</Button>
                  </div>
                </div>
              </div>
              <Button style={{ backgroundColor: '#00B14F' }} className="text-white">
                Manage Billing
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>API Access</Label>
                <div className="p-3 border rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">API Key (click to reveal)</p>
                  <div className="flex space-x-2">
                    <Input value="sk_live_••••••••••••••••" readOnly />
                    <Button variant="outline" size="sm">Regenerate</Button>
                  </div>
                </div>
              </div>
              <div>
                <Label>Data Export</Label>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full">Export Product Data</Button>
                  <Button variant="outline" className="w-full">Export Order History</Button>
                  <Button variant="outline" className="w-full">Export Customer Data</Button>
                </div>
              </div>
              <div className="border-t pt-4">
                <h3 className="font-medium text-red-600 mb-2">Danger Zone</h3>
                <Button variant="destructive" className="w-full">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
