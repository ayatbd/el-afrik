"use client";

import { Bell, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

// Mock data generator for demonstration
const notifications = Array.from({ length: 45 }, (_, i) => ({
  id: i + 1,
  name: i % 2 === 0 ? `Organic Apple ${i}` : `Sparkling Water ${i}`,
  description:
    i % 2 === 0
      ? "Your order has been shipped"
      : "Your order has been delivered",
  title:
    i % 2 === 0
      ? "Your order has been shipped"
      : "Your order has been delivered",
  time: "Just now",
}));
// -------------------------------------------------------

export default function NotificationsPage() {
  // --- Pagination Logic ---
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const productPerPage = 14;

  const totalPages = Math.ceil(notifications.length / productPerPage);
  const startIndex = (currentPage - 1) * productPerPage;
  const currentData = notifications.slice(
    startIndex,
    startIndex + productPerPage
  );

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
  return (
    <div className="min-h-screen w-full bg-white p-8 font-sans">
      <div className="mx-auto max-w-7xl border rounded-lg bg-white shadow-sm">
        {/* Header Section */}
        <div className="flex items-center gap-4 p-6 pb-2">
          <Bell className="h-6 w-6 text-slate-600" />
          <h1 className="text-lg font-medium text-slate-700">
            My Notifications
          </h1>
          <span className="text-lg font-medium text-[#325389]">1253</span>
        </div>

        {/* Table Section */}
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-slate-200 hover:bg-transparent">
                <TableHead className="w-62.5 px-6 py-4 text-base font-semibold text-slate-800">
                  Name
                </TableHead>
                <TableHead className="px-6 py-4 text-base font-semibold text-slate-800">
                  Title
                </TableHead>
                <TableHead className="px-6 py-4 text-right text-base font-semibold text-slate-800">
                  Title
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((notification, index) => (
                <TableRow
                  key={index}
                  className="border-b border-slate-100 hover:bg-slate-50/50"
                >
                  <TableCell className="px-6 py-5 font-medium text-slate-600">
                    {notification.name}
                  </TableCell>
                  <TableCell className="px-6 py-5 text-slate-500">
                    {notification.description}
                  </TableCell>
                  <TableCell className="px-6 py-5 text-right text-slate-400">
                    {notification.time}
                  </TableCell>
                </TableRow>
              ))}
              {/* Adding empty rows if needed to match height, or mapped directly */}
            </TableBody>
          </Table>
        </div>

        {/* Footer / Pagination Section */}
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
