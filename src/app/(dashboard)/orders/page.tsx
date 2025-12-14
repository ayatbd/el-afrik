"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

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

// array of data
const orders: Order[] = [
  {
    id: 1,
    itemCount: 3,
    productImages: foodImages,
    price: "$121",
    deliveryFee: "$121",
    rewardPoints: 17,
    date: "05/12/2024",
    receiverName: "Foysal Rahman",
    receiverPhone: "+1 (239) 555-0108",
    receiverAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    status: "Completed",
  },
  {
    id: 2,
    itemCount: 4,
    productImages: foodImages,
    price: "$121",
    deliveryFee: "$121",
    rewardPoints: 12,
    date: "05/12/2024",
    receiverName: "Jawwad Hossain",
    receiverPhone: "+1 (239) 555-0108",
    receiverAvatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    status: "Completed",
  },
  {
    id: 3,
    itemCount: 3,
    productImages: foodImages,
    price: "$121",
    deliveryFee: "$121",
    rewardPoints: 21,
    date: "05/12/2024",
    receiverName: "Al-Amin",
    receiverPhone: "+1 (239) 555-0108",
    receiverAvatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
    status: "Completed",
  },
  {
    id: 4,
    itemCount: 3,
    productImages: foodImages,
    price: "$121",
    deliveryFee: "$121",
    rewardPoints: 21,
    date: "05/12/2024",
    receiverName: "Alamgir Kabir",
    receiverPhone: "+1 (239) 555-0108",
    receiverAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    status: "Canceled",
  },
  {
    id: 5,
    itemCount: 3,
    productImages: foodImages,
    price: "$121",
    deliveryFee: "$121",
    rewardPoints: 21,
    date: "05/12/2024",
    receiverName: "Ashiqur Rahman",
    receiverPhone: "+1 (239) 555-0108",
    receiverAvatar:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop",
    status: "Completed",
  },
  {
    id: 6,
    itemCount: 3,
    productImages: foodImages,
    price: "$121",
    deliveryFee: "$121",
    rewardPoints: 21,
    date: "05/12/2024",
    receiverName: "Fahim Ahmed",
    receiverPhone: "+1 (239) 555-0108",
    receiverAvatar:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&fit=crop",
    status: "Completed",
  },
  {
    id: 7,
    itemCount: 3,
    productImages: foodImages,
    price: "$121",
    deliveryFee: "$121",
    rewardPoints: 21,
    date: "05/12/2024",
    receiverName: "Banedict Fring Dron",
    receiverPhone: "+1 (239) 555-0108",
    receiverAvatar:
      "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=100&h=100&fit=crop",
    status: "Completed",
  },
];

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] p-6 md:p-10 font-sans text-gray-900">
      {/* head section */}
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

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <Button
            variant="outline"
            className="border-green-100 text-[#00C058] hover:text-[#00C058] hover:bg-green-50 h-11 px-6 text-base font-normal bg-white"
          >
            Current Order
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="border-green-100 text-[#00C058] hover:text-[#00C058] hover:bg-green-50 h-11 w-11 bg-white"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* table section  */}
      <div className="w-full overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b-0 hover:bg-transparent">
              <TableHead className="text-gray-900 font-medium text-base py-5 pl-4">
                S no.
              </TableHead>
              <TableHead className="text-gray-900 font-medium text-base py-5">
                Product Item
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
            {orders.map((order) => (
              <TableRow
                key={order.id}
                className="border-b-0 hover:bg-white bg-transparent"
              >
                <TableCell className="py-6 pl-4 text-gray-700 font-normal align-middle">
                  {order.id}.
                </TableCell>

                <TableCell className="py-6 align-middle">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center">
                      {order.productImages.map((img, i) => (
                        <Avatar
                          key={i}
                          className={`h-10 w-10 border-2 border-white shadow-sm ${
                            i > 0 ? "-ml-4" : ""
                          }`}
                        >
                          <AvatarImage
                            src={img}
                            alt="Product"
                            className="object-cover"
                          />
                          <AvatarFallback>Food</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <span className="text-gray-600 font-normal">
                      {order.itemCount} items
                    </span>
                  </div>
                </TableCell>

                <TableCell className="py-6 text-gray-700 font-normal align-middle">
                  {order.price}
                </TableCell>

                <TableCell className="py-6 text-gray-700 font-normal text-center align-middle">
                  {order.deliveryFee}
                </TableCell>

                <TableCell className="py-6 text-gray-700 font-normal text-center align-middle">
                  {order.rewardPoints}
                </TableCell>

                <TableCell className="py-6 text-gray-700 font-normal align-middle">
                  {order.date}
                </TableCell>

                <TableCell className="py-6 align-middle">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={order.receiverAvatar}
                        alt={order.receiverName}
                        className="object-cover"
                      />
                      <AvatarFallback>
                        {order.receiverName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-gray-800 text-sm font-normal">
                        {order.receiverName}
                      </span>
                      <span className="text-gray-400 text-xs">
                        {order.receiverPhone}
                      </span>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="py-6 text-right pr-4 align-middle">
                  <Button
                    className={`w-27.5 h-9 text-sm font-normal shadow-none hover:opacity-90 transition-opacity ${
                      order.status === "Completed"
                        ? "bg-[#00C058] hover:bg-[#00a84d] text-white"
                        : "bg-[#FF4D4F] hover:bg-[#e04143] text-white"
                    }`}
                  >
                    {order.status}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
