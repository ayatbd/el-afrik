"use client";

import Link from "next/link";
import { ArrowLeft, DollarSign } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// --- Mock Data ---

const chartData = [
  { name: "Jan", value: 600 },
  { name: "Feb", value: 200 },
  { name: "Mar", value: 900 },
  { name: "Apr", value: 400 },
  { name: "may", value: 250 },
  { name: "Jun", value: 600 },
  { name: "Jul", value: 150 },
  { name: "Aug", value: 300 },
  { name: "Sep", value: 500 },
  { name: "Oct", value: 800 },
  { name: "Nov", value: 80 },
  { name: "Dec", value: 600 },
];

const transactionHistory = [
  {
    id: 1,
    name: "Charlotte Mante",
    email: "frostman@mac.com",
    avatar: "https://i.pravatar.cc/150?u=1",
    date: "27 Aug 2020 3:01 PM",
    payOn: "Stripe",
    amount: "$ 0.99",
  },
  {
    id: 2,
    name: "Margaret Hessel II",
    email: "chronos@aol.com",
    avatar: "https://i.pravatar.cc/150?u=2",
    date: "27 Aug 2020 12:32 AM",
    payOn: "Stripe",
    amount: "$ 0.99",
  },
  {
    id: 3,
    name: "Chris Koepp",
    email: "willg@icloud.com",
    avatar: "https://i.pravatar.cc/150?u=3",
    date: "27 Aug 2020 11:56 AM",
    payOn: "Stripe",
    amount: "$ 0.99",
  },
  {
    id: 4,
    name: "Billy Greenfelder",
    email: "icadahli@gmail.com",
    avatar: "https://i.pravatar.cc/150?u=4",
    date: "27 Aug 2020 12:52 PM",
    payOn: "Stripe",
    amount: "$ 0.99",
  },
  {
    id: 5,
    name: "Gary Ullrich",
    email: "chronos@aol.com",
    avatar: "", // No image, fallback
    date: "27 Aug 2020 9:51 AM",
    payOn: "Stripe",
    amount: "$ 0.99",
  },
  {
    id: 6,
    name: "Dr. Wilfred Baumbach",
    email: "adamk@yahoo.com",
    avatar: "https://i.pravatar.cc/150?u=6",
    date: "27 Aug 2020 10:08 AM",
    payOn: "Stripe",
    amount: "$ 0.99",
  },
  {
    id: 7,
    name: "Dora Schuppe",
    email: "seannand@mail.ru",
    avatar: "https://i.pravatar.cc/150?u=7",
    date: "27 Aug 2020 8:03 AM",
    payOn: "Stripe",
    amount: "$ 0.99",
  },
];

// --- Components ---

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RefundReasonModal from "@/components/modules/earning/RefundReasonModal";

export default function EarningsPage() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-8 font-sans text-slate-900">
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/"
          className="hover:bg-slate-100 p-2 rounded-full transition"
        >
          <ArrowLeft className="w-6 h-6 text-slate-700" />
        </Link>
        <h1 className="text-xl font-medium">Earnings</h1>
      </div>

      <div className="grid items-center grid-cols-1 lg:grid-cols-3 gap-y-8 gap-x-20 mb-10">
        <Card className="col-span-1 relative overflow-hidden shadow-xl border-none h-72 bg-linear-to-l from-[#979797] to-gray-50">
          <CardContent className="p-8 h-full flex flex-col justify-between relative z-10">
            <div>
              <div className="w-14 h-14 bg-[#FCA91B] rounded-md flex items-center justify-center mb-4 shadow-lg shadow-orange-200">
                <DollarSign className="text-white w-7 h-7" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-800 mb-1">
                Total Earnings
              </h2>
              <p className="text-4xl font-bold text-slate-900">$23,0900</p>
            </div>
          </CardContent>

          <div className="absolute bottom-0 right-0 w-full h-full pointer-events-none">
            <div className="absolute -bottom-10 -right-10 w-75 h-50 bg-[#2D3047] rounded-tl-25 transform rotate-3 z-20"></div>

            <div className="absolute bottom-0 right-25 w-75 h-50 bg-[#6B7280] rounded-tl-[80px] transform skew-x-12 z-10 opacity-80"></div>

            <div className="absolute bottom-40 right-45 w-10 h-10 bg-white/20 rounded-full z-30 blur-sm"></div>
          </div>
        </Card>

        <Card className="col-span-1 lg:col-span-2 shadow-lg border-gray-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium text-slate-700">
              Earnings growth
            </CardTitle>
            <Select defaultValue="2024">
              <SelectTrigger className="w-25 h-8 bg-gray-50 border-gray-200">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="pl-0">
            <div className="h-62.5 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} barSize={35}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={true}
                    horizontal={true}
                    stroke="#E5E7EB"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748B", fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748B", fontSize: 12 }}
                    domain={[0, 1600]}
                    ticks={[0, 100, 200, 400, 800, 1600]}
                  />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Bar dataKey="value" fill="#FBBF24" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Last Earn history
        </h2>

        <div className="rounded-md border-none">
          <Table>
            <TableHeader className="[&_tr]:border-b-0">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold text-black text-base pl-0">
                  User Name
                </TableHead>
                <TableHead className="font-semibold text-black text-base">
                  Email
                </TableHead>
                <TableHead className="font-semibold text-black text-base">
                  Date / Time
                </TableHead>
                <TableHead className="font-semibold text-black text-base">
                  Pay On
                </TableHead>
                <TableHead className="font-semibold text-black text-base">
                  Amount
                </TableHead>
                <TableHead className="font-semibold text-black text-base text-right pr-4">
                  Refund
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionHistory.map((user) => (
                <TableRow
                  key={user.id}
                  className="border-none hover:bg-slate-50"
                >
                  <TableCell className="py-4 pl-0">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-gray-100">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-slate-900 text-white">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-normal text-slate-800">
                        {user.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600 font-normal">
                    {user.email}
                  </TableCell>
                  <TableCell className="text-slate-600 font-normal">
                    {user.date}
                  </TableCell>
                  <TableCell className="text-slate-600 font-normal">
                    {user.payOn}
                  </TableCell>
                  <TableCell className="text-slate-600 font-normal">
                    {user.amount}
                  </TableCell>
                  <TableCell className="text-right pr-2">
                    <RefundReasonModal />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
