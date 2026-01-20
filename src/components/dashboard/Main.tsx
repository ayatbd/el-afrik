"use client";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

// mock data

const topStats = [
  { label: "Total Users", value: "125" },
  { label: "Active Today", value: "250" },
  { label: "New Signups", value: "300" },
  { label: "Total Points Issued", value: "200" },
  { label: "Rewards Redeemed Today", value: "200" },
];

const rewardsData = [
  { name: "Gold", value: 12, percent: "28.6%", color: "#FCD34D" },
  { name: "Platinum", value: 22, percent: "42.9%", color: "#FDE68A" },
  { name: "Titanium", value: 12, percent: "28.6%", color: "#86EFAC" },
  { name: "Silver", value: 12, percent: "28.6%", color: "#FCA5A5" },
];

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserOverview from "../modules/dashboard-home/UserOverview";
import SalesMatricData from "../modules/dashboard-home/SalesMatricData";
import LoginReviewsData from "../modules/dashboard-home/LoginReviewsData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useState } from "react";
import { useGetProductsQuery } from "@/redux/api/productApi";

export default function Main() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: initialData, isLoading } = useGetProductsQuery(undefined);

  const items = initialData?.data.result || [];
  // console.log(items);

  const itemsPerPage = 8;

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = items.slice(startIndex, startIndex + itemsPerPage);

  // 3. Handlers
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Function to get visible page numbers (max 5)
  const getVisiblePages = () => {
    const maxVisible = 5;
    let start = Math.max(1, currentPage - 2);
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };
  return (
    <div className="p-6 bg-white min-h-screen space-y-6 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
        {topStats.map((stat, idx) => (
          <Card key={idx} className="shadow-sm border-gray-100">
            <CardContent className="flex flex-col items-center justify-center py-6 text-center">
              <span className="text-gray-500 text-sm font-medium mb-2">
                {stat.label}
              </span>
              <span className="text-3xl font-bold text-gray-800">
                {stat.value}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* <UserOverview /> */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="shadow-sm border-gray-100 space-y-5">
          <CardHeader className="flex md:flex-row flex-col items-center gap-y-8 justify-between pb-2 py-2">
            <div className="md:space-y-3 space-y-7 w-full">
              <CardTitle className="flex md:flex-row flex-col justify-between items-center gap-4 w-full text-lg font-medium text-gray-800">
                <p>User Overview</p>
                <div className="flex gap-2">
                  <Select defaultValue="user">
                    <SelectTrigger className="w-32 h-8 text-xs">
                      <SelectValue placeholder="Account Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="2026">
                    <SelectTrigger className="w-32 h-8 text-xs">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2028">2028</SelectItem>
                      <SelectItem value="2027">2027</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardTitle>
              <div className="flex md:justify-start justify-center space-x-4 mt-2 text-xs text-gray-500">
                <div>
                  <p className="font-semibold text-gray-800">35.80%</p>
                  <p>Overly Growth</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">15.36%</p>
                  <p>Monthly</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">58.36%</p>
                  <p>Daily</p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <UserOverview />
          </CardContent>
        </Card>
        {/* Sales Matrics */}
        <Card className="shadow-sm border-gray-100 space-y-5">
          <CardHeader className="pb-2">
            <div className="space-y-5">
              <div className="flex sm:flex-row flex-col md:gap-0 gap-y-5 items-center justify-between">
                <CardTitle className="text-lg font-medium text-gray-800">
                  Daily/Weekly/Monthly Sales Metrics
                </CardTitle>
                <div className="flex space-x-4 mt-2 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Combo</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-orange-700"></div>
                    <span>Drinks</span>
                  </div>
                </div>
                <Select defaultValue="2026">
                  <SelectTrigger className="w-32 h-8 text-xs">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2028">2028</SelectItem>
                    <SelectItem value="2027">2027</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex md:justify-start justify-center space-x-4 mt-2 text-xs text-gray-500">
                <div>
                  <p className="font-semibold text-gray-800">78.18%</p>
                  <p>Overly Growth</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">48.00%</p>
                  <p>Monthly</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">89.80%</p>
                  <p>Daily</p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <SalesMatricData />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="shadow-sm border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-gray-800">
              Most Redeemed Rewards
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="relative h-55 w-55">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={rewardsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={90}
                    paddingAngle={0}
                    dataKey="value"
                    stroke="none"
                  >
                    {rewardsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs text-gray-500">Total Value</span>
                <span className="text-3xl font-bold text-gray-800">72</span>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <div className="grid grid-cols-3 text-sm text-gray-500 border-b border-gray-100 pb-2 mb-2">
                <span>Label</span>
                <span className="text-center">Value</span>
                <span className="text-right">%</span>
              </div>
              <div className="space-y-3">
                {rewardsData.map((item, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-3 text-sm items-center"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-gray-700">{item.name}</span>
                    </div>
                    <span className="text-center font-semibold text-gray-800">
                      {item.value}
                    </span>
                    <span className="text-right font-semibold text-gray-800">
                      {item.percent}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-gray-100">
          <CardHeader className="pb-2">
            <div className="space-y-5">
              <div className="flex sm:flex-row flex-col md:gap-0 gap-y-5 items-center justify-between">
                <CardTitle className="text-lg font-medium text-gray-800">
                  Daily/Weekly/Monthly Logins & Reviews
                </CardTitle>
                <div className="flex space-x-4 mt-2 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Logins</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-orange-700"></div>
                    <span>Reviews</span>
                  </div>
                </div>
                <Select defaultValue="2026">
                  <SelectTrigger className="w-32 h-8 text-xs">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2028">2028</SelectItem>
                    <SelectItem value="2027">2027</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex md:justify-start justify-center space-x-4 mt-2 text-xs text-gray-500">
                <div>
                  <p className="font-semibold text-gray-800">78.18%</p>
                  <p>Overly Growth</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">48.00%</p>
                  <p>Monthly</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">89.80%</p>
                  <p>Daily</p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <LoginReviewsData />
          </CardContent>
        </Card>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-b-0 hover:bg-transparent">
            <TableHead className="w-25 text-base font-semibold text-black">
              Item Image
            </TableHead>
            <TableHead className="text-base font-semibold text-black">
              Item Name
            </TableHead>
            <TableHead className="text-base font-semibold text-black">
              Revenue Generated
            </TableHead>
            <TableHead className="text-base font-semibold text-black">
              Avg.Rating
            </TableHead>
            <TableHead className="text-base font-semibold text-black">
              Category
            </TableHead>
            <TableHead className="text-base font-semibold text-black text-right pr-6">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.length > 0 ? (
            currentData.map((item) => (
              <TableRow
                key={item.id}
                className="border-b-0 hover:bg-gray-50/50 transition-colors"
              >
                {/* Image Column */}
                <TableCell className="py-4">
                  <Avatar className="h-14 w-14 border border-gray-100">
                    <AvatarImage
                      src={item.images}
                      alt={item.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-orange-100 text-orange-600">
                      {item.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>

                {/* Name Column */}
                <TableCell className="py-4 text-base font-medium text-gray-700">
                  {item.name}
                </TableCell>

                {/* Revenue Column */}
                <TableCell className="py-4 text-base text-gray-700">
                  {/* {item.revenue} */}
                  Data Loading...
                </TableCell>

                {/* Rating Column */}
                <TableCell className="py-4">
                  <div className="flex items-center gap-1.5 text-base text-gray-700">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{item.rating}</span>
                  </div>
                </TableCell>

                {/* Category Column */}
                <TableCell className="py-4 text-base text-gray-700">
                  {item.category}
                </TableCell>

                {/* Status Column */}
                <TableCell className="py-4 text-right pr-6">
                  <Badge className="bg-[#E6F8EB] text-[#00B25D] hover:bg-[#d8f5df] border-0 rounded-md px-3 py-1 text-sm font-normal shadow-none">
                    {item.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-10 text-gray-500"
              >
                No users found matching &quot;{searchTerm}&quot;
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
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
  );
}
