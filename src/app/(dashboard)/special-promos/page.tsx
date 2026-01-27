"use client";

import React, { useState } from "react";
import Link from "next/link";
import { format, isPast, parseISO } from "date-fns";
import { useDeletePromoMutation, useGetPromoQuery } from "@/redux/api/PromoApi";
import { FullScreenLoader } from "@/app/loading";

// Shadcn & UI Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Copy,
  Check,
  CalendarDays,
  Tag,
  ShoppingBag,
  AlertCircle,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";

const SpecialPromoPage = () => {
  const {
    data: specialPromos,
    isLoading,
    isError,
  } = useGetPromoQuery(undefined);
  const promoData = specialPromos?.data?.result || [];

  const [deletePromo] = useDeletePromoMutation();

  const handleDelete = async (id: string) => {
    try {
      await deletePromo(id).unwrap();
      toast.success("Promo deleted successfully!");
    } catch (error: unknown) {
      const errorMessage =
        (((error as Record<string, unknown>)?.data as Record<string, unknown>)
          ?.message as string | undefined) || "Failed to delete Promo";
      toast.error(errorMessage);
    }
  };

  // State for the "Copy to Clipboard" feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Helper to determine status
  const getStatus = (validityDate: string) => {
    if (!validityDate)
      return { label: "Unknown", color: "bg-gray-100 text-gray-500" };
    const date = parseISO(validityDate);
    const expired = isPast(date);

    return expired
      ? { label: "Expired", color: "bg-gray-100 text-gray-500 border-gray-200" }
      : {
          label: "Active",
          color: "bg-emerald-50 text-emerald-600 border-emerald-200",
        };
  };

  if (isLoading) return <FullScreenLoader />;

  if (isError) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center text-red-500 gap-2">
        <AlertCircle size={40} />
        <p className="font-medium">Failed to load promotions.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Promo Campaigns
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage your special discounts and product offers.
          </p>
        </div>
        <Link href="/add-promo" className="w-full md:w-auto">
          <Button className="bg-[#00B25D] hover:bg-[#009e52] cursor-pointer">
            + Create New Promo
          </Button>
        </Link>
      </div>

      {/* Main Table Card */}
      <Card className="border shadow-sm overflow-hidden bg-white">
        <CardHeader className="bg-gray-50/50 border-b py-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-gray-700">
              All Active & Past Promos
            </CardTitle>
            <Badge variant="outline" className="bg-white">
              Total: {promoData.length}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent bg-gray-50/30">
                <TableHead className="w-[300px] py-4 pl-6 text-xs uppercase tracking-wider font-semibold text-gray-500">
                  Product Details
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold text-gray-500">
                  Product Name
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold text-gray-500">
                  Promo Code
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold text-gray-500">
                  Discount
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold text-gray-500">
                  Status
                </TableHead>
                <TableHead className="text-right pr-6 text-xs uppercase tracking-wider font-semibold text-gray-500">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promoData?.map((promo: any) => {
                const status = getStatus(promo.validity);

                return (
                  <TableRow
                    key={promo._id}
                    className="group border-b border-gray-100 hover:bg-blue-50/30 transition-all duration-200"
                  >
                    {/* Product Info */}
                    <TableCell className="pl-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-14 w-14 rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-white group-hover:shadow-md transition-shadow">
                          <Avatar className="h-full w-full rounded-none">
                            <AvatarImage
                              src={promo?.product?.images?.[0]}
                              className="object-cover"
                            />
                            <AvatarFallback className="bg-gray-50 text-gray-300">
                              <ShoppingBag size={20} />
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="font-semibold text-gray-900 line-clamp-1">
                            {promo?.product?.productName}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <CalendarDays size={12} />
                            Created:{" "}
                            {format(parseISO(promo.createdAt), "MMM dd, yyyy")}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Product Name */}
                    <TableCell>
                      <span className="font-semibold text-gray-900 line-clamp-1">
                        {promo?.product?.name}
                      </span>
                    </TableCell>

                    {/* Promo Code with Copy Function */}
                    <TableCell>
                      <div
                        onClick={() =>
                          handleCopy(promo.specialPromoCode, promo.id)
                        }
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-dashed border-gray-300 bg-gray-50 w-fit cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors group/code"
                      >
                        <Tag
                          size={14}
                          className="text-gray-400 group-hover/code:text-blue-500"
                        />
                        <span className="font-mono text-sm font-medium text-gray-700 group-hover/code:text-blue-700">
                          {promo.specialPromoCode}
                        </span>
                        {copiedId === promo.id ? (
                          <Check size={14} className="text-green-500" />
                        ) : (
                          <Copy
                            size={14}
                            className="text-gray-300 group-hover/code:text-blue-400"
                          />
                        )}
                      </div>
                    </TableCell>

                    {/* Discount */}
                    <TableCell>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-bold text-gray-900">
                          {/* Add currency symbol if needed */}
                          {promo.discountAmount}
                        </span>
                        <span className="text-xs font-medium text-muted-foreground uppercase">
                          OFF
                        </span>
                      </div>
                    </TableCell>

                    {/* Status / Validity */}
                    <TableCell>
                      <div className="flex flex-col items-start gap-1">
                        <Badge
                          variant="outline"
                          className={cn(
                            "font-medium px-2.5 py-0.5 shadow-sm",
                            status.color,
                          )}
                        >
                          {status.label}
                        </Badge>
                        <span className="text-[11px] text-gray-400 font-medium ml-1">
                          Ends {format(parseISO(promo.validity), "MMM dd")}
                        </span>
                      </div>
                    </TableCell>

                    {/* Action */}
                    <TableCell className="text-right pr-6">
                      <Button
                        onClick={() => handleDelete(promo._id)}
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 group-hover:bg-white group-hover:shadow-sm border border-transparent group-hover:border-gray-100 transition-all cursor-pointer"
                      >
                        <Trash2 size={16} className="text-red-400" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {/* Empty State */}
          {promoData.length === 0 && (
            <div className="py-20 text-center">
              <div className="bg-gray-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Tag className="text-gray-300" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                No Promos Found
              </h3>
              <p className="text-gray-500 max-w-sm mx-auto mt-1">
                You haven&apos;t created any special promotion campaigns yet.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SpecialPromoPage;
