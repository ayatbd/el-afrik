"use client";

import { X, Loader2, Pencil } from "lucide-react";
import { useState, ChangeEvent, useEffect } from "react";
import Swal from "sweetalert2";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// You need to ensure this mutation exists in your API slice
import { useGetCategoriesQuery } from "@/redux/api/categoriesApi";
import { useEditProductMutation } from "@/redux/api/productApi";

// --- Types ---
interface ProductFormValues {
  name: string;
  weight: number;
  category: string;
  price: number;
  discount_type: string;
  discount_amount: number;
  quantity: number;
  calories: string;
  readyTime: string;
  status: string;
  deliveryFee: number;
  points: number;
  description: string;
  promo: string;
  isRedem: boolean;
  isFeatured: boolean;
}

// Define the shape of the product data coming from your API
interface ProductData {
  _id: string;
  name: string;
  images: string[];
  category: { _id: string; categoryName: string } | string;
  price: number;
  weight: number;
  quantity: number;
  status: string;
  deliveryFee: number;
  points: number;
  calories?: string;
  readyTime?: string;
  description?: string;
  discount?: {
    discount_type: string;
    discount_amount: number;
  };
  promo?: string;
  isRedem?: boolean;
  isFeatured?: boolean;
}

export default function EditProductModal({
  product,
}: {
  product: ProductData;
}) {
  const [open, setOpen] = useState(false);

  // Use the Update Mutation instead of Add
  const [updateProduct, { isLoading }] = useEditProductMutation();

  const { data: categories } = useGetCategoriesQuery(undefined);
  const categoriesData = categories?.data?.result || [];

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues: {
      name: "",
      discount_type: "percentage",
      discount_amount: 0,
      isRedem: false,
      isFeatured: false,
    },
  });

  // Image State
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  // --- Populate Form when Modal Opens ---
  useEffect(() => {
    // Safety check: Don't run if product is missing
    if (open && product) {
      // 1. Safe Category Extraction
      // We must check "product.category !== null" because "typeof null" is 'object'
      let categoryId = "";
      if (product.category && typeof product.category === "object") {
        categoryId = (product.category as any)._id; // It's a populated object
      } else if (typeof product.category === "string") {
        categoryId = product.category; // It's just an ID string
      }

      reset({
        name: product.name || "",
        price: product.price || 0,
        weight: product.weight || 0,
        quantity: product.quantity || 0,
        status: product.status || "in_stock",
        deliveryFee: product.deliveryFee || 0,
        points: product.points || 0,
        calories: product.calories || "",
        readyTime: product.readyTime || "",
        description: product.description || "",
        promo: product.promo || "",
        isRedem: product.isRedem || false,
        isFeatured: product.isFeatured || false,

        // 2. Use the safely extracted category ID
        category: categoryId,

        // 3. Safe Discount extraction
        discount_type: product.discount?.discount_type || "percentage",
        discount_amount: product.discount?.discount_amount || 0,
      });

      setPreviews(product.images || []);
      setImageFiles([]);
    }
  }, [open, product, reset]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      setImageFiles((prev) => [...prev, ...newFiles]);
      // Add new previews to the list
      setPreviews((prev) => [
        ...prev,
        ...newFiles.map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  const removeImage = (indexToRemove: number) => {
    // Visual removal
    setPreviews((prev) => prev.filter((_, index) => index !== indexToRemove));

    // Logic to remove from file array if it was a newly added file
    // (This is a simplified approach. Ideally, you handle server-side deletion separately)
    const existingCount = product.images?.length || 0;
    if (indexToRemove >= existingCount) {
      // It's a new file
      setImageFiles((prev) =>
        prev.filter((_, idx) => idx !== indexToRemove - existingCount),
      );
    }
  };

  const onSubmit: SubmitHandler<ProductFormValues> = async (formData) => {
    try {
      const data = new FormData();

      // Data Transformation
      const { discount_type, discount_amount, points, promo, ...rest } =
        formData;

      const bodyObj = {
        ...rest,
        price: Number(formData.price),
        weight: Number(formData.weight),
        quantity: Number(formData.quantity),
        deliveryFee: Number(formData.deliveryFee),
        points: Number(points),
        discount: {
          discount_type,
          discount_amount: Number(discount_amount),
        },
        ...(promo && { promo }),
      };

      data.append("body", JSON.stringify(bodyObj));

      // Append only NEW images
      imageFiles.forEach((file) => {
        data.append("image", file);
      });

      // Send Request (Pass ID)
      const response = await updateProduct({ id: product._id, data }).unwrap();

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Product Updated!",
          text: "Changes have been saved successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
        setOpen(false); // Close Modal
      }
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Something went wrong";
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: errorMessage,
      });
    }
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-blue-600 hover:bg-blue-50"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      {/* Scrollable Modal Content */}
      <DialogContent className="sm:max-w-6xl max-h-[90vh] overflow-y-auto bg-white p-6 md:p-10">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900 mb-4">
            Edit Product
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* --- Image Upload --- */}
          <div className="space-y-4">
            <Label className="text-base font-normal text-gray-500">
              Product Images
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50/50 hover:bg-gray-50 cursor-pointer">
                <span className="text-green-500 font-medium text-sm">
                  Add New
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
                  className="relative h-40 w-full group rounded-lg overflow-hidden border border-gray-200"
                >
                  <img
                    src={img}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 p-1 bg-white/80 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* --- Basic Details --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <Label className="text-gray-500">Product Name *</Label>
              <Input
                {...register("name", { required: "Name is required" })}
                className="h-12 border-gray-200 bg-white"
              />
              {errors.name && (
                <span className="text-xs text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="space-y-3">
              <Label className="text-gray-500">Category *</Label>
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
                      {categoriesData?.map((category: any) => (
                        <SelectItem
                          key={category._id}
                          value={category._id}
                          className="capitalize"
                        >
                          {category.categoryName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-3">
              <Label className="text-gray-500">Price *</Label>
              <Input
                type="number"
                step="0.01"
                {...register("price", { required: "Price is required" })}
                className="h-12 border-gray-200 bg-white"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-gray-500">Delivery Fee *</Label>
              <Input
                type="number"
                {...register("deliveryFee", { required: true })}
                className="h-12 border-gray-200 bg-white"
              />
            </div>
          </div>

          {/* --- Discount & Nutrition --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <Label className="text-gray-500">Discount Type</Label>
              <Controller
                name="discount_type"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="h-12 border-gray-200 bg-white text-gray-500">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="discount_amount">
                        Flat Amount
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-3">
              <Label className="text-gray-500">Discount Amount</Label>
              <Input
                type="number"
                {...register("discount_amount")}
                className="h-12 border-gray-200 bg-white"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-gray-500">Calories</Label>
              <Input
                {...register("calories")}
                className="h-12 border-gray-200 bg-white"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-gray-500">Ready Time</Label>
              <Input
                {...register("readyTime")}
                className="h-12 border-gray-200 bg-white"
              />
            </div>
          </div>

          {/* --- Inventory & Status --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <Label className="text-gray-500">Quantity *</Label>
              <Input
                type="number"
                {...register("quantity", { required: true })}
                className="h-12 border-gray-200 bg-white"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-gray-500">Weight (g) *</Label>
              <Input
                type="number"
                {...register("weight", { required: true })}
                className="h-12 border-gray-200 bg-white"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-gray-500">Status *</Label>
              <Controller
                name="status"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="h-12 border-gray-200 bg-white text-gray-500">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in_stock">In Stock</SelectItem>
                      <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-3">
              <Label className="text-gray-500">Points Awarded</Label>
              <Input
                type="number"
                {...register("points")}
                className="h-12 border-gray-200 bg-white"
              />
            </div>
          </div>

          {/* --- Extra Options --- */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-end">
            <div className="flex items-center space-x-2 h-12 pb-2">
              <Controller
                name="isFeatured"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isFeatured"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <label
                      htmlFor="isFeatured"
                      className="text-sm font-medium text-gray-600"
                    >
                      Mark as Featured
                    </label>
                  </div>
                )}
              />
            </div>

            <div className="flex items-center space-x-2 h-12 pb-2">
              <Controller
                name="isRedem"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isRedem"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <label
                      htmlFor="isRedem"
                      className="text-sm font-medium text-gray-600"
                    >
                      Mark as Redeem
                    </label>
                  </div>
                )}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-gray-500">Description</Label>
            <Textarea
              {...register("description")}
              className="min-h-32 border-gray-200 bg-white resize-none p-4"
            />
          </div>

          <div className="flex justify-end pt-4 gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-48 h-10 text-base font-medium bg-[#CF4F26] hover:bg-[#b54420] text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
