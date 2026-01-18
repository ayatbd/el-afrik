"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EditProductModal from "@/components/modules/product-management/EditProductModal";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/redux/api/productApi";

// --- TYPES BASED ON YOUR API RESPONSE ---

interface Product {
  _id: string;
  id: string;
  name: string;
  images: string[];
  weight: number;
  category: string;
  price: number;
  quantity: number;
  status: string;
  createdAt: string;
  isDateLate?: boolean;
}

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

// interface ApiResponse {
//   success: boolean;
//   message: string;
//   statusCode: number;
//   data: {
//     meta: Meta;
//     result: Product[];
//   };
// }

// --- HELPER FUNCTIONS ---

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getStatusBadgeStyles = (status: string) => {
  const normalized = status?.toLowerCase().replace("_", " ");
  if (normalized === "in stock" || normalized === "available")
    return "bg-green-100 text-green-600 hover:bg-green-100 border-green-200";
  if (normalized === "out of stock" || normalized === "unavailable")
    return "bg-red-100 text-red-500 hover:bg-red-100 border-red-200";
  if (normalized === "short stock")
    return "bg-purple-100 text-purple-700 hover:bg-purple-100 border-purple-200";
  return "bg-gray-100 text-gray-600 border-gray-200";
};

const formatStatusLabel = (status: string) => {
  return status?.replace(/_/g, " ").toUpperCase();
};

export default function ManageProductsPage() {
  // --- States ---
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  // --- RTK Query ---
  // We pass query params here assuming your backend handles filtering/pagination
  // If your backend does not accept params yet, remove the argument object.
  const queryParams = {
    page: currentPage,
    limit: 10,
    searchTerm: searchTerm,
    category: categoryFilter !== "all" ? categoryFilter : undefined,
  };

  const {
    data: apiResponse, // This is the full object { success, data: { meta, result } }
    isLoading,
    isError,
  } = useGetProductsQuery(queryParams, {
    refetchOnMountOrArgChange: true,
  });

  // --- Data Extraction ---
  // Safely extract data based on the provided JSON structure
  const products: Product[] = apiResponse?.data?.result || [];
  const meta: Meta = apiResponse?.data?.meta || {
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 1,
  };

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // --- Handlers ---
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 when searching
  };

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= meta.totalPage) {
      setCurrentPage(page);
    }
  };

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Add your delete mutation trigger here
        if (await deleteProduct(id).unwrap()) {
          return Swal.fire("Deleted!", "Product has been deleted.", "success");
        }
      }
    });
  };

  // --- Pagination UI Logic ---
  const getVisiblePages = () => {
    const total = meta.totalPage;
    const pages = [];
    const maxVisible = 5;

    if (total <= maxVisible) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(total, currentPage + 2);

      if (currentPage <= 3) {
        end = 5;
      } else if (currentPage >= total - 2) {
        start = total - 4;
      }

      for (let i = start; i <= end; i++) pages.push(i);
    }
    return pages;
  };

  const formattedTime = currentTime.toLocaleString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] p-6 font-sans text-gray-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="p-1 hover:bg-gray-200 rounded-full transition"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">
            Manage Products
          </h1>
        </div>
        <div className="md:min-w-72 py-2 bg-white border text-center border-gray-200 rounded-md text-sm text-gray-500 shadow-sm">
          {mounted ? formattedTime : "Loading..."}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative w-full md:w-70">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 h-11 border-gray-300 bg-white"
            />
          </div>

          {/* Filter */}
          <Select value={categoryFilter} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-45 h-11 border-gray-300 bg-white text-gray-500">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {/* These IDs should ideally come from a Category API */}
              <SelectItem value="60c72b2f9d1c3f5f5f5c7c10">
                Furniture
              </SelectItem>
              <SelectItem value="foods">Foods</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Link href="/add-products">
          <Button className="cursor-pointer bg-[#00B25D] hover:bg-[#009e52] text-white px-6 h-11">
            Add Products <Plus className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="mb-6 text-sm">
        <span className="text-purple-700 font-medium">Showing:</span>
        <span className="ml-2 text-gray-900 font-semibold">
          {products.length}
        </span>
        <span className="ml-1 text-gray-500">of {meta.total} Products</span>
      </div>

      {/* Table */}
      <div className="bg-transparent overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b-0 hover:bg-transparent">
              <TableHead className="w-16 text-gray-500 font-medium">
                S. no
              </TableHead>
              <TableHead className="text-gray-500 font-medium">
                Product Name
              </TableHead>
              <TableHead className="text-gray-500 font-medium">
                Weight
              </TableHead>
              {/* <TableHead className="text-gray-500 font-medium">Category</TableHead> */}
              <TableHead className="text-gray-500 font-medium">Price</TableHead>
              <TableHead className="text-gray-500 font-medium">Date</TableHead>
              <TableHead className="text-gray-500 font-medium">Stock</TableHead>
              <TableHead className="text-gray-500 font-medium">
                Status
              </TableHead>
              <TableHead className="text-center text-gray-500 font-medium">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  <div className="flex items-center justify-center gap-2 text-gray-500">
                    <Loader2 className="h-6 w-6 animate-spin" /> Loading data...
                  </div>
                </TableCell>
              </TableRow>
            )}

            {isError && (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="h-24 text-center text-red-500"
                >
                  Error loading products.
                </TableCell>
              </TableRow>
            )}

            {!isLoading && !isError && products.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="h-32 text-center text-gray-500"
                >
                  No products found.
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              !isError &&
              products.map((product, index) => (
                <TableRow
                  key={product._id}
                  className="border-b border-gray-100 hover:bg-white/50"
                >
                  <TableCell className="py-4 text-gray-500">
                    {/* Calculate serial number based on page */}
                    {(meta.page - 1) * meta.limit + index + 1}.
                  </TableCell>

                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 rounded-md border border-gray-200">
                        <AvatarImage
                          src={product.images?.[0] || ""}
                          alt={product.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="rounded-md bg-gray-100 text-gray-400">
                          {product.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-gray-700 font-medium text-sm">
                          {product.name}
                        </span>
                        {/* Optional: Show Category ID or Name here if needed */}
                        {/* <span className="text-xs text-gray-400">{product.category}</span> */}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="py-4 text-gray-500">
                    {product.weight ? `${product.weight}g` : "-"}
                  </TableCell>

                  <TableCell className="py-4 text-gray-600 font-medium">
                    {formatCurrency(product.price)}
                  </TableCell>

                  <TableCell className="py-4 text-gray-500">
                    {formatDate(product.createdAt)}
                  </TableCell>

                  <TableCell
                    className={`py-4 font-medium ${
                      product.quantity < 10 ? "text-red-500" : "text-gray-600"
                    }`}
                  >
                    {product.quantity}
                  </TableCell>

                  <TableCell className="py-4">
                    <Badge
                      className={`rounded-md px-3 py-1 font-medium border shadow-none ${getStatusBadgeStyles(
                        product.status,
                      )}`}
                    >
                      {formatStatusLabel(product.status)}
                    </Badge>
                  </TableCell>

                  <TableCell className="py-4">
                    <div className="flex items-center justify-center gap-4">
                      <EditProductModal />
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {!isLoading && !isError && meta.totalPage > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-9 w-9 border-gray-200 hover:bg-gray-100 hover:text-black"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex gap-2 mx-2">
            {getVisiblePages().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`h-9 w-9 rounded-md text-sm font-medium transition-all
                  ${
                    currentPage === page
                      ? "bg-black text-white shadow-md"
                      : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                  }`}
              >
                {page}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === meta.totalPage}
            className="h-9 w-9 border-gray-200 hover:bg-gray-100 hover:text-black"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
