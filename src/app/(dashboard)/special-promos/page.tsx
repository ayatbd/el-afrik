"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, CalendarIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddPromoMutation } from "@/redux/api/specialPromos";
import { useGetProductsQuery } from "@/redux/api/productApi";
import Swal from "sweetalert2";

export default function AddProductPage() {
  // 1. API Hooks
  const [addPromo, { isLoading: isSubmitting }] = useAddPromoMutation();
  const { data: productsData, isLoading: isLoadingProducts } =
    useGetProductsQuery(undefined);

  // Safely extract products list
  const allProducts = productsData?.data?.result || [];

  // 2. Form State
  const [formData, setFormData] = useState({
    product: "", // Stores Product ID
    validity: "",
    type: "",
    specialPromoCode: "",
    discountType: "",
    discountAmount: "",
  });

  // 3. Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Basic Validation
    if (
      !formData.product ||
      !formData.specialPromoCode ||
      !formData.discountAmount ||
      !formData.discountType ||
      !formData.type ||
      !formData.validity
    ) {
      Swal.fire("Error", "Please fill in all required fields", "error");
      return;
    }

    try {
      // 4. Construct Payload
      // Note: formData.product already contains the ID from the Select value
      const payload = {
        product: formData.product,
        validity: formData.validity,
        type: formData.type,
        specialPromoCode: formData.specialPromoCode,
        discountType: formData.discountType,
        discountAmount: Number(formData.discountAmount),
      };

      const res = await addPromo(payload).unwrap();

      if (res?.success) {
        Swal.fire("Success", "Promo added successfully!", "success");
        // Reset form
        setFormData({
          product: "",
          validity: "",
          type: "",
          specialPromoCode: "",
          discountType: "",
          discountAmount: "",
        });
      }
    } catch (err: any) {
      console.error(err);
      Swal.fire("Error", err?.data?.message || "Failed to add promo", "error");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F9FAFB] p-6 md:p-10 font-sans text-gray-800">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="p-2 -ml-2 hover:bg-white bg-white/50 rounded-full transition-all border border-transparent hover:border-gray-200 shadow-sm"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Promo</h1>
            <p className="text-sm text-gray-500 mt-1">
              Create a special offer for a specific product.
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Selection (Maps Name -> Sends ID) */}
              <div className="space-y-3">
                <Label className="text-gray-600 font-medium">
                  Select Product <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.product}
                  onValueChange={(val) => handleSelectChange("product", val)}
                >
                  <SelectTrigger className="h-12 border-gray-200 bg-gray-50/30 focus:ring-1 focus:ring-gray-300">
                    <SelectValue
                      placeholder={
                        isLoadingProducts
                          ? "Loading products..."
                          : "Select a product"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {allProducts.map((prod: any) => (
                      <SelectItem key={prod._id} value={prod._id}>
                        {prod.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Promo Type */}
              <div className="space-y-3">
                <Label className="text-gray-600 font-medium">
                  Promo Type <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(val) => handleSelectChange("type", val)}
                >
                  <SelectTrigger className="h-12 border-gray-200 bg-gray-50/30 focus:ring-1 focus:ring-gray-300">
                    <SelectValue placeholder="Select type (e.g. Holiday)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Holiday">Holiday</SelectItem>
                    <SelectItem value="Weekend">Weekend</SelectItem>
                    <SelectItem value="Limited">Limited Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Validity Date */}
              <div className="space-y-3">
                <Label htmlFor="validity" className="text-gray-600 font-medium">
                  Valid Until <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="validity"
                    name="validity"
                    type="date"
                    value={formData.validity}
                    onChange={handleInputChange}
                    className="h-12 border-gray-200 bg-gray-50/30 focus:ring-1 focus:ring-gray-300 block w-full"
                  />
                  <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Promo Code */}
              <div className="space-y-3">
                <Label
                  htmlFor="specialPromoCode"
                  className="text-gray-600 font-medium"
                >
                  Promo Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="specialPromoCode"
                  name="specialPromoCode"
                  value={formData.specialPromoCode}
                  onChange={handleInputChange}
                  placeholder="e.g. SUMMER2026"
                  className="h-12 border-gray-200 bg-gray-50/30 focus:ring-1 focus:ring-gray-300 uppercase tracking-wide"
                />
              </div>

              {/* Discount Type */}
              <div className="space-y-3">
                <Label className="text-gray-600 font-medium">
                  Discount Type
                </Label>
                <Select
                  value={formData.discountType}
                  onValueChange={(val) =>
                    handleSelectChange("discountType", val)
                  }
                >
                  <SelectTrigger className="h-12 border-gray-200 bg-gray-50/30 focus:ring-1 focus:ring-gray-300">
                    <SelectValue placeholder="percentage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                    <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Discount Amount */}
              <div className="space-y-3">
                <Label
                  htmlFor="discountAmount"
                  className="text-gray-600 font-medium"
                >
                  Discount Amount <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="discountAmount"
                  name="discountAmount"
                  type="number"
                  value={formData.discountAmount}
                  onChange={handleInputChange}
                  placeholder="e.g. 20"
                  className="h-12 border-gray-200 bg-gray-50/30 focus:ring-1 focus:ring-gray-300"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-48 h-12 text-base font-medium bg-[#CF4F26] hover:bg-[#b54420] text-white shadow-md rounded-lg transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />{" "}
                    Publishing...
                  </>
                ) : (
                  "Publish Promo"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
