import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { User, Edit, Plus, Trash2, Shield, Mail, Phone, Calendar, MapPin, Building, Globe, Star } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  lastLogin: string;
  status: "active" | "inactive";
  addedBy: string;
  addedDate: string;
  avatar?: string;
}

export function ProfilePage() {
  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    company: "Doe Electronics",
    address: "123 Business St, City, State 12345",
    joinedDate: "January 2024",
    totalSales: "$45,230",
    totalOrders: "892",
    website: "www.doeelectronics.com",
    businessType: "Electronics Retailer",
    taxId: "12-3456789",
    bankAccount: "****1234",
    shippingRegions: ["North America", "Europe"],
    businessHours: "9:00 AM - 6:00 PM EST",
    description: "Leading provider of quality electronics and accessories with over 10 years of experience.",
    socialMedia: {
      facebook: "facebook.com/doeelectronics",
      instagram: "@doeelectronics",
      twitter: "@doeelectronics"
    }
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Owner",
      permissions: ["All"],
      lastLogin: "Just now",
      status: "active",
      addedBy: "System",
      addedDate: "2024-01-01"
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Manager",
      permissions: ["Products", "Orders", "Analytics"],
      lastLogin: "2 hours ago",
      status: "active",
      addedBy: "John Doe",
      addedDate: "2024-01-10"
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "Editor",
      permissions: ["Products", "Inventory"],
      lastLogin: "1 day ago",
      status: "active",
      addedBy: "John Doe",
      addedDate: "2024-01-15"
    }
  ]);

  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "",
    permissions: [] as string[]
  });

  const roles = ["Manager", "Editor", "Viewer"];
  const availablePermissions = [
    "Products", "Orders", "Analytics", "Inventory", "Settings", "Team Management", "Notifications"
  ];

  const addTeamMember = () => {
    if (!newMember.name || !newMember.email || !newMember.role) {
      toast("Please fill in all required fields");
      return;
    }

    const member: TeamMember = {
      id: Date.now().toString(),
      ...newMember,
      lastLogin: "Never",
      status: "active",
      addedBy: "John Doe",
      addedDate: new Date().toISOString().split('T')[0]
    };
    setTeamMembers([...teamMembers, member]);
    setNewMember({ name: "", email: "", role: "", permissions: [] });
    setIsAddingMember(false);
    toast("Team member added successfully!");
  };

  const removeMember = (id: string) => {
    if (teamMembers.find(m => m.id === id)?.role === "Owner") {
      toast("Cannot remove the owner");
      return;
    }
    setTeamMembers(teamMembers.filter(member => member.id !== id));
    toast("Team member removed");
  };

  const togglePermission = (permission: string) => {
    setNewMember(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const updateProfile = () => {
    toast("Profile updated successfully!");
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "owner": return "bg-purple-100 text-purple-800";
      case "manager": return "bg-blue-100 text-blue-800";
      case "editor": return "bg-green-100 text-green-800";
      case "viewer": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile & Business</h1>
        <p className="text-gray-600 mt-1">Manage your profile and business information</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Business Profile</TabsTrigger>
          {/* <TabsTrigger value="team">Team Management</TabsTrigger> */}
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Profile Picture & Quick Stats */}
            <Card>
              <CardContent className="p-6 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarFallback className="text-2xl">JD</AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-lg">{userProfile.name}</h3>
                <p className="text-gray-600">{userProfile.email}</p>
                <Badge className="mt-2" style={{ backgroundColor: '#00B14F' }}>
                  Store Owner
                </Badge>
                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-600">Total Sales</p>
                    <p className="font-bold">{userProfile.totalSales}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Orders</p>
                    <p className="font-bold">{userProfile.totalOrders}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2 mt-4 pt-4 border-t">
                  <div className="flex items-center justify-center space-x-1">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Joined {userProfile.joinedDate}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600">4.8 Rating</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile Information */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Business Information</CardTitle>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Information */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Basic Information</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={userProfile.name}
                          onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={userProfile.email}
                          onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={userProfile.phone}
                          onChange={(e) => setUserProfile(prev => ({ ...prev, phone: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="company">Company Name</Label>
                        <Input
                          id="company"
                          value={userProfile.company}
                          onChange={(e) => setUserProfile(prev => ({ ...prev, company: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Business Details */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Business Details</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="businessType">Business Type</Label>
                        <Select value={userProfile.businessType}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Electronics Retailer">Electronics Retailer</SelectItem>
                            <SelectItem value="Fashion & Apparel">Fashion & Apparel</SelectItem>
                            <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                            <SelectItem value="Health & Beauty">Health & Beauty</SelectItem>
                            <SelectItem value="Books & Media">Books & Media</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="taxId">Tax ID</Label>
                        <Input
                          id="taxId"
                          value={userProfile.taxId}
                          onChange={(e) => setUserProfile(prev => ({ ...prev, taxId: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={userProfile.website}
                          onChange={(e) => setUserProfile(prev => ({ ...prev, website: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="businessHours">Business Hours</Label>
                        <Input
                          id="businessHours"
                          value={userProfile.businessHours}
                          onChange={(e) => setUserProfile(prev => ({ ...prev, businessHours: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address & Contact */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Address & Contact</h4>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="address">Business Address</Label>
                        <Input
                          id="address"
                          value={userProfile.address}
                          onChange={(e) => setUserProfile(prev => ({ ...prev, address: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Business Description</Label>
                        <textarea
                          id="description"
                          className="w-full p-3 border rounded-md"
                          rows={3}
                          value={userProfile.description}
                          onChange={(e) => setUserProfile(prev => ({ ...prev, description: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Social Media</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="facebook">Facebook</Label>
                        <Input
                          id="facebook"
                          value={userProfile.socialMedia.facebook}
                          onChange={(e) => setUserProfile(prev => ({ 
                            ...prev, 
                            socialMedia: { ...prev.socialMedia, facebook: e.target.value }
                          }))}
                          placeholder="facebook.com/yourpage"
                        />
                      </div>
                      <div>
                        <Label htmlFor="instagram">Instagram</Label>
                        <Input
                          id="instagram"
                          value={userProfile.socialMedia.instagram}
                          onChange={(e) => setUserProfile(prev => ({ 
                            ...prev, 
                            socialMedia: { ...prev.socialMedia, instagram: e.target.value }
                          }))}
                          placeholder="@yourbusiness"
                        />
                      </div>
                      <div>
                        <Label htmlFor="twitter">Twitter</Label>
                        <Input
                          id="twitter"
                          value={userProfile.socialMedia.twitter}
                          onChange={(e) => setUserProfile(prev => ({ 
                            ...prev, 
                            socialMedia: { ...prev.socialMedia, twitter: e.target.value }
                          }))}
                          placeholder="@yourbusiness"
                        />
                      </div>
                    </div>
                  </div>

                  <Button onClick={updateProfile} style={{ backgroundColor: '#00B14F' }} className="text-white">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>
                    Manage your team members and their permissions
                  </CardDescription>
                </div>
                <Dialog open={isAddingMember} onOpenChange={setIsAddingMember}>
                  <DialogTrigger asChild>
                    <Button style={{ backgroundColor: '#00B14F' }} className="text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Team Member</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="memberName">Full Name *</Label>
                        <Input
                          id="memberName"
                          value={newMember.name}
                          onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter member name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="memberEmail">Email Address *</Label>
                        <Input
                          id="memberEmail"
                          type="email"
                          value={newMember.email}
                          onChange={(e) => setNewMember(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="Enter email address"
                        />
                      </div>
                      <div>
                        <Label htmlFor="memberRole">Role *</Label>
                        <Select value={newMember.role} onValueChange={(value) => setNewMember(prev => ({ ...prev, role: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role} value={role}>{role}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Permissions</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {availablePermissions.map((permission) => (
                            <Button
                              key={permission}
                              variant={newMember.permissions.includes(permission) ? "default" : "outline"}
                              size="sm"
                              onClick={() => togglePermission(permission)}
                              className="justify-start"
                              style={newMember.permissions.includes(permission) ? { backgroundColor: '#00B14F' } : {}}
                            >
                              {permission}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsAddingMember(false)}>
                          Cancel
                        </Button>
                        <Button 
                          onClick={addTeamMember} 
                          disabled={!newMember.name || !newMember.email || !newMember.role}
                          style={{ backgroundColor: '#00B14F' }}
                          className="text-white"
                        >
                          Add Member
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{member.name}</h3>
                          {member.role === "Owner" && <Shield className="w-4 h-4 text-purple-600" />}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span>{member.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className={getRoleColor(member.role)}>
                            {member.role}
                          </Badge>
                          <Badge variant={member.status === "active" ? "default" : "secondary"}>
                            {member.status}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {member.permissions.slice(0, 3).map((permission) => (
                            <Badge key={permission} variant="secondary" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                          {member.permissions.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{member.permissions.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Last login: {member.lastLogin}</p>
                      <p className="text-xs text-gray-500">Added by {member.addedBy}</p>
                      <div className="flex space-x-2 mt-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        {member.role !== "Owner" && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => removeMember(member.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent> */}

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <Button style={{ backgroundColor: '#00B14F' }} className="text-white">
                Update Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
