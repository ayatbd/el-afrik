"use client";

import { Button } from "@/components/ui/button";
import { useGetSingleOrderQuery } from "@/redux/api/ordersApi";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CreditCard,
  Package,
  Award,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

type History = {
  status: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  card: string;
  printer: string;
  reward: string;
  points: string;
  delivery: string;
  discount: string;
  total: string;
  id: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  timestamp: string;
  note: string;
};

const OrderDetails = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const { data: allOrder, isLoading, error } = useGetSingleOrderQuery(id);

  const order = allOrder?.data || {};

  if (error || !order) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-semibold text-red-500">User not found</h2>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  // const { _id } = order;
  // console.log(order);

  // Helper to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Helper for Status Badge Colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 p-12 font-sans">
      <div className="mx-auto space-y-6">
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-gray-900">
                Order #{order?.orderNumber}
              </h1>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold uppercase border ${getStatusColor(order?.orderStatus)}`}
              >
                {order?.orderStatus}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar size={14} /> {formatDate(order?.createdAt)}
              </span>
              <span className="flex items-center gap-1">
                <Package size={14} /> {order?.items?.length} Items
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
              <Printer size={16} /> Print Invoice
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-sm font-medium text-red-600 hover:bg-red-100 transition">
              <XCircle size={16} /> Cancel
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 border border-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-700 transition shadow-sm">
              <CheckCircle size={16} /> Mark Completed
            </button> */}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* --- LEFT COLUMN (ITEMS & HISTORY) --- */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  Order Items
                </h2>
                <span className="text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded border border-purple-200 font-medium">
                  {order?.pointsAdded ? "Points Added" : "No Points"}
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-500 font-medium">
                    <tr>
                      <th className="px-6 py-3">Product</th>
                      <th className="px-6 py-3 text-center">Unit Price</th>
                      <th className="px-6 py-3 text-center">Qty</th>
                      <th className="px-6 py-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {order?.items?.map((item: any, index: number) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <Image
                              width={48}
                              height={48}
                              src={item?.image}
                              alt={item?.name}
                              className="h-12 w-12 rounded-lg object-cover border border-gray-200"
                            />
                            <div>
                              <p className="font-medium text-gray-900">
                                {item?.name}
                              </p>
                              <p className="text-xs text-indigo-600 flex items-center gap-1 mt-1">
                                <Award size={12} /> +{item?.points} Points
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center text-gray-600">
                          ${item?.price?.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-center text-gray-900 font-medium">
                          {item?.quantity}
                        </td>
                        <td className="px-6 py-4 text-right text-gray-900 font-bold">
                          ${item?.total?.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Order History
              </h2>
              <div className="relative border-l-2 border-gray-200 ml-3 space-y-8">
                {order?.statusHistory?.map((history: History, idx: number) => (
                  <div key={idx} className="relative pl-8">
                    <span
                      className={`absolute -left-2.25 top-0 h-4 w-4 rounded-full border-2 border-white ${idx === order.statusHistory?.length - 1 ? "bg-green-500 ring-4 ring-green-100" : "bg-gray-300"}`}
                    ></span>
                    <p className="text-sm font-semibold text-gray-900 capitalize">
                      {history?.status}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(history?.timestamp)}
                    </p>
                    <p className="text-sm text-gray-600 mt-1 bg-gray-50 p-2 rounded border border-gray-100 inline-block">
                      {history?.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN (CUSTOMER & SUMMARY) --- */}
          <div className="space-y-6">
            {/* Customer Details Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <User size={18} /> Customer Details
              </h2>

              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
                  {order?.customerName?.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">
                    {order?.customerName}
                  </h3>
                  <p className="text-xs text-gray-500">Customer</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail size={16} className="text-gray-400" />
                  <a
                    href={`mailto:${order?.customerEmail}`}
                    className="hover:text-indigo-600"
                  >
                    {order?.customerEmail}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone size={16} className="text-gray-400" />
                  <a
                    href={`tel:${order?.customerPhone}`}
                    className="hover:text-indigo-600"
                  >
                    {order?.customerPhone}
                  </a>
                </div>
              </div>

              {/* Linked User Account (if different/available) */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-400 uppercase mb-3">
                  Linked User Account
                </p>
                <div className="flex items-center gap-3">
                  <Image
                    width={40}
                    height={40}
                    src={order?.user?.image}
                    alt="User"
                    className="w-8 h-8 rounded-full border"
                  />
                  <div className="text-sm">
                    <p className="font-medium">
                      {order?.user?.firstName} {order?.user?.lastName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {order?.user?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery/Pickup Info */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Logistics
                </h2>
                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold uppercase border border-blue-100">
                  {order?.orderType}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <Clock className="text-gray-400 shrink-0" size={18} />
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase">
                      Scheduled Pickup
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {formatDate(order?.pickupTime)}
                    </p>
                  </div>
                </div>

                {order.notes && (
                  <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                    <p className="text-xs font-bold text-yellow-800 mb-1">
                      Customer Note:
                    </p>
                    <p className="text-sm text-yellow-900 italic">
                      {order?.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Payment Summary
              </h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>${order?.subtotal?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Discount</span>
                  <span className="text-red-500">
                    -${order?.discount?.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery Fee</span>
                  <span>${order?.deliveryFee?.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3 flex justify-between items-center mb-4">
                <span className="font-bold text-gray-900">Total Amount</span>
                <span className="font-bold text-xl text-indigo-600">
                  ${order?.totalAmount?.toFixed(2)}
                </span>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full text-green-600">
                  <CreditCard size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-green-800 uppercase">
                    Payment Status
                  </p>
                  <p className="text-sm font-medium text-green-700 capitalize">
                    {order?.paymentStatus} via Stripe
                  </p>
                </div>
              </div>
              <p className="text-[10px] text-gray-400 mt-2 text-center break-all font-mono">
                ID: {order?.stripePaymentIntentId}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
