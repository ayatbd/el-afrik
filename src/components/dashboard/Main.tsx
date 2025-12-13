"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Star } from "lucide-react";

// --- Mock Data ---

const topStats = [
  { label: "Total Users", value: "125" },
  { label: "Active Today", value: "250" },
  { label: "New Signups", value: "300" },
  { label: "Total Points Issued", value: "200" },
  { label: "Rewards Redeemed Today", value: "200" },
];

const userOverviewData = [
  { name: "Jan", value: 40 },
  { name: "Feb", value: 30 },
  { name: "Mar", value: 60 },
  { name: "Apr", value: 45 },
  { name: "May", value: 70 },
  { name: "Jun", value: 55 },
  { name: "July", value: 40 },
  { name: "Aug", value: 45 },
  { name: "Sept", value: 75 },
  { name: "Oct", value: 50 },
  { name: "Nov", value: 60 },
  { name: "Dec", value: 90 },
];

const salesMetricsData = [
  { name: "Jan", combo: 500, drinks: 900 },
  { name: "Feb", combo: 380, drinks: 650 },
  { name: "Mar", combo: 250, drinks: 480 },
  { name: "Apr", combo: 350, drinks: 600 },
  { name: "May", combo: 280, drinks: 500 },
  { name: "Jun", combo: 320, drinks: 550 },
  { name: "July", combo: 400, drinks: 700 },
  { name: "Aug", combo: 300, drinks: 580 },
  { name: "Sep", combo: 330, drinks: 600 },
  { name: "Oct", combo: 310, drinks: 580 },
  { name: "Nov", combo: 320, drinks: 580 },
  { name: "Dec", combo: 350, drinks: 900 },
];

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

const rewardsData = [
  { name: "Gold", value: 12, percent: "28.6%", color: "#FCD34D" },
  { name: "Platinum", value: 22, percent: "42.9%", color: "#FDE68A" },
  { name: "Titanium", value: 12, percent: "28.6%", color: "#86EFAC" },
  { name: "Silver", value: 12, percent: "28.6%", color: "#FCA5A5" },
];

const foodItems = [
  {
    id: 1,
    name: "Jollof Rice",
    img: "https://images.unsplash.com/photo-1574484284008-81dcec8005e2?q=80&w=100&auto=format&fit=crop",
    revenue: "$1,560",
    rating: 4.6,
    category: "Fast Food",
    status: "Top Selling",
  },
  {
    id: 2,
    name: "Fried Rice",
    img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=100&auto=format&fit=crop",
    revenue: "$1,560",
    rating: 4.6,
    category: "Fast Food",
    status: "Top Selling",
  },
  {
    id: 3,
    name: "Meat Pie",
    img: "https://images.unsplash.com/photo-1572383672419-2f432ddb56b2?q=80&w=100&auto=format&fit=crop",
    revenue: "$1,560",
    rating: 4.6,
    category: "Fast Food",
    status: "Top Selling",
  },
  {
    id: 4,
    name: "Fish Roll",
    img: "https://plus.unsplash.com/premium_photo-1661600135892-74b12367d302?q=80&w=100&auto=format&fit=crop",
    revenue: "$1,560",
    rating: 4.6,
    category: "Fast Food",
    status: "Top Selling",
  },
  {
    id: 5,
    name: "Puff Puff",
    img: "https://images.unsplash.com/photo-1621510456600-4db001968855?q=80&w=100&auto=format&fit=crop",
    revenue: "$1,560",
    rating: 4.6,
    category: "Fast Food",
    status: "Top Selling",
  },
  {
    id: 6,
    name: "Fried Rice",
    img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=100&auto=format&fit=crop",
    revenue: "$1,560",
    rating: 4.6,
    category: "Fast Food",
    status: "Top Selling",
  },
];

// --- Components ---

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

export default function Main() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* 1. Top Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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

      {/* 2. Middle Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left: User Overview */}
        <Card className="shadow-sm border-gray-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg font-medium text-gray-800">
                User Overview
              </CardTitle>
              <div className="flex space-x-4 mt-2 text-xs text-gray-500">
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
            <div className="flex gap-2">
              <Select defaultValue="user">
                <SelectTrigger className="w-[100px] h-8 text-xs">
                  <SelectValue placeholder="Account Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="2024">
                <SelectTrigger className="w-[80px] h-8 text-xs">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userOverviewData}>
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
          </CardContent>
        </Card>

        {/* Right: Sales Metrics */}
        <Card className="shadow-sm border-gray-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
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
              <div className="flex space-x-4 mt-1 text-xs text-gray-500">
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
            <Select defaultValue="2024">
              <SelectTrigger className="w-[80px] h-8 text-xs">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
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
                  <Tooltip cursor={{ fill: "transparent" }} />
                  <Bar
                    dataKey="combo"
                    fill="#22c55e"
                    radius={[4, 4, 0, 0]}
                    barSize={8}
                  />
                  <Bar
                    dataKey="drinks"
                    fill="#c2410c"
                    radius={[4, 4, 0, 0]}
                    barSize={8}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. Bottom Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left: Most Redeemed Rewards */}
        <Card className="shadow-sm border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-gray-800">
              Most Redeemed Rewards
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="relative h-[220px] w-[220px]">
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

        {/* Right: Logins & Reviews */}
        <Card className="shadow-sm border-gray-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg font-medium text-gray-800">
                Daily/Weekly/Monthly Logins & Reviews
              </CardTitle>
              <div className="flex space-x-4 mt-2 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <span>Logins</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-orange-600"></div>
                  <span>Reviews</span>
                </div>
              </div>
              <div className="flex space-x-4 mt-1 text-xs text-gray-500">
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
                  <p>Weekly</p>
                </div>
              </div>
            </div>
            <Select defaultValue="2024">
              <SelectTrigger className="w-[80px] h-8 text-xs">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
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
          </CardContent>
        </Card>
      </div>

      {/* 4. Food Items Table */}
      <Card className="shadow-sm border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-900 font-semibold border-b border-gray-100 bg-white">
              <tr>
                <th className="px-6 py-4">Item Image</th>
                <th className="px-6 py-4">Item Name</th>
                <th className="px-6 py-4 text-center">Revenue Generated</th>
                <th className="px-6 py-4 text-center">Avg.Rating</th>
                <th className="px-6 py-4 text-center">Category</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {foodItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 border-b border-gray-50 last:border-none"
                >
                  <td className="px-6 py-4">
                    <Avatar className="h-12 w-12 rounded-full border border-gray-100">
                      <AvatarImage
                        src={item.img}
                        alt={item.name}
                        className="object-cover"
                      />
                      <AvatarFallback>{item.name[0]}</AvatarFallback>
                    </Avatar>
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-medium">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600">
                    {item.revenue}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-600">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {item.rating}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Badge className="bg-green-100 text-green-600 hover:bg-green-100 hover:text-green-600 border-none px-3 py-1 font-normal">
                      {item.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
