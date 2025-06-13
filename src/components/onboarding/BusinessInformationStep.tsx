
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface BusinessInformationStepProps {
  data: any;
  onDataUpdate: (data: any) => void;
}

const BusinessInformationStep = ({ data, onDataUpdate }: BusinessInformationStepProps) => {
  const [formData, setFormData] = useState({
    legalBusinessName: "",
    tradeName: "",
    businessType: "",
    registrationNumber: "",
    taxId: "",
    physicalAddress: "",
    mailingAddress: "",
    primaryContactName: "",
    primaryContactPhone: "",
    primaryContactEmail: "",
    secondaryContactName: "",
    secondaryContactPhone: "",
    secondaryContactEmail: "",
    websiteUrl: "",
    ...data
  });

  useEffect(() => {
    onDataUpdate(formData);
  }, [formData, onDataUpdate]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Business Identity */}
      <Card>
        <CardHeader>
          <CardTitle>Business Identity</CardTitle>
          <CardDescription>
            Provide your official business registration and identification details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="legalBusinessName">Legal Business Name *</Label>
              <Input
                id="legalBusinessName"
                value={formData.legalBusinessName}
                onChange={(e) => handleChange("legalBusinessName", e.target.value)}
                placeholder="Enter your official registered business name"
                required
              />
            </div>
            <div>
              <Label htmlFor="tradeName">Trade Name / DBA</Label>
              <Input
                id="tradeName"
                value={formData.tradeName}
                onChange={(e) => handleChange("tradeName", e.target.value)}
                placeholder="Doing Business As (if different)"
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="businessType">Business Type *</Label>
              <Select value={formData.businessType} onValueChange={(value) => handleChange("businessType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="corporation">Corporation</SelectItem>
                  <SelectItem value="llc">Limited Liability Company (LLC)</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                  <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                  <SelectItem value="nonprofit">Nonprofit Organization</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="registrationNumber">Business Registration Number *</Label>
              <Input
                id="registrationNumber"
                value={formData.registrationNumber}
                onChange={(e) => handleChange("registrationNumber", e.target.value)}
                placeholder="Enter registration number"
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="taxId">Tax Identification Number (TIN/EIN) *</Label>
            <Input
              id="taxId"
              value={formData.taxId}
              onChange={(e) => handleChange("taxId", e.target.value)}
              placeholder="Enter your tax ID number"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Business Address */}
      <Card>
        <CardHeader>
          <CardTitle>Business Address</CardTitle>
          <CardDescription>
            Provide your business location and mailing address information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="physicalAddress">Physical Business Address *</Label>
            <Textarea
              id="physicalAddress"
              value={formData.physicalAddress}
              onChange={(e) => handleChange("physicalAddress", e.target.value)}
              placeholder="Enter your complete business address including street, city, state, and ZIP code"
              rows={3}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="mailingAddress">Mailing Address</Label>
            <Textarea
              id="mailingAddress"
              value={formData.mailingAddress}
              onChange={(e) => handleChange("mailingAddress", e.target.value)}
              placeholder="If different from physical address"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            Primary and secondary contact details for your business.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="primaryContactName">Primary Contact Name *</Label>
              <Input
                id="primaryContactName"
                value={formData.primaryContactName}
                onChange={(e) => handleChange("primaryContactName", e.target.value)}
                placeholder="Full name"
                required
              />
            </div>
            <div>
              <Label htmlFor="primaryContactPhone">Primary Contact Phone *</Label>
              <Input
                id="primaryContactPhone"
                value={formData.primaryContactPhone}
                onChange={(e) => handleChange("primaryContactPhone", e.target.value)}
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>
            <div>
              <Label htmlFor="primaryContactEmail">Primary Contact Email *</Label>
              <Input
                id="primaryContactEmail"
                type="email"
                value={formData.primaryContactEmail}
                onChange={(e) => handleChange("primaryContactEmail", e.target.value)}
                placeholder="contact@yourbusiness.com"
                required
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="secondaryContactName">Secondary Contact Name</Label>
              <Input
                id="secondaryContactName"
                value={formData.secondaryContactName}
                onChange={(e) => handleChange("secondaryContactName", e.target.value)}
                placeholder="Full name (optional)"
              />
            </div>
            <div>
              <Label htmlFor="secondaryContactPhone">Secondary Contact Phone</Label>
              <Input
                id="secondaryContactPhone"
                value={formData.secondaryContactPhone}
                onChange={(e) => handleChange("secondaryContactPhone", e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="secondaryContactEmail">Secondary Contact Email</Label>
              <Input
                id="secondaryContactEmail"
                type="email"
                value={formData.secondaryContactEmail}
                onChange={(e) => handleChange("secondaryContactEmail", e.target.value)}
                placeholder="backup@yourbusiness.com"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="websiteUrl">Website URL</Label>
            <Input
              id="websiteUrl"
              value={formData.websiteUrl}
              onChange={(e) => handleChange("websiteUrl", e.target.value)}
              placeholder="https://www.yourbusiness.com"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessInformationStep;
