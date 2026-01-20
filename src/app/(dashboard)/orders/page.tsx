"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetOrdersQuery } from "@/redux/api/ordersApi";

// mock data

type OrderStatus = "Completed" | "Canceled";

interface Order {
  id: number;
  itemCount: number;
  productImages: string[];
  price: string;
  deliveryFee: string;
  rewardPoints: number;
  date: string;
  receiverName: string;
  receiverPhone: string;
  receiverAvatar: string;
  status: OrderStatus;
}

// overlapping food images
const foodImages = [
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=100&h=100&fit=crop",
];
export default function OrdersPage() {
  const { data: orders, isLoading } = useGetOrdersQuery(undefined);
  const allOrders = orders?.data?.orders || [];
  console.log(allOrders);
  const ITEMS_PER_LOAD = 5;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  const visibleOrders = allOrders.slice(0, visibleCount);

  // error handling
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  return (
    <div className="min-h-screen w-full bg-[#F8F9FA] p-6 md:p-10 font-sans text-gray-900">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Link
            href="/"
            className="p-1 -ml-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-800" />
          </Link>
          <h1 className="text-xl font-medium text-gray-900">Orders</h1>
        </div>
      </div>

      <div className="w-full overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b-0 hover:bg-transparent">
              <TableHead className="text-gray-900 font-medium text-base py-5 pl-4">
                S no.
              </TableHead>
              <TableHead className="text-gray-900 font-medium text-base py-5">
                Total Items
              </TableHead>
              <TableHead className="text-gray-900 font-medium text-base py-5">
                Price
              </TableHead>
              <TableHead className="text-gray-900 font-medium text-base py-5 text-center">
                Delivery Fee
              </TableHead>
              <TableHead className="text-gray-900 font-medium text-base py-5 text-center">
                Reward Points
              </TableHead>
              <TableHead className="text-gray-900 font-medium text-base py-5">
                Date
              </TableHead>
              <TableHead className="text-gray-900 font-medium text-base py-5">
                Delivery Received By
              </TableHead>
              <TableHead className="text-gray-900 font-medium text-base py-5 text-right pr-4">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {visibleOrders?.map((order, index) => (
              <TableRow
                key={order._id}
                className="border-b-0 hover:bg-white bg-transparent"
              >
                <TableCell className="py-6 pl-4 text-gray-700 font-normal align-middle">
                  {index + 1}.
                </TableCell>

                <TableCell className="py-6 align-middle">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center">
                      {order?.items.map((item, index) => (
                        <Avatar
                          key={index}
                          className="h-10 w-10 border-2 border-white shadow-sm"
                        >
                          <AvatarImage
                            src={item.image}
                            alt="Product"
                            className="object-cover"
                          />
                          {/* <AvatarFallback>{}</AvatarFallback> */}
                        </Avatar>
                      ))}
                      {/* <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                        <AvatarImage
                          src={order.image}
                          alt="Product"
                          className="object-cover"
                        />
                        <AvatarFallback>Food</AvatarFallback>
                      </Avatar> */}
                    </div>
                    <span className="text-gray-600 font-normal">
                      {order.items?.length}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="py-6 text-gray-700 font-normal align-middle">
                  {order.subtotal}
                </TableCell>

                <TableCell className="py-6 text-gray-700 font-normal text-center align-middle">
                  {order.deliveryFee}
                </TableCell>

                <TableCell className="py-6 text-gray-700 font-normal text-center align-middle">
                  {order.totalPoints}
                </TableCell>

                <TableCell className="py-6 text-gray-700 font-normal align-middle">
                  {order.createdAt}
                </TableCell>

                <TableCell className="py-6 align-middle">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={order.receiverAvatar}
                        alt={order.receiverName}
                        className="object-cover"
                      />
                      <AvatarFallback>{order.user.image}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-gray-800 text-sm font-normal">
                        {order.user.firstName}
                      </span>
                      <span className="text-gray-800 text-xs">
                        {order.customerPhone}
                      </span>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="py-6 text-right pr-4 align-middle">
                  <Button
                    className={`w-27.5 h-9 text-sm font-normal shadow-none hover:opacity-90 transition-opacity ${
                      order.orderStatus === "delivered"
                        ? "bg-[#00C058] hover:bg-[#00a84d] text-white"
                        : "bg-[#FF4D4F] hover:bg-[#e04143] text-white"
                    }`}
                  >
                    {order.orderStatus}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {visibleCount < orders.length && (
          <div className="mt-8 flex justify-center">
            <Button
              onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_LOAD)}
              className="h-11 px-8 bg-black text-white hover:bg-gray-800"
            >
              Load more
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
