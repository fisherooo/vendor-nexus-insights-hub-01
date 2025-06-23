
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
import { X, Plus, Upload, Image, Eye, Save, Send, Tag, Package, Palette, Star, Camera, Search, Filter } from "lucide-react";
import categoriesData from "@/data/categories.json";

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

// Move ALL static data outside component to prevent recreation
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

// Get categories from JSON data
const mainCategories = Object.keys(categoriesData);

export function ProductUploadForm({ onSubmit, onCancel }: ProductUploadFormProps) {
  const [formData, setFormData] = useState(() => ({
    mainCategory: "",
    subCategory: "",
    subSubCategory: "",
    title: "",
    subtitle: "",
    brandName: "",
    hsnCode: "",
    modelNumber: "",
    gender: [] as string[],
    description: "",
    keyFeatures: [] as string[],
    howToUse: "",
    ingredients: "",
    variants: [] as ProductVariant[],
    mainImages: [] as string[],
    videoUrl: "",
    mrp: "",
    sellingPrice: "",
    taxClass: "",
    lowStockAlert: "",
    dimensions: { length: "", width: "", height: "" },
    weight: "",
    packType: "",
    dispatchTime: "",
    returnPolicy: "",
    codAvailable: false,
    searchTags: [] as string[],
    metaTitle: "",
    metaDescription: "",
    internalNotes: "",
    occasion: [] as string[],
    material: "",
    ecoFriendly: false,
    bestFor: [] as string[],
    isLive: false,
    showInNewArrivals: false,
    featureOnHomepage: false,
    enableForCampaigns: false
  }));

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

  console.log("ProductUploadForm rendered", { formDataTitle: formData.title });

  // Get available sub-categories based on selected main category
  const getSubCategories = () => {
    if (!formData.mainCategory) return [];
    return Object.keys(categoriesData[formData.mainCategory as keyof typeof categoriesData] || {});
  };

  // Get available sub-sub categories based on selected sub-category
  const getSubSubCategories = () => {
    if (!formData.mainCategory || !formData.subCategory) return [];
    const mainCat = categoriesData[formData.mainCategory as keyof typeof categoriesData];
    if (!mainCat) return [];
    return mainCat[formData.subCategory as keyof typeof mainCat] || [];
  };

  const addFeature = useCallback(() => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        keyFeatures: [...prev.keyFeatures, newFeature.trim()]
      }));
      setNewFeature("");
    }
  }, [newFeature]);

  const removeFeature = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      keyFeatures: prev.keyFeatures.filter((_, i) => i !== index)
    }));
  }, []);

  const addTag = useCallback(() => {
    if (newTag.trim()) {
      setFormData(prev => ({
        ...prev,
        searchTags: [...prev.searchTags, newTag.trim()]
      }));
      setNewTag("");
    }
  }, [newTag]);

  const removeTag = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      searchTags: prev.searchTags.filter((_, i) => i !== index)
    }));
  }, []);

  const addVariant = useCallback(() => {
    if (currentVariant.color && currentVariant.size) {
      const newVariant = { 
        ...currentVariant, 
        id: `variant-${Date.now()}` 
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
  }, [currentVariant]);

  const removeVariant = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  }, []);

  const addMainImage = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      mainImages: [...prev.mainImages, `product_image_${Date.now()}.jpg`]
    }));
  }, []);

  const removeMainImage = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      mainImages: prev.mainImages.filter((_, i) => i !== index)
    }));
  }, []);

  const handleSubmit = useCallback((isDraft: boolean = false) => {
    const submissionData = {
      ...formData,
      isDraft,
      submittedAt: new Date().toISOString()
    };
    onSubmit(submissionData);
  }, [formData, onSubmit]);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Add New Product
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create a stunning product listing with our easy-to-use form. Fill in the details below to get started.
          </p>
        </div>

        {/* Category Selection */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-t-lg">
            <CardTitle className="flex items-center space-x-3 text-xl">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Tag className="w-4 h-4 text-white" />
              </div>
              <span>Category Selection</span>
              <Badge variant="secondary" className="ml-auto">Step 1</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700">Main Category *</Label>
                <Select 
                  value={formData.mainCategory} 
                  onValueChange={(value) => setFormData(prev => ({ 
                    ...prev, 
                    mainCategory: value, 
                    subCategory: "", 
                    subSubCategory: "" 
                  }))}
                >
                  <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-blue-300 transition-colors">
                    <SelectValue placeholder="Select main category" />
                  </SelectTrigger>
                  <SelectContent>
                    {mainCategories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700">Sub-Category *</Label>
                <Select 
                  value={formData.subCategory} 
                  onValueChange={(value) => setFormData(prev => ({ 
                    ...prev, 
                    subCategory: value, 
                    subSubCategory: "" 
                  }))}
                  disabled={!formData.mainCategory}
                >
                  <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-blue-300 transition-colors disabled:bg-gray-50">
                    <SelectValue placeholder="Select sub-category" />
                  </SelectTrigger>
                  <SelectContent>
                    {getSubCategories().map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700">Sub-Sub Category *</Label>
                <Select 
                  value={formData.subSubCategory} 
                  onValueChange={(value) => setFormData(prev => ({ 
                    ...prev, 
                    subSubCategory: value 
                  }))}
                  disabled={!formData.subCategory}
                >
                  <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-blue-300 transition-colors disabled:bg-gray-50">
                    <SelectValue placeholder="Select sub-sub category" />
                  </SelectTrigger>
                  <SelectContent>
                    {getSubSubCategories().map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Core Info */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-t-lg">
            <CardTitle className="flex items-center space-x-3 text-xl">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <Star className="w-4 h-4 text-white" />
              </div>
              <span>Product Information</span>
              <Badge variant="secondary" className="ml-auto">Step 2</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700">
                  Product Title * 
                  <span className="text-xs text-gray-500 ml-2">({formData.title.length}/100)</span>
                </Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter a compelling product title"
                  maxLength={100}
                  className="h-12 border-2 border-gray-200 hover:border-green-300 focus:border-green-400 transition-colors"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700">Product Subtitle</Label>
                <Input
                  value={formData.subtitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                  placeholder="Optional subtitle for more details"
                  className="h-12 border-2 border-gray-200 hover:border-green-300 focus:border-green-400 transition-colors"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700">Brand Name *</Label>
                <Input
                  value={formData.brandName}
                  onChange={(e) => setFormData(prev => ({ ...prev, brandName: e.target.value }))}
                  placeholder="Enter brand name"
                  className="h-12 border-2 border-gray-200 hover:border-green-300 focus:border-green-400 transition-colors"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700">HSN/SAC Code</Label>
                <Input
                  value={formData.hsnCode}
                  onChange={(e) => setFormData(prev => ({ ...prev, hsnCode: e.target.value }))}
                  placeholder="Auto-suggested based on category"
                  className="h-12 border-2 border-gray-200 hover:border-green-300 focus:border-green-400 transition-colors"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700">Model Number/SKU ID</Label>
                <Input
                  value={formData.modelNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, modelNumber: e.target.value }))}
                  placeholder="Unique identifier"
                  className="h-12 border-2 border-gray-200 hover:border-green-300 focus:border-green-400 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-sm font-semibold text-gray-700">Gender/Audience</Label>
              <div className="flex flex-wrap gap-3">
                {genderOptions.map((gender) => (
                  <Badge
                    key={gender}
                    variant={formData.gender.includes(gender) ? "default" : "outline"}
                    className={`cursor-pointer px-4 py-2 text-sm transition-all hover:scale-105 ${
                      formData.gender.includes(gender) 
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg" 
                        : "hover:border-blue-300 hover:bg-blue-50"
                    }`}
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
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-t-lg">
            <CardTitle className="flex items-center space-x-3 text-xl">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <Star className="w-4 h-4 text-white" />
              </div>
              <span>Description & Highlights</span>
              <Badge variant="secondary" className="ml-auto">Step 3</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700">Product Description *</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Write a detailed and engaging product description that highlights the benefits and features..."
                rows={5}
                className="border-2 border-gray-200 hover:border-purple-300 focus:border-purple-400 transition-colors resize-none"
              />
            </div>

            <div className="space-y-4">
              <Label className="text-sm font-semibold text-gray-700">
                Key Features/Highlights 
                <span className="text-xs text-gray-500 ml-2">(Min 3, Max 10)</span>
              </Label>
              <div className="flex space-x-3">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add a key feature or highlight"
                  className="flex-1 h-12 border-2 border-gray-200 hover:border-purple-300 focus:border-purple-400 transition-colors"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addFeature();
                    }
                  }}
                />
                <Button 
                  type="button" 
                  onClick={addFeature} 
                  disabled={!newFeature.trim() || formData.keyFeatures.length >= 10}
                  className="h-12 px-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-3">
                {formData.keyFeatures.map((feature, index) => (
                  <Badge key={`feature-${index}`} variant="secondary" className="px-3 py-2 text-sm bg-purple-100 text-purple-700 border border-purple-200 hover:bg-purple-200 transition-colors">
                    <span className="mr-2">{feature}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFeature(index)}
                      className="h-4 w-4 p-0 hover:bg-red-100 hover:text-red-600 rounded-full"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700">How to Use/Styling Tips</Label>
                <Textarea
                  value={formData.howToUse}
                  onChange={(e) => setFormData(prev => ({ ...prev, howToUse: e.target.value }))}
                  placeholder="Usage instructions or styling recommendations"
                  rows={4}
                  className="border-2 border-gray-200 hover:border-purple-300 focus:border-purple-400 transition-colors resize-none"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700">Ingredients/Material</Label>
                <Textarea
                  value={formData.ingredients}
                  onChange={(e) => setFormData(prev => ({ ...prev, ingredients: e.target.value }))}
                  placeholder="List ingredients or materials used"
                  rows={4}
                  className="border-2 border-gray-200 hover:border-purple-300 focus:border-purple-400 transition-colors resize-none"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Variants */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-t-lg">
            <CardTitle className="flex items-center space-x-3 text-xl">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <Palette className="w-4 h-4 text-white" />
              </div>
              <span>Product Variants</span>
              <Badge variant="secondary" className="ml-auto">Step 4</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
              <div className="grid md:grid-cols-5 gap-4">
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-700">Color</Label>
                  <Select 
                    value={currentVariant.color} 
                    onValueChange={(value) => {
                      const selectedColor = colorOptions.find(c => c.name === value);
                      setCurrentVariant(prev => ({ 
                        ...prev, 
                        color: value,
                        colorHex: selectedColor?.hex || "#000000"
                      }));
                    }}
                  >
                    <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-orange-300 transition-colors">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map((color) => (
                        <SelectItem key={color.name} value={color.name}>
                          <div className="flex items-center space-x-3">
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300" style={{ backgroundColor: color.hex }} />
                            <span>{color.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-700">Size</Label>
                  <Select 
                    value={currentVariant.size} 
                    onValueChange={(value) => setCurrentVariant(prev => ({ ...prev, size: value }))}
                  >
                    <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-orange-300 transition-colors">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {sizeOptions.map((size) => (
                        <SelectItem key={size} value={size}>{size}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-700">Price (MMK)</Label>
                  <Input
                    type="number"
                    value={currentVariant.price}
                    onChange={(e) => setCurrentVariant(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="0"
                    className="h-12 border-2 border-gray-200 hover:border-orange-300 focus:border-orange-400 transition-colors"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-700">Stock</Label>
                  <Input
                    type="number"
                    value={currentVariant.stock}
                    onChange={(e) => setCurrentVariant(prev => ({ ...prev, stock: e.target.value }))}
                    placeholder="0"
                    className="h-12 border-2 border-gray-200 hover:border-orange-300 focus:border-orange-400 transition-colors"
                  />
                </div>

                <div className="flex items-end">
                  <Button 
                    type="button" 
                    onClick={addVariant} 
                    disabled={!currentVariant.color || !currentVariant.size}
                    className="h-12 w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 shadow-lg"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Variant
                  </Button>
                </div>
              </div>
            </div>

            {formData.variants.length > 0 && (
              <div className="space-y-4">
                <Label className="text-sm font-semibold text-gray-700">Added Variants:</Label>
                <div className="grid gap-3">
                  {formData.variants.map((variant, index) => (
                    <div key={variant.id} className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-gray-100 hover:border-orange-200 transition-colors shadow-sm">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 rounded-full border-2 border-gray-300 shadow-sm" style={{ backgroundColor: variant.colorHex }} />
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">{variant.color} - {variant.size}</span>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="text-green-600 font-semibold">{variant.price} MMK</span>
                            <span>Stock: {variant.stock}</span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => removeVariant(index)}
                        className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Product Images & Media */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-t-lg">
            <CardTitle className="flex items-center space-x-3 text-xl">
              <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                <Camera className="w-4 h-4 text-white" />
              </div>
              <span>Images & Media</span>
              <Badge variant="secondary" className="ml-auto">Step 5</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="space-y-4">
              <Label className="text-sm font-semibold text-gray-700">
                Main Product Images 
                <span className="text-xs text-gray-500 ml-2">(Min 2, Max 6) - First image must have white background</span>
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {formData.mainImages.map((image, index) => (
                  <div key={`image-${index}`} className="relative group">
                    <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-cyan-300 transition-colors">
                      <Image className="w-8 h-8 text-gray-400" />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 rounded-full p-0 shadow-lg"
                      onClick={() => removeMainImage(index)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                    <p className="text-xs text-gray-600 mt-2 text-center font-medium">
                      {index === 0 ? "Main (White BG)" : `Image ${index + 1}`}
                    </p>
                  </div>
                ))}
                {formData.mainImages.length < 6 && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-32 border-2 border-dashed border-gray-300 hover:border-cyan-300 hover:bg-cyan-50 transition-colors rounded-xl"
                    onClick={addMainImage}
                  >
                    <div className="text-center">
                      <Upload className="w-6 h-6 mx-auto mb-2 text-cyan-500" />
                      <span className="text-sm font-medium text-gray-600">Upload Image</span>
                    </div>
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700">360° View / Video URL (YouTube/MP4)</Label>
              <Input
                value={formData.videoUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
                placeholder="https://youtube.com/watch?v=... or video file URL"
                className="h-12 border-2 border-gray-200 hover:border-cyan-300 focus:border-cyan-400 transition-colors"
              />
            </div>
          </CardContent>
        </Card>

        {/* SEO & Search Optimization */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-t-lg">
            <CardTitle className="flex items-center space-x-3 text-xl">
              <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                <Search className="w-4 h-4 text-white" />
              </div>
              <span>SEO & Search Optimization</span>
              <Badge variant="secondary" className="ml-auto">Step 6</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="space-y-4">
              <Label className="text-sm font-semibold text-gray-700">Search Tags</Label>
              <div className="flex space-x-3">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add search tags (e.g., summer top, Korean style)"
                  className="flex-1 h-12 border-2 border-gray-200 hover:border-indigo-300 focus:border-indigo-400 transition-colors"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                <Button 
                  type="button" 
                  onClick={addTag} 
                  disabled={!newTag.trim()}
                  className="h-12 px-6 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white border-0 shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-3">
                {formData.searchTags.map((tag, index) => (
                  <Badge key={`tag-${index}`} variant="secondary" className="px-3 py-2 text-sm bg-indigo-100 text-indigo-700 border border-indigo-200 hover:bg-indigo-200 transition-colors">
                    <span className="mr-2">{tag}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTag(index)}
                      className="h-4 w-4 p-0 hover:bg-red-100 hover:text-red-600 rounded-full"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700">Meta Title</Label>
                <Input
                  value={formData.metaTitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                  placeholder="SEO title for Google"
                  className="h-12 border-2 border-gray-200 hover:border-indigo-300 focus:border-indigo-400 transition-colors"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700">
                  Meta Description 
                  <span className="text-xs text-gray-500 ml-2">({formData.metaDescription.length}/160)</span>
                </Label>
                <Input
                  value={formData.metaDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                  placeholder="SEO description"
                  maxLength={160}
                  className="h-12 border-2 border-gray-200 hover:border-indigo-300 focus:border-indigo-400 transition-colors"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters Setup */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-teal-500/10 to-green-500/10 rounded-t-lg">
            <CardTitle className="flex items-center space-x-3 text-xl">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <Filter className="w-4 h-4 text-white" />
              </div>
              <span>Filters & Categories</span>
              <Badge variant="secondary" className="ml-auto">Step 7</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="space-y-4">
              <Label className="text-sm font-semibold text-gray-700">Occasion</Label>
              <div className="flex flex-wrap gap-3">
                {occasionOptions.map((occasion) => (
                  <Badge
                    key={occasion}
                    variant={formData.occasion.includes(occasion) ? "default" : "outline"}
                    className={`cursor-pointer px-4 py-2 text-sm transition-all hover:scale-105 ${
                      formData.occasion.includes(occasion) 
                        ? "bg-gradient-to-r from-teal-500 to-green-500 text-white shadow-lg" 
                        : "hover:border-teal-300 hover:bg-teal-50"
                    }`}
                    onClick={() => handleOccasionToggle(occasion)}
                  >
                    {occasion}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-sm font-semibold text-gray-700">Best For (Beauty Products)</Label>
              <div className="flex flex-wrap gap-3">
                {bestForOptions.map((option) => (
                  <Badge
                    key={option}
                    variant={formData.bestFor.includes(option) ? "default" : "outline"}
                    className={`cursor-pointer px-4 py-2 text-sm transition-all hover:scale-105 ${
                      formData.bestFor.includes(option) 
                        ? "bg-gradient-to-r from-teal-500 to-green-500 text-white shadow-lg" 
                        : "hover:border-teal-300 hover:bg-teal-50"
                    }`}
                    onClick={() => handleBestForToggle(option)}
                  >
                    {option}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final Actions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-0 shadow-xl p-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Button 
              variant="outline" 
              onClick={onCancel}
              className="h-12 px-8 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            
            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
              <Button 
                variant="outline" 
                onClick={() => handleSubmit(true)}
                className="h-12 px-8 border-2 border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400"
              >
                <Save className="w-4 h-4 mr-2" />
                Save as Draft
              </Button>
              <Button 
                variant="outline"
                className="h-12 px-8 border-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview Listing
              </Button>
              <Button 
                onClick={() => handleSubmit(false)}
                className="h-12 px-8 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0 shadow-lg transform hover:scale-105 transition-all"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit for Review
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
