"use client";

import { Pencil, X, Loader2 } from "lucide-react";
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
import { toast } from "react-toastify";
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useEditCategoryMutation } from "@/redux/api/categoriesApi";

interface Category {
  _id: string;
  categoryName: string;
  image: string;
}

export default function EditCategoryModal({
  category,
}: {
  category: Category;
}) {
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [updateCategory, { isLoading }] = useEditCategoryMutation();

  // Sync state with prop when modal opens
  useEffect(() => {
    if (open && category) {
      setCategoryName(category.categoryName);
      setPreview(category.image); // Use the existing server URL initially
      setImageFile(null); // Reset file selection
    }
  }, [open, category]);

  // Handle New Image Selection
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setImageFile(file);
      setPreview(URL.createObjectURL(file)); // Show local preview
    }
  };

  // Remove Image (Clears preview and selection)
  const removeImage = () => {
    setImageFile(null);
    setPreview(null);
  };

  const handleClose = () => {
    setOpen(false);
    // Cleanup blob URL if it was a new file
    if (preview && preview !== category.image) {
      URL.revokeObjectURL(preview);
    }
  };

  const handleSubmit = async () => {
    // 1. Validation
    if (!categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }
    if (!preview) {
      toast.error("Category image is required");
      return;
    }

    try {
      const formData = new FormData();

      // 2. Append Body
      // Note: Backend likely expects the ID in the URL, but sometimes in body too.
      const bodyData = {
        categoryName,
      };
      formData.append("body", JSON.stringify(bodyData));

      // 3. Append Image (Only if a new file was selected)
      if (imageFile) {
        formData.append("image", imageFile);
      }

      // 4. API Call
      // Assuming mutation signature: updateCategory({ id: string, data: FormData })
      const res = await updateCategory({
        id: category._id,
        data: formData,
      }).unwrap();

      if (res.success) {
        toast.success("Category updated successfully!", {
          position: "top-center",
          autoClose: 2000,
        });
        handleClose();
      }
    } catch (error: any) {
      console.error(error);
      const errMsg = error?.data?.message || "Failed to update category";
      toast.error(errMsg, { position: "top-center" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* The Trigger is now a generic Edit Button/Icon */}
        <button className="cursor-pointer text-blue-600 hover:text-blue-800 transition-colors p-1">
          <Pencil className="h-4 w-4" />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-125 bg-white p-6 md:p-8 gap-6">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Edit Category
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
                htmlFor="editCategoryImageUpload"
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
                  Change Image
                </p>

                <input
                  id="editCategoryImageUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

              {/* Preview (Shows either existing URL or new Blob) */}
              {preview && (
                <div className="relative h-48 w-full group rounded-lg overflow-hidden border border-gray-200">
                  <Image
                    width={200}
                    height={200}
                    src={preview}
                    alt="Category Preview"
                    className="h-full w-full object-cover"
                    unoptimized // Needed if your backend images are external/unverified
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1 bg-white/80 hover:bg-white text-red-500 rounded-full shadow-sm transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Name Input Section */}
          <div className="space-y-3">
            <Label
              htmlFor="editCategoryName"
              className="text-gray-500 font-normal"
            >
              Category Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="editCategoryName"
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
                Updating...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
