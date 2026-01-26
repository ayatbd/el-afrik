"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  Calendar,
  Users,
  Phone,
  Mail,
  Eye,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetCateringBookingQuery } from "@/redux/api/cateringBookingApi";
import { FullScreenLoader } from "@/app/loading";

// 1. Type Definition based on your JSON
// type Reservation = {
//   _id: string; // Added ID for key props
//   email: string;
//   name: string; // e.g., "Royal Wedding Menu"
//   guestCount: number;
//   totalPrice: number;
//   contactNumber: string;
//   paymentStatus: "pending" | "paid" | "cancelled";
//   date?: string; // Optional: Added for UI realism
// };

const AllReservation = () => {
  const { data: response, isLoading } = useGetCateringBookingQuery(undefined);
  const reservations = response?.data?.result || [];
  console.log(reservations);

  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) {
    return <FullScreenLoader />;
  }
  const getStatusBadge = (status: string) => {
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
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
            <XCircle size={12} /> Cancelled
          </span>
        );
      default:
        return <span className="text-gray-500">{status}</span>;
    }
  };

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
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="bg-white border-slate-300 text-slate-700"
            >
              <Filter size={16} className="mr-2" /> Filter
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <Calendar size={16} className="mr-2" /> Create Booking
            </Button>
          </div>
        </div>

        {/* --- Table Container --- */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4">
            <div className="relative w-full max-w-sm">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by email or phone..."
                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">Customer Details</th>
                  <th className="px-6 py-4">Package / Event</th>
                  <th className="px-6 py-4 text-center">Guests</th>
                  <th className="px-6 py-4">Total Amount</th>
                  <th className="px-6 py-4">Payment</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {reservations?.map((res) => (
                  <tr
                    key={res._id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    {/* Customer Column */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-slate-700 font-medium">
                          <Mail size={14} className="text-slate-400" />
                          {res.user.email}
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

                    {/* Price */}
                    <td className="px-6 py-4 font-mono font-medium text-slate-700">
                      ${res.totalPrice.toLocaleString()}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      {getStatusBadge(res.paymentStatus)}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Download the invoice"
                        >
                          <Download size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination (Footer) */}
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Showing 4 of 128 entries</span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs"
                disabled
              >
                Previous
              </Button>
              <Button variant="outline" size="sm" className="h-8 text-xs">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllReservation;
