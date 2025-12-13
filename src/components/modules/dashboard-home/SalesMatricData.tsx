import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const salesMetricsData = [
  { name: "Jan", combo: 1000, drinks: 560 },
  { name: "Feb", combo: 680, drinks: 380 },
  { name: "Mar", combo: 500, drinks: 280 },
  { name: "Apr", combo: 660, drinks: 370 },
  { name: "May", combo: 520, drinks: 290 },
  { name: "Jun", combo: 590, drinks: 330 },
  { name: "July", combo: 720, drinks: 410 },
  { name: "Augst", combo: 600, drinks: 330 },
  { name: "Sep", combo: 600, drinks: 340 },
  { name: "Oct", combo: 600, drinks: 330 },
  { name: "Nov", combo: 600, drinks: 330 },
  { name: "Dec", combo: 600, drinks: 330 },
];
const SalesMatricData = () => {
  return (
    <div className="h-62.5 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={salesMetricsData} barGap={4}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#E5E7EB"
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "#9CA3AF" }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "#9CA3AF" }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6B7280", fontSize: 14 }}
            ticks={[0, 200, 400, 600, 800, 1000]}
            domain={[0, 1000]}
          />

          <Tooltip cursor={{ fill: "transparent" }} />
          <Bar
            dataKey="combo"
            fill="#CE502A"
            radius={[4, 4, 0, 0]}
            barSize={8}
          />
          <Bar
            dataKey="drinks"
            fill="#00B047"
            radius={[4, 4, 0, 0]}
            barSize={8}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesMatricData;
