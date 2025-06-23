
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Import step components
import BusinessInformationStep from "@/components/onboarding/BusinessInformationStep";
import LegalComplianceStep from "@/components/onboarding/LegalComplianceStep";
import FinancialInformationStep from "@/components/onboarding/FinancialInformationStep";
import VendorProfileStep from "@/components/onboarding/VendorProfileStep";
import ProductCatalogStep from "@/components/onboarding/ProductCatalogStep";
import ShippingFulfillmentStep from "@/components/onboarding/ShippingFulfillmentStep";
import TaxSettingsStep from "@/components/onboarding/TaxSettingsStep";
import MarketingAnalyticsStep from "@/components/onboarding/MarketingAnalyticsStep";
import SecurityAccessStep from "@/components/onboarding/SecurityAccessStep";
import AgreementsStep from "@/components/onboarding/AgreementsStep";
import ReviewSubmitStep from "@/components/onboarding/ReviewSubmitStep";

interface VendorOnboardingProps {
  onBack: () => void;
}

const VendorOnboarding = ({ onBack }: VendorOnboardingProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [vendorData, setVendorData] = useState({});
  const { toast } = useToast();

  const steps = [
    {
      id: 0,
      title: "Business Information",
      description: "Basic business details and contact information",
      component: BusinessInformationStep
    },
    {
      id: 1,
      title: "Legal & Compliance",
      description: "Business licenses and legal documentation",
      component: LegalComplianceStep
    },
    {
      id: 2,
      title: "Financial Information",
      description: "Payment setup and tax information",
      component: FinancialInformationStep
    },
    {
      id: 3,
      title: "Vendor Profile",
      description: "Brand information and customer support details",
      component: VendorProfileStep
    },
    {
      id: 4,
      title: "Product Catalog",
      description: "Product listings and inventory management",
      component: ProductCatalogStep
    },
    {
      id: 5,
      title: "Shipping & Fulfillment",
      description: "Shipping methods and fulfillment options",
      component: ShippingFulfillmentStep
    },
    {
      id: 6,
      title: "Tax Settings",
      description: "Tax collection and compliance setup",
      component: TaxSettingsStep
    },
    {
      id: 7,
      title: "Marketing & Analytics",
      description: "Marketing permissions and analytics setup",
      component: MarketingAnalyticsStep
    },
    {
      id: 8,
      title: "Security & Access",
      description: "User credentials and security settings",
      component: SecurityAccessStep
    },
    {
      id: 9,
      title: "Agreements",
      description: "Terms of service and legal agreements",
      component: AgreementsStep
    },
    {
      id: 10,
      title: "Review & Submit",
      description: "Final review and application submission",
      component: ReviewSubmitStep
    }
  ];

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex <= currentStep || completedSteps.has(stepIndex)) {
      setCurrentStep(stepIndex);
    }
  };

  const handleDataUpdate = (stepData: any) => {
    setVendorData(prev => ({ ...prev, [currentStep]: stepData }));
  };

  const handleSubmit = () => {
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    toast({
      title: "Application Submitted Successfully!",
      description: "Your vendor application has been submitted for review. We'll contact you within 24-48 hours.",
    });
  };

  // Error boundary fallback for step components
  const renderStepComponent = () => {
    try {
      const CurrentStepComponent = currentStepData.component;
      return (
        <CurrentStepComponent 
          data={vendorData[currentStep] || {}}
          onDataUpdate={handleDataUpdate}
        />
      );
    } catch (error) {
      console.error("Error rendering step component:", error);
      return (
        <div className="p-8 text-center">
          <p className="text-red-600 mb-4">There was an error loading this step.</p>
          <Button onClick={() => window.location.reload()}>
            Reload Page
          </Button>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="text-gray-600 hover:text-primary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div className="text-center">
              <h1 className="text-xl font-semibold text-gray-900">Vendor Registration</h1>
              <p className="text-sm text-gray-600">Step {currentStep + 1} of {steps.length}</p>
            </div>
            <div className="w-24" /> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Progress</span>
              <span className="text-sm font-medium text-gray-600">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Step Navigation */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Registration Steps</CardTitle>
                  <CardDescription>Complete all steps to submit your application</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {steps.map((step, index) => {
                      const isCompleted = completedSteps.has(index);
                      const isCurrent = index === currentStep;
                      const isAccessible = index <= currentStep || completedSteps.has(index);

                      return (
                        <button
                          key={step.id}
                          onClick={() => handleStepClick(index)}
                          disabled={!isAccessible}
                          className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                            isCurrent
                              ? "bg-primary text-white shadow-md"
                              : isCompleted
                              ? "bg-green-50 text-green-700 border border-green-200"
                              : isAccessible
                              ? "hover:bg-gray-50 text-gray-700"
                              : "text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            {isCompleted ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <div className={`w-4 h-4 rounded-full border-2 ${
                                isCurrent ? "border-white" : "border-gray-300"
                              }`} />
                            )}
                            <div>
                              <div className="font-medium text-sm">{step.title}</div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{currentStepData.title}</CardTitle>
                  <CardDescription className="text-lg">{currentStepData.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {renderStepComponent()}
                  
                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8 pt-6 border-t">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentStep === 0}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    
                    {currentStep === steps.length - 1 ? (
                      <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90">
                        Submit Application
                        <CheckCircle className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button onClick={handleNext}>
                        Next Step
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorOnboarding;
