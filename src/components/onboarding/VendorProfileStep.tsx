
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Image, Globe, Clock, Phone, Mail, CheckCircle } from "lucide-react";

interface VendorProfileStepProps {
  data: any;
  onDataUpdate: (data: any) => void;
}

const VendorProfileStep = ({ data, onDataUpdate }: VendorProfileStepProps) => {
  const [formData, setFormData] = useState({
    vendorLogo: null,
    companyDescription: "",
    facebookUrl: "",
    instagramUrl: "",
    linkedinUrl: "",
    twitterUrl: "",
    supportPhone: "",
    supportEmail: "",
    supportHours: "",
    returnPolicy: "",
    refundPolicy: "",
    preferredLanguages: [],
    ...data
  });

  const [logoUploaded, setLogoUploaded] = useState(false);

  useEffect(() => {
    onDataUpdate(formData);
  }, [formData, onDataUpdate]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = () => {
    setLogoUploaded(true);
    handleChange("vendorLogo", "vendor_logo.png");
  };

  const toggleLanguage = (language: string) => {
    const currentLanguages = formData.preferredLanguages || [];
    const updatedLanguages = currentLanguages.includes(language)
      ? currentLanguages.filter((lang: string) => lang !== language)
      : [...currentLanguages, language];
    handleChange("preferredLanguages", updatedLanguages);
  };

  const supportedLanguages = [
    "English", "Spanish", "French", "German", "Italian", "Portuguese", 
    "Chinese", "Japanese", "Korean", "Arabic", "Hindi", "Russian"
  ];

  return (
    <div className="space-y-6">
      {/* Brand Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Image className="w-5 h-5" />
            <span>Brand Information</span>
          </CardTitle>
          <CardDescription>
            Customize your vendor profile to showcase your brand to customers.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Company Logo</Label>
            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {logoUploaded ? (
                <div className="flex items-center justify-center space-x-2 text-green-600">
                  <CheckCircle className="w-6 h-6" />
                  <span>Logo uploaded successfully</span>
                </div>
              ) : (
                <>
                  <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-2">
                    Upload your company logo (PNG, JPG, or SVG)
                  </p>
                  <Button variant="outline" onClick={handleLogoUpload}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Logo
                  </Button>
                </>
              )}
            </div>
          </div>
          
          <div>
            <Label htmlFor="companyDescription">Company Description *</Label>
            <Textarea
              id="companyDescription"
              value={formData.companyDescription}
              onChange={(e) => handleChange("companyDescription", e.target.value)}
              placeholder="Tell customers about your business, history, specialties, and what makes you unique..."
              rows={5}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              This will be displayed on your vendor profile page. Be descriptive and engaging!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Social Media Links */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>Social Media Presence</span>
          </CardTitle>
          <CardDescription>
            Connect your social media accounts to build trust and credibility with customers.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="facebookUrl">Facebook Page</Label>
              <Input
                id="facebookUrl"
                value={formData.facebookUrl}
                onChange={(e) => handleChange("facebookUrl", e.target.value)}
                placeholder="https://facebook.com/yourbusiness"
              />
            </div>
            <div>
              <Label htmlFor="instagramUrl">Instagram Profile</Label>
              <Input
                id="instagramUrl"
                value={formData.instagramUrl}
                onChange={(e) => handleChange("instagramUrl", e.target.value)}
                placeholder="https://instagram.com/yourbusiness"
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="linkedinUrl">LinkedIn Company Page</Label>
              <Input
                id="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={(e) => handleChange("linkedinUrl", e.target.value)}
                placeholder="https://linkedin.com/company/yourbusiness"
              />
            </div>
            <div>
              <Label htmlFor="twitterUrl">Twitter/X Profile</Label>
              <Input
                id="twitterUrl"
                value={formData.twitterUrl}
                onChange={(e) => handleChange("twitterUrl", e.target.value)}
                placeholder="https://twitter.com/yourbusiness"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Support Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Phone className="w-5 h-5" />
            <span>Customer Support Details</span>
          </CardTitle>
          <CardDescription>
            Provide customer support contact information and operating hours.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="supportPhone">Support Phone Number</Label>
              <Input
                id="supportPhone"
                value={formData.supportPhone}
                onChange={(e) => handleChange("supportPhone", e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="supportEmail">Support Email *</Label>
              <Input
                id="supportEmail"
                type="email"
                value={formData.supportEmail}
                onChange={(e) => handleChange("supportEmail", e.target.value)}
                placeholder="support@yourbusiness.com"
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="supportHours">Support Hours *</Label>
            <Input
              id="supportHours"
              value={formData.supportHours}
              onChange={(e) => handleChange("supportHours", e.target.value)}
              placeholder="e.g., Monday-Friday 9AM-6PM EST, Saturday 10AM-4PM EST"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Return and Refund Policies */}
      <Card>
        <CardHeader>
          <CardTitle>Return and Refund Policies</CardTitle>
          <CardDescription>
            Define your return and refund policies for customer transparency.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="returnPolicy">Return Policy *</Label>
            <Textarea
              id="returnPolicy"
              value={formData.returnPolicy}
              onChange={(e) => handleChange("returnPolicy", e.target.value)}
              placeholder="Describe your return policy including timeframes, conditions, and process..."
              rows={4}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="refundPolicy">Refund Policy *</Label>
            <Textarea
              id="refundPolicy"
              value={formData.refundPolicy}
              onChange={(e) => handleChange("refundPolicy", e.target.value)}
              placeholder="Explain your refund policy including processing times and conditions..."
              rows={4}
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Preferred Languages */}
      <Card>
        <CardHeader>
          <CardTitle>Preferred Communication Languages</CardTitle>
          <CardDescription>
            Select the languages you can provide customer support in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {supportedLanguages.map((language) => (
              <Button
                key={language}
                variant={formData.preferredLanguages?.includes(language) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleLanguage(language)}
                className="justify-start"
              >
                {language}
              </Button>
            ))}
          </div>
          {formData.preferredLanguages?.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Selected languages:</p>
              <div className="flex flex-wrap gap-1">
                {formData.preferredLanguages.map((lang: string) => (
                  <Badge key={lang} variant="secondary">{lang}</Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorProfileStep;
