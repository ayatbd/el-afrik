"use client";

import Link from "next/link";
import { ArrowLeft, RotateCw, Image as ImageIcon } from "lucide-react";

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

export default function AddProductPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] p-6 md:p-10 font-sans text-gray-800">
      {/* 1. Header Section */}
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
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md text-gray-600 text-sm hover:bg-gray-200 transition-colors">
            Data Refresh
            <RotateCw className="h-4 w-4 text-blue-600" />
          </button>
          <div className="px-4 py-2 bg-white border border-gray-100 rounded-md text-sm text-gray-500 shadow-sm">
            March 25,2024 10:43 Am
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* 2. Image Upload Section */}
        <div className="space-y-4">
          <Label className="text-base font-normal text-gray-500">
            Upload Product Image
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer group"
              >
                <div className="bg-gray-200 p-2 rounded-md mb-3 group-hover:bg-gray-300 transition-colors">
                  <ImageIcon className="h-8 w-8 text-gray-500" />
                </div>
                <span className="text-[#00C058] font-medium text-sm">
                  Browse Image
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Form Fields Section */}
        <div className="space-y-8">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                Price
              </Label>
              <Input
                id="price"
                placeholder="$100"
                className="h-12 border-gray-200 bg-white"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-gray-500 font-normal">
                Select Currency
              </Label>
              <Select>
                <SelectTrigger className="border-gray-200 bg-white text-gray-400">
                  <SelectValue placeholder="$90" />
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
                placeholder="$9"
                className="h-12 border-gray-200 bg-white"
              />
            </div>
          </div>

          {/* Row 2 */}
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
                  <SelectItem value="10">10 Points</SelectItem>
                  <SelectItem value="20">20 Points</SelectItem>
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

          {/* Row 3: Description */}
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

        {/* 4. Footer Action */}
        <div className="flex justify-center pt-8 pb-4">
          <Button className="w-full md:w-64 h-12 text-base font-medium bg-[#CF4F26] hover:bg-[#b54420] text-white shadow-md rounded-md">
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
}
