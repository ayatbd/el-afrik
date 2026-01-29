"use client";

import { Button } from "@/components/ui/button";
import { useGetSingleProductQuery } from "@/redux/api/productApi";
// Assuming you have a productsApi slice similar to your ordersApi
import {
  Calendar,
  Package,
  Tag,
  DollarSign,
  Layers,
  Award,
  Truck,
  Star,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { FullScreenLoader } from "@/app/loading";

// Type definition based on your JSON response
type Product = {
  _id: string;
  name: string;
  images: string[];
  weight: number;
  category: string;
  price: number;
  quantity: number;
  status: string;
  deliveryFee: number;
  points: number;
  description: string;
  promo: string;
  isFavourite: boolean;
  isVip: boolean;
  isFeatured: boolean;
  isRedem: boolean;
  createdAt: string;
  updatedAt: string;
  totalRating: number;
  review: [];
  __v: number;
};

const ProductDetails = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  // Integration: Fetching data using RTK Query
  const { data: productData, isLoading, error } = useGetSingleProductQuery(id);
  const product: Product = productData?.data || {};

  // Helper: Format Date
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Helper: Status Badge Colors
  const getStatusColor = (status: string, quantity: number) => {
    if (quantity === 0) return "bg-red-100 text-red-700 border-red-200";
    if (quantity < 5) return "bg-yellow-100 text-yellow-700 border-yellow-200"; // Low stock warning

    switch (status) {
      case "in_stock":
        return "bg-green-100 text-green-700 border-green-200";
      case "out_of_stock":
        return "bg-red-100 text-red-700 border-red-200";
      case "discontinued":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  // --- LOADING STATE ---
  if (isLoading) {
    return (
      <div className="h-[80vh] w-full flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-[#00B25D] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // --- ERROR STATE ---
  if (error || !product || Object.keys(product).length === 0) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center gap-4 bg-gray-50">
        <h2 className="text-xl font-semibold text-red-500">
          Product not found
        </h2>
        <p className="text-gray-500 text-sm">
          The product ID #{id} may have been deleted.
        </p>
        <Button onClick={() => router.back()} variant="outline">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 p-12 font-sans">
      <div className="mx-auto space-y-6">
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {product?.name}
              </h1>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold uppercase border ${getStatusColor(product?.status, product?.quantity)}`}
              >
                {product?.quantity === 0
                  ? "Out of Stock"
                  : product?.status?.replace("_", " ")}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1 font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">
                ID: {product?._id}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} /> Created: {formatDate(product?.createdAt)}
              </span>
              {product?.isVip && (
                <span className="flex items-center gap-1 text-yellow-600 font-bold">
                  <Award size={14} /> VIP Exclusive
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* <Button
              variant="outline"
              className="border-gray-300 text-gray-700 gap-2"
            >
              <Edit size={16} /> Edit
            </Button>
            <Button
              variant="destructive"
              className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 gap-2"
            >
              <Trash2 size={16} /> Delete
            </Button> */}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* --- LEFT COLUMN (MAIN INFO) --- */}
          <div className="lg:col-span-2 space-y-6">
            {/* 1. Image & Basic Info */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Main Image */}
                <div className="relative w-full md:w-1/3 aspect-square rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
                  <Image
                    src={product?.images?.[0] || "/placeholder.png"}
                    alt={product?.name}
                    fill
                    className="object-cover"
                  />
                  {product?.images?.length > 1 && (
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      +{product.images.length - 1} more
                    </div>
                  )}
                </div>

                {/* Description & Specs */}
                <div className="flex-1 space-y-4">
                  <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2">
                    Product Description
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {product?.description || "No description provided."}
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-500 uppercase font-bold">
                        Category ID
                      </p>
                      <p className="text-sm font-mono text-indigo-600 truncate">
                        {product?.category}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-500 uppercase font-bold">
                        Weight
                      </p>
                      <p className="text-sm text-gray-900">
                        {product?.weight} g
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Flags & Settings */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Layers size={18} /> Configuration
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div
                  className={`p-4 rounded-lg border flex flex-col items-center text-center gap-2 ${product.isVip ? "bg-yellow-50 border-yellow-200" : "bg-gray-50 border-gray-200"}`}
                >
                  {product.isVip ? (
                    <CheckCircle2 className="text-yellow-600" />
                  ) : (
                    <XCircle className="text-gray-400" />
                  )}
                  <span className="text-sm font-medium">VIP Exclusive</span>
                </div>
                <div
                  className={`p-4 rounded-lg border flex flex-col items-center text-center gap-2 ${product.isFeatured ? "bg-purple-50 border-purple-200" : "bg-gray-50 border-gray-200"}`}
                >
                  {product.isFeatured ? (
                    <CheckCircle2 className="text-purple-600" />
                  ) : (
                    <XCircle className="text-gray-400" />
                  )}
                  <span className="text-sm font-medium">Featured</span>
                </div>
                <div
                  className={`p-4 rounded-lg border flex flex-col items-center text-center gap-2 ${product.isRedem ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"}`}
                >
                  {product.isRedem ? (
                    <CheckCircle2 className="text-green-600" />
                  ) : (
                    <XCircle className="text-gray-400" />
                  )}
                  <span className="text-sm font-medium">Redeemable</span>
                </div>
                <div
                  className={`p-4 rounded-lg border flex flex-col items-center text-center gap-2 ${product.isFavourite ? "bg-pink-50 border-pink-200" : "bg-gray-50 border-gray-200"}`}
                >
                  {product.isFavourite ? (
                    <CheckCircle2 className="text-pink-600" />
                  ) : (
                    <XCircle className="text-gray-400" />
                  )}
                  <span className="text-sm font-medium">Favourite</span>
                </div>
              </div>
            </div>

            {/* 3. Review Summary (Placeholder based on JSON) */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Star size={18} /> Reviews
                </h2>
                <span className="text-sm text-gray-500">
                  Total Rating: {product?.totalRating || 0}
                </span>
              </div>
              {product?.review?.length === 0 ? (
                <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <p className="text-gray-400 text-sm">No reviews yet.</p>
                </div>
              ) : (
                <div>{/* Map reviews here if array is populated */}</div>
              )}
            </div>
          </div>

          {/* --- RIGHT COLUMN (PRICING & INVENTORY) --- */}
          <div className="space-y-6">
            {/* 4. Pricing Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <DollarSign size={18} /> Pricing
              </h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Base Price</span>
                  <span className="font-medium">
                    ${product?.price?.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery Fee</span>
                  <span>${product?.deliveryFee?.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">Selling Price</span>
                  <span className="font-bold text-2xl text-indigo-600">
                    ${product?.price?.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-100 rounded-lg p-3 flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-full text-purple-600">
                  <Tag size={16} />
                </div>
                <div>
                  <p className="text-xs font-bold text-purple-800 uppercase">
                    Active Promo
                  </p>
                  <p className="text-sm font-mono font-medium text-purple-700">
                    {product?.promo || "NO CODE"}
                  </p>
                </div>
              </div>
            </div>

            {/* 5. Inventory & Logistics */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Package size={18} /> Inventory
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <span className="text-sm text-gray-600">Available Qty</span>
                  <span
                    className={`text-lg font-bold ${product?.quantity < 10 ? "text-red-600" : "text-gray-900"}`}
                  >
                    {product?.quantity}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <Truck className="text-gray-400 shrink-0 mt-0.5" size={16} />
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase">
                      Shipping Logistics
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      Standard Delivery
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Fee: ${product?.deliveryFee}
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Award size={14} className="text-blue-600" />
                    <p className="text-xs font-bold text-blue-800 uppercase">
                      Loyalty Reward
                    </p>
                  </div>
                  <p className="text-sm text-blue-900">
                    Customer earns{" "}
                    <span className="font-bold">+{product?.points} points</span>{" "}
                    per purchase.
                  </p>
                </div>
              </div>
            </div>

            {/* 6. System Info (Audit) */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-sm font-bold text-gray-400 uppercase mb-4">
                System Data
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Last Updated</span>
                  <span className="text-gray-700 font-medium text-right">
                    {formatDate(product?.updatedAt)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Created At</span>
                  <span className="text-gray-700 font-medium text-right">
                    {formatDate(product?.createdAt)}
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-2 mt-2">
                  <p className="text-xs text-gray-400 font-mono text-center">
                    Version: v{product?.__v}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
