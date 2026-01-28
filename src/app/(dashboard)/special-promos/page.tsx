"use client";

import React, { useState } from "react";
import Link from "next/link";
import { format, isPast, parseISO } from "date-fns";
import { useDeletePromoMutation, useGetPromoQuery } from "@/redux/api/PromoApi";
import { FullScreenLoader } from "@/app/loading";

// Shadcn & UI Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Copy,
  Check,
  CalendarDays,
  Tag,
  ShoppingBag,
  AlertCircle,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";

const SpecialPromoPage = () => {
  // --- 1. State for Pagination & Filtering ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filterType, setFilterType] = useState<string>("all"); // 'all', 'holiday', 'weekend', etc.

  // --- 2. API Query with Params ---
  // Ensure your backend accepts these query parameters
  const {
    data: responseData,
    isLoading,
    isError,
  } = useGetPromoQuery({
    page: currentPage,
    limit: itemsPerPage,
    type: filterType !== "all" ? filterType : undefined,
  });

  // Safe Data Extraction
  const promoData = responseData?.data?.result || [];
  const meta = responseData?.data?.meta || { totalPage: 1, total: 0 };

  const [deletePromo] = useDeletePromoMutation();

  // --- Handlers ---
  const handleDelete = async (id: string) => {
    try {
      await deletePromo(id).unwrap();
      toast.success("Promo deleted successfully!");
    } catch (error: unknown) {
      const errorMessage =
        (((error as Record<string, unknown>)?.data as Record<string, unknown>)
          ?.message as string | undefined) || "Failed to delete Promo";
      toast.error(errorMessage);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= meta.totalPage) {
      setCurrentPage(newPage);
    }
  };

  const handleFilterChange = (value: string) => {
    setFilterType(value);
    setCurrentPage(1); // Reset to page 1 when filter changes
  };

  // State for the "Copy to Clipboard" feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Helper to determine status
  const getStatus = (validityDate: string) => {
    if (!validityDate)
      return { label: "Unknown", color: "bg-gray-100 text-gray-500" };
    const date = parseISO(validityDate);
    const expired = isPast(date);

    return expired
      ? { label: "Expired", color: "bg-gray-100 text-gray-500 border-gray-200" }
      : {
          label: "Active",
          color: "bg-emerald-50 text-emerald-600 border-emerald-200",
        };
  };

  // --- Pagination Logic (Visible Pages) ---
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

  if (isLoading) return <FullScreenLoader />;

  if (isError) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center text-red-500 gap-2">
        <AlertCircle size={40} />
        <p className="font-medium">Failed to load promotions.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-8 space-y-8 min-h-screen bg-gray-50/30">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Promo Campaigns
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage your special discounts and product offers.
          </p>
        </div>
        <Link href="/add-promo" className="w-full md:w-auto">
          <Button className="bg-[#00B25D] hover:bg-[#009e52] cursor-pointer w-full md:w-auto">
            + Create New Promo
          </Button>
        </Link>
      </div>

      {/* Main Table Card */}
      <Card className="border shadow-sm overflow-hidden bg-white">
        <CardHeader className="bg-white border-b py-4 px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-base font-semibold text-gray-700 flex items-center gap-2">
              All Active & Past Promos
              <Badge
                variant="secondary"
                className="bg-gray-100 text-gray-600 hover:bg-gray-100"
              >
                {meta.total} Total
              </Badge>
            </CardTitle>

            {/* --- Filter Dropdown --- */}
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-400" />
              <Select value={filterType} onValueChange={handleFilterChange}>
                <SelectTrigger className="w-45 h-9 text-xs">
                  <SelectValue placeholder="Filter by Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="holiday">Holiday Special</SelectItem>
                  <SelectItem value="weekend">Weekend Deal</SelectItem>
                  <SelectItem value="limited">Limited</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent bg-gray-50/50">
                <TableHead className="w-75 py-4 pl-6 text-xs uppercase tracking-wider font-semibold text-gray-500">
                  Product Details
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold text-gray-500">
                  Type
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold text-gray-500">
                  Promo Code
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold text-gray-500">
                  Discount
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold text-gray-500">
                  Status
                </TableHead>
                <TableHead className="text-right pr-6 text-xs uppercase tracking-wider font-semibold text-gray-500">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promoData.length > 0 ? (
                promoData.map((promo: any) => {
                  const status = getStatus(promo.validity);

                  return (
                    <TableRow
                      key={promo._id}
                      className="group border-b border-gray-100 hover:bg-gray-50/50 transition-all duration-200"
                    >
                      {/* Product Info */}
                      <TableCell className="pl-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-gray-200 bg-white">
                            <Avatar className="h-full w-full rounded-none">
                              <AvatarImage
                                src={promo?.product?.images?.[0]}
                                className="object-cover"
                              />
                              <AvatarFallback className="bg-gray-50 text-gray-300">
                                <ShoppingBag size={18} />
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="font-medium text-gray-900 line-clamp-1 text-sm">
                              {promo?.product?.productName || "Product Name"}
                            </span>
                            <span className="text-[10px] text-gray-500 flex items-center gap-1">
                              <CalendarDays size={10} />
                              {format(
                                parseISO(promo.createdAt),
                                "MMM dd, yyyy",
                              )}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      {/* Type Badge (Added column for context) */}
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="capitalize font-normal text-xs bg-gray-50 text-gray-600 border-gray-200"
                        >
                          {promo.type || "General"}
                        </Badge>
                      </TableCell>

                      {/* Promo Code with Copy Function */}
                      <TableCell>
                        <div
                          onClick={() =>
                            handleCopy(promo.specialPromoCode, promo.id)
                          }
                          className="flex items-center gap-2 px-2.5 py-1 rounded-md border border-dashed border-gray-300 bg-white w-fit cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors group/code"
                        >
                          <Tag
                            size={12}
                            className="text-gray-400 group-hover/code:text-blue-500"
                          />
                          <span className="font-mono text-xs font-semibold text-gray-700 group-hover/code:text-blue-700">
                            {promo.specialPromoCode}
                          </span>
                          {copiedId === promo.id ? (
                            <Check size={12} className="text-green-500" />
                          ) : (
                            <Copy
                              size={12}
                              className="text-gray-300 group-hover/code:text-blue-400"
                            />
                          )}
                        </div>
                      </TableCell>

                      {/* Discount */}
                      <TableCell>
                        <div className="flex items-baseline gap-1">
                          <span className="text-sm font-bold text-gray-900">
                            {promo.discountAmount}
                          </span>
                          <span className="text-[10px] font-medium text-muted-foreground uppercase">
                            OFF
                          </span>
                        </div>
                      </TableCell>

                      {/* Status / Validity */}
                      <TableCell>
                        <div className="flex flex-col items-start gap-1">
                          <Badge
                            variant="outline"
                            className={cn(
                              "font-medium px-2 py-0 text-[10px] shadow-none border",
                              status.color,
                            )}
                          >
                            {status.label}
                          </Badge>
                          <span className="text-[10px] text-gray-400 font-medium ml-0.5">
                            Ends {format(parseISO(promo.validity), "MMM dd")}
                          </span>
                        </div>
                      </TableCell>

                      {/* Action */}
                      <TableCell className="text-right pr-6">
                        <Button
                          onClick={() => handleDelete(promo._id)}
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer rounded-full"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                // Empty State
                <TableRow>
                  <TableCell colSpan={6} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="bg-gray-50 h-16 w-16 rounded-full flex items-center justify-center mb-3">
                        <Tag className="text-gray-300" size={32} />
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        No Promos Found
                      </h3>
                      <p className="text-xs text-gray-500 max-w-xs mt-1">
                        {filterType !== "all"
                          ? `No promos found for "${filterType}". Try changing the filter.`
                          : "You haven't created any special promotion campaigns yet."}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>

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
      </Card>
    </div>
  );
};

export default SpecialPromoPage;
