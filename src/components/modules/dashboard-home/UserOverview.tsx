"use client";

import React, { useState } from "react";
import { useGetDashboardDataQuery } from "@/redux/api/dashboardDataApi";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Loader2, Users } from "lucide-react";

const UserOverview = () => {
  // 1. State for Year Selector
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(2026);

  // 2. Fetch Data passing the year
  const { data: response, isLoading } = useGetDashboardDataQuery(selectedYear);

  // 3. Extract userGraphData
  const chartData = response?.data?.userGraphData || [];

  // Generate year options
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i + 6);

  if (isLoading) {
    return (
      <div className="h-64 w-full flex items-center justify-center bg-white rounded-xl border border-gray-100">
        <Loader2 className="animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="w-full bg-white p-4 rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
            <Users size={18} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">User Growth</h3>
            <p className="text-xs text-gray-500">New signups per month</p>
          </div>
        </div>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-2 outline-none cursor-pointer"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barGap={8}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#F3F4F6"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
              allowDecimals={false} // Users cannot be fractions
            />

            <Tooltip cursor={{ fill: "#F9FAFB" }} content={<CustomTooltip />} />

            <Bar
              dataKey="totalUsers"
              name="New Users"
              fill="#8B5CF6" // Purple color to distinguish from Sales
              radius={[4, 4, 0, 0]}
              barSize={24} // Slightly wider bars since it's a single metric
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-lg text-xs">
        <p className="font-bold text-gray-800 mb-2">{label}</p>
        <p className="text-[#8B5CF6] font-medium flex items-center gap-1">
          <Users size={12} />
          New Users: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export default UserOverview;
