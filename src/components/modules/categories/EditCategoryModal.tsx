"use client";

import { Image as ImageIcon, Pencil } from "lucide-react";

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
import { Switch } from "@/components/ui/switch";

export default function AddCategoryModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="cursor-pointer text-[#5D5FEF] hover:text-[#4a4ccf]">
          <Pencil className="h-4 w-4" />
        </button>
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
            <div className="flex flex-col items-center justify-center h-48 w-full border-2 border-dashed border-gray-400 rounded-lg bg-[#D9D9D9] hover:bg-gray-200 transition-colors cursor-pointer group">
              <div className="p-3 rounded-full mb-2">
                <ImageIcon
                  className="h-10 w-10 text-gray-600"
                  strokeWidth={1.5}
                />
              </div>
              <span className="text-[#4BD37B] font-medium text-sm">
                Browse Image
              </span>
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
          <div className="grid md:grid-cols-2 items-center justify-between">
            <div>
              <Label
                htmlFor="categoryName"
                className="text-gray-500 font-normal mb-3"
              >
                Sessional Item
              </Label>
              <Switch className="" id="airplane-mode" />
            </div>
            <div>
              <Label
                htmlFor="categoryName"
                className="text-gray-500 font-normal mb-3"
              >
                Featured Dishes
              </Label>
              <Switch className="" id="airplane-mode" />
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
        </div>

        <div className="flex justify-center mt-4">
          <Button className="bg-[#00B25D] hover:bg-[#00924c] text-white px-12 h-11 text-base font-medium rounded-md w-50">
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
