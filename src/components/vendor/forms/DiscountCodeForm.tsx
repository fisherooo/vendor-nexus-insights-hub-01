
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface DiscountCodeFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function DiscountCodeForm({ onSubmit, onCancel }: DiscountCodeFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    percentage: "",
    minOrder: "",
    maxUses: "",
    expiryDate: undefined as Date | undefined,
    description: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDiscount = {
      id: Date.now().toString(),
      ...formData,
      currentUses: 0,
      active: true,
      expiryDate: formData.expiryDate ? format(formData.expiryDate, "yyyy-MM-dd") : ""
    };
    onSubmit(newDiscount);
  };

  const generateRandomCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, code: result }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Discount Code</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Discount Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Black Friday Sale"
                required
              />
            </div>
            <div>
              <Label htmlFor="code">Discount Code *</Label>
              <div className="flex space-x-2">
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                  placeholder="e.g., SAVE20"
                  required
                />
                <Button type="button" variant="outline" onClick={generateRandomCode}>
                  Generate
                </Button>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of the discount"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="percentage">Discount Percentage *</Label>
              <Input
                id="percentage"
                type="number"
                min="1"
                max="100"
                value={formData.percentage}
                onChange={(e) => setFormData(prev => ({ ...prev, percentage: e.target.value }))}
                placeholder="20"
                required
              />
            </div>
            <div>
              <Label htmlFor="minOrder">Minimum Order Value</Label>
              <Input
                id="minOrder"
                type="number"
                min="0"
                step="0.01"
                value={formData.minOrder}
                onChange={(e) => setFormData(prev => ({ ...prev, minOrder: e.target.value }))}
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="maxUses">Maximum Uses</Label>
              <Input
                id="maxUses"
                type="number"
                min="1"
                value={formData.maxUses}
                onChange={(e) => setFormData(prev => ({ ...prev, maxUses: e.target.value }))}
                placeholder="100"
              />
            </div>
          </div>

          <div>
            <Label>Expiry Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.expiryDate ? format(formData.expiryDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.expiryDate}
                  onSelect={(date) => setFormData(prev => ({ ...prev, expiryDate: date }))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" style={{ backgroundColor: '#00B14F' }} className="text-white">
              Create Discount Code
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
