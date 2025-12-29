"use client";

import Link from "next/link";
import { ArrowLeft, X } from "lucide-react";
import { useState, ChangeEvent } from "react";

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
import PromoModal from "@/components/modules/special-promos/PromoModal";

export default function AddProductPage() {
  const [images, setImages] = useState<string[]>([]);

  // Handle File Selection
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Convert FileList to Array and create object URLs for preview
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      // Append new images to existing ones
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  // Remove Image from selection
  const removeImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="min-h-screen md:min-w-7xl mx-auto bg-white p-6 md:p-10 font-sans text-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-1 -ml-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-900" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">Add Product</h1>
        </div>
        <div className="flex items-center gap-4">
          <PromoModal />
        </div>
      </div>

      <div className="space-y-8">
        {/* --- Image Upload Section --- */}
        <div className="space-y-4">
          <Label className="text-base font-normal text-gray-500">
            Upload Product Images
          </Label>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* 1. Upload Button (Always Visible) */}
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

              {/* Added 'multiple' and 'onChange' */}
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />
            </label>

            {/* 2. Image Previews */}
            {images.map((img, index) => (
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
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* --- Form Fields --- */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-gray-500 font-normal">
                Product Name
              </Label>
              <Input
                id="name"
                placeholder="Fresh Strawberry"
                className="h-12 border-gray-200 bg-white"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="price" className="text-gray-500 font-normal">
                Promo validity date
              </Label>
              <Input
                id="price"
                placeholder="12/12/2023"
                className="h-12 border-gray-200 bg-white"
              />
            </div>
            <div className="space-y-3">
              <Label
                htmlFor="deliveryFee"
                className="text-gray-500 font-normal"
              >
                Promo Code
              </Label>
              <Input
                id="deliveryFee"
                placeholder="ELAFRIK20"
                className="h-12 border-gray-200 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <Label className="text-gray-500 font-normal">
                Select Category
              </Label>
              <Select>
                <SelectTrigger className="h-12 border-gray-200 bg-white text-gray-400">
                  <SelectValue placeholder="Foods" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="foods">Foods</SelectItem>
                  <SelectItem value="drinks">Drinks</SelectItem>
                  <SelectItem value="snacks">Snacks</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-gray-500 font-normal">Points</Label>
              <Select>
                <SelectTrigger className="h-12 border-gray-200 bg-white text-gray-400">
                  <SelectValue placeholder="Points" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">05 Points</SelectItem>
                  <SelectItem value="10">10 Points</SelectItem>
                  <SelectItem value="10">15 Points</SelectItem>
                  <SelectItem value="10">20 Points</SelectItem>
                  <SelectItem value="20">25 Points</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="quantity" className="text-gray-500 font-normal">
                Quantity
              </Label>
              <Input
                id="quantity"
                placeholder="500-600gm"
                className="h-12 border-gray-200 bg-white"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="description" className="text-gray-500 font-normal">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Write here...."
              className="min-h-30 border-gray-200 bg-white resize-none p-4"
            />
          </div>
        </div>

        <div className="flex justify-center pt-8 pb-4">
          <Button className="w-full md:w-64 h-12 text-base font-medium bg-[#CF4F26] hover:bg-[#b54420] text-white shadow-md rounded-md">
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
}
