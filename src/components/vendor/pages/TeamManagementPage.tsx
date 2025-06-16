
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, User, Settings } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff' | 'viewer';
  addedBy: string;
  dateAdded: string;
  lastActive: string;
}

export function TeamManagementPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      role: 'admin',
      addedBy: 'Owner',
      dateAdded: '2024-01-01',
      lastActive: '2024-01-15'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'manager',
      addedBy: 'John Smith',
      dateAdded: '2024-01-05',
      lastActive: '2024-01-14'
    }
  ]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'staff' as const
  });

  const roleColors = {
    admin: '#FF0000',
    manager: '#00B14F',
    staff: '#FFA500',
    viewer: '#6B7280'
  };

  const rolePermissions = {
    admin: ['All permissions', 'Manage team', 'Delete products', 'Financial access'],
    manager: ['Manage products', 'View analytics', 'Manage inventory', 'Customer support'],
    staff: ['Add products', 'Update inventory', 'View orders'],
    viewer: ['View products', 'View basic analytics']
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      addedBy: 'Current User',
      dateAdded: new Date().toISOString().split('T')[0],
      lastActive: 'Never'
    };

    setTeamMembers(prev => [...prev, newMember]);
    setFormData({ name: '', email: '', role: 'staff' });
    setIsAddOpen(false);
  };

  const updateRole = (memberId: string, newRole: TeamMember['role']) => {
    setTeamMembers(prev => prev.map(member => 
      member.id === memberId ? { ...member, role: newRole } : member
    ));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Team Management</h1>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button style={{ backgroundColor: '#00B14F' }} className="text-white hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Team Member</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={formData.role} onValueChange={(value: TeamMember['role']) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full" style={{ backgroundColor: '#00B14F' }}>
                Add Member
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Team Members List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.email}</p>
                  </div>
                </div>
                <Badge style={{ backgroundColor: roleColors[member.role], color: 'white' }}>
                  {member.role.toUpperCase()}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Added by:</span>
                  <span>{member.addedBy}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Date added:</span>
                  <span>{member.dateAdded}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Last active:</span>
                  <span>{member.lastActive}</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-2">Permissions:</h4>
                <div className="space-y-1">
                  {rolePermissions[member.role].map((permission, index) => (
                    <div key={index} className="text-xs text-gray-600">
                      • {permission}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Select value={member.role} onValueChange={(value: TeamMember['role']) => updateRole(member.id, value)}>
                  <SelectTrigger className="flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Role Information */}
      <Card>
        <CardHeader>
          <CardTitle>Role Permissions Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(rolePermissions).map(([role, permissions]) => (
            <div key={role} className="border rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <Badge style={{ backgroundColor: roleColors[role as keyof typeof roleColors], color: 'white' }}>
                  {role.toUpperCase()}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {permissions.map((permission, index) => (
                  <div key={index} className="text-sm text-gray-600">
                    • {permission}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
