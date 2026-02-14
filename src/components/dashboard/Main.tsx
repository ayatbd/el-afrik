"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UserOverview from "../modules/dashboard-home/UserOverview";
import SalesMatricData from "../modules/dashboard-home/SalesMatricData";
import { useGetDashboardDataQuery } from "@/redux/api/dashboardDataApi";
import Items from "../modules/dashboard-home/Items";

export default function Main() {
  const currentYear = new Date().getFullYear();
  const { data: dashboardStats, isLoading } =
    useGetDashboardDataQuery(currentYear);
  const lifetimeSummary = dashboardStats?.data?.lifetimeSummary || {};
  // const yearlySummary = dashboardStats?.data?.yearlySummary || {};
  // console.log(dashboardStats);
  // console.log(yearlySummary);

  const topStats = [
    { label: "Total Users", value: lifetimeSummary?.totalUsers },
    { label: "Total Orders", value: lifetimeSummary?.totalOrders },
    { label: "Total Products", value: lifetimeSummary?.totalProducts },
    {
      label: "Total Revenue",
      value: lifetimeSummary?.totalEarnings?.toFixed(2),
    },
  ];
  if (isLoading) {
    return (
      <div className="h-[80vh] w-full flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-[#00B25D] border-t-transparent rounded-full"></div>
      </div>
    );
  }
  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6 w-full">
      {/* lifetimeSummary */}
      <div>
        <h2 className="font-semibold text-gray-700 mb-4">Lifetime Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
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
      </div>
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

      <div>
        <h1 className="text-3xl font-semibold text-gray-900">
          On Going Orders
        </h1>
      </div>
      <Items />
    </div>
  );
}
