import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Shield, User, Lock, Key, Plus, Trash2, AlertTriangle } from "lucide-react";

interface AdditionalUser {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
}

interface SecurityAccessStepProps {
  data: any;
  onDataUpdate: (data: any) => void;
}

const SecurityAccessStep = ({ data, onDataUpdate }: SecurityAccessStepProps) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    twoFactorEnabled: false,
    securityQuestions: [],
    dataAccessPolicies: [],
    additionalUsers: [],
    passwordRequirements: true,
    sessionTimeout: "30",
    ipRestrictions: false,
    allowedIpAddresses: "",
    ...data
  });

  const [currentUser, setCurrentUser] = useState<AdditionalUser>({
    id: "",
    name: "",
    email: "",
    role: "",
    permissions: []
  });

  const [isAddingUser, setIsAddingUser] = useState(false);

  useEffect(() => {
    onDataUpdate(formData);
  }, [formData, onDataUpdate]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleDataAccessPolicy = (policy: string) => {
    const current = formData.dataAccessPolicies || [];
    const updated = current.includes(policy)
      ? current.filter((p: string) => p !== policy)
      : [...current, policy];
    handleChange("dataAccessPolicies", updated);
  };

  const toggleUserPermission = (permission: string) => {
    const current = currentUser.permissions || [];
    const updated = current.includes(permission)
      ? current.filter((p: string) => p !== permission)
      : [...current, permission];
    setCurrentUser(prev => ({ ...prev, permissions: updated }));
  };

  const addUser = () => {
    if (!currentUser.name || !currentUser.email || !currentUser.role) return;

    const userWithId = {
      ...currentUser,
      id: Date.now().toString()
    };

    handleChange("additionalUsers", [...formData.additionalUsers, userWithId]);
    setCurrentUser({ id: "", name: "", email: "", role: "", permissions: [] });
    setIsAddingUser(false);
  };

  const removeUser = (userId: string) => {
    const updatedUsers = formData.additionalUsers.filter((user: AdditionalUser) => user.id !== userId);
    handleChange("additionalUsers", updatedUsers);
  };

  const userRoles = [
    "Administrator", "Manager", "Editor", "Viewer", "Customer Service", "Financial"
  ];

  const availablePermissions = [
    "Product Management", "Order Management", "Customer Data Access", 
    "Financial Reports", "Analytics Dashboard", "Settings Management",
    "User Management", "Marketing Tools", "Inventory Management"
  ];

  const dataAccessPolicies = [
    "Encrypt all sensitive data",
    "Regular security audits",
    "Automatic logout after inactivity",
    "Strong password requirements",
    "Two-factor authentication",
    "Access logging and monitoring",
    "Data backup and recovery",
    "Compliance with privacy regulations"
  ];

  const passwordStrength = (password: string) => {
    if (password.length < 8) return { strength: "weak", message: "Password must be at least 8 characters" };
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) return { strength: "medium", message: "Include uppercase, lowercase, and numbers" };
    if (!/(?=.*[!@#$%^&*])/.test(password)) return { strength: "good", message: "Add special characters for better security" };
    return { strength: "strong", message: "Strong password" };
  };

  const passwordCheck = passwordStrength(formData.password);

  return (
    <div className="space-y-6">
      {/* Main Account Credentials */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Main Account Credentials</span>
          </CardTitle>
          <CardDescription>
            Set up your primary login credentials for the vendor portal.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="username">Username *</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => handleChange("username", e.target.value)}
              placeholder="Choose a unique username"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="Create a strong password"
                required
              />
              {formData.password && (
                <div className="mt-1 text-xs">
                  <span className={`
                    ${passwordCheck.strength === "weak" ? "text-red-600" : ""}
                    ${passwordCheck.strength === "medium" ? "text-yellow-600" : ""}
                    ${passwordCheck.strength === "good" ? "text-blue-600" : ""}
                    ${passwordCheck.strength === "strong" ? "text-green-600" : ""}
                  `}>
                    {passwordCheck.message}
                  </span>
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                placeholder="Confirm your password"
                required
              />
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <div className="mt-1 text-xs text-red-600">
                  Passwords do not match
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Security Settings</span>
          </CardTitle>
          <CardDescription>
            Configure additional security measures for your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="twoFactorEnabled"
              checked={formData.twoFactorEnabled}
              onCheckedChange={(checked) => handleChange("twoFactorEnabled", checked)}
            />
            <Label htmlFor="twoFactorEnabled" className="text-sm">
              Enable Two-Factor Authentication (Recommended)
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="passwordRequirements"
              checked={formData.passwordRequirements}
              onCheckedChange={(checked) => handleChange("passwordRequirements", checked)}
            />
            <Label htmlFor="passwordRequirements" className="text-sm">
              Enforce strong password requirements for all users
            </Label>
          </div>

          <div>
            <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
            <Select value={formData.sessionTimeout} onValueChange={(value) => handleChange("sessionTimeout", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select timeout" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
                <SelectItem value="480">8 hours</SelectItem>
                <SelectItem value="never">Never (Not recommended)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ipRestrictions"
                checked={formData.ipRestrictions}
                onCheckedChange={(checked) => handleChange("ipRestrictions", checked)}
              />
              <Label htmlFor="ipRestrictions" className="text-sm">
                Restrict access to specific IP addresses
              </Label>
            </div>
            
            {formData.ipRestrictions && (
              <div>
                <Label htmlFor="allowedIpAddresses">Allowed IP Addresses</Label>
                <Input
                  id="allowedIpAddresses"
                  value={formData.allowedIpAddresses}
                  onChange={(e) => handleChange("allowedIpAddresses", e.target.value)}
                  placeholder="192.168.1.1, 203.0.113.0/24 (comma separated)"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Data Access Policies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lock className="w-5 h-5" />
            <span>Data Access Policies</span>
          </CardTitle>
          <CardDescription>
            Acknowledge and agree to platform security standards.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {dataAccessPolicies.map((policy) => (
              <div key={policy} className="flex items-center space-x-2">
                <Checkbox
                  id={policy}
                  checked={formData.dataAccessPolicies?.includes(policy)}
                  onCheckedChange={() => toggleDataAccessPolicy(policy)}
                />
                <Label htmlFor={policy} className="text-sm">
                  {policy}
                </Label>
              </div>
            ))}
          </div>

          {formData.dataAccessPolicies?.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Acknowledged policies:</p>
              <div className="flex flex-wrap gap-1">
                {formData.dataAccessPolicies.map((policy: string) => (
                  <Badge key={policy} variant="secondary" className="text-xs">{policy}</Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Additional Users */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Key className="w-5 h-5" />
            <span>Additional Users</span>
          </CardTitle>
          <CardDescription>
            Add additional team members who need access to your vendor account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Existing Users */}
          {formData.additionalUsers.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium">Team Members ({formData.additionalUsers.length})</h4>
              {formData.additionalUsers.map((user: AdditionalUser) => (
                <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-600">{user.email}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline">{user.role}</Badge>
                      {user.permissions.length > 0 && (
                        <span className="text-xs text-gray-500">
                          {user.permissions.length} permissions
                        </span>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeUser(user.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Separator />
            </div>
          )}

          {/* Add New User */}
          {!isAddingUser ? (
            <Button
              variant="outline"
              onClick={() => setIsAddingUser(true)}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Team Member
            </Button>
          ) : (
            <div className="space-y-4 border rounded-lg p-4">
              <h4 className="font-medium">Add New Team Member</h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="userName">Full Name *</Label>
                  <Input
                    id="userName"
                    value={currentUser.name}
                    onChange={(e) => setCurrentUser(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <Label htmlFor="userEmail">Email Address *</Label>
                  <Input
                    id="userEmail"
                    type="email"
                    value={currentUser.email}
                    onChange={(e) => setCurrentUser(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="user@company.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="userRole">Role *</Label>
                <Select value={currentUser.role} onValueChange={(value) => setCurrentUser(prev => ({ ...prev, role: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {userRoles.map((role) => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Permissions</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {availablePermissions.map((permission) => (
                    <Button
                      key={permission}
                      variant={currentUser.permissions?.includes(permission) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleUserPermission(permission)}
                      className="justify-start text-xs"
                    >
                      {permission}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button onClick={addUser} disabled={!currentUser.name || !currentUser.email || !currentUser.role}>
                  Add User
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAddingUser(false);
                    setCurrentUser({ id: "", name: "", email: "", role: "", permissions: [] });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-center space-x-2 text-amber-800">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">Security Notice</span>
            </div>
            <p className="text-amber-700 text-xs mt-1">
              Additional users will receive email invitations to create their own passwords. 
              You can manage their permissions at any time from your account settings.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityAccessStep;
