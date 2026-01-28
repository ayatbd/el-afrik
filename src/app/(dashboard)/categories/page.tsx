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
  const [categoryFilter, setCategoryFilter] = useState("all");

  // --- 2. API Hook ---
  const { data, isLoading, isFetching } = useGetCategoriesQuery({
    page: currentPage,
    limit: 10,
    // Pass filter to backend (Assuming backend accepts 'searchTerm' or 'categoryName')
    // searchTerm: categoryFilter !== "all" ? categoryFilter : undefined,
  });

  const [deleteCategory] = useDeleteCategoryMutation();

  // --- 3. Safe Data Extraction (FIXED) ---
  const categories = data?.data?.result || [];

  // FIX: Extract meta from 'data.data.meta', not from 'categories'
  const meta = data?.data?.meta || {
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 1,
  };

  // --- Date Time Logic ---
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());
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
    if (page >= 1 && page <= meta.totalPage) {
      setCurrentPage(page);
    }
  };

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    setCurrentPage(1); // Reset to page 1 on filter change
  };

  // --- Pagination Logic (Visible Numbers) ---
  const getVisiblePages = () => {
    const total = meta.totalPage;
    const maxVisible = 5;

    // If total pages are less than max, return all
    if (total <= maxVisible) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(total, currentPage + 2);

    if (currentPage <= 3) {
      endPage = 5;
      startPage = 1;
    } else if (currentPage >= total - 2) {
      startPage = total - 4;
      endPage = total;
    }

    const pages = [];
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
          {/* 
             NOTE: Using a Select to filter by category name from the *current list* 
             is tricky because the list changes when you filter. 
             If you want to filter globally, a Search Input is usually better UX.
          */}
          <Select value={categoryFilter} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-45 h-11 border-gray-300 bg-white text-gray-500">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {/* This map might shrink if you filter. Consider fetching all categories separately for the dropdown options if needed. */}
              {categories?.map((category: Category) => (
                <SelectItem key={category._id} value={category.categoryName}>
                  {category.categoryName}
                </SelectItem>
              ))}
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
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  <div className="flex justify-center items-center gap-2 text-gray-500">
                    <Loader2 className="h-5 w-5 animate-spin" /> Loading data...
                  </div>
                </TableCell>
              </TableRow>
            ) : categories.length > 0 ? (
              categories?.map((category: Category, index: number) => (
                <TableRow
                  key={category._id}
                  className="border-b border-gray-100 hover:bg-white/50"
                >
                  <TableCell className="py-4 text-gray-500">
                    {(currentPage - 1) * 10 + index + 1}.
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

        {/* --- Pagination Footer --- */}
        {!isLoading && meta.totalPage > 1 && (
          <div className="mt-10 flex items-center justify-center gap-4 text-sm font-medium text-gray-600">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 text-black cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-opacity hover:bg-gray-200 rounded"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {getVisiblePages().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`flex h-8 w-8 items-center justify-center rounded transition-colors ${
                  currentPage === page
                    ? "bg-black text-white cursor-default"
                    : "cursor-pointer hover:bg-gray-200 text-gray-700"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === meta.totalPage}
              className="p-2 text-black cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-opacity hover:bg-gray-200 rounded"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
