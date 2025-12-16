"use client";

import { ArrowRightLeft } from "lucide-react";
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

// Data structure for the week
const scheduleData = [
  { day: "Sunday", status: "Open", open: "10.00 AM", close: "10.00 PM" },
  { day: "Monday", status: "Open", open: "10.00 AM", close: "10.00 PM" },
  { day: "Tuesday", status: "Open", open: "10.00 AM", close: "10.00 PM" },
  { day: "Wednesday", status: "Open", open: "10.00 AM", close: "10.00 PM" },
  { day: "Thursday", status: "Open", open: "10.00 AM", close: "10.00 PM" },
  { day: "Friday", status: "Open", open: "10.00 AM", close: "10.00 PM" },
  { day: "Saturday", status: "Open", open: "10.00 AM", close: "10.00 PM" },
];

export default function OperatingHours() {
  return (
    <div className="w-full max-w-5xl mx-auto p-6 md:p-10 bg-white min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Operating Hours
          </h1>
          <p className="text-gray-600 mt-2 text-base">
            Set restaurant opening, closing and holiday hours
          </p>
        </div>
        <Link href="/holiday-hours">
          <Button className="w-50 h-12 bg-[#00C058] hover:bg-[#00a049] text-white rounded-full text-base font-medium">
            Holiday Hours Section
          </Button>
        </Link>
      </div>

      <div className="w-full">
        <Table className="text-base">
          <TableHeader>
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="text-gray-900 font-medium text-lg pl-0 pb-6 w-1/4">
                Day
              </TableHead>
              <TableHead className="text-gray-900 font-medium text-lg pb-6 w-1/4">
                Status
              </TableHead>
              <TableHead className="text-gray-900 font-medium text-lg pb-6 w-1/4">
                Opening Time
              </TableHead>
              <TableHead className="text-gray-900 font-medium text-lg text-right pr-0 pb-6 w-1/4">
                Closing Time
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scheduleData.map((item) => (
              <TableRow
                key={item.day}
                className="border-none hover:bg-transparent group"
              >
                <TableCell className="py-6 pl-0 align-middle text-gray-700 font-normal">
                  {item.day}
                </TableCell>
                <TableCell className="py-6 align-middle">
                  <div className="flex items-center gap-3">
                    <ArrowRightLeft className="h-5 w-5 text-gray-900 stroke-[2.5]" />
                    <span className="text-gray-700">{item.status}</span>
                  </div>
                </TableCell>
                <TableCell className="py-6 align-middle text-gray-700">
                  {item.open}
                </TableCell>
                <TableCell className="py-6 pr-0 text-right align-middle text-gray-700">
                  {item.close}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
