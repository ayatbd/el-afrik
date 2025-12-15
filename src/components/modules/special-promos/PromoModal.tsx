"use client";

import { Image as ImageIcon, Plus } from "lucide-react";

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

export default function PromoModal() {
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
          <Button className="bg-[#00B25D] hover:bg-[#00924c] text-white px-12 h-11 text-base font-medium rounded-md w-50">
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
