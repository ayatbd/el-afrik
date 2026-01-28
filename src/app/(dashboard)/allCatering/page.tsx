"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MoreHorizontal,
  Trash2,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import {
  useDeleteCateringMutation,
  useGetAllCateringQuery,
} from "@/redux/api/cateringApi";
import EditCateringModal from "@/components/modules/catering/EditCateringModal";
import Swal from "sweetalert2";
import { Input } from "@/components/ui/input";

interface CateringItem {
  _id: string;
  id?: string;
  name: string;
  description: string;
  pricePerPerson: number;
  minGuests: number;
  menu: string[];
  image?: string;
}

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

const CateringTable = () => {
  // 1. Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10); // Items per page
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useDebounce(searchTerm, 500);

  const {
    data: responseData,
    isLoading,
    isError,
  } = useGetAllCateringQuery({
    page: currentPage,
    limit,
    search: debouncedSearch,
  });

  // 3. Safe Access to Data & Meta
  const caterings: CateringItem[] = responseData?.data?.result || [];
  const meta = responseData?.data?.meta || { totalPage: 1, total: 0 };

  // 4. Delete Mutation
  const [deleteCatering, { isLoading: isDeleting }] =
    useDeleteCateringMutation();

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCatering(id).unwrap();
          Swal.fire("Deleted!", "Package has been removed.", "success");
        } catch (err) {
          Swal.fire("Error", "Failed to delete package.", "error");
        }
      }
    });
  };

  // 5. Pagination Logic
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= meta.totalPage) {
      setCurrentPage(newPage);
    }
  };

  const getVisiblePages = () => {
    const total = meta.totalPage;
    const maxVisible = 5;

    if (total <= maxVisible) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(total, currentPage + 2);

    if (currentPage <= 3) {
      end = 5;
      start = 1;
    } else if (currentPage >= total - 2) {
      start = total - 4;
      end = total;
    }

    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  // --- Loading State ---
  if (isLoading) return <TableSkeleton />;

  // --- Error State ---
  if (isError)
    return (
      <div className="text-red-500 p-10 text-center">
        Failed to load catering data.
      </div>
    );

  return (
    <div className="container mx-auto py-10 px-4 min-h-screen bg-gray-50/30">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-12">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Catering List
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Manage your event packages and menus.
            </p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search 'birthday'"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9"
            />
          </div>
        </div>
        <Link href="/add-catering">
          <Button className="bg-[#00B25D] hover:bg-[#009e52] text-white">
            Add New Package
          </Button>
        </Link>
      </div>

      {/* Table Container */}
      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 border-b border-gray-100">
              <TableHead className="w-20 py-4 pl-6">Image</TableHead>
              <TableHead className="min-w-50 py-4">Package Name</TableHead>
              <TableHead className="py-4">Price / Head</TableHead>
              <TableHead className="py-4">Min. Guests</TableHead>
              <TableHead className="hidden md:table-cell py-4">
                Menu Preview
              </TableHead>
              <TableHead className="text-right py-4 pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {caterings?.length > 0 ? (
              caterings.map((item: CateringItem) => (
                <TableRow
                  key={item._id || item.id}
                  className="hover:bg-gray-50/50 transition-colors border-b border-gray-100 last:border-0"
                >
                  {/* Image */}
                  <TableCell className="pl-6 py-4">
                    <div className="h-12 w-16 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                      <img
                        src={item.image || "/placeholder-food.jpg"}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </TableCell>

                  {/* Name */}
                  <TableCell className="py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900">
                        {item.name}
                      </span>
                      <span className="text-xs text-muted-foreground line-clamp-1 max-w-62.5">
                        {item.description}
                      </span>
                    </div>
                  </TableCell>

                  {/* Price */}
                  <TableCell className="py-4">
                    <Badge
                      variant="secondary"
                      className="font-mono bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
                    >
                      ${item.pricePerPerson}
                    </Badge>
                  </TableCell>

                  {/* Guests */}
                  <TableCell className="py-4">
                    <div className="text-sm font-medium text-gray-700">
                      {item.minGuests}{" "}
                      <span className="text-gray-400 font-normal">ppl</span>
                    </div>
                  </TableCell>

                  {/* Menu */}
                  <TableCell className="hidden md:table-cell py-4 max-w-75">
                    <div className="flex flex-wrap gap-1">
                      {item.menu?.slice(0, 2).map((m, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="text-[10px] bg-white text-gray-600 font-normal border-gray-200"
                        >
                          {m}
                        </Badge>
                      ))}
                      {item.menu?.length > 2 && (
                        <Badge
                          variant="outline"
                          className="text-[10px] bg-gray-50 text-gray-500 border-gray-200"
                        >
                          +{item.menu.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right pr-6 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 hover:bg-gray-100"
                        >
                          <MoreHorizontal className="h-4 w-4 text-gray-500" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>

                        <DropdownMenuItem asChild>
                          <div className="w-full cursor-pointer">
                            <EditCateringModal catering={item} />
                          </div>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                          onSelect={(e) => e.preventDefault()}
                          onClick={() => handleDelete(item._id)}
                        >
                          {isDeleting ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="mr-2 h-4 w-4" />
                          )}
                          Delete Package
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-muted-foreground"
                >
                  No catering packages found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* --- Pagination Footer --- */}
        {meta.totalPage > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50">
            <span className="text-xs text-gray-500 font-medium">
              Page {currentPage} of {meta.totalPage}
            </span>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-white"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex gap-1">
                {getVisiblePages().map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`h-8 w-8 rounded-md text-xs font-medium transition-colors border ${
                      page === currentPage
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-white"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === meta.totalPage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const TableSkeleton = () => (
  <div className="container mx-auto py-10 px-4">
    <div className="flex justify-between mb-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      <Skeleton className="h-10 w-32" />
    </div>
    <div className="border rounded-md bg-white p-4 space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="h-12 w-16 rounded" />
          <Skeleton className="h-12 w-full" />
        </div>
      ))}
    </div>
  </div>
);

export default CateringTable;
