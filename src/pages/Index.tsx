import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Store, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Shield, 
  CheckCircle,
  ArrowRight,
  Package,
  CreditCard,
  Globe
} from "lucide-react";
import VendorOnboarding from "@/components/VendorOnboarding";
import VendorDashboard from "@/components/VendorDashboard";

const Index = () => {
  const [currentView, setCurrentView] = useState<"home" | "onboarding" | "dashboard">("home");

  console.log("Current view:", currentView);

  const handleVendorRegistration = () => {
    console.log("Hero registration button clicked");
    setCurrentView("onboarding");
  };

  const handleDashboardView = () => {
    console.log("Dashboard button clicked");
    setCurrentView("dashboard");
  };

  const handleBackToHome = () => {
    console.log("Back to home clicked");
    setCurrentView("home");
  };

  if (currentView === "onboarding") {
    return <VendorOnboarding onBack={handleBackToHome} />;
  }

  if (currentView === "dashboard") {
    return <VendorDashboard onBack={handleBackToHome} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">VendorHub</h1>
                <p className="text-sm text-gray-600">E-Commerce Vendor Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={handleDashboardView}>
                Vendor Dashboard
              </Button>
              <Button onClick={handleVendorRegistration}>
                Register as Vendor
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
              Complete Vendor Solution
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Join Our <span className="text-primary">E-Commerce</span> Marketplace
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Complete vendor onboarding platform with product management, analytics, 
              inventory tracking, and team collaboration tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={handleVendorRegistration} className="text-lg px-8 py-6">
                Start Vendor Registration
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" onClick={handleDashboardView} className="text-lg px-8 py-6">
                View Dashboard Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From onboarding to daily operations, our platform provides all the tools 
              you need to manage your e-commerce business effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Product Management */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Product Management</CardTitle>
                <CardDescription>
                  Add, edit, and organize your product catalog with images, descriptions, 
                  pricing, and inventory tracking.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Analytics & Sales */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Analytics & Reports</CardTitle>
                <CardDescription>
                  Track sales performance, customer ratings, and detailed analytics 
                  to grow your business.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Team Management */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Team Collaboration</CardTitle>
                <CardDescription>
                  Add team members with custom roles and permissions. Track who made 
                  changes and when.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Inventory Management */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <ShoppingCart className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Inventory Control</CardTitle>
                <CardDescription>
                  Real-time stock tracking with low inventory alerts and automated 
                  reorder points.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Shop Customization */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Store className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Shop Customization</CardTitle>
                <CardDescription>
                  Customize your store name, banner, logo, and create custom discount 
                  codes for customers.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Secure Platform */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Secure & Compliant</CardTitle>
                <CardDescription>
                  Enterprise-grade security with compliance documentation and 
                  legal agreement management.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Vendor Dashboard
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get a complete overview of your business with our intuitive dashboard
            </p>
          </div>

          <Card className="max-w-4xl mx-auto border-0 shadow-2xl">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-2xl text-gray-900">$24,890</h3>
                  <p className="text-gray-600">Total Revenue</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-2xl text-gray-900">340</h3>
                  <p className="text-gray-600">Total Orders</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-2xl text-gray-900">1,245</h3>
                  <p className="text-gray-600">Customers</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold text-2xl text-gray-900">4.6</h3>
                  <p className="text-gray-600">Avg. Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Start Selling?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Join thousands of successful vendors who trust our platform to grow their business.
              Complete registration takes less than 10 minutes.
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              onClick={handleVendorRegistration}
              className="text-lg px-8 py-6 bg-white text-primary hover:bg-gray-100"
            >
              Begin Vendor Registration
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Store className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold">VendorHub</h3>
          </div>
          <p className="text-center text-gray-400">
            © 2024 VendorHub. Complete e-commerce vendor registration platform.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
