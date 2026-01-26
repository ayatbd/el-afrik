"use client";

import { Plus, X, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useCreateAdMutation } from "@/redux/api/adsApi";

// CHANGE 1: Import the correct hook

export default function AdAdditionModal() {
  const [open, setOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  // CHANGE 2: Use the Ads mutation
  const [createAd, { isLoading }] = useCreateAdMutation();

  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      setImageFiles((prev) => [...prev, ...newFiles]);
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImageFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
    setPreviews((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setImageFiles([]);
      setPreviews([]);
    }, 300);
  };

  const handleSubmit = async () => {
    if (imageFiles.length === 0) {
      toast.error("Please upload an ad image");
      return;
    }

    try {
      const formData = new FormData();

      // Postman screenshot shows key is "image".
      // If backend only accepts ONE image, ensure you only send one.
      // If it accepts multiple, this loop is fine.
      imageFiles.forEach((file) => {
        formData.append("image", file);
      });

      // CHANGE 3: Call the correct function
      const res = await createAd(formData).unwrap();

      // Check for success based on your Postman response structure
      if (res.success) {
        toast.success("Ad posted successfully!", {
          position: "top-center",
          autoClose: 2000,
        });
        handleClose();
      }
    } catch (error: any) {
      console.error(error);
      const errMsg = error?.data?.message || "Failed to post ad";
      toast.error(errMsg, { position: "top-center" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer bg-[#00B25D] hover:bg-[#009e52] text-white px-6 h-11">
          <Plus className="h-4 w-4 mr-2" />
          Add an Ad
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-125 bg-white p-6 md:p-8 gap-6">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Create Advertisement
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          <div className="space-y-3">
            <Label className="text-gray-500 font-normal">
              Ad Image <span className="text-red-500">*</span>
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <label
                htmlFor="adImageUpload"
                className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                {/* SVG Icon */}
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
                  id="adImageUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

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
                    unoptimized // Add this if testing with local blobs to avoid next/image errors
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
                Posting...
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
