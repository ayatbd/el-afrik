"use client";

import { Plus, X, Loader2 } from "lucide-react";
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
import { toast } from "react-toastify"; // Ensure you have the ToastContainer in your layout
import { ChangeEvent, useEffect, useState } from "react";
import { useAddCategoryMutation } from "@/redux/api/categoriesApi";
import Image from "next/image";

export default function AddCategoryModal() {
  const [open, setOpen] = useState(false); // Control modal visibility
  const [categoryName, setCategoryName] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]); // Store actual files
  const [previews, setPreviews] = useState<string[]>([]); // Store preview URLs

  const [addCategory, { isLoading }] = useAddCategoryMutation();

  // Cleanup Object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  // Handle File Selection
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);

      // 1. Update Files State
      setImageFiles((prev) => [...prev, ...newFiles]);

      // 2. Update Previews State
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  // Remove Image
  const removeImage = (indexToRemove: number) => {
    setImageFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
    setPreviews((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleClose = () => {
    setOpen(false);
    // Reset form on close
    setTimeout(() => {
      setCategoryName("");
      setImageFiles([]);
      setPreviews([]);
    }, 300);
  };

  const handleSubmit = async () => {
    // 1. Validation
    if (!categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }
    if (imageFiles.length === 0) {
      toast.error("Please upload a category image");
      return;
    }

    try {
      const formData = new FormData();

      // 2. Append Body (JSON)
      const bodyData = {
        categoryName,
      };
      formData.append("body", JSON.stringify(bodyData));

      // 3. Append Image(s)
      imageFiles.forEach((file) => {
        formData.append("image", file);
      });

      // 4. API Call
      const res = await addCategory(formData).unwrap();

      if (res.success) {
        toast.success("Category added successfully!", {
          position: "top-center",
          autoClose: 2000,
        });
        handleClose();
      }
    } catch (error: any) {
      console.error(error);
      const errMsg = error?.data?.message || "Failed to add category";
      toast.error(errMsg, { position: "top-center" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer bg-[#00B25D] hover:bg-[#009e52] text-white px-6 h-11">
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-125 bg-white p-6 md:p-8 gap-6">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Add Category
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          {/* Image Upload Section */}
          <div className="space-y-3">
            <Label className="text-gray-500 font-normal">
              Category Image <span className="text-red-500">*</span>
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Upload Box */}
              <label
                htmlFor="categoryImageUpload"
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
                  id="categoryImageUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  // Removed 'multiple' if you only want 1 image per category,
                  // but kept logic compatible if you want multiple.
                />
              </label>

              {/* Previews */}
              {previews.map((img, index) => (
                <div
                  key={index}
                  className="relative h-48 w-full group rounded-lg overflow-hidden border border-gray-200"
                >
                  <Image
                    width={200}
                    height={200}
                    src={img}
                    alt={`Preview ${index}`}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-white/80 hover:bg-white text-red-500 rounded-full shadow-sm transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Name Input Section */}
          <div className="space-y-3">
            <Label htmlFor="categoryName" className="text-gray-500 font-normal">
              Category Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="e.g. Foods, Drinks"
              className="h-12 border-gray-200 bg-white placeholder:text-gray-400 focus-visible:ring-[#4BD37B]"
            />
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-[#00B25D] hover:bg-[#00924c] text-white px-12 h-11 text-base font-medium rounded-md w-50 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
