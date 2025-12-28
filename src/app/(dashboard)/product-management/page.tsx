"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
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

// --- MOCK DATA (Replace this with your actual import) ---
// import { products, ProductStatus } from "@/app/data/categoriesData";
type ProductStatus = "Available" | "unavailable" | "Short Stock";

// Mock data generator for demonstration
const products = Array.from({ length: 45 }, (_, i) => ({
  id: i + 1,
  name: i % 2 === 0 ? `Organic Apple ${i}` : `Sparkling Water ${i}`,
  weight: "1kg",
  category: i % 3 === 0 ? "Foods" : i % 3 === 1 ? "Drinks" : "Snacks",
  price: "$10.00",
  date: "2024-01-15",
  stock: i * 5,
  status: (i % 5 === 0
    ? "unavailable"
    : i % 4 === 0
    ? "Short Stock"
    : "Available") as ProductStatus,
  image: "",
  isDateLate: i % 10 === 0,
}));
// -------------------------------------------------------

const getStatusBadgeStyles = (status: ProductStatus) => {
  switch (status) {
    case "Available":
      return "bg-green-100 text-green-600 hover:bg-green-100";
    case "unavailable":
      return "bg-red-100 text-red-500 hover:bg-red-100";
    case "Short Stock":
      return "bg-purple-100 text-purple-700 hover:bg-purple-100";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default function ManageProductsPage() {
  // --- States for Search, Filter, Pagination ---
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Adjust number of rows per page here

  // --- Date Time Logic ---
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    // Only run on client to avoid hydration mismatch
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentTime.toLocaleString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  // --- Filtering Logic ---
  const filteredProducts = products.filter((product) => {
    // 1. Search Filter (Name)
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // 2. Category Filter
    const matchesCategory =
      categoryFilter === "all" ||
      product.category.toLowerCase() === categoryFilter.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // --- Handlers ---
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 on search
  };

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    setCurrentPage(1); // Reset to page 1 on filter
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

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
        <div className="">
          <div className="md:min-w-72 py-2 bg-white border text-center border-gray-200 rounded-md text-sm text-gray-500 shadow-sm">
            {formattedTime}
          </div>
        </div>
      </div>

      {/* Controls: Search, Filter, Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative w-full md:w-70">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 h-11 border-gray-300 bg-white"
            />
          </div>

          {/* Category Select */}
          <Select value={categoryFilter} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-45 h-11 border-gray-300 bg-white text-gray-500">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="foods">Foods</SelectItem>
              <SelectItem value="drinks">Drinks</SelectItem>
              <SelectItem value="snacks">Snacks</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Link href="/add-products">
          <Button className="cursor-pointer bg-[#00B25D] hover:bg-[#009e52] text-white px-6 h-11">
            Add Products
            <Plus className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Stats Line */}
      <div className="mb-6 text-sm">
        <span className="text-purple-700 font-medium">Showing:</span>
        <span className="ml-2 text-gray-900 font-semibold">
          {filteredProducts.length}
        </span>
        <span className="ml-1 text-gray-500">
          of {products.length} Products
        </span>
      </div>

      {/* Table */}
      <div className="bg-transparent overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b-0 hover:bg-transparent">
              <TableHead className="w-12.5 text-gray-500 font-medium">
                S. no
              </TableHead>
              <TableHead className="text-gray-500 font-medium">
                Product Name
              </TableHead>
              <TableHead className="text-gray-500 font-medium">
                Weight
              </TableHead>
              <TableHead className="text-gray-500 font-medium">
                Category
              </TableHead>
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
            {currentData.length > 0 ? (
              currentData.map((product) => (
                <TableRow
                  key={product.id}
                  className="border-b border-gray-100 hover:bg-white/50"
                >
                  <TableCell className="py-4 text-gray-500">
                    {product.id}.
                  </TableCell>

                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 rounded-md">
                        <AvatarImage
                          src={product.image}
                          alt={product.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="rounded-md">
                          P
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-gray-600 font-normal">
                        {product.name}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="py-4 text-gray-500">
                    {product.weight}
                  </TableCell>
                  <TableCell className="py-4 text-gray-500">
                    {product.category}
                  </TableCell>
                  <TableCell className="py-4 text-gray-500">
                    {product.price}
                  </TableCell>

                  <TableCell
                    className={`py-4 ${
                      product.isDateLate
                        ? "text-red-600 font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    {product.date}
                  </TableCell>

                  <TableCell
                    className={`py-4 ${
                      product.status === "Short Stock"
                        ? "text-blue-600 font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    {product.stock}
                  </TableCell>

                  <TableCell className="py-4">
                    <Badge
                      className={`rounded-sm px-3 py-1 font-normal border-0 shadow-none ${getStatusBadgeStyles(
                        product.status
                      )}`}
                    >
                      {product.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="py-4">
                    <div className="flex items-center justify-center gap-5">
                      <EditProductModal />
                      <button
                        onClick={() => handleDelete()}
                        className="cursor-pointer text-red-500 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="text-center py-10 text-gray-500"
                >
                  No products found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4 text-sm font-medium text-gray-600 pb-10">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 text-black cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`flex h-8 w-8 items-center justify-center rounded transition-colors ${
                currentPage === page
                  ? "bg-gray-300 text-black cursor-default"
                  : "cursor-pointer hover:bg-gray-200 hover:text-black"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 text-black cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
}
