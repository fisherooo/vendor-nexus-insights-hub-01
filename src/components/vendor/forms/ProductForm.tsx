
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Upload, Image } from "lucide-react";

interface ProductFormProps {
  product?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    category: product?.category || "",
    stock: product?.stock || "",
    minStock: product?.minStock || "",
    maxStock: product?.maxStock || "",
    reorderPoint: product?.reorderPoint || "",
    images: product?.images || [],
    colors: product?.colors || [],
    sizes: product?.sizes || [],
    weight: product?.weight || "",
    dimensions: product?.dimensions || "",
    sku: product?.sku || "",
    brand: product?.brand || "",
    tags: product?.tags || []
  });

  const [newColor, setNewColor] = useState("");
  const [newSize, setNewSize] = useState("");

  const categories = [
    "Electronics", "Clothing", "Home & Garden", "Sports", "Books", 
    "Health & Beauty", "Toys", "Automotive", "Food & Beverages", "Other"
  ];

  const commonColors = [
    { name: "Black", code: "#000000" },
    { name: "White", code: "#FFFFFF" },
    { name: "Red", code: "#FF0000" },
    { name: "Blue", code: "#0000FF" },
    { name: "Green", code: "#008000" },
    { name: "Yellow", code: "#FFFF00" },
    { name: "Purple", code: "#800080" },
    { name: "Orange", code: "#FFA500" },
    { name: "Pink", code: "#FFC0CB" },
    { name: "Gray", code: "#808080" }
  ];

  const commonSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  const availableTags = [
    "Summer", "Winter", "Casual", "Formal", "Cotton", "Polyester", "Silk", "Wool",
    "Waterproof", "Breathable", "Eco-friendly", "Organic", "Premium", "Budget",
    "Limited Edition", "Best Seller", "New Arrival", "On Sale", "Trending", "Classic"
  ];

  const addColor = (color: string) => {
    if (color && !formData.colors.includes(color)) {
      setFormData(prev => ({
        ...prev,
        colors: [...prev.colors, color]
      }));
      setNewColor("");
    }
  };

  const removeColor = (color: string) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter(c => c !== color)
    }));
  };

  const addSize = (size: string) => {
    if (size && !formData.sizes.includes(size)) {
      setFormData(prev => ({
        ...prev,
        sizes: [...prev.sizes, size]
      }));
      setNewSize("");
    }
  };

  const removeSize = (size: string) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.filter(s => s !== size)
    }));
  };

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleImageUpload = () => {
    if (formData.images.length >= 4) {
      alert("Maximum 4 images allowed per product");
      return;
    }
    
    // Simulate image upload
    const newImage = `product_image_${Date.now()}.jpg`;
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, newImage]
    }));
  };

  const removeImage = (imageIndex: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== imageIndex)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Product Images */}
      <Card>
        <CardHeader>
          <CardTitle>Product Images (Max 4)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.images.map((image, index) => (
              <div key={index} className="relative group">
                <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Image className="w-8 h-8 text-gray-400" />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImage(index)}
                >
                  <X className="w-3 h-3" />
                </Button>
                <p className="text-xs text-gray-600 mt-1 truncate">{image}</p>
              </div>
            ))}
            {formData.images.length < 4 && (
              <Button
                type="button"
                variant="outline"
                className="w-full h-32 border-dashed"
                onClick={handleImageUpload}
              >
                <div className="text-center">
                  <Upload className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm">Upload Image</span>
                </div>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="stock">Current Stock *</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                value={formData.sku}
                onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                placeholder="e.g., SHIRT-BLK-L"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Management */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="minStock">Minimum Stock Level *</Label>
              <Input
                id="minStock"
                type="number"
                value={formData.minStock}
                onChange={(e) => setFormData(prev => ({ ...prev, minStock: e.target.value }))}
                placeholder="Low stock alert threshold"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Alert when stock reaches this level</p>
            </div>
            <div>
              <Label htmlFor="maxStock">Maximum Stock Level</Label>
              <Input
                id="maxStock"
                type="number"
                value={formData.maxStock}
                onChange={(e) => setFormData(prev => ({ ...prev, maxStock: e.target.value }))}
                placeholder="Maximum inventory capacity"
              />
            </div>
            <div>
              <Label htmlFor="reorderPoint">Reorder Point</Label>
              <Input
                id="reorderPoint"
                type="number"
                value={formData.reorderPoint}
                onChange={(e) => setFormData(prev => ({ ...prev, reorderPoint: e.target.value }))}
                placeholder="When to reorder stock"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Colors */}
      <Card>
        <CardHeader>
          <CardTitle>Colors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {commonColors.map((color) => (
              <Button
                key={color.name}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addColor(color.name)}
                className="flex items-center space-x-2"
                disabled={formData.colors.includes(color.name)}
              >
                <div 
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: color.code }}
                />
                <span>{color.name}</span>
              </Button>
            ))}
          </div>

          <div className="flex space-x-2">
            <Input
              placeholder="Add custom color"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addColor(newColor);
                }
              }}
            />
            <Button 
              type="button" 
              onClick={() => addColor(newColor)}
              disabled={!newColor.trim()}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.colors.map((color) => (
              <Badge key={color} variant="secondary" className="flex items-center space-x-1">
                <span>{color}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeColor(color)}
                  className="h-4 w-4 p-0 hover:bg-red-100"
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sizes */}
      <Card>
        <CardHeader>
          <CardTitle>Sizes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {commonSizes.map((size) => (
              <Button
                key={size}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addSize(size)}
                disabled={formData.sizes.includes(size)}
              >
                {size}
              </Button>
            ))}
          </div>

          <div className="flex space-x-2">
            <Input
              placeholder="Add custom size"
              value={newSize}
              onChange={(e) => setNewSize(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addSize(newSize);
                }
              }}
            />
            <Button 
              type="button" 
              onClick={() => addSize(newSize)}
              disabled={!newSize.trim()}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.sizes.map((size) => (
              <Badge key={size} variant="secondary" className="flex items-center space-x-1">
                <span>{size}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSize(size)}
                  className="h-4 w-4 p-0 hover:bg-red-100"
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle>Tags</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Add Tags</Label>
            <Select onValueChange={addTag}>
              <SelectTrigger>
                <SelectValue placeholder="Select tags for your product" />
              </SelectTrigger>
              <SelectContent>
                {availableTags.filter(tag => !formData.tags.includes(tag)).map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="flex items-center space-x-1">
                <span>{tag}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTag(tag)}
                  className="h-4 w-4 p-0 hover:bg-red-100"
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Details */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.01"
                value={formData.weight}
                onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="dimensions">Dimensions (L x W x H cm)</Label>
              <Input
                id="dimensions"
                value={formData.dimensions}
                onChange={(e) => setFormData(prev => ({ ...prev, dimensions: e.target.value }))}
                placeholder="e.g., 30 x 20 x 10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" style={{ backgroundColor: '#00B14F' }} className="text-white">
          {product ? "Update Product" : "Add Product"}
        </Button>
      </div>
    </form>
  );
}
