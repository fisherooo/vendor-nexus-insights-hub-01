
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, CreditCard, Shield, CheckCircle } from "lucide-react";

interface FinancialInformationStepProps {
  data: any;
  onDataUpdate: (data: any) => void;
}

const FinancialInformationStep = ({ data, onDataUpdate }: FinancialInformationStepProps) => {
  const [formData, setFormData] = useState({
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
    routingNumber: "",
    swiftCode: "",
    currency: "USD",
    paymentMethod: "",
    taxReportingForm: null,
    commissionAgreement: false,
    billingContactName: "",
    billingContactEmail: "",
    billingContactPhone: "",
    ...data
  });

  const [uploadedDocs, setUploadedDocs] = useState<Set<string>>(new Set());

  useEffect(() => {
    onDataUpdate(formData);
  }, [formData, onDataUpdate]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (docType: string) => {
    setUploadedDocs(prev => new Set([...prev, docType]));
    handleChange("taxReportingForm", `${docType}_form.pdf`);
  };

  return (
    <div className="space-y-6">
      {/* Bank Account Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5" />
            <span>Bank Account Information</span>
          </CardTitle>
          <CardDescription>
            Provide your bank account details for payment processing. All information is encrypted and secure.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bankName">Bank Name *</Label>
              <Input
                id="bankName"
                value={formData.bankName}
                onChange={(e) => handleChange("bankName", e.target.value)}
                placeholder="Enter your bank name"
                required
              />
            </div>
            <div>
              <Label htmlFor="accountHolderName">Account Holder Name *</Label>
              <Input
                id="accountHolderName"
                value={formData.accountHolderName}
                onChange={(e) => handleChange("accountHolderName", e.target.value)}
                placeholder="Name on the account"
                required
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="accountNumber">Account Number *</Label>
              <Input
                id="accountNumber"
                value={formData.accountNumber}
                onChange={(e) => handleChange("accountNumber", e.target.value)}
                placeholder="Enter account number"
                type="password"
                required
              />
            </div>
            <div>
              <Label htmlFor="routingNumber">Routing Number *</Label>
              <Input
                id="routingNumber"
                value={formData.routingNumber}
                onChange={(e) => handleChange("routingNumber", e.target.value)}
                placeholder="9-digit routing number"
                required
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="swiftCode">SWIFT/IBAN Code</Label>
              <Input
                id="swiftCode"
                value={formData.swiftCode}
                onChange={(e) => handleChange("swiftCode", e.target.value)}
                placeholder="For international accounts"
              />
            </div>
            <div>
              <Label htmlFor="currency">Preferred Currency *</Label>
              <Select value={formData.currency} onValueChange={(value) => handleChange("currency", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="GBP">GBP - British Pound</SelectItem>
                  <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                  <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                  <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-blue-800">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Security Notice</span>
            </div>
            <p className="text-blue-700 text-xs mt-1">
              Your banking information is encrypted with bank-level security and will only be used for payment processing.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Payment Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method Preferences</CardTitle>
          <CardDescription>
            Choose how you'd like to receive payments from sales.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="paymentMethod">Preferred Payment Method *</Label>
            <Select value={formData.paymentMethod} onValueChange={(value) => handleChange("paymentMethod", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="direct-deposit">Direct Bank Deposit</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="stripe">Stripe Connect</SelectItem>
                <SelectItem value="wire-transfer">Wire Transfer</SelectItem>
                <SelectItem value="check">Physical Check</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tax Reporting */}
      <Card>
        <CardHeader>
          <CardTitle>Tax Reporting Documentation</CardTitle>
          <CardDescription>
            Upload required tax forms for compliance and reporting purposes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-24 flex-col space-y-2"
              onClick={() => handleFileUpload("w9")}
            >
              <Upload className="w-6 h-6" />
              <span className="text-sm">Upload W-9 Form</span>
              <span className="text-xs text-gray-500">(US Taxpayers)</span>
              {uploadedDocs.has("w9") && <CheckCircle className="w-4 h-4 text-green-600" />}
            </Button>
            
            <Button
              variant="outline"
              className="h-24 flex-col space-y-2"
              onClick={() => handleFileUpload("w8")}
            >
              <Upload className="w-6 h-6" />
              <span className="text-sm">Upload W-8 Form</span>
              <span className="text-xs text-gray-500">(Non-US Taxpayers)</span>
              {uploadedDocs.has("w8") && <CheckCircle className="w-4 h-4 text-green-600" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Commission Agreement */}
      <Card>
        <CardHeader>
          <CardTitle>Commission Structure</CardTitle>
          <CardDescription>
            Review and confirm the commission rates and fee structure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">Platform Commission:</span>
              <Badge variant="secondary">8% per sale</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Payment Processing:</span>
              <Badge variant="secondary">2.9% + $0.30</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Monthly Fee:</span>
              <Badge variant="secondary">$0 (No monthly fees)</Badge>
            </div>
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between items-center font-semibold">
                <span>Total Platform Fees:</span>
                <span className="text-primary">~10.9% + $0.30 per transaction</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing Contact */}
      <Card>
        <CardHeader>
          <CardTitle>Billing Contact Information</CardTitle>
          <CardDescription>
            Designated contact for billing inquiries and financial matters.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="billingContactName">Billing Contact Name *</Label>
              <Input
                id="billingContactName"
                value={formData.billingContactName}
                onChange={(e) => handleChange("billingContactName", e.target.value)}
                placeholder="Full name"
                required
              />
            </div>
            <div>
              <Label htmlFor="billingContactEmail">Billing Contact Email *</Label>
              <Input
                id="billingContactEmail"
                type="email"
                value={formData.billingContactEmail}
                onChange={(e) => handleChange("billingContactEmail", e.target.value)}
                placeholder="billing@yourbusiness.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="billingContactPhone">Billing Contact Phone *</Label>
              <Input
                id="billingContactPhone"
                value={formData.billingContactPhone}
                onChange={(e) => handleChange("billingContactPhone", e.target.value)}
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialInformationStep;
