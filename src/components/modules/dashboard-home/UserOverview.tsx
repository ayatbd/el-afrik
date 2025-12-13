"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Mock data tuned to match the curve in the image
const data = [
  { name: "Jan", value: 70 },
  { name: "Feb", value: 62 },
  { name: "Mar", value: 98 },
  { name: "Apr", value: 68 },
  { name: "May", value: 85 },
  { name: "Jun", value: 65 },
  { name: "July", value: 55 },
  { name: "Augt", value: 65 },
  { name: "Sept", value: 82 },
  { name: "Oct", value: 60 },
  { name: "Nov", value: 75 },
  { name: "Dec", value: 92 },
];

export default function UserOverview() {
  return (
    <>
      <div className="h-62.5 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorUser" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FB923C" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FB923C" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 14 }}
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#F97316"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorUser)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
