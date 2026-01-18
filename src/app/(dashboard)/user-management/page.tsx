"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Search, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { FaUserCircle } from "react-icons/fa";
import { GoBlocked } from "react-icons/go";
import Link from "next/link";
import Swal from "sweetalert2";
import { useGetUserQuery } from "@/redux/api/userApi";

// Helper hook for debouncing search input
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

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // 1. Debounce the search term to avoid hitting the API on every keystroke
  const debouncedTerm = useDebounce(searchTerm, 500);

  // 2. RTK Query Hook
  // We pass the current page, limit, and the *debounced* search term
  const { data, isLoading, isFetching, isError } = useGetUserQuery({
    page: currentPage,
    limit: itemsPerPage,
    searchTerm: debouncedTerm,
  });
  // console.log(data.data.result);

  // 3. Extract Data safely (Adjust 'data?.data' based on your actual API response structure)
  // Assuming API response structure: { data: User[], meta: { total: number } }
  const users = data?.data?.result || [];
  const meta = data?.meta || {};
  const totalDocs = meta.total || 0; // Total count of users from DB

  const handleBlock = () => {
    Swal.fire("Are you sure?", "You want to block this user!", "warning");
  };

  // 4. Pagination Math (Server-side)
  const totalPages = Math.ceil(totalDocs / itemsPerPage);

  // 5. Handlers
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 when searching
  };

  // 6. Generate visible page numbers
  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = startPage + maxVisible - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="min-h-screen w-full bg-[#F9FAFB] p-6 md:p-10 font-sans text-gray-900">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="text-gray-900 hover:opacity-70 transition-opacity"
          >
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">
            User Management
          </h1>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-75">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by name, email, or mobile..."
            className="pl-10 bg-transparent border-gray-800 rounded-md focus-visible:ring-0 focus-visible:border-black placeholder:text-gray-500"
          />
        </div>
      </div>

      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow className="border-b-0 hover:bg-transparent">
              <TableHead className="text-black font-semibold text-base pl-0">
                User Name
              </TableHead>
              <TableHead className="text-black font-semibold text-base">
                Mobile Number
              </TableHead>
              <TableHead className="text-black font-semibold text-base">
                Email
              </TableHead>
              <TableHead className="text-black font-semibold text-base">
                Date Joined
              </TableHead>
              <TableHead className="text-black font-semibold text-base">
                User Type
              </TableHead>
              <TableHead className="text-black font-semibold text-base text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* LOADING STATE */}
            {isLoading || isFetching ? (
              // Simple Skeleton Loading Rows
              Array.from({ length: 5 }).map((_, idx) => (
                <TableRow key={idx} className="animate-pulse">
                  <TableCell colSpan={6} className="py-4">
                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                  </TableCell>
                </TableRow>
              ))
            ) : isError ? (
              // ERROR STATE
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-10 text-red-500"
                >
                  Something went wrong fetching users.
                </TableCell>
              </TableRow>
            ) : users.length > 0 ? (
              // DATA STATE
              users?.map((user: any) => (
                <TableRow
                  key={user.id || user._id}
                  className="border-b-0 hover:bg-gray-100/50"
                >
                  <TableCell className="py-4 pl-0">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          {user.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-gray-700">
                        {user.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-gray-600">
                    {user.contact}
                  </TableCell>
                  <TableCell className="py-4 text-gray-600">
                    {user.email}
                  </TableCell>
                  <TableCell className="py-4 text-gray-600">
                    {user.createdAt}
                  </TableCell>
                  <TableCell className="py-4 text-gray-600">
                    {user.role}
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center justify-center gap-3">
                      <Link
                        href={`/user-management/${user.id || user._id}`}
                        className="p-0.5 rounded-sm border border-gray-800 text-gray-700 bg-gray-900 hover:bg-gray-800 transition-colors"
                      >
                        <FaUserCircle fill="white" className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={handleBlock}
                        className="p-0.5 rounded-sm border border-gray-800 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <GoBlocked className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              // EMPTY STATE
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-10 text-gray-500"
                >
                  No users found matching &quot;{searchTerm}&quot;
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {!isLoading && totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-4 text-sm font-medium text-gray-600">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 text-black cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
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

          {totalPages > 5 && currentPage < totalPages - 2 && (
            <span className="flex h-8 w-8 items-center justify-center">
              ...
            </span>
          )}

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
  );
}
