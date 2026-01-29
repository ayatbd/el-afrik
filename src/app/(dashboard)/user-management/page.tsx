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
import { MdOutlineRestore } from "react-icons/md";
import Link from "next/link";
import Swal from "sweetalert2";
import { useGetUserQuery, useBlockUserMutation } from "@/redux/api/userApi";

// --- 1. Debounce Hook ---
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

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export default function UserManagementPage() {
  // --- 2. State Management ---
  // Combined search state instead of separate name/email
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // --- 3. Debounce Search Term ---
  const debouncedSearch = useDebounce(searchTerm, 500);

  // --- 4. RTK Query Hooks ---
  const { data, isLoading, isFetching, isError } = useGetUserQuery({
    page: currentPage,
    limit: itemsPerPage,
    // Send single 'search' param (Backend should handle regex for name OR email)
    search: debouncedSearch || "",
  });

  const [blockUser] = useBlockUserMutation();

  // --- 5. Data Extraction ---
  const users = data?.data?.result || [];
  const meta: Meta = data?.data?.meta || {
    page: 1,
    limit: itemsPerPage,
    total: 0,
    totalPage: 1,
  };

  const totalPages = meta.totalPage > 0 ? meta.totalPage : 1;

  // --- 6. Handlers ---
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Single handler for the combined search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 on filter change
  };

  const handleBlockToggle = (user: any) => {
    const isBlocked = user.status === "blocked";
    const newStatus = isBlocked ? "in-progress" : "blocked";

    Swal.fire({
      title: isBlocked ? "Unblock User?" : "Block User?",
      text: isBlocked
        ? "This user will regain access to the platform."
        : "This user will be restricted from accessing the platform!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: isBlocked ? "#10B981" : "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: isBlocked ? "Yes, Unblock!" : "Yes, Block!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await blockUser({
            id: user._id || user.id,
            data: { status: newStatus },
          }).unwrap();

          Swal.fire(
            isBlocked ? "Unblocked!" : "Blocked!",
            res.message || "User status updated successfully.",
            "success",
          );
        } catch (err: any) {
          console.error(err);
          Swal.fire(
            "Error!",
            err?.data?.message || "Failed to update status",
            "error",
          );
        }
      }
    });
  };

  // --- 7. Pagination Logic ---
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

        <div className="flex items-center gap-5">
          {/* Combined Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by name or email..."
              className="pl-10 bg-transparent border-gray-800 rounded-md focus-visible:ring-0 focus-visible:border-black placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>

      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow className="border-b-0 hover:bg-transparent">
              <TableHead className="text-black font-semibold text-base pl-4">
                User
              </TableHead>
              <TableHead className="text-black font-semibold text-base">
                Contact
              </TableHead>
              <TableHead className="text-black font-semibold text-base">
                Name
              </TableHead>
              <TableHead className="text-black font-semibold text-base">
                Email
              </TableHead>
              <TableHead className="text-black font-semibold text-base">
                Joined
              </TableHead>
              <TableHead className="text-black font-semibold text-base">
                Role
              </TableHead>
              <TableHead className="text-black font-semibold text-base">
                Status
              </TableHead>
              <TableHead className="text-black font-semibold text-base text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading || isFetching ? (
              Array.from({ length: itemsPerPage }).map((_, idx) => (
                <TableRow key={idx} className="animate-pulse">
                  <TableCell colSpan={7} className="py-4">
                    <div className="h-12 bg-gray-200 rounded w-full"></div>
                  </TableCell>
                </TableRow>
              ))
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-10 text-red-500"
                >
                  Failed to load users.
                </TableCell>
              </TableRow>
            ) : users.length > 0 ? (
              users.map((user: any) => {
                const isBlocked = user.status === "blocked";

                return (
                  <TableRow
                    key={user.id || user._id}
                    className={`border-b-0 hover:bg-gray-100/50 transition-all duration-300 ${
                      isBlocked ? "bg-red-50/50 opacity-60 grayscale-[0.5]" : ""
                    }`}
                  >
                    <TableCell className="py-4 pl-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-gray-200">
                          <AvatarImage src={user.image} alt={user.name} />
                          <AvatarFallback className="bg-gray-100 text-gray-600">
                            {user.name?.charAt(0).toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span
                            className={`font-medium ${isBlocked ? "text-gray-500 line-through" : "text-gray-700"}`}
                          >
                            {user.name}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="py-4 text-gray-600">
                      {user.firstName + " " + user.lastName || "N/A"}
                    </TableCell>

                    <TableCell className="py-4 text-gray-600">
                      {user.contact || "N/A"}
                    </TableCell>

                    <TableCell className="py-4 text-gray-600">
                      {user.email}
                    </TableCell>

                    <TableCell className="py-4 text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>

                    <TableCell className="py-4">
                      <span className="capitalize px-2 py-1 rounded bg-gray-100 text-xs font-medium text-gray-700">
                        {user.role}
                      </span>
                    </TableCell>

                    <TableCell className="py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize border ${
                          isBlocked
                            ? "bg-red-100 text-red-800 border-red-200"
                            : "bg-green-100 text-green-800 border-green-200"
                        }`}
                      >
                        {user.status || "Active"}
                      </span>
                    </TableCell>

                    <TableCell className="py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/user-management/${user.id || user._id}`}
                          className={`p-1.5 rounded border border-gray-800 bg-gray-900 text-white hover:bg-gray-700 transition-colors ${isBlocked ? "pointer-events-none opacity-50" : ""}`}
                        >
                          <FaUserCircle className="h-4 w-4" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleBlockToggle(user)}
                          title={isBlocked ? "Unblock User" : "Block User"}
                          className={`p-1.5 rounded border transition-colors cursor-pointer ${
                            isBlocked
                              ? "border-green-600 text-green-600 hover:bg-green-50"
                              : "border-red-600 text-red-600 hover:bg-red-50"
                          }`}
                        >
                          {isBlocked ? (
                            <MdOutlineRestore className="h-4 w-4" />
                          ) : (
                            <GoBlocked className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-10 text-gray-500"
                >
                  No users found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* --- 8. Pagination --- */}
      {!isLoading && totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-4 text-sm font-medium text-gray-600">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex gap-2">
            {getVisiblePages().map((p) => (
              <button
                key={p}
                onClick={() => handlePageChange(p)}
                className={`h-8 w-8 rounded flex items-center justify-center transition-colors ${
                  currentPage === p
                    ? "bg-black text-white"
                    : "hover:bg-gray-200 text-gray-700"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
