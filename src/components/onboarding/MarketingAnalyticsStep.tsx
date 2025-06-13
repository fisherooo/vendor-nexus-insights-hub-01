
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Mail, Bell, BarChart, Target, Eye } from "lucide-react";

interface MarketingAnalyticsStepProps {
  data: any;
  onDataUpdate: (data: any) => void;
}

const MarketingAnalyticsStep = ({ data, onDataUpdate }: MarketingAnalyticsStepProps) => {
  const [formData, setFormData] = useState({
    marketingPermissions: [],
    emailCampaignConsent: false,
    promotionalConsent: false,
    dataSharing: [],
    analyticsAccess: [],
    customTrackingPixels: false,
    trackingPixelUrl: "",
    googleAnalyticsId: "",
    facebookPixelId: "",
    marketingBudget: "",
    promotionalPreferences: [],
    newsletterFrequency: "",
    performanceReporting: [],
    ...data
  });

  useEffect(() => {
    onDataUpdate(formData);
  }, [formData, onDataUpdate]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const togglePermission = (permission: string, field: string) => {
    const current = formData[field] || [];
    const updated = current.includes(permission)
      ? current.filter((p: string) => p !== permission)
      : [...current, permission];
    handleChange(field, updated);
  };

  const marketingPermissions = [
    "Platform email campaigns",
    "Featured product promotions",
    "Social media marketing",
    "Influencer collaborations",
    "Seasonal campaigns",
    "Cross-vendor promotions"
  ];

  const dataSharingOptions = [
    "Anonymous sales analytics",
    "Customer demographic data",
    "Product performance metrics",
    "Marketing campaign results",
    "Competitive intelligence",
    "Market research participation"
  ];

  const analyticsAccessOptions = [
    "Real-time sales dashboard",
    "Customer behavior analytics",
    "Product performance reports",
    "Revenue forecasting",
    "Market trend analysis",
    "Conversion rate optimization"
  ];

  const promotionalPreferences = [
    "Flash sales",
    "Holiday promotions",
    "Volume discounts",
    "Bundle offers",
    "Loyalty program integration",
    "Referral campaigns"
  ];

  const performanceReportingOptions = [
    "Daily sales reports",
    "Weekly performance summaries",
    "Monthly analytics digest",
    "Quarterly business reviews",
    "Custom report builder",
    "API access for data export"
  ];

  return (
    <div className="space-y-6">
      {/* Marketing Permissions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>Marketing Permissions</span>
          </CardTitle>
          <CardDescription>
            Grant permission for the platform to promote your products through various marketing channels.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {marketingPermissions.map((permission) => (
              <div key={permission} className="flex items-center space-x-2">
                <Checkbox
                  id={permission}
                  checked={formData.marketingPermissions?.includes(permission)}
                  onCheckedChange={() => togglePermission(permission, "marketingPermissions")}
                />
                <Label htmlFor={permission} className="text-sm">
                  {permission}
                </Label>
              </div>
            ))}
          </div>

          {formData.marketingPermissions?.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Approved marketing channels:</p>
              <div className="flex flex-wrap gap-1">
                {formData.marketingPermissions.map((permission: string) => (
                  <Badge key={permission} variant="secondary" className="text-xs">{permission}</Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Email and Communication Consent */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="w-5 h-5" />
            <span>Email & Communication Consent</span>
          </CardTitle>
          <CardDescription>
            Configure your preferences for email campaigns and promotional communications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="emailCampaignConsent"
                checked={formData.emailCampaignConsent}
                onCheckedChange={(checked) => handleChange("emailCampaignConsent", checked)}
              />
              <Label htmlFor="emailCampaignConsent" className="text-sm">
                Include my products in platform email campaigns to customers
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="promotionalConsent"
                checked={formData.promotionalConsent}
                onCheckedChange={(checked) => handleChange("promotionalConsent", checked)}
              />
              <Label htmlFor="promotionalConsent" className="text-sm">
                Send me promotional opportunities and partnership offers
              </Label>
            </div>
          </div>

          <div>
            <Label htmlFor="newsletterFrequency">Newsletter Frequency Preference</Label>
            <Select value={formData.newsletterFrequency} onValueChange={(value) => handleChange("newsletterFrequency", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily updates</SelectItem>
                <SelectItem value="weekly">Weekly digest</SelectItem>
                <SelectItem value="monthly">Monthly summary</SelectItem>
                <SelectItem value="quarterly">Quarterly reports only</SelectItem>
                <SelectItem value="none">No newsletters</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Data Sharing Consent */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart className="w-5 h-5" />
            <span>Data Sharing Consent</span>
          </CardTitle>
          <CardDescription>
            Choose what data you're comfortable sharing for analytics and market research.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {dataSharingOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={option}
                  checked={formData.dataSharing?.includes(option)}
                  onCheckedChange={() => togglePermission(option, "dataSharing")}
                />
                <Label htmlFor={option} className="text-sm">
                  {option}
                </Label>
              </div>
            ))}
          </div>

          {formData.dataSharing?.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Approved data sharing:</p>
              <div className="flex flex-wrap gap-1">
                {formData.dataSharing.map((option: string) => (
                  <Badge key={option} variant="secondary" className="text-xs">{option}</Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analytics Access */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Analytics Access Preferences</span>
          </CardTitle>
          <CardDescription>
            Select the analytics and reporting features you'd like access to.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analyticsAccessOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={option}
                  checked={formData.analyticsAccess?.includes(option)}
                  onCheckedChange={() => togglePermission(option, "analyticsAccess")}
                />
                <Label htmlFor={option} className="text-sm">
                  {option}
                </Label>
              </div>
            ))}
          </div>

          {formData.analyticsAccess?.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Selected analytics features:</p>
              <div className="flex flex-wrap gap-1">
                {formData.analyticsAccess.map((option: string) => (
                  <Badge key={option} variant="secondary" className="text-xs">{option}</Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Custom Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="w-5 h-5" />
            <span>Custom Tracking & Pixels</span>
          </CardTitle>
          <CardDescription>
            Configure your own tracking pixels and analytics tools.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="customTrackingPixels"
              checked={formData.customTrackingPixels}
              onCheckedChange={(checked) => handleChange("customTrackingPixels", checked)}
            />
            <Label htmlFor="customTrackingPixels" className="text-sm">
              I want to integrate my own tracking pixels
            </Label>
          </div>

          {formData.customTrackingPixels && (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                <Input
                  id="googleAnalyticsId"
                  value={formData.googleAnalyticsId}
                  onChange={(e) => handleChange("googleAnalyticsId", e.target.value)}
                  placeholder="GA-XXXXXXXXX-X"
                />
              </div>
              <div>
                <Label htmlFor="facebookPixelId">Facebook Pixel ID</Label>
                <Input
                  id="facebookPixelId"
                  value={formData.facebookPixelId}
                  onChange={(e) => handleChange("facebookPixelId", e.target.value)}
                  placeholder="Enter Facebook Pixel ID"
                />
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="trackingPixelUrl">Custom Tracking Pixel URL</Label>
            <Input
              id="trackingPixelUrl"
              value={formData.trackingPixelUrl}
              onChange={(e) => handleChange("trackingPixelUrl", e.target.value)}
              placeholder="https://your-tracking-domain.com/pixel"
            />
          </div>
        </CardContent>
      </Card>

      {/* Promotional Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Promotional Campaign Preferences</CardTitle>
          <CardDescription>
            Select the types of promotional campaigns you're interested in participating in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {promotionalPreferences.map((preference) => (
              <div key={preference} className="flex items-center space-x-2">
                <Checkbox
                  id={preference}
                  checked={formData.promotionalPreferences?.includes(preference)}
                  onCheckedChange={() => togglePermission(preference, "promotionalPreferences")}
                />
                <Label htmlFor={preference} className="text-sm">
                  {preference}
                </Label>
              </div>
            ))}
          </div>

          {formData.promotionalPreferences?.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Selected promotional types:</p>
              <div className="flex flex-wrap gap-1">
                {formData.promotionalPreferences.map((preference: string) => (
                  <Badge key={preference} variant="secondary" className="text-xs">{preference}</Badge>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4">
            <Label htmlFor="marketingBudget">Monthly Marketing Budget (Optional)</Label>
            <Select value={formData.marketingBudget} onValueChange={(value) => handleChange("marketingBudget", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-100">$0 - $100</SelectItem>
                <SelectItem value="100-500">$100 - $500</SelectItem>
                <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                <SelectItem value="5000+">$5,000+</SelectItem>
                <SelectItem value="no-budget">No additional budget</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Performance Reporting */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>Performance Reporting</span>
          </CardTitle>
          <CardDescription>
            Choose how you'd like to receive performance reports and notifications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {performanceReportingOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={option}
                  checked={formData.performanceReporting?.includes(option)}
                  onCheckedChange={() => togglePermission(option, "performanceReporting")}
                />
                <Label htmlFor={option} className="text-sm">
                  {option}
                </Label>
              </div>
            ))}
          </div>

          {formData.performanceReporting?.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Selected reporting options:</p>
              <div className="flex flex-wrap gap-1">
                {formData.performanceReporting.map((option: string) => (
                  <Badge key={option} variant="secondary" className="text-xs">{option}</Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketingAnalyticsStep;
