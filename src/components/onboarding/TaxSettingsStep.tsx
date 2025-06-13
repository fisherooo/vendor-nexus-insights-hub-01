
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, Calculator, Globe, Receipt } from "lucide-react";

interface TaxSettingsStepProps {
  data: any;
  onDataUpdate: (data: any) => void;
}

const TaxSettingsStep = ({ data, onDataUpdate }: TaxSettingsStepProps) => {
  const [formData, setFormData] = useState({
    taxCollectionResponsible: "",
    taxJurisdictions: [],
    vatRegistered: false,
    vatNumber: "",
    gstNumber: "",
    salesTaxLicense: "",
    exemptProducts: [],
    automaticCalculation: true,
    taxInclusivePricing: false,
    ...data
  });

  useEffect(() => {
    onDataUpdate(formData);
  }, [formData, onDataUpdate]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleJurisdiction = (jurisdiction: string) => {
    const current = formData.taxJurisdictions || [];
    const updated = current.includes(jurisdiction)
      ? current.filter((j: string) => j !== jurisdiction)
      : [...current, jurisdiction];
    handleChange("taxJurisdictions", updated);
  };

  const toggleExemptProduct = (category: string) => {
    const current = formData.exemptProducts || [];
    const updated = current.includes(category)
      ? current.filter((c: string) => c !== category)
      : [...current, category];
    handleChange("exemptProducts", updated);
  };

  const usStates = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
    "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
    "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
    "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
    "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
    "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ];

  const internationalRegions = [
    "European Union", "United Kingdom", "Canada", "Australia", "Japan", "Mexico", "Brazil", 
    "India", "China", "South Korea", "Singapore", "New Zealand"
  ];

  const exemptCategories = [
    "Food & Groceries", "Medical Supplies", "Educational Materials", "Religious Items",
    "Agricultural Products", "Prescription Drugs", "Children's Clothing", "Newspapers & Magazines"
  ];

  return (
    <div className="space-y-6">
      {/* Tax Collection Responsibility */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Receipt className="w-5 h-5" />
            <span>Tax Collection Setup</span>
          </CardTitle>
          <CardDescription>
            Configure who is responsible for collecting and remitting sales taxes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="taxCollectionResponsible">Tax Collection Responsibility *</Label>
            <Select value={formData.taxCollectionResponsible} onValueChange={(value) => handleChange("taxCollectionResponsible", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select responsibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vendor">Vendor Collects and Remits Taxes</SelectItem>
                <SelectItem value="platform">Platform Handles Tax Collection</SelectItem>
                <SelectItem value="shared">Shared Responsibility by Location</SelectItem>
                <SelectItem value="none">No Tax Collection Required</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.taxCollectionResponsible === "vendor" && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-amber-800">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Important Notice</span>
              </div>
              <p className="text-amber-700 text-sm mt-1">
                As the vendor, you will be responsible for calculating, collecting, and remitting all applicable taxes to the appropriate authorities.
              </p>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="automaticCalculation"
              checked={formData.automaticCalculation}
              onCheckedChange={(checked) => handleChange("automaticCalculation", checked)}
            />
            <Label htmlFor="automaticCalculation" className="text-sm">
              Enable automatic tax calculation based on customer location
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="taxInclusivePricing"
              checked={formData.taxInclusivePricing}
              onCheckedChange={(checked) => handleChange("taxInclusivePricing", checked)}
            />
            <Label htmlFor="taxInclusivePricing" className="text-sm">
              Product prices include tax (tax-inclusive pricing)
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Tax Jurisdictions - US States */}
      <Card>
        <CardHeader>
          <CardTitle>US Tax Jurisdictions</CardTitle>
          <CardDescription>
            Select the US states where you are required to collect sales tax.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
            {usStates.map((state) => (
              <Button
                key={state}
                variant={formData.taxJurisdictions?.includes(state) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleJurisdiction(state)}
                className="justify-start text-xs"
              >
                {state}
              </Button>
            ))}
          </div>
          {formData.taxJurisdictions?.filter((j: string) => usStates.includes(j)).length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Selected US states:</p>
              <div className="flex flex-wrap gap-1">
                {formData.taxJurisdictions
                  .filter((j: string) => usStates.includes(j))
                  .map((state: string) => (
                    <Badge key={state} variant="secondary" className="text-xs">{state}</Badge>
                  ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* International Tax Jurisdictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>International Tax Jurisdictions</span>
          </CardTitle>
          <CardDescription>
            Select international regions where you need to collect VAT, GST, or other taxes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {internationalRegions.map((region) => (
              <Button
                key={region}
                variant={formData.taxJurisdictions?.includes(region) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleJurisdiction(region)}
                className="justify-start text-xs"
              >
                {region}
              </Button>
            ))}
          </div>
          {formData.taxJurisdictions?.filter((j: string) => internationalRegions.includes(j)).length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Selected international regions:</p>
              <div className="flex flex-wrap gap-1">
                {formData.taxJurisdictions
                  .filter((j: string) => internationalRegions.includes(j))
                  .map((region: string) => (
                    <Badge key={region} variant="secondary" className="text-xs">{region}</Badge>
                  ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tax Registration Numbers */}
      <Card>
        <CardHeader>
          <CardTitle>Tax Registration Information</CardTitle>
          <CardDescription>
            Provide your tax registration numbers for different jurisdictions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Checkbox
              id="vatRegistered"
              checked={formData.vatRegistered}
              onCheckedChange={(checked) => handleChange("vatRegistered", checked)}
            />
            <Label htmlFor="vatRegistered" className="text-sm">
              I am registered for VAT/GST collection
            </Label>
          </div>

          {formData.vatRegistered && (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="vatNumber">VAT Registration Number (EU)</Label>
                <Input
                  id="vatNumber"
                  value={formData.vatNumber}
                  onChange={(e) => handleChange("vatNumber", e.target.value)}
                  placeholder="e.g., GB123456789"
                />
              </div>
              <div>
                <Label htmlFor="gstNumber">GST Registration Number</Label>
                <Input
                  id="gstNumber"
                  value={formData.gstNumber}
                  onChange={(e) => handleChange("gstNumber", e.target.value)}
                  placeholder="e.g., for Canada, Australia, etc."
                />
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="salesTaxLicense">US Sales Tax License Number</Label>
            <Input
              id="salesTaxLicense"
              value={formData.salesTaxLicense}
              onChange={(e) => handleChange("salesTaxLicense", e.target.value)}
              placeholder="Enter your sales tax permit number"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tax-Exempt Product Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="w-5 h-5" />
            <span>Tax-Exempt Product Categories</span>
          </CardTitle>
          <CardDescription>
            Select product categories that are typically tax-exempt in your jurisdictions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {exemptCategories.map((category) => (
              <Button
                key={category}
                variant={formData.exemptProducts?.includes(category) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleExemptProduct(category)}
                className="justify-start text-xs"
              >
                {category}
              </Button>
            ))}
          </div>
          {formData.exemptProducts?.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Selected exempt categories:</p>
              <div className="flex flex-wrap gap-1">
                {formData.exemptProducts.map((category: string) => (
                  <Badge key={category} variant="secondary" className="text-xs">{category}</Badge>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-blue-800 text-sm">
              <strong>Note:</strong> Tax exemption rules vary by jurisdiction. Please consult with a tax professional 
              to ensure compliance with local tax laws and regulations.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxSettingsStep;
