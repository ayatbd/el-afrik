"use client";

import { Plus, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import { DialogClose } from "@radix-ui/react-dialog";

export default function PromoModal() {
  const [images, setImages] = useState<string[]>([]);

  // Handle File Selection
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Convert FileList to Array and create object URLs for preview
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file),
      );
      // Append new images to existing ones
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  // Remove Image from selection
  const removeImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // Handle form submission logic
  const handleSubmit = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "VIP Event added successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer bg-[#00B25D] hover:bg-[#009e52] text-white px-6 h-11">
          <Plus className="ml-2 h-4 w-4" />
          VIP Events
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-125 bg-white p-6 md:p-8 gap-6">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Add VIP Events
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          <div className="space-y-3">
            <Label className="text-gray-500 font-normal">Category Image</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* 1. Upload Button (Always Visible) */}
              <label
                htmlFor="vipImageUpload"
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
                  id="vipImageUpload"
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

          <div className="space-y-3">
            <Label htmlFor="categoryName" className="text-gray-500 font-normal">
              Category Name
            </Label>
            <Input
              id="categoryName"
              placeholder="Food"
              className="h-12 border-gray-200 bg-white placeholder:text-gray-400 focus-visible:ring-[#4BD37B]"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="promoCode" className="text-gray-500 font-normal">
              Promo Code
            </Label>
            <Input
              id="promoCode"
              placeholder="2e4vdg4"
              className="h-12 border-gray-200 bg-white placeholder:text-gray-400 focus-visible:ring-[#4BD37B]"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="price" className="text-gray-500 font-normal">
              Price
            </Label>
            <Input
              id="price"
              placeholder="$30"
              className="h-12 border-gray-200 bg-white placeholder:text-gray-400 focus-visible:ring-[#4BD37B]"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="description" className="text-gray-500 font-normal">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Write here...."
              className="min-h-25 border-gray-200 bg-white resize-none p-3 placeholder:text-gray-400 focus-visible:ring-[#4BD37B]"
            />
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <DialogClose asChild>
            <Button
              type="submit"
              onClick={handleSubmit}
              className="bg-[#00B25D] hover:bg-[#00924c] text-white px-12 h-11 text-base font-medium rounded-md w-50"
            >
              Submit
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
