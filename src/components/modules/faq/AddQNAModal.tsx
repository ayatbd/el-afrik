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
import { toast } from "react-toastify";

export default function AddQNAModal() {
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

  // Handle form submission logic
  const handleSubmit = () => {
    toast.success("FAQ added successfully", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer bg-[#00B25D] hover:bg-[#009e52] text-white px-6 h-11">
          <Plus className="h-4 w-4" />
          Add A FAQ
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-125 bg-white p-6 md:p-8 gap-6">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Add FAQ
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          <div className="space-y-3">
            <Label htmlFor="price" className="text-gray-500 font-normal">
              Question
            </Label>
            <Input
              id="question"
              placeholder="What is your question?"
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
