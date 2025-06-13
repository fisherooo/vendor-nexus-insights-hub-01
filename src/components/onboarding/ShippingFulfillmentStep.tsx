
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, MapPin, Clock, Package, Globe } from "lucide-react";

interface ShippingFulfillmentStepProps {
  data: any;
  onDataUpdate: (data: any) => void;
}

const ShippingFulfillmentStep = ({ data, onDataUpdate }: ShippingFulfillmentStepProps) => {
  const [formData, setFormData] = useState({
    shippingOrigin: "",
    fulfillmentMethod: "",
    supportedCarriers: [],
    shippingFeeStructure: "",
    flatRateAmount: "",
    freeShippingThreshold: "",
    handlingTime: "",
    returnShippingPolicy: "",
    returnTimeWindow: "",
    trackingSupported: true,
    internationalShipping: false,
    internationalCountries: [],
    customsHandling: "",
    warehouseLocation: "",
    thirdPartyLogistics: "",
    ...data
  });

  useEffect(() => {
    onDataUpdate(formData);
  }, [formData, onDataUpdate]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleCarrier = (carrier: string) => {
    const currentCarriers = formData.supportedCarriers || [];
    const updatedCarriers = currentCarriers.includes(carrier)
      ? currentCarriers.filter((c: string) => c !== carrier)
      : [...currentCarriers, carrier];
    handleChange("supportedCarriers", updatedCarriers);
  };

  const toggleCountry = (country: string) => {
    const currentCountries = formData.internationalCountries || [];
    const updatedCountries = currentCountries.includes(country)
      ? currentCountries.filter((c: string) => c !== country)
      : [...currentCountries, country];
    handleChange("internationalCountries", updatedCountries);
  };

  const shippingCarriers = [
    "UPS", "FedEx", "USPS", "DHL", "Amazon Logistics", "OnTrac", "LaserShip", "Regional Carriers"
  ];

  const popularCountries = [
    "Canada", "United Kingdom", "Australia", "Germany", "France", "Japan", 
    "Mexico", "Brazil", "India", "China", "South Korea", "Italy", "Spain", "Netherlands"
  ];

  return (
    <div className="space-y-6">
      {/* Shipping Origin */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Shipping Origin</span>
          </CardTitle>
          <CardDescription>
            Specify where your products will be shipped from.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="shippingOrigin">Primary Shipping Location *</Label>
            <Input
              id="shippingOrigin"
              value={formData.shippingOrigin}
              onChange={(e) => handleChange("shippingOrigin", e.target.value)}
              placeholder="Enter full address including city, state, and ZIP code"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="warehouseLocation">Warehouse/Storage Location</Label>
            <Input
              id="warehouseLocation"
              value={formData.warehouseLocation}
              onChange={(e) => handleChange("warehouseLocation", e.target.value)}
              placeholder="If different from shipping origin"
            />
          </div>
        </CardContent>
      </Card>

      {/* Fulfillment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="w-5 h-5" />
            <span>Fulfillment Method</span>
          </CardTitle>
          <CardDescription>
            Choose how you will fulfill customer orders.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="fulfillmentMethod">Fulfillment Method *</Label>
            <Select value={formData.fulfillmentMethod} onValueChange={(value) => handleChange("fulfillmentMethod", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select fulfillment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="self-fulfillment">Self-Fulfillment (Ship from own location)</SelectItem>
                <SelectItem value="dropshipping">Dropshipping (Supplier ships directly)</SelectItem>
                <SelectItem value="third-party">Third-Party Logistics (3PL)</SelectItem>
                <SelectItem value="hybrid">Hybrid (Multiple methods)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {formData.fulfillmentMethod === "third-party" && (
            <div>
              <Label htmlFor="thirdPartyLogistics">3PL Provider Details</Label>
              <Input
                id="thirdPartyLogistics"
                value={formData.thirdPartyLogistics}
                onChange={(e) => handleChange("thirdPartyLogistics", e.target.value)}
                placeholder="Name and contact information of your 3PL provider"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Shipping Carriers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Truck className="w-5 h-5" />
            <span>Supported Shipping Carriers</span>
          </CardTitle>
          <CardDescription>
            Select the shipping carriers you work with or plan to use.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {shippingCarriers.map((carrier) => (
              <Button
                key={carrier}
                variant={formData.supportedCarriers?.includes(carrier) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleCarrier(carrier)}
                className="justify-start"
              >
                {carrier}
              </Button>
            ))}
          </div>
          {formData.supportedCarriers?.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Selected carriers:</p>
              <div className="flex flex-wrap gap-1">
                {formData.supportedCarriers.map((carrier: string) => (
                  <Badge key={carrier} variant="secondary">{carrier}</Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Shipping Fees */}
      <Card>
        <CardHeader>
          <CardTitle>Shipping Fee Structure</CardTitle>
          <CardDescription>
            Define how shipping costs will be calculated for customers.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="shippingFeeStructure">Fee Structure *</Label>
            <Select value={formData.shippingFeeStructure} onValueChange={(value) => handleChange("shippingFeeStructure", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select fee structure" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flat-rate">Flat Rate</SelectItem>
                <SelectItem value="calculated">Calculated by Weight/Distance</SelectItem>
                <SelectItem value="free">Free Shipping</SelectItem>
                <SelectItem value="free-threshold">Free Shipping Above Threshold</SelectItem>
                <SelectItem value="variable">Variable by Product</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {formData.shippingFeeStructure === "flat-rate" && (
            <div>
              <Label htmlFor="flatRateAmount">Flat Rate Amount ($)</Label>
              <Input
                id="flatRateAmount"
                type="number"
                step="0.01"
                value={formData.flatRateAmount}
                onChange={(e) => handleChange("flatRateAmount", e.target.value)}
                placeholder="0.00"
              />
            </div>
          )}
          
          {formData.shippingFeeStructure === "free-threshold" && (
            <div>
              <Label htmlFor="freeShippingThreshold">Free Shipping Threshold ($)</Label>
              <Input
                id="freeShippingThreshold"
                type="number"
                step="0.01"
                value={formData.freeShippingThreshold}
                onChange={(e) => handleChange("freeShippingThreshold", e.target.value)}
                placeholder="0.00"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Processing Time */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>Processing & Handling Time</span>
          </CardTitle>
          <CardDescription>
            Set expectations for order processing and shipping times.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="handlingTime">Handling Time *</Label>
            <Select value={formData.handlingTime} onValueChange={(value) => handleChange("handlingTime", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select handling time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="same-day">Same Day</SelectItem>
                <SelectItem value="1-business-day">1 Business Day</SelectItem>
                <SelectItem value="2-business-days">2 Business Days</SelectItem>
                <SelectItem value="3-business-days">3 Business Days</SelectItem>
                <SelectItem value="1-week">1 Week</SelectItem>
                <SelectItem value="2-weeks">2 Weeks</SelectItem>
                <SelectItem value="custom">Custom Timeline</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="trackingSupported"
              checked={formData.trackingSupported}
              onCheckedChange={(checked) => handleChange("trackingSupported", checked)}
            />
            <Label htmlFor="trackingSupported" className="text-sm">
              I can provide tracking numbers for shipments
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Return Shipping */}
      <Card>
        <CardHeader>
          <CardTitle>Return Shipping Policy</CardTitle>
          <CardDescription>
            Define your return shipping policies and procedures.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="returnShippingPolicy">Return Shipping Responsibility *</Label>
            <Select value={formData.returnShippingPolicy} onValueChange={(value) => handleChange("returnShippingPolicy", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Who pays for return shipping?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="customer-pays">Customer Pays Return Shipping</SelectItem>
                <SelectItem value="vendor-pays">Vendor Pays Return Shipping</SelectItem>
                <SelectItem value="vendor-pays-defective">Vendor Pays Only for Defective Items</SelectItem>
                <SelectItem value="shared">Shared Responsibility</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="returnTimeWindow">Return Time Window *</Label>
            <Select value={formData.returnTimeWindow} onValueChange={(value) => handleChange("returnTimeWindow", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Return period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7-days">7 Days</SelectItem>
                <SelectItem value="14-days">14 Days</SelectItem>
                <SelectItem value="30-days">30 Days</SelectItem>
                <SelectItem value="60-days">60 Days</SelectItem>
                <SelectItem value="90-days">90 Days</SelectItem>
                <SelectItem value="no-returns">No Returns Accepted</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* International Shipping */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>International Shipping</span>
          </CardTitle>
          <CardDescription>
            Configure international shipping options and restrictions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="internationalShipping"
              checked={formData.internationalShipping}
              onCheckedChange={(checked) => handleChange("internationalShipping", checked)}
            />
            <Label htmlFor="internationalShipping" className="text-sm">
              I offer international shipping
            </Label>
          </div>
          
          {formData.internationalShipping && (
            <>
              <div>
                <Label>Countries/Regions Served</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {popularCountries.map((country) => (
                    <Button
                      key={country}
                      variant={formData.internationalCountries?.includes(country) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleCountry(country)}
                      className="justify-start text-xs"
                    >
                      {country}
                    </Button>
                  ))}
                </div>
                {formData.internationalCountries?.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-1">Selected countries:</p>
                    <div className="flex flex-wrap gap-1">
                      {formData.internationalCountries.map((country: string) => (
                        <Badge key={country} variant="secondary" className="text-xs">{country}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <Label htmlFor="customsHandling">Customs and Duties Handling</Label>
                <Select value={formData.customsHandling} onValueChange={(value) => handleChange("customsHandling", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="How are customs handled?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer-responsible">Customer Responsible for All Duties</SelectItem>
                    <SelectItem value="vendor-handles">Vendor Handles Customs Documentation</SelectItem>
                    <SelectItem value="ddu">DDU (Delivered Duty Unpaid)</SelectItem>
                    <SelectItem value="ddp">DDP (Delivered Duty Paid)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ShippingFulfillmentStep;
