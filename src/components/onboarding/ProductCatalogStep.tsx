
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Upload, Image, Tag, Package } from "lucide-react";

interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  sku: string;
  upc: string;
  price: string;
  wholesalePrice: string;
  inventory: string;
  weight: string;
  dimensions: string;
  images: string[];
  variants: Array<{
    type: string;
    options: string[];
  }>;
  warranty: string;
}

interface ProductCatalogStepProps {
  data: any;
  onDataUpdate: (data: any) => void;
}

const ProductCatalogStep = ({ data, onDataUpdate }: ProductCatalogStepProps) => {
  const [products, setProducts] = useState<Product[]>(data.products || []);
  const [currentProduct, setCurrentProduct] = useState<Product>({
    id: "",
    title: "",
    description: "",
    category: "",
    sku: "",
    upc: "",
    price: "",
    wholesalePrice: "",
    inventory: "",
    weight: "",
    dimensions: "",
    images: [],
    variants: [],
    warranty: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);

  useEffect(() => {
    onDataUpdate({ products });
  }, [products, onDataUpdate]);

  const productCategories = [
    "Electronics", "Clothing & Apparel", "Home & Garden", "Sports & Outdoors",
    "Health & Beauty", "Books & Media", "Toys & Games", "Automotive",
    "Jewelry & Accessories", "Arts & Crafts", "Food & Beverages", "Pet Supplies"
  ];

  const handleProductChange = (field: string, value: string) => {
    setCurrentProduct(prev => ({ ...prev, [field]: value }));
  };

  const addVariant = () => {
    setCurrentProduct(prev => ({
      ...prev,
      variants: [...prev.variants, { type: "", options: [] }]
    }));
  };

  const updateVariant = (index: number, field: string, value: string | string[]) => {
    setCurrentProduct(prev => {
      const newVariants = [...prev.variants];
      if (field === "options") {
        newVariants[index].options = Array.isArray(value) ? value : value.split(",").map(v => v.trim());
      } else {
        newVariants[index][field as keyof typeof newVariants[0]] = value as never;
      }
      return { ...prev, variants: newVariants };
    });
  };

  const removeVariant = (index: number) => {
    setCurrentProduct(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  const saveProduct = () => {
    if (!currentProduct.title || !currentProduct.price) return;

    const productWithId = {
      ...currentProduct,
      id: currentProduct.id || Date.now().toString()
    };

    if (isEditing) {
      const newProducts = [...products];
      newProducts[editingIndex] = productWithId;
      setProducts(newProducts);
    } else {
      setProducts([...products, productWithId]);
    }

    // Reset form
    setCurrentProduct({
      id: "",
      title: "",
      description: "",
      category: "",
      sku: "",
      upc: "",
      price: "",
      wholesalePrice: "",
      inventory: "",
      weight: "",
      dimensions: "",
      images: [],
      variants: [],
      warranty: ""
    });
    setIsEditing(false);
    setEditingIndex(-1);
  };

  const editProduct = (index: number) => {
    setCurrentProduct(products[index]);
    setIsEditing(true);
    setEditingIndex(index);
  };

  const deleteProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const addProductImage = () => {
    setCurrentProduct(prev => ({
      ...prev,
      images: [...prev.images, `product_image_${prev.images.length + 1}.jpg`]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Product List */}
      {products.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="w-5 h-5" />
              <span>Your Products ({products.length})</span>
            </CardTitle>
            <CardDescription>
              Manage your product catalog. You can add, edit, or remove products at any time.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {products.map((product, index) => (
                <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{product.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>SKU: {product.sku}</span>
                      <span>Price: ${product.price}</span>
                      <span>Stock: {product.inventory}</span>
                      <Badge variant="outline">{product.category}</Badge>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => editProduct(index)}>
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => deleteProduct(index)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add/Edit Product Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>{isEditing ? "Edit Product" : "Add New Product"}</span>
          </CardTitle>
          <CardDescription>
            {isEditing ? "Update the product information below." : "Add a new product to your catalog with detailed information."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Product Information */}
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="productTitle">Product Title *</Label>
                <Input
                  id="productTitle"
                  value={currentProduct.title}
                  onChange={(e) => handleProductChange("title", e.target.value)}
                  placeholder="Enter product name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="productCategory">Category *</Label>
                <Select value={currentProduct.category} onValueChange={(value) => handleProductChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {productCategories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="productDescription">Product Description *</Label>
              <Textarea
                id="productDescription"
                value={currentProduct.description}
                onChange={(e) => handleProductChange("description", e.target.value)}
                placeholder="Detailed product description including features, benefits, and usage..."
                rows={4}
                required
              />
            </div>
          </div>

          <Separator />

          {/* Product Identifiers */}
          <div className="space-y-4">
            <h4 className="font-medium flex items-center space-x-2">
              <Tag className="w-4 h-4" />
              <span>Product Identifiers</span>
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="productSku">SKU (Stock Keeping Unit) *</Label>
                <Input
                  id="productSku"
                  value={currentProduct.sku}
                  onChange={(e) => handleProductChange("sku", e.target.value)}
                  placeholder="e.g., TEE-BLU-L-001"
                  required
                />
              </div>
              <div>
                <Label htmlFor="productUpc">UPC/EAN/ISBN Code</Label>
                <Input
                  id="productUpc"
                  value={currentProduct.upc}
                  onChange={(e) => handleProductChange("upc", e.target.value)}
                  placeholder="Universal product code"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Pricing and Inventory */}
          <div className="space-y-4">
            <h4 className="font-medium">Pricing & Inventory</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="productPrice">Retail Price *</Label>
                <Input
                  id="productPrice"
                  type="number"
                  step="0.01"
                  value={currentProduct.price}
                  onChange={(e) => handleProductChange("price", e.target.value)}
                  placeholder="0.00"
                  required
                />
              </div>
              <div>
                <Label htmlFor="productWholesalePrice">Wholesale Price</Label>
                <Input
                  id="productWholesalePrice"
                  type="number"
                  step="0.01"
                  value={currentProduct.wholesalePrice}
                  onChange={(e) => handleProductChange("wholesalePrice", e.target.value)}
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label htmlFor="productInventory">Stock Quantity *</Label>
                <Input
                  id="productInventory"
                  type="number"
                  value={currentProduct.inventory}
                  onChange={(e) => handleProductChange("inventory", e.target.value)}
                  placeholder="0"
                  required
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Physical Specifications */}
          <div className="space-y-4">
            <h4 className="font-medium">Physical Specifications</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="productWeight">Weight (lbs)</Label>
                <Input
                  id="productWeight"
                  value={currentProduct.weight}
                  onChange={(e) => handleProductChange("weight", e.target.value)}
                  placeholder="e.g., 1.5"
                />
              </div>
              <div>
                <Label htmlFor="productDimensions">Dimensions (L x W x H)</Label>
                <Input
                  id="productDimensions"
                  value={currentProduct.dimensions}
                  onChange={(e) => handleProductChange("dimensions", e.target.value)}
                  placeholder="e.g., 12 x 8 x 3 inches"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Product Images */}
          <div className="space-y-4">
            <h4 className="font-medium flex items-center space-x-2">
              <Image className="w-4 h-4" />
              <span>Product Images</span>
            </h4>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <div className="text-center">
                <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <Button variant="outline" onClick={addProductImage}>
                  <Upload className="w-4 h-4 mr-2" />
                  Add Product Image
                </Button>
              </div>
              {currentProduct.images.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {currentProduct.images.map((image, index) => (
                    <Badge key={index} variant="secondary">{image}</Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Product Variants */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Product Variants</h4>
              <Button variant="outline" size="sm" onClick={addVariant}>
                <Plus className="w-4 h-4 mr-2" />
                Add Variant
              </Button>
            </div>
            {currentProduct.variants.map((variant, index) => (
              <div key={index} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <Input
                    value={variant.type}
                    onChange={(e) => updateVariant(index, "type", e.target.value)}
                    placeholder="Variant type (e.g., Size, Color)"
                    className="flex-1 mr-2"
                  />
                  <Button variant="ghost" size="sm" onClick={() => removeVariant(index)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <Input
                  value={variant.options.join(", ")}
                  onChange={(e) => updateVariant(index, "options", e.target.value)}
                  placeholder="Options separated by commas (e.g., Small, Medium, Large)"
                />
              </div>
            ))}
          </div>

          <Separator />

          {/* Warranty Information */}
          <div>
            <Label htmlFor="productWarranty">Warranty Information</Label>
            <Textarea
              id="productWarranty"
              value={currentProduct.warranty}
              onChange={(e) => handleProductChange("warranty", e.target.value)}
              placeholder="Describe warranty terms and conditions..."
              rows={2}
            />
          </div>

          {/* Save Product Button */}
          <div className="flex justify-end space-x-2">
            {isEditing && (
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setEditingIndex(-1);
                  setCurrentProduct({
                    id: "",
                    title: "",
                    description: "",
                    category: "",
                    sku: "",
                    upc: "",
                    price: "",
                    wholesalePrice: "",
                    inventory: "",
                    weight: "",
                    dimensions: "",
                    images: [],
                    variants: [],
                    warranty: ""
                  });
                }}
              >
                Cancel
              </Button>
            )}
            <Button
              onClick={saveProduct}
              disabled={!currentProduct.title || !currentProduct.price}
            >
              {isEditing ? "Update Product" : "Add Product"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCatalogStep;
