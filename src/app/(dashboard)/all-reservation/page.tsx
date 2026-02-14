"use client";

import { useState, useEffect } from "react";
import {
  Filter,
  Calendar,
  Users,
  Phone,
  Mail,
  CheckCircle,
  Clock,
  Download,
  Loader2,
  ChevronLeft,
  ChevronRight,
  RefreshCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetCateringBookingQuery,
  useLazyDownloadInvoiceQuery,
} from "@/redux/api/cateringBookingApi";
import { toast } from "sonner";

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

const AllReservation = () => {
  // --- 2. State Management ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Filters
  const [paymentFilter, setPaymentFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const debouncedSearch = useDebounce(searchTerm, 500);

  // --- 3. API Query ---
  const { data: response, isLoading } = useGetCateringBookingQuery({
    page: currentPage,
    limit: itemsPerPage,
    searchTerm: debouncedSearch,
    paymentStatus: paymentFilter !== "all" ? paymentFilter : undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
  });

  // Safe Data Extraction
  const reservations = response?.data?.result || [];
  const meta = response?.data?.meta || { totalPage: 1, total: 0 };

  // --- 4. Invoice Download Logic ---
  const [triggerDownload] = useLazyDownloadInvoiceQuery();
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownloadInvoice = async (id: string) => {
    try {
      setDownloadingId(id);
      const blob = await triggerDownload(id).unwrap();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download invoice.");
    } finally {
      setDownloadingId(null);
    }
  };

  // --- 5. Handlers ---
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= meta.totalPage) {
      setCurrentPage(newPage);
    }
  };

  const handleFilterChange = (setter: any, value: string) => {
    setter(value);
    setCurrentPage(1); // Reset to page 1 on filter change
  };

  const resetFilters = () => {
    setSearchTerm("");
    setPaymentFilter("all");
    setStatusFilter("all");
    setCurrentPage(1);
  };

  // --- 6. Helper for Badges ---
  const getPaymentBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
            <CheckCircle size={12} /> Paid
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-200">
            <Clock size={12} /> Pending
          </span>
        );
      default:
        return <span className="text-gray-500">{status}</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
            Completed
          </span>
        );
      case "confirmed":
        return (
          <span className="px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-700 border border-purple-200">
            Confirmed
          </span>
        );
      case "cancelled":
        return (
          <span className="px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700 border border-red-200">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
            Pending
          </span>
        );
    }
  };

  // --- 7. Pagination UI Logic ---
  const getVisiblePages = () => {
    const total = meta.totalPage;
    const maxVisible = 5;
    if (total <= maxVisible)
      return Array.from({ length: total }, (_, i) => i + 1);

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

  if (isLoading) {
    return (
      <div className="h-[80vh] w-full flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-[#00B25D] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <div className="mx-auto space-y-6">
        {/* --- Page Header --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              All Reservations
            </h1>
            <p className="text-sm text-slate-500">
              Manage bookings, payments, and guest lists.
            </p>
          </div>

          <Button
            onClick={resetFilters}
            variant="ghost"
            size="sm"
            className="text-slate-500 hover:text-slate-900"
          >
            <RefreshCcw size={14} className="mr-2" /> Reset Filters
          </Button>
        </div>

        {/* --- Filter Toolbar --- */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Payment Filter */}
          <Select
            value={paymentFilter}
            onValueChange={(val) => handleFilterChange(setPaymentFilter, val)}
          >
            <SelectTrigger className="h-10">
              <div className="flex items-center gap-2 text-slate-600">
                <Filter size={16} />
                <SelectValue placeholder="Payment" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select
            value={statusFilter}
            onValueChange={(val) => handleFilterChange(setStatusFilter, val)}
          >
            <SelectTrigger className="h-10">
              <div className="flex items-center gap-2 text-slate-600">
                <CheckCircle size={16} />
                <SelectValue placeholder="Status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* --- Table Container --- */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">Customer Details</th>
                  <th className="px-6 py-4">Package / Event</th>
                  <th className="px-6 py-4 text-center">Guests</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Payment</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {reservations?.length > 0 ? (
                  reservations.map((res: any) => (
                    <tr
                      key={res._id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      {/* Customer Column */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-slate-700 font-medium">
                            <Mail size={14} className="text-slate-400" />
                            {res.user?.email}
                          </div>
                          <div className="flex items-center gap-2 text-slate-500 text-xs">
                            <Phone size={14} className="text-slate-400" />
                            {res.contactNumber}
                          </div>
                        </div>
                      </td>

                      {/* Package Column */}
                      <td className="px-6 py-4">
                        <span className="font-medium text-slate-800">
                          {res?.package?.name}
                        </span>
                        {res.eventDate && (
                          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                            <Calendar size={12} />
                            {new Date(res.eventDate).toLocaleDateString()}
                          </div>
                        )}
                      </td>

                      {/* Guest Count */}
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 text-slate-600 font-medium text-xs border border-slate-200">
                          <Users size={12} />
                          {res.guestCount}
                        </div>
                      </td>

                      {/* Booking Status */}
                      <td className="px-6 py-4">
                        {getStatusBadge(res.status || "pending")}
                      </td>

                      {/* Payment Status & Amount */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col items-start gap-1">
                          {getPaymentBadge(res.paymentStatus)}
                          <span className="text-xs text-slate-500 font-mono">
                            ${res.totalPrice.toLocaleString()}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div>
                          <button
                            onClick={() => handleDownloadInvoice(res._id)}
                            disabled={downloadingId === res._id}
                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:cursor-not-allowed"
                            title="Download Invoice"
                          >
                            {downloadingId === res._id ? (
                              <Loader2
                                size={18}
                                className="animate-spin text-indigo-600"
                              />
                            ) : (
                              <Download size={18} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-12 text-slate-500"
                    >
                      No reservations found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination (Footer) */}
          {meta.totalPage > 1 && (
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 bg-slate-50/50">
              <span>
                Page {currentPage} of {meta.totalPage} ({meta.total} Total)
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
                          ? "bg-slate-900 text-white border-slate-900"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
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
    </div>
  );
};

export default AllReservation;
