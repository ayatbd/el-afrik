"use client";

import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { products } from "@/app/data/categoriesData";
import AddCategoryModal from "@/components/modules/categories/AddCategoryModal";
import EditCategoryModal from "@/components/modules/categories/EditCategoryModal";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function CategoryPage() {
  // --- Date Time Logic ---
  const [currentTime, setCurrentTime] = useState(new Date());
  const [categoryFilter, setCategoryFilter] = useState("all");
  // --- Pagination Logic ---
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const productPerPage = 8;

  const totalPages = Math.ceil(products.length / productPerPage);
  const startIndex = (currentPage - 1) * productPerPage;
  const currentData = products.slice(startIndex, startIndex + productPerPage);

  // --- Pagination Handlers ---
  const getVisiblePages = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // --- Update Time Every Second ---
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

  // --- Delete Handler ---
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

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
  };

  // --- Filtering Logic ---
  const filteredProducts = currentData.filter((product) => {
    // Category Filter
    const matchesCategory =
      categoryFilter === "all" ||
      product.category.toLowerCase() === categoryFilter.toLowerCase();

    return matchesCategory;
  });
  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] p-6 font-sans text-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="p-1 hover:bg-gray-200 rounded-full transition"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">Categories</h1>
        </div>

        <div className="">
          <div className="md:min-w-72 py-2 bg-white border text-center border-gray-200 rounded-md text-sm text-gray-500 shadow-sm">
            {formattedTime}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
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

        <AddCategoryModal />
      </div>

      <div className="bg-transparent overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b-0 hover:bg-transparent">
              <TableHead className="text-gray-500 font-medium">S. no</TableHead>
              <TableHead className="text-gray-500 font-medium">
                Product Image
              </TableHead>
              <TableHead className="text-gray-500 font-medium">
                Category Name
              </TableHead>
              <TableHead className="text-gray-500 font-medium">
                Rewards
              </TableHead>
              <TableHead className="text-center text-gray-500 font-medium">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow
                key={product.id}
                className="border-b border-gray-100 hover:bg-white/50"
              >
                <TableCell className="py-4 text-gray-500">
                  {product.id}.
                </TableCell>

                <TableCell className="py-4">
                  <div className="">
                    <Avatar className="h-10 w-10 rounded-md">
                      <AvatarImage
                        src={product.image}
                        alt={product.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="rounded-md">P</AvatarFallback>
                    </Avatar>
                  </div>
                </TableCell>

                <TableCell className="py-4 text-gray-500">
                  {product.category}
                </TableCell>

                <TableCell className="py-4 text-gray-500">
                  {product.id}
                </TableCell>

                <TableCell className="py-4">
                  <div className="flex items-center justify-center gap-5">
                    <EditCategoryModal />
                    <button
                      onClick={() => handleDelete()}
                      className="cursor-pointer text-red-500 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-4 text-sm font-medium text-gray-600">
            {/* Previous */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 text-black cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>

            {/* Page Numbers (Max 5) */}
            {getVisiblePages().map((page) => (
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
              className={`flex h-8 w-8 items-center justify-center rounded transition-colors`}
            >
              ...{totalPages}
            </button>

            {/* Next */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 text-black disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-7 w-7" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
