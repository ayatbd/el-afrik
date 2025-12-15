"use client";

import { Plus, Pencil, Trash2 } from "lucide-react";

// If you have Shadcn installed, import these.
// Otherwise, the fallback HTML/Tailwind below works fine.
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

// --- Types ---
type RewardStatus = "Available" | "unavailable";

interface Reward {
  id: number;
  title: string;
  points: number;
  type: string;
  status: RewardStatus;
}

// --- Mock Data ---
const statsData = [
  { title: "Total Reward Claims", value: "07" },
  { title: "Total Reward Offers", value: "06" },
  { title: "Points Distributed", value: "300" },
  { title: "Most Claimed Rewards", value: "07" },
];

const rewardsData: Reward[] = [
  {
    id: 1,
    title: "10% Discount",
    points: 50,
    type: "Discount",
    status: "Available",
  },
  {
    id: 2,
    title: "Free Delivery",
    points: 80,
    type: "Delivery",
    status: "unavailable",
  },
  {
    id: 3,
    title: "Free Item",
    points: 120,
    type: "Free Product",
    status: "Available",
  },
  {
    id: 4,
    title: "10% Discount",
    points: 70,
    type: "Discount",
    status: "unavailable",
  },
  {
    id: 5,
    title: "10% Discount",
    points: 30,
    type: "Discount",
    status: "Available",
  },
  {
    id: 6,
    title: "Free Delivery",
    points: 50,
    type: "Free Product",
    status: "Available",
  },
  {
    id: 7,
    title: "10% Discount",
    points: 50,
    type: "Discount",
    status: "Available",
  },
  {
    id: 8,
    title: "Free Delivery",
    points: 50,
    type: "Free Product",
    status: "Available",
  },
];

export default function RewardsPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 p-8 font-sans text-slate-800">
      {/* --- Top Stats Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statsData.map((stat, index) => (
          <Card
            key={index}
            className="border-none shadow-sm drop-shadow-sm bg-white"
          >
            <CardContent className="flex flex-col items-center justify-center p-8">
              <span className="text-gray-600 text-lg mb-2 font-medium">
                {stat.title}
              </span>
              <span className="text-4xl font-semibold text-gray-800">
                {stat.value}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* --- Action Bar --- */}
      <div className="flex justify-end mb-6">
        <Link href="/rewards/tier-management">
          <Button className="cursor-pointer bg-[#00B25D] hover:bg-[#009e52] text-white px-6 h-11">
            <Plus className="ml-2 h-4 w-4" />
            Add
          </Button>
        </Link>
      </div>

      {/* --- Data Table --- */}
      <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100">
        <Table>
          <TableHeader>
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="text-gray-500 font-medium text-base pl-6 h-16">
                Reward Title
              </TableHead>
              <TableHead className="text-gray-500 font-medium text-base">
                Points Needed
              </TableHead>
              <TableHead className="text-gray-500 font-medium text-base">
                Type
              </TableHead>
              <TableHead className="text-gray-500 font-medium text-base">
                Status
              </TableHead>
              <TableHead className="text-gray-500 font-medium text-base text-right pr-8">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rewardsData.map((reward) => (
              <TableRow
                key={reward.id}
                className="border-none hover:bg-gray-50 h-16 group"
              >
                <TableCell className="font-medium text-gray-500 pl-6">
                  {reward.title}
                </TableCell>
                <TableCell className="text-gray-500">
                  {reward.points} pts
                </TableCell>
                <TableCell className="text-gray-500">{reward.type}</TableCell>
                <TableCell>
                  <StatusBadge status={reward.status} />
                </TableCell>
                <TableCell className="text-right pr-6">
                  <div className="flex items-center justify-end gap-3">
                    <button className="text-blue-600 hover:text-blue-800 transition-colors p-1">
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button className="text-red-500 hover:text-red-700 transition-colors p-1">
                      <Trash2 className="h-5 w-5" />
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

// --- Helper Component for Status ---
function StatusBadge({ status }: { status: RewardStatus }) {
  const isAvailable = status === "Available";

  return (
    <span
      className={`
        px-4 py-1.5 rounded-md text-sm font-medium
        ${
          isAvailable
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600"
        }
      `}
    >
      {status}
    </span>
  );
}
