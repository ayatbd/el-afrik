import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table, // <--- 1. IMPORT TABLE COMPONENT HERE
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetOrdersQuery } from "@/redux/api/ordersApi";
import Link from "next/link";

const Items = () => {
  const { data, isLoading } = useGetOrdersQuery(undefined);
  const orders = data?.data?.result || data?.data?.orders || [];
  console.log("Items count:", orders);

  if (isLoading) {
    return <div className="w-full h-full text-center">Loading...</div>;
  }

  // If data exists but map doesn't work, ensure items is actually an array
  if (!Array.isArray(orders)) {
    console.error("Items is not an array:", orders);
    return <div>Error: Data format incorrect</div>;
  }

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

  return (
    <div className="rounded-md border">
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
              Type/Status
            </TableHead>
            <TableHead className="text-gray-900 font-semibold py-4 text-right pr-6">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.length > 0 ? (
            orders.slice(0, 5).map(
              (order: any, index: number) =>
                order.orderStatus === "ongoing" && (
                  <TableRow
                    key={order._id || index}
                    className="border-b hover:bg-gray-50/50 transition-colors"
                  >
                    <TableCell className="py-6 pl-6 align-top">
                      <span className="font-mono text-gray-500 text-xs block mb-1">
                        #{index + 1}
                      </span>
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
                            src={order.receiverAvatar}
                            className="object-cover"
                          />
                          <AvatarFallback>
                            {order.user?.firstName?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-gray-900 text-sm font-medium">
                            {order.user?.firstName} {order.user?.lastName}
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
                      <Link href={`/orders/${order._id}`}>
                        <Button
                          size="sm"
                          className="bg-[#00C058] hover:bg-[#00a84d] text-white"
                        >
                          View Details
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ),
            )
          ) : (
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center py-10 text-gray-500"
              >
                No orders found matching your filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Items;
