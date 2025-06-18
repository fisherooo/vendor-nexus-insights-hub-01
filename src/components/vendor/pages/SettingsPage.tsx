
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { User, Plus, Trash2, Edit } from "lucide-react";

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
}

export function SettingsPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      permissions: ["All"],
      lastLogin: "2024-01-15",
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
      lastLogin: "2024-01-14",
      status: "active",
      addedBy: "John Doe",
      addedDate: "2024-01-10"
    }
  ]);

  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "",
    permissions: [] as string[]
  });

  const roles = ["Admin", "Manager", "Editor", "Viewer"];
  const availablePermissions = [
    "Products", "Orders", "Analytics", "Inventory", "Settings", "Team Management"
  ];

  const addTeamMember = () => {
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
  };

  const removeMember = (id: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  const togglePermission = (permission: string) => {
    setNewMember(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account and team settings</p>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          {/* <TabsTrigger value="team">Team Management</TabsTrigger> */}
          <TabsTrigger value="account">Account Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

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
                    <Button>
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
                        <Label htmlFor="memberName">Name</Label>
                        <Input
                          id="memberName"
                          value={newMember.name}
                          onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter member name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="memberEmail">Email</Label>
                        <Input
                          id="memberEmail"
                          type="email"
                          value={newMember.email}
                          onChange={(e) => setNewMember(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="Enter email address"
                        />
                      </div>
                      <div>
                        <Label htmlFor="memberRole">Role</Label>
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
                        <Button onClick={addTeamMember} disabled={!newMember.name || !newMember.email || !newMember.role}>
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
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.email}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline">{member.role}</Badge>
                          <Badge variant={member.status === "active" ? "default" : "secondary"}>
                            {member.status}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {member.permissions.map((permission) => (
                            <Badge key={permission} variant="secondary" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Last login: {member.lastLogin}</p>
                      <p className="text-xs text-gray-500">Added by {member.addedBy} on {member.addedDate}</p>
                      <div className="flex space-x-2 mt-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => removeMember(member.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent> */}

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Update your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="john@example.com" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue="+1 (555) 123-4567" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Notification settings will be available soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
