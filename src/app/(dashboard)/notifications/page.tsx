"use client";

import { Bell } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

// Mock Data based on the image
const notifications = [
  {
    name: "Order Status Updates",
    description:
      "Get notified when your order is accepted, prepared, and delivered.",
    time: "8:38 AM",
  },
  {
    name: "Delivery Alerts",
    description: "Receive updates when the rider is on the way.",
    time: "8:13 AM",
  },
  {
    name: "Payment Confirmation",
    description: "Get instant confirmation after successful payment.",
    time: "7:52 PM",
  },
  {
    name: "Reward Earned Alerts",
    description: "Get notified when you earn points.",
    time: "7:52 PM",
  },
  {
    name: "Reward Expiry Reminder",
    description: "We’ll remind you before your points or rewards expire.",
    time: "4:13 PM",
  },
  {
    name: "Tier Upgrade Notification",
    description: "Get alerted when you move to Silver, Gold, or Platinum.",
    time: "3:52 PM",
  },
  {
    name: "Special Offers & Discounts",
    description: "Receive exclusive discounts and promotional offers.",
    time: "2:30 PM",
  },
  {
    name: "Delivery Alerts",
    description: "Receive updates when the rider is on the way",
    time: "8:38 AM",
  },
  {
    name: "Reward Earned Alerts",
    description: "Get notified when you earn points.",
    time: "8:13 AM",
  },
  {
    name: "Reward Expiry Reminder",
    description: "We’ll remind you before your points or rewards expire.",
    time: "7:52 PM",
  },
];

export default function NotificationsPage() {
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
              {notifications.map((notification, index) => (
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
        <div className="grid grid-cols-3 items-center justify-between border-t border-slate-100 p-6 text-slate-500">
          <div className="text-sm font-medium">
            Showing 1-15 out of <span className="text-slate-700">150</span>
          </div>

          <Pagination className="mx-0 w-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  isActive
                  className="h-8 w-8 rounded-full bg-slate-200 text-slate-900 hover:bg-slate-300 border-none"
                >
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  className="h-8 w-8 text-slate-500 hover:text-slate-900 border-none hover:bg-transparent"
                >
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  className="h-8 w-8 text-slate-500 hover:text-slate-900 border-none hover:bg-transparent"
                >
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis className="text-slate-400" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  className="h-8 w-8 text-slate-500 hover:text-slate-900 border-none hover:bg-transparent"
                >
                  10
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
