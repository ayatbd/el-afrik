"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Loader2,
} from "lucide-react";
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
import AddCategoryModal from "@/components/modules/categories/AddCategoryModal";
import EditCategoryModal from "@/components/modules/categories/EditCategoryModal";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "@/redux/api/categoriesApi";

type Category = {
  _id: string;
  categoryName: string;
  image: string;
};

export default function CategoryPage() {
  // --- 1. State for Pagination & Filter ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [categoryFilter, setCategoryFilter] = useState("all");

  // --- 2. RTK Query with Parameters ---
  const { data, isLoading, isFetching } = useGetCategoriesQuery({
    page: currentPage,
    limit: itemsPerPage,
  });
  const [deleteCategory] = useDeleteCategoryMutation();

  // --- 3. Safe Data Extraction ---
  const categories = data?.data?.result || [];
  const meta = data?.meta || { page: 1, limit: 10, total: 0, totalPage: 1 };
  const totalPages = meta.totalPage || 1;

  // --- Date Time Logic ---
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date()); // Set initial time on client
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentTime
    ? currentTime.toLocaleString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
    : "Loading time...";

  // --- Handlers ---
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCategory(id).unwrap();
          Swal.fire("Deleted!", "Category has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", "Failed to delete category.", "error");
        }
      }
    });
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    setCurrentPage(1); // Reset to page 1 on filter change
  };

  // --- Pagination Logic (Visible Numbers) ---
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
          {/* Note: Client-side filtering only works on the current page data. 
              Ideally, pass this filter value to useGetCategoriesQuery */}
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
                Category Image
              </TableHead>
              <TableHead className="text-gray-500 font-medium">
                Category Name
              </TableHead>
              <TableHead className="text-center text-gray-500 font-medium">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading || isFetching ? (
              // Loading State
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  <div className="flex justify-center items-center gap-2 text-gray-500">
                    <Loader2 className="h-5 w-5 animate-spin" /> Loading data...
                  </div>
                </TableCell>
              </TableRow>
            ) : categories.length > 0 ? (
              // Data Mapping
              categories?.map((category: Category, index: number) => (
                <TableRow
                  key={category._id}
                  className="border-b border-gray-100 hover:bg-white/50"
                >
                  <TableCell className="py-4 text-gray-500">
                    {/* Calculate Serial Number based on Page */}
                    {(currentPage - 1) * itemsPerPage + index + 1}.
                  </TableCell>

                  <TableCell className="py-4">
                    <Avatar className="h-10 w-10 rounded-md">
                      <AvatarImage
                        src={category.image}
                        alt={category.categoryName}
                        className="object-cover"
                      />
                      <AvatarFallback className="rounded-md uppercase">
                        {category.categoryName?.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>

                  <TableCell className="py-4 text-gray-500">
                    {category.categoryName}
                  </TableCell>

                  <TableCell className="py-4">
                    <div className="flex items-center justify-center gap-5">
                      {/* Pass category data to Edit Modal if needed */}
                      <EditCategoryModal category={category} />
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="cursor-pointer text-red-500 hover:text-red-900 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              // Empty State
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-gray-500"
                >
                  No categories found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        {!isLoading && totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-4 text-sm font-medium text-gray-600">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 text-black cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>

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

            {/* Ellipsis if needed */}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span className="flex h-8 w-8 items-center justify-center">
                ...
              </span>
            )}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 text-black cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
            >
              <ChevronRight className="h-7 w-7" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
