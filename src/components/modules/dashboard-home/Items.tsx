import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetOrdersQuery } from "@/redux/api/ordersApi";
import { Eye, Pencil } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { UpdateOrderModal } from "../orders/EditStatusModal";

const Items = () => {
  // Option 1: Client-side filtering (Fetches all, shows 5)
  const { data, isLoading } = useGetOrdersQuery(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<{
      id: string;
      status: string;
    } | null>(null);

  // Option 2: Server-side filtering (Better performance if API supports it)
  // const { data, isLoading } = useGetOrdersQuery({ orderStatus: 'ongoing', limit: 5 });

  const orders = data?.data?.result || data?.data?.orders || [];

  if (isLoading) {
    return (
      <div className="w-full h-full text-center py-10">Loading orders...</div>
    );
  }

  if (!Array.isArray(orders)) {
    console.error("Items is not an array:", orders);
    return (
      <div className="text-red-500 py-4">Error: Data format incorrect</div>
    );
  }

  // LOGIC: Filter for "ongoing" and take the first 5
  const ongoingOrders = orders
    .filter((order: any) => order.orderStatus?.toLowerCase() === "ongoing")
    .slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "delivered":
      case "completed":
        return "bg-green-500 text-white";
      case "cancelled":
        return "bg-red-500 text-white";
      case "ongoing":
      case "processing":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  const handleEditClick = (order: any) => {
    setSelectedOrder({ id: order._id, status: order.orderStatus });
    setIsModalOpen(true);
  };

  return (
    <div className="rounded-md border">
      <UpdateOrderModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              orderId={selectedOrder?.id || null}
              currentStatus={selectedOrder?.status || ""}
            />
      <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
        <h3 className="font-semibold text-gray-900">Recent Ongoing Orders</h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 border-b hover:bg-gray-50">
            <TableHead className="text-gray-900 font-semibold py-4 pl-6">
              Order Info
            </TableHead>
            <TableHead className="text-gray-900 font-semibold py-4">
              Financials
            </TableHead>
            <TableHead className="text-gray-900 font-semibold py-4">
              Date
            </TableHead>
            <TableHead className="text-gray-900 font-semibold py-4">
              Customer
            </TableHead>
            <TableHead className="text-gray-900 font-semibold py-4">
              Status
            </TableHead>
            <TableHead className="text-gray-900 font-semibold py-4 text-right pr-6">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {ongoingOrders.length > 0 ? (
            ongoingOrders.map((order: any, index: number) => (
              <TableRow
                key={order._id || index}
                className="border-b hover:bg-gray-50/50 transition-colors"
              >
                <TableCell className="py-6 pl-6 align-top">
                  <span className="font-medium text-sm text-gray-900">
                    ID: {order.orderId || order._id?.slice(-6)}
                  </span>
                </TableCell>

                <TableCell className="py-6 align-top">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-gray-900">
                      Price: ${order.subtotal}
                    </span>
                    <span className="text-xs text-gray-500">
                      Delivery: ${order.deliveryFee}
                    </span>
                    <span className="text-xs text-indigo-600 font-medium">
                      Points: {order.totalPoints}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="py-6 align-top text-gray-700 font-normal">
                  {new Date(order.createdAt).toLocaleDateString()}
                  <br />
                  <span className="text-xs text-gray-400">
                    {new Date(order.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </TableCell>

                <TableCell className="py-6 align-top">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={
                          typeof order.user === "object"
                            ? order.receiverAvatar
                            : undefined
                        }
                        className="object-cover"
                      />
                      <AvatarFallback>
                        {typeof order.user === "object"
                          ? order.user?.firstName?.charAt(0)
                          : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-gray-900 text-sm font-medium">
                        {typeof order.user === "object"
                          ? `${order.user?.firstName} ${order.user?.lastName}`
                          : "Refreshing..."}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {order.customerPhone}
                      </span>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="py-6 align-top">
                  <div className="flex flex-col gap-2 items-start">
                    <span
                      className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getStatusColor(order.orderStatus)}`}
                    >
                      {order.orderStatus}
                    </span>
                    <div className="flex gap-1">
                      <span className="text-[10px] border border-gray-200 px-1.5 py-0.5 rounded text-gray-600 uppercase bg-gray-50">
                        {order.orderType === "point_redemption"
                          ? "Redeem"
                          : order.orderType}
                      </span>
                      <span
                        className={`text-[10px] border px-1.5 py-0.5 rounded uppercase ${order.paymentStatus === "paid" ? "border-green-200 text-green-700 bg-green-50" : "border-yellow-200 text-yellow-700 bg-yellow-50"}`}
                      >
                        {order.paymentStatus}
                      </span>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="py-6 align-middle text-right pr-6">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0 border-gray-300"
                      onClick={() => handleEditClick(order)}
                      title="Update Status"
                    >
                      <Pencil className="h-4 w-4 text-gray-600" />
                    </Button>

                    <Link href={`/orders/${order._id}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 border-gray-300"
                      >
                        <Eye className="h-4 w-4 text-gray-600" />
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-10 text-gray-500"
              >
                No ongoing orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Items;
