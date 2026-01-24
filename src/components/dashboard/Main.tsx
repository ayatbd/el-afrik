"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UserOverview from "../modules/dashboard-home/UserOverview";
import SalesMatricData from "../modules/dashboard-home/SalesMatricData";
import { useGetUserQuery } from "@/redux/api/userApi";
import { useOrderStatsQuery } from "@/redux/api/ordersApi";

export default function Main() {
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
    <div className="p-6 bg-gray-50 min-h-screen space-y-6 w-full">
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
          <CardHeader className="flex md:flex-row flex-col items-center gap-y-8 justify-between pb-2 py-2"></CardHeader>
          <CardContent>
            <UserOverview />
          </CardContent>
        </Card>
        {/* Sales Matrics */}
        <Card className="shadow-sm border-gray-100 space-y-5">
          <CardHeader className="pb-2"></CardHeader>
          <CardContent>
            <SalesMatricData />
          </CardContent>
        </Card>
      </div>
      {/* 
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">
          Last Update Items
        </h1>
      </div>
      <Items /> */}
    </div>
  );
}
