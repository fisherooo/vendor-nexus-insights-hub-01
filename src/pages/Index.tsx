
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
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [currentView, setCurrentView] = useState<"home" | "onboarding" | "dashboard">("home");
  const navigate = useNavigate();

  if (currentView === "onboarding") {
    return <VendorOnboarding onBack={() => setCurrentView("home")} />;
  }

  if (currentView === "dashboard") {
    return <VendorDashboard onBack={() => setCurrentView("home")} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30">
      {/* Header */}
      <header className="glass-effect border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-green-600 rounded-lg flex items-center justify-center shadow-lg">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">VendorHub</h1>
                <p className="text-sm text-gray-600">E-Commerce Vendor Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => setCurrentView("dashboard")} className="glass-effect border-white/30">
                Vendor Dashboard
              </Button>
              <Button onClick={() => setCurrentView("onboarding")} className="bg-gradient-to-r from-primary to-green-600 hover:from-green-600 hover:to-primary">
                Register as Vendor
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-blue-500/5"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4 glass-effect border-primary/20 text-primary">
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
              <Button size="lg" onClick={() => setCurrentView("onboarding")} className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-green-600 hover:from-green-600 hover:to-primary shadow-lg">
                Start Vendor Registration
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => setCurrentView("dashboard")} className="text-lg px-8 py-6 glass-effect border-white/30 hover:bg-white/20">
                View Dashboard Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-white/50 to-gray-50/50">
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
            <Card className="glass-effect border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 card-hover">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-green-100 rounded-lg flex items-center justify-center mb-4">
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
            <Card className="glass-effect border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 card-hover">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Analytics & Reports</CardTitle>
                <CardDescription>
                  Track sales performance, customer ratings, and detailed analytics 
                  to grow your business.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Team Management */}
            <Card className="glass-effect border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 card-hover">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Team Collaboration</CardTitle>
                <CardDescription>
                  Add team members with custom roles and permissions. Track who made 
                  changes and when.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Inventory Management */}
            <Card className="glass-effect border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 card-hover">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <ShoppingCart className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Inventory Control</CardTitle>
                <CardDescription>
                  Real-time stock tracking with low inventory alerts and automated 
                  reorder points.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Shop Customization */}
            <Card className="glass-effect border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 card-hover">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <Store className="w-6 h-6 text-teal-600" />
                </div>
                <CardTitle>Shop Customization</CardTitle>
                <CardDescription>
                  Customize your store name, banner, logo, and create custom discount 
                  codes for customers.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Secure Platform */}
            <Card className="glass-effect border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 card-hover">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-gray-600" />
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
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Vendor Dashboard
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get a complete overview of your business with our intuitive dashboard
            </p>
          </div>

          <Card className="max-w-4xl mx-auto glass-effect border-white/30 shadow-2xl">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100/50 rounded-lg">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-2xl text-gray-900">$24,890</h3>
                  <p className="text-gray-600">Total Revenue</p>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-2xl text-gray-900">340</h3>
                  <p className="text-gray-600">Total Orders</p>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-lg">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-2xl text-gray-900">1,245</h3>
                  <p className="text-gray-600">Customers</p>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100/50 rounded-lg">
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
      <section className="py-20 bg-gradient-to-r from-primary via-green-600 to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
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
              onClick={() => setCurrentView("onboarding")}
              className="text-lg px-8 py-6 bg-white text-primary hover:bg-gray-100 shadow-lg"
            >
              Begin Vendor Registration
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-green-600 rounded-lg flex items-center justify-center">
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
