"use client";

import { useState } from "react";
import { useGetDashboardDataQuery } from "@/redux/api/dashboardDataApi";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Loader2 } from "lucide-react";

const SalesMatricData = () => {
  // 1. State for Year Selector (Default to current year or 2026 from your data)
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(2026);

  // 2. Pass the selectedYear to the query
  // Note: Ensure your API slice accepts this argument (shown below in step 2)
  const { data: response, isLoading } = useGetDashboardDataQuery(selectedYear);

  // 3. Safely access the array based on your specific JSON structure
  const chartData = response?.data?.earningGraphData || [];

  // 4. Generate a list of years for the dropdown (e.g., last 5 years)
  const years = Array.from({ length: 7 }, (_, i) => currentYear - i + 6); // [2027, 2026, 2025...]

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <Loader2 className="animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl">
      {/* Header with Title and Year Selector */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Earning & Sales</h3>
          <p className="text-xs text-gray-500">
            Financial performance overview
          </p>
        </div>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 outline-none cursor-pointer"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Chart Area */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barGap={8}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#F3F4F6"
            />

            {/* X Axis - Month */}
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
              dy={10}
            />

            {/* Left Y Axis - Earnings ($) */}
            <YAxis
              yAxisId="left"
              orientation="left"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
              tickFormatter={(value) => `$${value}`}
            />

            {/* Right Y Axis - Sales (Count) */}
            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F9FAFB" }} />

            <Legend wrapperStyle={{ paddingTop: "20px" }} />

            {/* Bar 1: Total Earnings (Matches your JSON key) */}
            <Bar
              yAxisId="left"
              dataKey="totalEarnings"
              name="Total Earnings"
              fill="#00B047" // Green
              radius={[4, 4, 0, 0]}
              barSize={20}
            />

            {/* Bar 2: Total Sales (Matches your JSON key) */}
            <Bar
              yAxisId="right"
              dataKey="totalSales"
              name="Total Sales"
              fill="#CE502A" // Orange/Red
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Custom Tooltip to format currency nicely
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-lg text-xs">
        <p className="font-bold text-gray-800 mb-2">{label}</p>
        <div className="space-y-1">
          <p className="text-[#00B047] font-medium">
            Earnings: ${payload[0].value.toLocaleString()}
          </p>
          <p className="text-[#CE502A] font-medium">
            Sales: {payload[1].value}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default SalesMatricData;
