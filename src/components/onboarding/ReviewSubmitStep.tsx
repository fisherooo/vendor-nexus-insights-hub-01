
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, AlertTriangle, Clock, Send, Edit } from "lucide-react";

interface ReviewSubmitStepProps {
  data: any;
  onDataUpdate: (data: any) => void;
}

const ReviewSubmitStep = ({ data, onDataUpdate }: ReviewSubmitStepProps) => {
  const [submissionStatus, setSubmissionStatus] = useState<'ready' | 'submitting' | 'submitted'>('ready');

  useEffect(() => {
    onDataUpdate({ submissionStatus });
  }, [submissionStatus, onDataUpdate]);

  const allStepsData = data;

  // Mock validation of all steps
  const stepValidation = [
    {
      stepName: "Business Information",
      stepNumber: 0,
      isComplete: !!(allStepsData[0]?.legalBusinessName && allStepsData[0]?.primaryContactEmail),
      summary: allStepsData[0]?.legalBusinessName || "Not completed"
    },
    {
      stepName: "Legal & Compliance",
      stepNumber: 1,
      isComplete: !!(allStepsData[1]?.termsAccepted && allStepsData[1]?.privacyPolicyAccepted),
      summary: allStepsData[1]?.termsAccepted ? "Terms accepted" : "Terms pending"
    },
    {
      stepName: "Financial Information",
      stepNumber: 2,
      isComplete: !!(allStepsData[2]?.bankName && allStepsData[2]?.accountHolderName),
      summary: allStepsData[2]?.bankName || "Bank details pending"
    },
    {
      stepName: "Vendor Profile",
      stepNumber: 3,
      isComplete: !!(allStepsData[3]?.companyDescription && allStepsData[3]?.supportEmail),
      summary: allStepsData[3]?.companyDescription ? "Profile completed" : "Profile pending"
    },
    {
      stepName: "Product Catalog",
      stepNumber: 4,
      isComplete: !!(allStepsData[4]?.products && allStepsData[4]?.products?.length > 0),
      summary: allStepsData[4]?.products?.length ? `${allStepsData[4].products.length} products` : "No products added"
    },
    {
      stepName: "Shipping & Fulfillment",
      stepNumber: 5,
      isComplete: !!(allStepsData[5]?.shippingOrigin && allStepsData[5]?.fulfillmentMethod),
      summary: allStepsData[5]?.fulfillmentMethod || "Shipping setup pending"
    },
    {
      stepName: "Tax Settings",
      stepNumber: 6,
      isComplete: !!(allStepsData[6]?.taxCollectionResponsible),
      summary: allStepsData[6]?.taxCollectionResponsible || "Tax setup pending"
    },
    {
      stepName: "Marketing & Analytics",
      stepNumber: 7,
      isComplete: true, // Optional step
      summary: allStepsData[7]?.marketingPermissions?.length ? `${allStepsData[7].marketingPermissions.length} permissions` : "No marketing setup"
    },
    {
      stepName: "Security & Access",
      stepNumber: 8,
      isComplete: !!(allStepsData[8]?.username && allStepsData[8]?.password),
      summary: allStepsData[8]?.username ? `User: ${allStepsData[8].username}` : "Security setup pending"
    },
    {
      stepName: "Agreements",
      stepNumber: 9,
      isComplete: !!(allStepsData[9]?.vendorAgreementAccepted && allStepsData[9]?.privacyPolicyAccepted),
      summary: allStepsData[9]?.vendorAgreementAccepted ? "All agreements accepted" : "Agreements pending"
    }
  ];

  const completedSteps = stepValidation.filter(step => step.isComplete).length;
  const totalSteps = stepValidation.length;
  const isReadyToSubmit = completedSteps === totalSteps;

  const handleSubmit = () => {
    if (!isReadyToSubmit) return;
    
    setSubmissionStatus('submitting');
    // Simulate submission process
    setTimeout(() => {
      setSubmissionStatus('submitted');
    }, 3000);
  };

  if (submissionStatus === 'submitted') {
    return (
      <div className="text-center space-y-6 py-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Application Submitted Successfully!</h2>
          <p className="text-lg text-gray-600 mb-6">
            Thank you for applying to become a vendor on VendorHub. Your application has been received and is now under review.
          </p>
        </div>
        
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>What Happens Next?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-left">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">1</div>
              <div>
                <h4 className="font-medium">Review Process (24-48 hours)</h4>
                <p className="text-sm text-gray-600">Our team will review your application and verify all submitted information.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">2</div>
              <div>
                <h4 className="font-medium">Approval Notification</h4>
                <p className="text-sm text-gray-600">You'll receive an email notification once your application is approved.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">3</div>
              <div>
                <h4 className="font-medium">Account Setup</h4>
                <p className="text-sm text-gray-600">Complete your vendor dashboard setup and start listing products.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">4</div>
              <div>
                <h4 className="font-medium">Start Selling!</h4>
                <p className="text-sm text-gray-600">Your products will be live on the marketplace and ready for customers.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            <strong>Application ID:</strong> VH-{Date.now()}
          </p>
          <p className="text-sm text-gray-600">
            Questions? Contact our vendor support team at <a href="mailto:vendors@vendorhub.com" className="text-primary hover:underline">vendors@vendorhub.com</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Application Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Application Review</CardTitle>
          <CardDescription>
            Review all the information you've provided before submitting your vendor application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{completedSteps}</div>
              <div className="text-sm text-blue-800">Completed Steps</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">{totalSteps - completedSteps}</div>
              <div className="text-sm text-gray-800">Remaining Steps</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{Math.round((completedSteps / totalSteps) * 100)}%</div>
              <div className="text-sm text-green-800">Application Complete</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step-by-Step Review */}
      <Card>
        <CardHeader>
          <CardTitle>Step-by-Step Review</CardTitle>
          <CardDescription>
            Check each section to ensure all required information is complete and accurate.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stepValidation.map((step, index) => (
              <div key={step.stepNumber}>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.isComplete 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {step.isComplete ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <span className="text-sm font-medium">{step.stepNumber + 1}</span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{step.stepName}</h4>
                      <p className="text-sm text-gray-600">{step.summary}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {step.isComplete ? (
                      <Badge variant="default" className="bg-green-600">Complete</Badge>
                    ) : (
                      <Badge variant="secondary">Incomplete</Badge>
                    )}
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                {index < stepValidation.length - 1 && <Separator className="my-2" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pre-Submission Checklist */}
      <Card>
        <CardHeader>
          <CardTitle>Pre-Submission Checklist</CardTitle>
          <CardDescription>
            Final checks before submitting your vendor application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              "All required information has been provided",
              "Business documents have been uploaded",
              "Banking information is accurate",
              "Product catalog is complete",
              "Shipping methods are configured",
              "All legal agreements have been accepted"
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Submission Status */}
      {!isReadyToSubmit ? (
        <Card>
          <CardContent className="pt-6">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-amber-800">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-medium">Application Incomplete</span>
              </div>
              <p className="text-amber-700 text-sm mt-2">
                Please complete all required steps before submitting your application. 
                You have {totalSteps - completedSteps} step(s) remaining.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-green-800">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Ready to Submit</span>
              </div>
              <p className="text-green-700 text-sm mt-2">
                Your application is complete and ready for submission. Click the button below to submit for review.
              </p>
              
              <div className="mt-4">
                <Button
                  onClick={handleSubmit}
                  disabled={submissionStatus === 'submitting'}
                  className="w-full sm:w-auto"
                  size="lg"
                >
                  {submissionStatus === 'submitting' ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Vendor Application
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Support Information */}
      <Card>
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Contact Support</h4>
              <p className="text-sm text-gray-600 mb-2">
                Our vendor support team is here to help with any questions about your application.
              </p>
              <Button variant="outline" size="sm">Contact Support</Button>
            </div>
            <div>
              <h4 className="font-medium mb-2">Documentation</h4>
              <p className="text-sm text-gray-600 mb-2">
                View our comprehensive vendor guide and FAQ for additional information.
              </p>
              <Button variant="outline" size="sm">View Documentation</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewSubmitStep;
