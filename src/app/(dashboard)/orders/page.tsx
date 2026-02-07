"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Pencil,
  Eye,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetOrdersQuery } from "@/redux/api/ordersApi";
import { UpdateOrderModal } from "@/components/modules/orders/EditStatusModal";

// Debounce Hook
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

export default function OrdersPage() {
  // State Management
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [orderType, setOrderType] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<{
    id: string;
    status: string;
  } | null>(null);

  // RTK Query Fetch
  const { data, isLoading, isFetching } = useGetOrdersQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: limit },
    { name: "search", value: debouncedSearch },
    { name: "orderStatus", value: orderStatus },
    { name: "orderType", value: orderType },
    { name: "paymentStatus", value: paymentStatus },
    { name: "sortBy", value: "createdAt" },
    { name: "sortOrder", value: sortOrder },
  ]);

  const orders = data?.data?.result || data?.data?.orders || [];

  // --- 1. RESOLVED: Robust Meta Calculation ---
  const meta = data?.data?.pagination || { total: 0, totalPages: 0 };

  // Calculate total pages safely.
  // If api provides totalPages, use it. If not, calculate from total items.
  const totalItems = meta.total || 0;
  const calculatedPages = Math.ceil(totalItems / limit);
  const totalPages = meta.totalPages || calculatedPages || 1;

  // --- 2. RESOLVED: Handler checks against calculated totalPages ---
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleFilterChange = (setter: any, value: string) => {
    setter(value);
    setCurrentPage(1);
  };

  const toggleSort = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "delivered":
      case "completed":
        return "bg-green-500 text-white";
      case "cancelled":
        return "bg-red-500 text-white";
      case "ongoing":
      case "processing":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  // --- 3. RESOLVED: Visible Pages Logic ---
  const getVisiblePages = () => {
    const maxVisible = 5;
    // Ensure startPage is at least 1
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = startPage + maxVisible - 1;

    // Adjust if endPage exceeds totalPages
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handleEditClick = (order: any) => {
    setSelectedOrder({ id: order._id, status: order.orderStatus });
    setIsModalOpen(true);
  };

  // Optional: Loading state for initial load only.
  // Pagination updates usually feel better if the table stays visible (with opacity) rather than full spinner.
  if (isLoading) {
    return (
      <div className="h-[80vh] w-full flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-[#00B25D] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#F8F9FA] p-6 md:p-10 font-sans text-gray-900">
      <UpdateOrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        orderId={selectedOrder?.id || null}
        currentStatus={selectedOrder?.status || ""}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Link
            href="/"
            className="p-1 -ml-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-800" />
          </Link>
          <h1 className="text-xl font-medium text-gray-900">
            Orders Management
          </h1>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by order number"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9"
            />
          </div>

          <select
            className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            value={orderStatus}
            onChange={(e) => handleFilterChange(setOrderStatus, e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="ongoing">Ongoing</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            value={orderType}
            onChange={(e) => handleFilterChange(setOrderType, e.target.value)}
          >
            <option value="">All Types</option>
            <option value="pickup">Pickup</option>
            <option value="delivery">Delivery</option>
            <option value="point_redemption">Redemption</option>
          </select>

          <select
            className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            value={paymentStatus}
            onChange={(e) =>
              handleFilterChange(setPaymentStatus, e.target.value)
            }
          >
            <option value="">All Payments</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
            <option value="points_paid">Points Paid</option>
          </select>

          <Button
            variant="outline"
            onClick={toggleSort}
            className="flex items-center justify-center gap-2"
          >
            <ArrowUpDown size={16} />
            {sortOrder === "desc" ? "Newest First" : "Oldest First"}
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <div
        className={`w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${isFetching ? "opacity-70 pointer-events-none" : ""}`}
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 border-b hover:bg-gray-50">
              <TableHead className="text-gray-900 font-semibold py-4 pl-6">
                Order Info
              </TableHead>
              <TableHead className="text-gray-900 font-semibold py-4">
                Financials
              </TableHead>
              <TableHead className="text-gray-900 font-semibold py-4">
                Date
              </TableHead>
              <TableHead className="text-gray-900 font-semibold py-4">
                Customer
              </TableHead>
              <TableHead className="text-gray-900 font-semibold py-4">
                Type/Status
              </TableHead>
              <TableHead className="text-gray-900 font-semibold py-4 text-right pr-6">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.length > 0 ? (
              orders.map((order: any, index: number) => (
                <TableRow
                  key={order._id || index}
                  className="border-b hover:bg-gray-50/50 transition-colors"
                >
                  <TableCell className="py-6 pl-6 align-top">
                    <span className="font-mono text-gray-500 text-xs block mb-1">
                      #{(currentPage - 1) * limit + index + 1}
                    </span>
                    <span className="font-medium text-sm text-gray-900">
                      ID: {order.orderId || order._id?.slice(-6)}
                    </span>
                  </TableCell>

                  <TableCell className="py-6 align-top">
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-gray-900">
                        Price: ${order.subtotal}
                      </span>
                      <span className="text-xs text-gray-500">
                        Delivery: ${order.deliveryFee}
                      </span>
                      <span className="text-xs text-indigo-600 font-medium">
                        Points: {order.totalPoints}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="py-6 align-top text-gray-700 font-normal">
                    {new Date(order.createdAt).toLocaleDateString()}
                    <br />
                    <span className="text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </TableCell>

                  <TableCell className="py-6 align-top">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={
                            typeof order.user === "object"
                              ? order.receiverAvatar
                              : undefined
                          }
                          className="object-cover"
                        />
                        <AvatarFallback>
                          {typeof order.user === "object"
                            ? order.user?.firstName?.charAt(0)
                            : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-gray-900 text-sm font-medium">
                          {typeof order.user === "object"
                            ? `${order.user?.firstName} ${order.user?.lastName}`
                            : "Refreshing..."}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {order.customerPhone}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="py-6 align-top">
                    <div className="flex flex-col gap-2 items-start">
                      <span
                        className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getStatusColor(order.orderStatus)}`}
                      >
                        {order.orderStatus}
                      </span>
                      <div className="flex gap-1">
                        <span className="text-[10px] border border-gray-200 px-1.5 py-0.5 rounded text-gray-600 uppercase bg-gray-50">
                          {order.orderType === "point_redemption"
                            ? "Redeem"
                            : order.orderType}
                        </span>
                        <span
                          className={`text-[10px] border px-1.5 py-0.5 rounded uppercase ${order.paymentStatus === "paid" ? "border-green-200 text-green-700 bg-green-50" : "border-yellow-200 text-yellow-700 bg-yellow-50"}`}
                        >
                          {order.paymentStatus}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="py-6 align-middle text-right pr-6">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 border-gray-300"
                        onClick={() => handleEditClick(order)}
                        title="Update Status"
                      >
                        <Pencil className="h-4 w-4 text-gray-600" />
                      </Button>

                      <Link href={`/orders/${order._id}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 border-gray-300"
                        >
                          <Eye className="h-4 w-4 text-gray-600" />
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-10 text-gray-500"
                >
                  No orders found matching your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* --- 4. RESOLVED: Pagination Footer --- */}
        {/* Only show if we have data and more than 1 page */}
        {!isLoading && totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2 mb-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
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
                    page === currentPage
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
              disabled={currentPage >= totalPages}
              className="h-9 w-9 border-gray-200 hover:bg-gray-100 hover:text-black"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
