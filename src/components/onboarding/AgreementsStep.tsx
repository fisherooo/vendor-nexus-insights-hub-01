
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { FileText, Shield, Scale, AlertCircle, CheckCircle, ExternalLink } from "lucide-react";

interface AgreementsStepProps {
  data: any;
  onDataUpdate: (data: any) => void;
}

const AgreementsStep = ({ data, onDataUpdate }: AgreementsStepProps) => {
  const [formData, setFormData] = useState({
    vendorAgreementAccepted: false,
    codeOfConductAccepted: false,
    privacyPolicyAccepted: false,
    intellectualPropertyAccepted: false,
    disputeResolutionAccepted: false,
    commissionStructureAccepted: false,
    dataProcessingAccepted: false,
    ...data
  });

  const [viewedAgreements, setViewedAgreements] = useState<Set<string>>(new Set());

  useEffect(() => {
    onDataUpdate(formData);
  }, [formData, onDataUpdate]);

  const handleChange = (field: string, value: boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const markAsViewed = (agreementId: string) => {
    setViewedAgreements(prev => new Set([...prev, agreementId]));
  };

  const agreements = [
    {
      id: "vendorAgreement",
      field: "vendorAgreementAccepted",
      title: "Vendor Agreement",
      description: "Main terms of service, liabilities, and vendor responsibilities",
      icon: FileText,
      required: true,
      content: `VENDOR AGREEMENT

This Vendor Agreement ("Agreement") is entered into between VendorHub and the Vendor.

1. VENDOR OBLIGATIONS
- Provide accurate product information
- Maintain adequate inventory levels
- Process orders within specified timeframes
- Comply with all applicable laws and regulations

2. PLATFORM OBLIGATIONS
- Provide marketplace platform services
- Process payments according to agreed terms
- Provide customer support infrastructure
- Maintain platform security and uptime

3. COMMISSION AND FEES
- Platform commission: 8% of gross sales
- Payment processing: 2.9% + $0.30 per transaction
- No monthly or setup fees

4. LIABILITY AND INDEMNIFICATION
- Vendor is responsible for product quality and safety
- Platform liability limited to fees collected
- Mutual indemnification clauses apply

5. TERMINATION
- Either party may terminate with 30 days notice
- Outstanding obligations survive termination

By accepting this agreement, you acknowledge that you have read, understood, and agree to be bound by these terms.`
    },
    {
      id: "codeOfConduct",
      field: "codeOfConductAccepted",
      title: "Code of Conduct & Marketplace Policies",
      description: "Ethics guidelines, prohibited products, and content standards",
      icon: Shield,
      required: true,
      content: `CODE OF CONDUCT & MARKETPLACE POLICIES

1. PROHIBITED PRODUCTS
- Illegal, dangerous, or regulated items
- Counterfeit or unauthorized goods
- Adult content or services
- Weapons, drugs, or hazardous materials

2. ETHICAL BUSINESS PRACTICES
- Honest and accurate product descriptions
- Fair pricing practices
- Respectful customer communication
- No manipulation of reviews or ratings

3. CONTENT STANDARDS
- Professional product images and descriptions
- No misleading or deceptive content
- Compliance with advertising standards
- Appropriate language and imagery

4. CUSTOMER SERVICE STANDARDS
- Respond to inquiries within 24 hours
- Honor return and refund policies
- Resolve disputes in good faith
- Maintain professional communication

5. VIOLATIONS AND ENFORCEMENT
- Warnings for minor violations
- Account suspension for serious breaches
- Permanent termination for severe violations
- Appeal process available for all actions`
    },
    {
      id: "privacyPolicy",
      field: "privacyPolicyAccepted",
      title: "Privacy Policy & Data Protection",
      description: "How customer and vendor data is collected, used, and protected",
      icon: Shield,
      required: true,
      content: `PRIVACY POLICY & DATA PROTECTION

1. DATA COLLECTION
- Customer information for order processing
- Vendor business and financial data
- Analytics and performance metrics
- Communication records

2. DATA USE
- Order fulfillment and customer service
- Platform analytics and improvements
- Marketing and promotional activities (with consent)
- Legal compliance and fraud prevention

3. DATA SHARING
- With vendors for order fulfillment
- With payment processors for transactions
- With service providers under strict agreements
- As required by law or regulation

4. DATA PROTECTION
- Encryption of sensitive information
- Secure data storage and transmission
- Regular security audits and updates
- Access controls and monitoring

5. YOUR RIGHTS
- Access your personal data
- Request corrections or deletions
- Opt out of marketing communications
- Data portability where applicable

6. GDPR COMPLIANCE
- Lawful basis for data processing
- Data subject rights protection
- Data protection impact assessments
- Breach notification procedures`
    },
    {
      id: "intellectualProperty",
      field: "intellectualPropertyAccepted",
      title: "Intellectual Property Rights",
      description: "Copyright, trademark, and IP compliance requirements",
      icon: Scale,
      required: true,
      content: `INTELLECTUAL PROPERTY RIGHTS

1. VENDOR REPRESENTATIONS
- You own or have rights to all listed products
- Product images and descriptions are original or licensed
- No infringement of third-party IP rights
- Authorization to sell branded products

2. PLATFORM RIGHTS
- Limited license to display your content
- Right to remove infringing content
- No ownership of vendor intellectual property
- Respect for vendor trademarks and branding

3. COPYRIGHT COMPLIANCE
- Original product photography preferred
- Proper licensing for stock images
- No unauthorized use of copyrighted material
- DMCA takedown procedures in place

4. TRADEMARK PROTECTION
- No use of unauthorized trademarks
- Proper brand representation for authorized products
- No keyword stuffing or trademark abuse
- Brand protection services available

5. DISPUTE RESOLUTION
- Counter-notification procedures
- Good faith review process
- Appeal mechanisms for IP claims
- Cooperation with rights holders

6. VIOLATIONS
- Immediate content removal for clear infringement
- Account suspension for repeat violations
- Legal action for willful infringement
- Cooperation with law enforcement`
    },
    {
      id: "disputeResolution",
      field: "disputeResolutionAccepted",
      title: "Dispute Resolution Process",
      description: "Procedures for handling conflicts and disagreements",
      icon: Scale,
      required: true,
      content: `DISPUTE RESOLUTION PROCESS

1. INTERNAL RESOLUTION
- Direct communication between parties
- Platform mediation services
- Good faith negotiation required
- Documentation of attempts to resolve

2. ESCALATION PROCEDURES
- Formal complaint submission
- Investigation and fact-finding
- Neutral third-party review
- Binding arbitration if necessary

3. CUSTOMER DISPUTES
- 30-day return window for most products
- Vendor-customer direct communication
- Platform intervention when necessary
- Refund and chargeback procedures

4. VENDOR DISPUTES
- Commission and fee disputes
- Policy interpretation conflicts
- Account status disagreements
- Payment timing issues

5. ARBITRATION
- Binding arbitration for unresolved disputes
- American Arbitration Association rules
- Location: Delaware, United States
- English language proceedings

6. LIMITATIONS
- No class action lawsuits
- Limited damages and remedies
- One-year statute of limitations
- Equitable relief exceptions`
    },
    {
      id: "dataProcessing",
      field: "dataProcessingAccepted",
      title: "Data Processing Agreement",
      description: "GDPR and privacy compliance for customer data handling",
      icon: Shield,
      required: false,
      content: `DATA PROCESSING AGREEMENT

1. ROLES AND RESPONSIBILITIES
- Platform as data controller
- Vendor as data processor for customer data
- Specific processing instructions
- Security and confidentiality obligations

2. PROCESSING PURPOSES
- Order fulfillment and shipping
- Customer service and support
- Returns and refund processing
- Communication with customers

3. DATA CATEGORIES
- Customer contact information
- Shipping and billing addresses
- Order history and preferences
- Communication records

4. SECURITY MEASURES
- Encryption of data in transit and at rest
- Access controls and authentication
- Regular security assessments
- Incident response procedures

5. INTERNATIONAL TRANSFERS
- Adequate protection mechanisms
- Standard contractual clauses
- Privacy Shield or equivalency decisions
- Data localization requirements where applicable

6. BREACH NOTIFICATION
- Immediate notification to platform
- Cooperation in breach assessment
- Customer notification procedures
- Regulatory reporting compliance`
    }
  ];

  const allRequiredAccepted = agreements
    .filter(agreement => agreement.required)
    .every(agreement => formData[agreement.field]);

  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Legal Agreements & Policies</span>
          </CardTitle>
          <CardDescription>
            Please review and accept all required agreements to complete your vendor registration.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-green-800">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Required Agreements</span>
              </div>
              <p className="text-green-700 text-sm mt-1">
                {agreements.filter(a => a.required && formData[a.field]).length} of {agreements.filter(a => a.required).length} completed
              </p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-blue-800">
                <FileText className="w-4 h-4" />
                <span className="text-sm font-medium">Optional Agreements</span>
              </div>
              <p className="text-blue-700 text-sm mt-1">
                {agreements.filter(a => !a.required && formData[a.field]).length} of {agreements.filter(a => !a.required).length} accepted
              </p>
            </div>
          </div>
          
          {!allRequiredAccepted && (
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
              <div className="flex items-center space-x-2 text-amber-800">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Action Required</span>
              </div>
              <p className="text-amber-700 text-sm mt-1">
                Please review and accept all required agreements to proceed with your application.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Agreements */}
      {agreements.map((agreement) => {
        const IconComponent = agreement.icon;
        const isAccepted = formData[agreement.field];
        const isViewed = viewedAgreements.has(agreement.id);

        return (
          <Card key={agreement.id} className={`${isAccepted ? 'border-green-200' : ''}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <IconComponent className="w-5 h-5" />
                  <div>
                    <CardTitle className="text-lg">{agreement.title}</CardTitle>
                    <CardDescription>{agreement.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {agreement.required && <Badge variant="destructive" className="text-xs">Required</Badge>}
                  {isAccepted && <CheckCircle className="w-5 h-5 text-green-600" />}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Agreement Content */}
              <ScrollArea className="h-48 w-full border rounded-lg p-4">
                <pre className="text-sm whitespace-pre-wrap font-mono">
                  {agreement.content}
                </pre>
              </ScrollArea>
              
              {/* View Full Document Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => markAsViewed(agreement.id)}
                className="w-full"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Full Document
              </Button>
              
              {/* Acceptance Checkbox */}
              <div className="flex items-start space-x-3 p-4 border rounded-lg">
                <Checkbox
                  id={agreement.field}
                  checked={isAccepted}
                  onCheckedChange={(checked) => handleChange(agreement.field, checked as boolean)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor={agreement.field} className="text-sm font-medium cursor-pointer">
                    I have read, understood, and agree to the {agreement.title}
                    {agreement.required && <span className="text-red-600 ml-1">*</span>}
                  </Label>
                  <p className="text-xs text-gray-600 mt-1">
                    By checking this box, you acknowledge that you have carefully reviewed the terms and conditions 
                    and agree to be legally bound by them.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Agreement Summary</CardTitle>
          <CardDescription>
            Review your acceptance status for all agreements.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {agreements.map((agreement) => (
              <div key={agreement.id} className="flex items-center justify-between p-2 border rounded">
                <span className="text-sm">{agreement.title}</span>
                <div className="flex items-center space-x-2">
                  {agreement.required && <Badge variant="outline" className="text-xs">Required</Badge>}
                  {formData[agreement.field] ? (
                    <Badge variant="default" className="text-xs bg-green-600">Accepted</Badge>
                  ) : (
                    <Badge variant="secondary" className="text-xs">Pending</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {allRequiredAccepted ? (
            <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center space-x-2 text-green-800">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">All Required Agreements Accepted</span>
              </div>
              <p className="text-green-700 text-sm mt-1">
                You have successfully reviewed and accepted all required legal agreements. 
                You may now proceed to submit your vendor application.
              </p>
            </div>
          ) : (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center space-x-2 text-red-800">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Required Agreements Pending</span>
              </div>
              <p className="text-red-700 text-sm mt-1">
                Please accept all required agreements above to continue with your vendor application.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AgreementsStep;
