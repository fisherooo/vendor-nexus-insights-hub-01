import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { X, Plus, Upload, Image, Eye, Save, Send } from "lucide-react";

interface ProductVariant {
  id: string;
  color: string;
  colorHex: string;
  size: string;
  price: string;
  stock: string;
  images: string[];
}

interface ProductUploadFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function ProductUploadForm({ onSubmit, onCancel }: ProductUploadFormProps) {
  const [formData, setFormData] = useState({
    // Category Selection
    mainCategory: "",
    subCategory: "",
    subSubCategory: "",
    
    // Product Core Info
    title: "",
    subtitle: "",
    brandName: "",
    hsnCode: "",
    modelNumber: "",
    gender: [] as string[],
    
    // Description & Highlights
    description: "",
    keyFeatures: [] as string[],
    howToUse: "",
    ingredients: "",
    
    // Variants
    variants: [] as ProductVariant[],
    
    // Images & Media
    mainImages: [] as string[],
    videoUrl: "",
    
    // Pricing & Inventory
    mrp: "",
    sellingPrice: "",
    taxClass: "",
    lowStockAlert: "",
    
    // Shipping & Packaging
    dimensions: { length: "", width: "", height: "" },
    weight: "",
    packType: "",
    dispatchTime: "",
    returnPolicy: "",
    codAvailable: false,
    
    // SEO
    searchTags: [] as string[],
    metaTitle: "",
    metaDescription: "",
    internalNotes: "",
    
    // Filters
    occasion: [] as string[],
    material: "",
    ecoFriendly: false,
    bestFor: [] as string[],
    
    // Visibility
    isLive: false,
    showInNewArrivals: false,
    featureOnHomepage: false,
    enableForCampaigns: false
  });

  const [newFeature, setNewFeature] = useState("");
  const [newTag, setNewTag] = useState("");
  const [currentVariant, setCurrentVariant] = useState<ProductVariant>({
    id: "",
    color: "",
    colorHex: "#000000",
    size: "",
    price: "",
    stock: "",
    images: []
  });

  // Category Options
  const mainCategories = [
    "Fashion", "Beauty & Personal Care", "Electronics", "Home & Kitchen",
    "Sports & Outdoors", "Books & Media", "Health & Wellness", "Automotive"
  ];

  const subCategories: Record<string, string[]> = {
    "Fashion": ["Men's Fashion", "Women's Fashion", "Kids Fashion", "Accessories"],
    "Beauty & Personal Care": ["Skincare", "Hair Care", "Makeup", "Fragrances"],
    "Electronics": ["Mobile & Tablets", "Computers", "Audio", "Gaming"],
    "Home & Kitchen": ["Furniture", "Appliances", "Decor", "Kitchenware"]
  };

  const subSubCategories: Record<string, string[]> = {
    "Men's Fashion": ["T-Shirts", "Shirts", "Jeans", "Shoes"],
    "Women's Fashion": ["Dresses", "Tops", "Bottoms", "Footwear"],
    "Skincare": ["Cleansers", "Moisturizers", "Serums", "Sunscreen"],
    "Hair Care": ["Shampoo", "Conditioner", "Hair Oil", "Styling Products"]
  };

  const genderOptions = ["Men", "Women", "Unisex", "Kids", "Baby"];
  const occasionOptions = ["Casual", "Festive", "Office", "Party", "Wedding", "Sports"];
  const bestForOptions = ["Oily Skin", "Dry Skin", "Sensitive Skin", "All Skin Types"];
  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL", "Free Size"];
  const colorOptions = [
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Red", hex: "#FF0000" },
    { name: "Blue", hex: "#0000FF" },
    { name: "Green", hex: "#008000" },
    { name: "Yellow", hex: "#FFFF00" },
    { name: "Pink", hex: "#FFC0CB" },
    { name: "Purple", hex: "#800080" }
  ];

  const addFeature = () => {
    if (newFeature.trim() && formData.keyFeatures.length < 10) {
      setFormData(prev => ({
        ...prev,
        keyFeatures: [...prev.keyFeatures, newFeature.trim()]
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      keyFeatures: prev.keyFeatures.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    if (newTag.trim()) {
      setFormData(prev => ({
        ...prev,
        searchTags: [...prev.searchTags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      searchTags: prev.searchTags.filter((_, i) => i !== index)
    }));
  };

  const addVariant = () => {
    if (currentVariant.color && currentVariant.size) {
      const newVariant = { 
        ...currentVariant, 
        id: Date.now().toString() 
      };
      setFormData(prev => ({
        ...prev,
        variants: [...prev.variants, newVariant]
      }));
      setCurrentVariant({
        id: "",
        color: "",
        colorHex: "#000000",
        size: "",
        price: "",
        stock: "",
        images: []
      });
    }
  };

  const removeVariant = (index: number) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  const addMainImage = () => {
    if (formData.mainImages.length < 6) {
      const newImage = `product_image_${Date.now()}.jpg`;
      setFormData(prev => ({
        ...prev,
        mainImages: [...prev.mainImages, newImage]
      }));
    }
  };

  const removeMainImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      mainImages: prev.mainImages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (isDraft: boolean = false) => {
    const submissionData = {
      ...formData,
      isDraft,
      submittedAt: new Date().toISOString()
    };
    onSubmit(submissionData);
  };

  const discountPercentage = formData.mrp && formData.sellingPrice ? 
    Math.round(((parseFloat(formData.mrp) - parseFloat(formData.sellingPrice)) / parseFloat(formData.mrp)) * 100) : 0;

  const handleGenderToggle = useCallback((gender: string) => {
    setFormData(prev => ({
      ...prev,
      gender: prev.gender.includes(gender)
        ? prev.gender.filter(g => g !== gender)
        : [...prev.gender, gender]
    }));
  }, []);

  const handleOccasionToggle = useCallback((occasion: string) => {
    setFormData(prev => ({
      ...prev,
      occasion: prev.occasion.includes(occasion)
        ? prev.occasion.filter(o => o !== occasion)
        : [...prev.occasion, occasion]
    }));
  }, []);

  const handleBestForToggle = useCallback((option: string) => {
    setFormData(prev => ({
      ...prev,
      bestFor: prev.bestFor.includes(option)
        ? prev.bestFor.filter(b => b !== option)
        : [...prev.bestFor, option]
    }));
  }, []);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Category Selection */}
      <Card>
        <CardHeader>
          <CardTitle>1. Category Selection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label>Main Category *</Label>
              <Select value={formData.mainCategory} onValueChange={(value) => setFormData(prev => ({ ...prev, mainCategory: value, subCategory: "", subSubCategory: "" }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select main category" />
                </SelectTrigger>
                <SelectContent>
                  {mainCategories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Sub-Category *</Label>
              <Select 
                value={formData.subCategory} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, subCategory: value, subSubCategory: "" }))}
                disabled={!formData.mainCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select sub-category" />
                </SelectTrigger>
                <SelectContent>
                  {formData.mainCategory && subCategories[formData.mainCategory]?.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Sub-Sub Category *</Label>
              <Select 
                value={formData.subSubCategory} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, subSubCategory: value }))}
                disabled={!formData.subCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select sub-sub category" />
                </SelectTrigger>
                <SelectContent>
                  {formData.subCategory && subSubCategories[formData.subCategory]?.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Core Info */}
      <Card>
        <CardHeader>
          <CardTitle>2. Product Core Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Product Title * ({formData.title.length}/100)</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter product title"
                maxLength={100}
              />
            </div>
            <div>
              <Label>Product Subtitle</Label>
              <Input
                value={formData.subtitle}
                onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                placeholder="Optional subtitle"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label>Brand Name *</Label>
              <Input
                value={formData.brandName}
                onChange={(e) => setFormData(prev => ({ ...prev, brandName: e.target.value }))}
                placeholder="Enter brand name"
              />
            </div>
            <div>
              <Label>HSN/SAC Code</Label>
              <Input
                value={formData.hsnCode}
                onChange={(e) => setFormData(prev => ({ ...prev, hsnCode: e.target.value }))}
                placeholder="Auto-suggested based on category"
              />
            </div>
            <div>
              <Label>Model Number/SKU ID</Label>
              <Input
                value={formData.modelNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, modelNumber: e.target.value }))}
                placeholder="Unique identifier"
              />
            </div>
          </div>

          <div>
            <Label>Gender/Audience</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {genderOptions.map((gender) => (
                <Badge
                  key={gender}
                  variant={formData.gender.includes(gender) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleGenderToggle(gender)}
                >
                  {gender}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Description & Highlights */}
      <Card>
        <CardHeader>
          <CardTitle>3. Description & Highlights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Product Description *</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Detailed product description..."
              rows={4}
            />
          </div>

          <div>
            <Label>Key Features/Highlights (Min 3, Max 10)</Label>
            <div className="flex space-x-2 mb-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add a key feature"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addFeature();
                  }
                }}
              />
              <Button type="button" onClick={addFeature} disabled={!newFeature.trim() || formData.keyFeatures.length >= 10}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.keyFeatures.map((feature, index) => (
                <Badge key={`feature-${index}`} variant="secondary" className="flex items-center space-x-1">
                  <span>{feature}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFeature(index)}
                    className="h-4 w-4 p-0"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>How to Use/Styling Tips</Label>
              <Textarea
                value={formData.howToUse}
                onChange={(e) => setFormData(prev => ({ ...prev, howToUse: e.target.value }))}
                placeholder="Usage instructions or styling tips"
                rows={3}
              />
            </div>
            <div>
              <Label>Ingredients/Material</Label>
              <Textarea
                value={formData.ingredients}
                onChange={(e) => setFormData(prev => ({ ...prev, ingredients: e.target.value }))}
                placeholder="List ingredients or materials"
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Variants */}
      <Card>
        <CardHeader>
          <CardTitle>4. Product Variants Engine</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-5 gap-4 p-4 border rounded-lg">
            <div>
              <Label>Color</Label>
              <Select value={currentVariant.color} onValueChange={(value) => {
                const selectedColor = colorOptions.find(c => c.name === value);
                setCurrentVariant(prev => ({ 
                  ...prev, 
                  color: value,
                  colorHex: selectedColor?.hex || "#000000"
                }));
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((color) => (
                    <SelectItem key={color.name} value={color.name}>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: color.hex }} />
                        <span>{color.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Size</Label>
              <Select value={currentVariant.size} onValueChange={(value) => setCurrentVariant(prev => ({ ...prev, size: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {sizeOptions.map((size) => (
                    <SelectItem key={size} value={size}>{size}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Price (MMK)</Label>
              <Input
                type="number"
                value={currentVariant.price}
                onChange={(e) => setCurrentVariant(prev => ({ ...prev, price: e.target.value }))}
                placeholder="Price"
              />
            </div>

            <div>
              <Label>Stock</Label>
              <Input
                type="number"
                value={currentVariant.stock}
                onChange={(e) => setCurrentVariant(prev => ({ ...prev, stock: e.target.value }))}
                placeholder="Stock qty"
              />
            </div>

            <div className="flex items-end">
              <Button type="button" onClick={addVariant} disabled={!currentVariant.color || !currentVariant.size}>
                <Plus className="w-4 h-4 mr-2" />
                Add Variant
              </Button>
            </div>
          </div>

          {formData.variants.length > 0 && (
            <div className="space-y-2">
              <Label>Added Variants:</Label>
              {formData.variants.map((variant, index) => (
                <div key={variant.id || `variant-${index}`} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: variant.colorHex }} />
                    <span>{variant.color} - {variant.size}</span>
                    <span className="text-green-600 font-medium">{variant.price} MMK</span>
                    <span className="text-gray-600">Stock: {variant.stock}</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => removeVariant(index)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Product Images & Media */}
      <Card>
        <CardHeader>
          <CardTitle>5. Product Images & Media</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Main Product Images (Min 2, Max 6) - First image must have white background</Label>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-2">
              {formData.mainImages.map((image, index) => (
                <div key={`image-${index}`} className="relative group">
                  <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Image className="w-8 h-8 text-gray-400" />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeMainImage(index)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                  <p className="text-xs text-gray-600 mt-1">{index === 0 ? "Main (White BG)" : `Image ${index + 1}`}</p>
                </div>
              ))}
              {formData.mainImages.length < 6 && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-32 border-dashed"
                  onClick={addMainImage}
                >
                  <div className="text-center">
                    <Upload className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-sm">Upload Image</span>
                  </div>
                </Button>
              )}
            </div>
          </div>

          <div>
            <Label>360° View / Video URL (YouTube/MP4)</Label>
            <Input
              value={formData.videoUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
              placeholder="https://youtube.com/watch?v=... or video file URL"
            />
          </div>
        </CardContent>
      </Card>

      {/* Continue with remaining sections... */}
      
      {/* SEO & Search Optimization */}
      <Card>
        <CardHeader>
          <CardTitle>8. SEO & Search Optimization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Search Tags</Label>
            <div className="flex space-x-2 mb-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add search tags (e.g., summer top, Korean style)"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <Button type="button" onClick={addTag} disabled={!newTag.trim()}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.searchTags.map((tag, index) => (
                <Badge key={`tag-${index}`} variant="secondary" className="flex items-center space-x-1">
                  <span>{tag}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTag(index)}
                    className="h-4 w-4 p-0"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Meta Title</Label>
              <Input
                value={formData.metaTitle}
                onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                placeholder="SEO title for Google"
              />
            </div>
            <div>
              <Label>Meta Description ({formData.metaDescription.length}/160)</Label>
              <Input
                value={formData.metaDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                placeholder="SEO description"
                maxLength={160}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters Setup */}
      <Card>
        <CardHeader>
          <CardTitle>9. Filters Setup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Occasion</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {occasionOptions.map((occasion) => (
                <Badge
                  key={occasion}
                  variant={formData.occasion.includes(occasion) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleOccasionToggle(occasion)}
                >
                  {occasion}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label>Best For (Beauty Products)</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {bestForOptions.map((option) => (
                <Badge
                  key={option}
                  variant={formData.bestFor.includes(option) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleBestForToggle(option)}
                >
                  {option}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Final Actions */}
      <div className="flex justify-between items-center pt-6">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        
        <div className="flex space-x-4">
          <Button variant="outline" onClick={() => handleSubmit(true)}>
            <Save className="w-4 h-4 mr-2" />
            Save as Draft
          </Button>
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Preview Listing
          </Button>
          <Button 
            onClick={() => handleSubmit(false)}
            style={{ backgroundColor: '#00B14F' }} 
            className="text-white"
          >
            <Send className="w-4 h-4 mr-2" />
            Submit for Review
          </Button>
        </div>
      </div>
    </div>
  );
}
