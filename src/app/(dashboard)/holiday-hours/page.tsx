"use client";

import React from "react";
import { ArrowLeft, ArrowRightLeft, X, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

// Data structure based on the screenshot
const holidayData = [
  { day: "Christmas Day", status: "Close", open: "-", close: "-" },
  { day: "Monday", status: "Open", open: "10.00 AM", close: "10.00 PM" },
  { day: "Tuesday", status: "Close", open: "10.00 AM", close: "10.00 PM" },
  { day: "Wednesday", status: "Close", open: "10.00 AM", close: "10.00 PM" },
  { day: "Thursday", status: "Close", open: "10.00 AM", close: "10.00 PM" },
  { day: "Friday", status: "Close", open: "10.00 AM", close: "10.00 PM" },
  { day: "Saturday", status: "Close", open: "10.00 AM", close: "10.00 PM" },
];

export default function HolidayHours() {
  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-10 bg-white min-h-screen font-sans">
      {/* Back Button */}
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="p-1 hover:bg-gray-200 rounded-full transition"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </Link>
        <h1 className="text-xl font-semibold text-gray-900">Back</h1>
      </div>

      {/* Header Section */}
      <div className="md:my-12 my-6">
        <h1 className="text-3xl font-semibold text-gray-900">Holiday Hours</h1>
        <p className="text-gray-600 mt-2 text-base">
          Set restaurant opening, closing and holiday hours
        </p>
      </div>

      {/* Table Section */}
      <div className="w-full">
        <Table className="text-base">
          <TableHeader>
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="text-gray-900 font-medium text-lg pl-0 pb-6 w-[20%]">
                Holiday
              </TableHead>
              {/* Note: Header says 'Date' but content shows Status, matching the design */}
              <TableHead className="text-gray-900 font-medium text-lg pb-6 w-[20%]">
                Date
              </TableHead>
              <TableHead className="text-gray-900 font-medium text-lg pb-6 w-[20%]">
                Opening Time
              </TableHead>
              <TableHead className="text-gray-900 font-medium text-lg pb-6 w-[20%]">
                Closing Time
              </TableHead>
              <TableHead className="text-gray-900 font-medium text-lg text-right pr-4 pb-6 w-[20%]">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {holidayData.map((item, index) => (
              <TableRow
                key={index}
                className="border-none hover:bg-transparent group"
              >
                {/* Holiday Name Column */}
                <TableCell className="py-6 pl-0 align-middle text-gray-700 font-normal">
                  {item.day}
                </TableCell>

                {/* Status/Date Column */}
                <TableCell className="py-6 align-middle">
                  <div className="flex items-center gap-3">
                    {item.status === "Open" ? (
                      <ArrowRightLeft className="h-5 w-5 text-gray-900 stroke-[2.5]" />
                    ) : (
                      <X className="h-5 w-5 text-gray-900 stroke-[2.5]" />
                    )}
                    <span className="text-gray-700 capitalize">
                      {item.status}
                    </span>
                  </div>
                </TableCell>

                {/* Opening Time Column */}
                <TableCell className="py-6 align-middle text-gray-700">
                  {item.open}
                </TableCell>

                {/* Closing Time Column */}
                <TableCell className="py-6 align-middle text-gray-700">
                  {item.close}
                </TableCell>

                {/* Action Column */}
                <TableCell className="py-6 pr-4 align-middle text-right">
                  <div className="flex items-center justify-end gap-4">
                    <button className="text-black hover:text-gray-700 transition-colors">
                      <Pencil className="h-5 w-5 fill-current" />
                    </button>
                    <button className="text-[#DC2626] hover:text-red-700 transition-colors">
                      <Trash2 className="h-5 w-5 fill-current" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
