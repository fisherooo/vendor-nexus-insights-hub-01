import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, X, Plus } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface ProductVariant {
  id: string;
  color: string;
  colorCode: string;
  size?: string;
  stock: number;
  price?: number;
}

interface ProductFormProps {
  product?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    images: [] as string[],
    tags: "",
    weight: "",
    dimensions: "",
    brand: "",
    sku: ""
  });

  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [newVariant, setNewVariant] = useState({
    color: "",
    colorCode: "#000000",
    size: "",
    stock: "",
    price: ""
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price?.toString() || "",
        category: product.category || "",
        stock: product.stock?.toString() || "",
        images: product.images || [],
        tags: product.tags || "",
        weight: product.weight || "",
        dimensions: product.dimensions || "",
        brand: product.brand || "",
        sku: product.sku || ""
      });
      setVariants(product.variants || []);
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      variants: variants
    };
    onSubmit(productData);
    toast("Product saved successfully!");
  };

  const handleImageUpload = () => {
    const newImage = `product_image_${Date.now()}.jpg`;
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, newImage]
    }));
    toast("Image uploaded successfully!");
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addVariant = () => {
    if (!newVariant.color || !newVariant.stock) {
      toast("Please fill in color and stock for the variant");
      return;
    }

    const variant: ProductVariant = {
      id: Date.now().toString(),
      color: newVariant.color,
      colorCode: newVariant.colorCode,
      size: newVariant.size,
      stock: parseInt(newVariant.stock),
      price: newVariant.price ? parseFloat(newVariant.price) : undefined
    };

    setVariants([...variants, variant]);
    setNewVariant({
      color: "",
      colorCode: "#000000",
      size: "",
      stock: "",
      price: ""
    });
    toast("Variant added successfully!");
  };

  const removeVariant = (id: string) => {
    setVariants(variants.filter(v => v.id !== id));
    toast("Variant removed");
  };

  const categories = [
    "Electronics", "Clothing", "Home & Garden", "Sports", "Books", "Toys", "Beauty", "Automotive", "Furniture", "Kitchen"
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your product..."
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Base Price ($) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <Label htmlFor="stock">Base Stock *</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                placeholder="0"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                placeholder="Brand name"
              />
            </div>
            <div>
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                value={formData.sku}
                onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                placeholder="Product SKU"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Product Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button type="button" variant="outline" onClick={handleImageUpload} className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative border rounded-lg p-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm truncate">{image}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeImage(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div>
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              placeholder="Enter tags separated by commas"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="weight">Weight (lbs)</Label>
              <Input
                id="weight"
                value={formData.weight}
                onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                placeholder="0.0"
              />
            </div>
            <div>
              <Label htmlFor="dimensions">Dimensions</Label>
              <Input
                id="dimensions"
                value={formData.dimensions}
                onChange={(e) => setFormData(prev => ({ ...prev, dimensions: e.target.value }))}
                placeholder="L x W x H"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Product Variants Section */}
      <Card>
        <CardHeader>
          <CardTitle>Product Variants (Colors, Sizes)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Add New Variant */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 border rounded-lg">
              <div>
                <Label>Color Name</Label>
                <Input
                  value={newVariant.color}
                  onChange={(e) => setNewVariant(prev => ({ ...prev, color: e.target.value }))}
                  placeholder="Red, Blue, etc."
                />
              </div>
              <div>
                <Label>Color Code</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={newVariant.colorCode}
                    onChange={(e) => setNewVariant(prev => ({ ...prev, colorCode: e.target.value }))}
                    className="w-12 h-9"
                  />
                  <Input
                    value={newVariant.colorCode}
                    onChange={(e) => setNewVariant(prev => ({ ...prev, colorCode: e.target.value }))}
                    placeholder="#000000"
                    className="flex-1"
                  />
                </div>
              </div>
              <div>
                <Label>Size (Optional)</Label>
                <Select value={newVariant.size} onValueChange={(value) => setNewVariant(prev => ({ ...prev, size: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Size" />
                  </SelectTrigger>
                  <SelectContent>
                    {sizes.map((size) => (
                      <SelectItem key={size} value={size}>{size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Stock</Label>
                <Input
                  type="number"
                  value={newVariant.stock}
                  onChange={(e) => setNewVariant(prev => ({ ...prev, stock: e.target.value }))}
                  placeholder="0"
                />
              </div>
              <div className="flex items-end">
                <Button type="button" onClick={addVariant} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>

            {/* Existing Variants */}
            {variants.length > 0 && (
              <div className="space-y-2">
                <Label>Current Variants:</Label>
                {variants.map((variant) => (
                  <div key={variant.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-8 h-8 rounded-full border-2"
                        style={{ backgroundColor: variant.colorCode }}
                      />
                      <div>
                        <span className="font-medium">{variant.color}</span>
                        {variant.size && <Badge variant="outline" className="ml-2">{variant.size}</Badge>}
                        <p className="text-sm text-gray-600">Stock: {variant.stock}</p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeVariant(variant.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" style={{ backgroundColor: '#00B14F' }} className="text-white hover:opacity-90">
          {product ? "Update Product" : "Add Product"}
        </Button>
      </div>
    </form>
  );
}
