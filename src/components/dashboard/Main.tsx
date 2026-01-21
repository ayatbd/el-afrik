"use client";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

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
import UserOverview from "../modules/dashboard-home/UserOverview";
import SalesMatricData from "../modules/dashboard-home/SalesMatricData";
import LoginReviewsData from "../modules/dashboard-home/LoginReviewsData";
import { useGetUserQuery } from "@/redux/api/userApi";
import { useOrderStatsQuery } from "@/redux/api/ordersApi";
import Items from "../modules/dashboard-home/Items";

export default function Main() {
  // console.log(items);

  // total users from DB
  const { data: userData } = useGetUserQuery(undefined);
  // orders stats
  const { data: orderData } = useOrderStatsQuery(undefined);
  const orders = orderData?.data || [];
  // console.log(orders.revenue.total);

  const totalUsers = userData?.data.result.length || 0;

  // top stats
  const topStats = [
    { label: "Total Users", value: totalUsers },
    { label: "Total Orders", value: orders?.totalOrders },
    { label: "Today's Orders", value: orders?.todayOrders },
    { label: "Total Awarded Points", value: orders?.points?.totalAwarded },
    { label: "Total Revenue", value: orders?.revenue?.total?.toFixed(2) },
  ];
  return (
    <div className="p-6 bg-white min-h-screen space-y-6 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
        {topStats?.map((stat, idx) => (
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

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-14">
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

      <div>
        <h1 className="text-3xl font-semibold text-gray-900">
          Last Update Items
        </h1>
      </div>
      <Items />
    </div>
  );
}
