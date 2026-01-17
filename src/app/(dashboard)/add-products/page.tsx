"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, X, Loader2 } from "lucide-react";
import { useState, ChangeEvent, useEffect } from "react";
import Swal from "sweetalert2";
import { useForm, Controller, SubmitHandler } from "react-hook-form"; // 1. Import RHF

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
import { useAddProductsMutation } from "@/redux/api/productApi";

// Interface matches RHF structure
interface ProductFormValues {
  name: string;
  price: string;
  deliveryFee: string;
  category: string;
  points: string;
  quantity: string;
  weight: string;
  description: string;
  status: string;
  promo: string;
}

export default function AddProductPage() {
  const router = useRouter();
  const [addProduct, { isLoading }] = useAddProductsMutation();

  // 2. Setup React Hook Form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues: {
      name: "",
      price: "",
      description: "",
      promo: "",
    },
  });

  // Keep Image state separate (easiest for file previews)
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    return () => previews.forEach((url) => URL.revokeObjectURL(url));
  }, [previews]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      setImageFiles((prev) => [...prev, ...newFiles]);
      setPreviews((prev) => [
        ...prev,
        ...newFiles.map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImageFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
    setPreviews((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // 3. RHF Submit Handler
  const onSubmit: SubmitHandler<ProductFormValues> = async (formData) => {
    // Manual check for images since they are outside RHF
    if (imageFiles.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Missing Image",
        text: "Please upload at least one product image.",
      });
      return;
    }

    try {
      const data = new FormData();

      // Serialize body exactly as backend expects
      const { promo, ...rest } = formData;
      const bodyObj: Record<string, unknown> = { ...rest };
      if (promo) bodyObj.promo = promo;

      data.append("body", JSON.stringify(bodyObj));

      imageFiles.forEach((file) => {
        data.append("image", file);
      });

      const response = await addProduct(data).unwrap();

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Product Created!",
          text: "Your product has been added successfully.",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => router.push("/manage-products"));
      }
    } catch (error: unknown) {
      const errorMessage =
        (error as { data?: { message?: string } })?.data?.message ||
        "Something went wrong";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
    }
  };

  return (
    <div className="min-h-screen md:min-w-7xl mx-auto bg-white p-6 md:p-10 font-sans text-gray-800">
      <div className="flex items-center gap-3 mb-10">
        <Link
          href="/manage-products"
          className="p-1 -ml-2 hover:bg-gray-200 rounded-full transition-colors"
        >
          <ArrowLeft className="h-6 w-6 text-gray-900" />
        </Link>
        <h1 className="text-xl font-semibold text-gray-900">Add Product</h1>
      </div>

      {/* 4. Pass handleSubmit to the form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* --- Image Upload (Kept manual for simpler UI control) --- */}
        <div className="space-y-4">
          <Label className="text-base font-normal text-gray-500">
            Upload Product Images <span className="text-red-500">*</span>
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50/50 hover:bg-gray-50 cursor-pointer">
              <span className="text-green-500 font-medium text-lg">
                Browse Images
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            {previews.map((img, index) => (
              <div
                key={index}
                className="relative h-48 w-full group rounded-lg overflow-hidden border border-gray-200"
              >
                <img
                  src={img}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1 bg-white/80 text-red-500 rounded-full opacity-0 group-hover:opacity-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* --- Form Fields --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <Label className="text-gray-500">
              Product Name <span className="text-red-500">*</span>
            </Label>
            {/* 5. Use register for simple inputs */}
            <Input
              {...register("name", { required: "Name is required" })}
              placeholder="Fresh Strawberry"
              className="h-12 border-gray-200 bg-white"
            />
            {errors.name && (
              <span className="text-xs text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="space-y-3">
            <Label className="text-gray-500">
              Price <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              {...register("price", { required: "Price is required" })}
              placeholder="100"
              className="h-12 border-gray-200 bg-white"
            />
            {errors.price && (
              <span className="text-xs text-red-500">
                {errors.price.message}
              </span>
            )}
          </div>

          <div className="space-y-3">
            <Label className="text-gray-500">
              Delivery Fee <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              {...register("deliveryFee", { required: "Fee is required" })}
              placeholder="50"
              className="h-12 border-gray-200 bg-white"
            />
            {errors.deliveryFee && (
              <span className="text-xs text-red-500">
                {errors.deliveryFee.message}
              </span>
            )}
          </div>

          {/* 6. Use Controller for UI Library Selects */}
          <div className="space-y-3">
            <Label className="text-gray-500">
              Category <span className="text-red-500">*</span>
            </Label>
            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="h-12 border-gray-200 bg-white text-gray-500">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="60c72b2f9d1c3f5f5f5c7c10">
                      Foods
                    </SelectItem>
                    <SelectItem value="drinks_id">Drinks</SelectItem>
                    <SelectItem value="snacks_id">Snacks</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <span className="text-xs text-red-500">
                {errors.category.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <Label className="text-gray-500">
              Points <span className="text-red-500">*</span>
            </Label>
            <Controller
              name="points"
              control={control}
              rules={{ required: "Points required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="h-12 border-gray-200 bg-white text-gray-500">
                    <SelectValue placeholder="Select Points" />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 10, 15, 20, 25].map((p) => (
                      <SelectItem key={p} value={String(p)}>
                        {p} Points
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.points && (
              <span className="text-xs text-red-500">
                {errors.points.message}
              </span>
            )}
          </div>

          <div className="space-y-3">
            <Label className="text-gray-500">
              Quantity <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              {...register("quantity", { required: "Quantity is required" })}
              placeholder="10"
              className="h-12 border-gray-200 bg-white"
            />
            {errors.quantity && (
              <span className="text-xs text-red-500">
                {errors.quantity.message}
              </span>
            )}
          </div>

          <div className="space-y-3">
            <Label className="text-gray-500">
              Weight (g) <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              {...register("weight", { required: "Weight is required" })}
              placeholder="25"
              className="h-12 border-gray-200 bg-white"
            />
            {errors.weight && (
              <span className="text-xs text-red-500">
                {errors.weight.message}
              </span>
            )}
          </div>

          <div className="space-y-3">
            <Label className="text-gray-500">
              Status <span className="text-red-500">*</span>
            </Label>
            <Controller
              name="status"
              control={control}
              rules={{ required: "Status is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="h-12 border-gray-200 bg-white text-gray-500">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in_stock">In Stock</SelectItem>
                    <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.status && (
              <span className="text-xs text-red-500">
                {errors.status.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <Label className="text-gray-500">Promo Code</Label>
            <Input
              {...register("promo")}
              placeholder="e.g. NEWYEAR2026"
              className="h-12 border-gray-200 bg-white"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-gray-500">Description</Label>
          <Textarea
            {...register("description")}
            placeholder="Write product description here...."
            className="min-h-32 border-gray-200 bg-white resize-none p-4"
          />
        </div>

        <div className="flex justify-center pt-8 pb-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full md:w-64 h-12 text-base font-medium bg-[#CF4F26] hover:bg-[#b54420] text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Publishing...
              </>
            ) : (
              "Publish Product"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
