
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";

interface LegalComplianceStepProps {
  data: any;
  onDataUpdate: (data: any) => void;
}

const LegalComplianceStep = ({ data, onDataUpdate }: LegalComplianceStepProps) => {
  const [formData, setFormData] = useState({
    businessLicense: null,
    salesTaxLicense: null,
    resellerCertificate: null,
    productSafetyCerts: [],
    importExportLicense: null,
    insuranceDetails: "",
    termsAccepted: false,
    privacyPolicyAccepted: false,
    ...data
  });

  const [uploadedFiles, setUploadedFiles] = useState<Set<string>>(new Set());

  useEffect(() => {
    onDataUpdate(formData);
  }, [formData, onDataUpdate]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string) => {
    // Simulate file upload
    setUploadedFiles(prev => new Set([...prev, field]));
    handleChange(field, `${field}_document.pdf`);
  };

  const requiredDocuments = [
    {
      key: "businessLicense",
      title: "Business License",
      description: "Government-issued business operating license",
      required: true
    },
    {
      key: "salesTaxLicense",
      title: "Sales Tax License / VAT Registration",
      description: "Tax collection authorization",
      required: true
    },
    {
      key: "resellerCertificate",
      title: "Reseller's Certificate",
      description: "For tax exemption if applicable",
      required: false
    },
    {
      key: "importExportLicense",
      title: "Import/Export License",
      description: "Required for international trade",
      required: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Required Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Required Documentation</CardTitle>
          <CardDescription>
            Upload the necessary legal and compliance documents for your business.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {requiredDocuments.map((doc) => (
            <div key={doc.key} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium">{doc.title}</h4>
                  {doc.required && <Badge variant="destructive" className="text-xs">Required</Badge>}
                  {uploadedFiles.has(doc.key) && <CheckCircle className="w-4 h-4 text-green-600" />}
                </div>
                <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
              </div>
              <Button
                variant={uploadedFiles.has(doc.key) ? "outline" : "default"}
                size="sm"
                onClick={() => handleFileUpload(doc.key)}
                className="ml-4"
              >
                <Upload className="w-4 h-4 mr-2" />
                {uploadedFiles.has(doc.key) ? "Replace" : "Upload"}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Product Safety Certifications */}
      <Card>
        <CardHeader>
          <CardTitle>Product Safety Certifications</CardTitle>
          <CardDescription>
            Upload any relevant product safety certifications for regulated products.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600 mb-2">
              Drag and drop your product safety certificates here, or click to browse
            </p>
            <Button variant="outline" onClick={() => handleFileUpload("productSafetyCerts")}>
              <Upload className="w-4 h-4 mr-2" />
              Upload Certificates
            </Button>
            {uploadedFiles.has("productSafetyCerts") && (
              <div className="mt-2 text-sm text-green-600 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                Certificates uploaded successfully
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Insurance Information */}
      <Card>
        <CardHeader>
          <CardTitle>Insurance Information</CardTitle>
          <CardDescription>
            Provide details about your business insurance coverage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="insuranceDetails">Insurance Details</Label>
            <Input
              id="insuranceDetails"
              value={formData.insuranceDetails}
              onChange={(e) => handleChange("insuranceDetails", e.target.value)}
              placeholder="e.g., General Liability, Product Liability - $1M coverage with ABC Insurance Co."
            />
          </div>
        </CardContent>
      </Card>

      {/* Legal Agreements */}
      <Card>
        <CardHeader>
          <CardTitle>Legal Agreements</CardTitle>
          <CardDescription>
            Review and accept the required legal agreements and policies.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 border rounded-lg">
              <Checkbox
                id="termsAccepted"
                checked={formData.termsAccepted}
                onCheckedChange={(checked) => handleChange("termsAccepted", checked)}
                className="mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="termsAccepted" className="text-sm font-medium cursor-pointer">
                  I accept the Terms and Conditions Agreement
                </Label>
                <p className="text-xs text-gray-600 mt-1">
                  By checking this box, you agree to our vendor terms of service, liability agreements, and intellectual property policies.
                  <a href="#" className="text-primary hover:underline ml-1">Read full terms</a>
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 border rounded-lg">
              <Checkbox
                id="privacyPolicyAccepted"
                checked={formData.privacyPolicyAccepted}
                onCheckedChange={(checked) => handleChange("privacyPolicyAccepted", checked)}
                className="mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="privacyPolicyAccepted" className="text-sm font-medium cursor-pointer">
                  I accept the Privacy Policy and Data Protection Agreement
                </Label>
                <p className="text-xs text-gray-600 mt-1">
                  This covers how customer and vendor data is collected, used, and protected on our platform.
                  <a href="#" className="text-primary hover:underline ml-1">Read privacy policy</a>
                </p>
              </div>
            </div>
          </div>

          {(!formData.termsAccepted || !formData.privacyPolicyAccepted) && (
            <div className="flex items-center space-x-2 text-amber-600 bg-amber-50 p-3 rounded-lg">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">Please accept all required agreements to continue.</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LegalComplianceStep;
