"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Swal from "sweetalert2";

export default function EditProductModal() {
  // handling the edit action
  const handleEdit = () => {
    console.log("Edit product with ID:");
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Updated Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="cursor-pointer text-[#5D5FEF] hover:text-[#1115eb]">
          <Pencil className="h-4 w-4" />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-125 bg-white p-6 md:p-8">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl text-center">
            Update the product
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4 px-28">
            <Label className="text-base font-normal text-gray-500">
              Upload Product Image
            </Label>
            <div className="">
              <label
                htmlFor="imageUpload"
                className="flex flex-col items-center justify-center h-36 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-500 mb-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 5a2 2 0 012-2h4l2 2h8a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8 13l2-2 3 3 3-3"
                  />
                </svg>

                <p className="text-green-500 font-medium text-md">
                  Browse Image
                </p>

                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div className="space-y-3">
              <Label
                htmlFor="description"
                className="text-gray-500 font-normal"
              >
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Write here...."
                className="min-h-24 border-gray-200 bg-white resize-none p-4"
              />
            </div>
          </div>

          <div className="flex justify-center pt-4 pb-2">
            <DialogClose asChild>
              <Button
                type="button"
                onClick={handleEdit}
                className="w-full md:w-64 h-12 text-base font-medium bg-[#CF4F26] hover:bg-[#b54420] text-white shadow-md rounded-md cursor-pointer"
              >
                Publish
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
