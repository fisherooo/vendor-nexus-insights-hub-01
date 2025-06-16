
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Store, Users, TrendingUp, Shield, Clock, ArrowRight } from "lucide-react";
import VendorOnboarding from "@/components/VendorOnboarding";

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  if (showOnboarding) {
    return <VendorOnboarding onBack={() => setShowOnboarding(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">VendorHub</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-600 hover:text-primary transition-colors">Features</a>
              <a href="#benefits" className="text-gray-600 hover:text-primary transition-colors">Benefits</a>
              <a href="#support" className="text-gray-600 hover:text-primary transition-colors">Support</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto animate-slide-in-up">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Trusted by 10,000+ Vendors Worldwide
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Join the Leading
              <span className="text-primary"> E-Commerce </span>
              Marketplace
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Start selling your products to millions of customers worldwide. Our comprehensive vendor platform 
              provides everything you need to grow your business online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-3 h-auto"
                onClick={() => setShowOnboarding(true)}
              >
                Start Vendor Registration
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-3 h-auto border-primary text-primary hover:bg-primary hover:text-white"
              >
                View Demo
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating Cards */}
        <div className="absolute top-20 left-10 hidden lg:block animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <Card className="w-48 shadow-lg border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-8 h-8 text-primary" />
                <div>
                  <div className="font-semibold text-sm">Revenue Growth</div>
                  <div className="text-xs text-gray-600">+150% Average</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="absolute top-32 right-10 hidden lg:block animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <Card className="w-48 shadow-lg border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-8 h-8 text-primary" />
                <div>
                  <div className="font-semibold text-sm">Global Reach</div>
                  <div className="text-xs text-gray-600">50+ Countries</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools and support you need to build a thriving online business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Store,
                title: "Easy Product Management",
                description: "Upload and manage your entire product catalog with our intuitive interface. Support for variants, pricing, and inventory."
              },
              {
                icon: Shield,
                title: "Secure & Compliant",
                description: "Enterprise-grade security with full compliance support for tax collection, business licenses, and regulatory requirements."
              },
              {
                icon: TrendingUp,
                title: "Analytics & Insights",
                description: "Comprehensive sales analytics, performance metrics, and customer insights to help you make data-driven decisions."
              },
              {
                icon: Users,
                title: "Customer Support",
                description: "24/7 dedicated vendor support team to help you succeed. From onboarding to ongoing operations."
              },
              {
                icon: Clock,
                title: "Fast Onboarding",
                description: "Get your store live in minutes with our streamlined registration process and guided setup wizard."
              },
              {
                icon: CheckCircle,
                title: "Payment Solutions",
                description: "Flexible payment options with fast payouts. Support for multiple currencies and payment methods worldwide."
              }
            ].map((feature, index) => (
              <Card key={index} className="border-green-100 hover:border-primary transition-colors duration-200 hover:shadow-lg">
                <CardHeader>
                  <feature.icon className="w-12 h-12 text-primary mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose VendorHub?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of successful vendors who have chosen our platform to grow their business.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {[
                "Zero setup fees and transparent pricing",
                "Access to millions of active customers",
                "Marketing tools and promotional support",
                "Mobile-optimized vendor dashboard",
                "Automated tax and compliance management",
                "Integration with popular shipping carriers"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-lg text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-green-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Ready to Get Started?</h3>
              <p className="text-gray-600 mb-6">
                Join our marketplace today and start reaching customers worldwide. Our simple onboarding process 
                will have you selling in minutes.
              </p>
              <Button 
                size="lg" 
                className="w-full text-lg py-3 h-auto"
                onClick={() => setShowOnboarding(true)}
              >
                Begin Vendor Registration
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section id="support" className="py-20 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Need Help?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Our dedicated support team is here to help you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white">
              Contact Support
            </Button>
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white">
              View Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Store className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">VendorHub</span>
          </div>
          <p className="text-gray-400">
            © 2024 VendorHub. All rights reserved. Building the future of e-commerce.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
