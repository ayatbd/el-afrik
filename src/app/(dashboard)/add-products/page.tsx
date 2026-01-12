"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, X, Loader2 } from "lucide-react";
import { useState, ChangeEvent, useEffect } from "react";
import Swal from "sweetalert2";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddProductMutation } from "@/redux/api/productApi";

// Define form state interface
interface ProductFormState {
  name: string;
  price: string;
  currency: string;
  deliveryFee: string;
  category: string;
  points: string;
  quantity: string;
  weight: string;
  description: string;
}

export default function AddProductPage() {
  const router = useRouter();
  const [addProduct, { isLoading }] = useAddProductMutation();

  // State for Images
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  // State for Text Fields
  const [formData, setFormData] = useState<ProductFormState>({
    name: "",
    price: "",
    currency: "usd",
    deliveryFee: "",
    category: "",
    points: "",
    quantity: "",
    weight: "", // Added weight as it was in your API response
    description: "",
  });

  // Cleanup object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  // Handle Text Inputs
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle Select Inputs
  const handleSelectChange = (key: keyof ProductFormState, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Handle Image Selection
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);

      // Store actual File objects for upload
      setImageFiles((prev) => [...prev, ...newFiles]);

      // Create URLs for preview
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  // Remove Image
  const removeImage = (indexToRemove: number) => {
    setImageFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
    setPreviews((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // SUBMIT HANDLER
  const handleSubmit = async () => {
    // 1. Basic Validation
    if (!formData.name || !formData.price || imageFiles.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill in all required fields and upload at least one image.",
      });
      return;
    }

    try {
      // 2. Prepare FormData
      const data = new FormData();

      // Append plain text fields
      data.append("name", formData.name);
      data.append("price", formData.price); // Backend expects number usually, FormData sends string, backend parses
      data.append("weight", formData.weight);
      data.append("category", formData.category); // Assuming backend takes the ID string
      data.append("quantity", formData.quantity);
      data.append("deliveryFee", formData.deliveryFee);
      data.append("points", formData.points);
      data.append("description", formData.description);
      // Optional fields logic
      data.append("promo", "NEWYEAR2026"); // Hardcoded based on your JSON example
      data.append("isFavourite", "true");

      // Append Images
      // Note: 'images' is the key name expected by Multer/Backend array upload
      imageFiles.forEach((file) => {
        data.append("images", file);
      });

      // 3. Call API
      const response = await addProduct(data).unwrap();

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Product created successfully.",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          router.push("/manage-products"); // Redirect to list
        });
      }
    } catch (error: any) {
      console.error("Failed to add product:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.data?.message || "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen md:min-w-7xl mx-auto bg-white p-6 md:p-10 font-sans text-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/manage-products"
            className="p-1 -ml-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-900" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">Add Product</h1>
        </div>
      </div>

      <div className="space-y-8">
        {/* --- Image Upload Section --- */}
        <div className="space-y-4">
          <Label className="text-base font-normal text-gray-500">
            Upload Product Images <span className="text-red-500">*</span>
          </Label>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Upload Button */}
            <label
              htmlFor="imageUpload"
              className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-500 mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h4l2 2h8a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 13l2-2 3 3 3-3"
                />
              </svg>
              <p className="text-green-500 font-medium text-lg text-center px-2">
                Browse Images
              </p>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />
            </label>

            {/* Image Previews */}
            {previews.map((img, index) => (
              <div
                key={index}
                className="relative h-48 w-full group rounded-lg overflow-hidden border border-gray-200"
              >
                <img
                  src={img}
                  alt={`Preview ${index}`}
                  className="h-full w-full object-cover"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1 bg-white/80 hover:bg-white text-red-500 rounded-full shadow-sm transition-all opacity-0 group-hover:opacity-100"
                  type="button"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* --- Form Fields --- */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-gray-500 font-normal">
                Product Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Fresh Strawberry"
                className="h-12 border-gray-200 bg-white"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="price" className="text-gray-500 font-normal">
                Price <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="100"
                className="h-12 border-gray-200 bg-white"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-gray-500 font-normal">
                Select Currency
              </Label>
              <Select
                value={formData.currency}
                onValueChange={(val) => handleSelectChange("currency", val)}
              >
                <SelectTrigger className="h-12 border-gray-200 bg-white text-gray-500">
                  <SelectValue placeholder="USD" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD ($)</SelectItem>
                  <SelectItem value="eur">EUR (€)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="deliveryFee"
                className="text-gray-500 font-normal"
              >
                Delivery Fee
              </Label>
              <Input
                id="deliveryFee"
                type="number"
                value={formData.deliveryFee}
                onChange={handleInputChange}
                placeholder="50"
                className="h-12 border-gray-200 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <Label className="text-gray-500 font-normal">
                Select Category <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(val) => handleSelectChange("category", val)}
              >
                <SelectTrigger className="h-12 border-gray-200 bg-white text-gray-500">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {/* Using IDs from your API sample */}
                  <SelectItem value="60c72b2f9d1c3f5f5f5c7c10">
                    Foods
                  </SelectItem>
                  <SelectItem value="drinks_id_placeholder">Drinks</SelectItem>
                  <SelectItem value="snacks_id_placeholder">Snacks</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-gray-500 font-normal">Points</Label>
              <Select
                value={formData.points}
                onValueChange={(val) => handleSelectChange("points", val)}
              >
                <SelectTrigger className="h-12 border-gray-200 bg-white text-gray-500">
                  <SelectValue placeholder="Select Points" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">05 Points</SelectItem>
                  <SelectItem value="10">10 Points</SelectItem>
                  <SelectItem value="15">15 Points</SelectItem>
                  <SelectItem value="20">20 Points</SelectItem>
                  <SelectItem value="25">25 Points</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label htmlFor="quantity" className="text-gray-500 font-normal">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="10"
                  className="h-12 border-gray-200 bg-white"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="weight" className="text-gray-500 font-normal">
                  Weight (g)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="25"
                  className="h-12 border-gray-200 bg-white"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="description" className="text-gray-500 font-normal">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Write product description here...."
              className="min-h-32 border-gray-200 bg-white resize-none p-4"
            />
          </div>
        </div>

        <div className="flex justify-center pt-8 pb-4">
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full md:w-64 h-12 text-base font-medium bg-[#CF4F26] hover:bg-[#b54420] text-white shadow-md rounded-md disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Publishing...
              </>
            ) : (
              "Publish Product"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
