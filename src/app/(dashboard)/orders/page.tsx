"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
  ArrowUpDown,
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
import { FullScreenLoader } from "@/app/loading";

// --- 1. Debounce Hook to prevent API spam ---
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
  // --- 2. State Management for Filters & Pagination ---
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Items per page
  const [searchTerm, setSearchTerm] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [orderType, setOrderType] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const debouncedSearch = useDebounce(searchTerm, 500);

  // --- 3. RTK Query with Parameters ---
  // We pass the object directly. ensure your API slice accepts these args.
  const { data, isLoading } = useGetOrdersQuery({
    page,
    limit,
    searchTerm: debouncedSearch,
    orderStatus,
    orderType,
    paymentStatus,
    sortBy: "createdAt",
    sortOrder,
  });

  // Accessing data safely (Adjust 'result' or 'orders' based on your actual API response structure)
  const orders = data?.data?.result || data?.data?.orders || [];
  const meta = data?.data?.meta || { total: 0, totalPage: 1 };

  // --- 4. Handlers ---
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= meta.totalPage) {
      setPage(newPage);
    }
  };

  // Reset page to 1 when any filter changes
  const handleFilterChange = (setter: any, value: string) => {
    setter(value);
    setPage(1);
  };

  const toggleSort = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  // Helper for Status Colors
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

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <div className="min-h-screen w-full bg-[#F8F9FA] p-6 md:p-10 font-sans text-gray-900">
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

      {/* --- Filters Toolbar --- */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="pl-9"
            />
          </div>

          {/* Order Status Filter */}
          <select
            className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={orderStatus}
            onChange={(e) => handleFilterChange(setOrderStatus, e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="ongoing">Ongoing</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Order Type Filter */}
          <select
            className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={orderType}
            onChange={(e) => handleFilterChange(setOrderType, e.target.value)}
          >
            <option value="">All Types</option>
            <option value="pickup">Pickup</option>
            <option value="delivery">Delivery</option>
            <option value="point_redemption">Redemption</option>
          </select>

          {/* Payment Status Filter */}
          <select
            className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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

          {/* Sort Button */}
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

      {/* --- Table Section --- */}
      <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 border-b hover:bg-gray-50">
              <TableHead className="text-gray-900 font-semibold py-4 pl-6">
                Order Info
              </TableHead>
              <TableHead className="text-gray-900 font-semibold py-4">
                Items
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
                  {/* Order Info (S No & ID) */}
                  <TableCell className="py-6 pl-6 align-top">
                    <span className="font-mono text-gray-500 text-xs block mb-1">
                      #{(page - 1) * limit + index + 1}
                    </span>
                    <span className="font-medium text-sm text-gray-900">
                      ID: {order.orderId || order._id?.slice(-6)}
                    </span>
                  </TableCell>

                  {/* Items Images */}
                  <TableCell className="py-6 align-top">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-3">
                        {order?.items
                          ?.slice(0, 3)
                          .map((item: any, idx: number) => (
                            <Avatar
                              key={idx}
                              className="h-10 w-10 border-2 border-white shadow-sm"
                            >
                              <AvatarImage
                                src={item.image}
                                alt="Product"
                                className="object-cover"
                              />
                              <AvatarFallback>IM</AvatarFallback>
                            </Avatar>
                          ))}
                        {order?.items?.length > 3 && (
                          <div className="h-10 w-10 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-600 font-bold z-10">
                            +{order.items.length - 3}
                          </div>
                        )}
                      </div>
                      <span className="text-gray-600 text-xs font-medium bg-gray-100 px-2 py-1 rounded">
                        {order.items?.length} Items
                      </span>
                    </div>
                  </TableCell>

                  {/* Financials */}
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

                  {/* Date */}
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

                  {/* Customer */}
                  <TableCell className="py-6 align-top">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={order.receiverAvatar}
                          className="object-cover"
                        />
                        <AvatarFallback>
                          {order.user?.firstName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-gray-900 text-sm font-medium">
                          {order.user?.firstName} {order.user?.lastName}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {order.customerPhone}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Status Badges */}
                  <TableCell className="py-6 align-top">
                    <div className="flex flex-col gap-2 items-start">
                      {/* Order Status */}
                      <span
                        className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getStatusColor(order.orderStatus)}`}
                      >
                        {order.orderStatus}
                      </span>

                      {/* Type & Payment (Mini Badges) */}
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

                  {/* Action */}
                  <TableCell className="py-6 align-middle text-right pr-6">
                    <Link href={`/orders/${order._id}`}>
                      <Button
                        size="sm"
                        className="bg-[#00C058] hover:bg-[#00a84d] text-white"
                      >
                        View Details
                      </Button>
                    </Link>
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

        {/* --- Pagination Footer --- */}
        {meta.totalPage > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
            <span className="text-sm text-gray-500">
              Page {page} of {meta.totalPage} ({meta.total} total)
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="h-8 w-8"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === meta.totalPage}
                className="h-8 w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
