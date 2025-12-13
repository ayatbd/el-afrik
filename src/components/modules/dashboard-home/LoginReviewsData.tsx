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

const loginReviewsData = [
  { name: "Jan", logins: 800, reviews: 600 },
  { name: "Feb", logins: 900, reviews: 600 },
  { name: "Mar", logins: 1000, reviews: 650 },
  { name: "Apr", logins: 1100, reviews: 620 },
  { name: "May", logins: 1050, reviews: 680 },
  { name: "Jun", logins: 900, reviews: 700 },
  { name: "July", logins: 1200, reviews: 600 },
  { name: "Aug", logins: 1150, reviews: 500 },
  { name: "Sep", logins: 1250, reviews: 650 },
  { name: "Oct", logins: 1300, reviews: 700 },
  { name: "Nov", logins: 1350, reviews: 800 },
  { name: "Dec", logins: 1200, reviews: 850 },
];
const LoginReviewsData = () => {
  return (
    <div className="h-62.5 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={loginReviewsData} barGap={4}>
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
            dataKey="logins"
            fill="#fbbf24"
            radius={[4, 4, 0, 0]}
            barSize={8}
          />
          <Bar
            dataKey="reviews"
            fill="#ea580c"
            radius={[4, 4, 0, 0]}
            barSize={8}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LoginReviewsData;
