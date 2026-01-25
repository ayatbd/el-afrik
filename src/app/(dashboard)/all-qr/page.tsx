"use client";

import React, { useState } from "react";
import { format, isPast, parseISO } from "date-fns";
// Replace with your actual API hook
// import { useGetQRCodesQuery } from "@/redux/api/qrApi";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  QrCode,
  Copy,
  Check,
  Calendar,
  Coins,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetQrQuery } from "@/redux/api/qrApi";
import { FullScreenLoader } from "@/app/loading";

// Mock data based on your snippet (Delete this when using real API)
type QRCode = {
  _id: "697596cf08a9a976b45607e9";
  title: "Welcome Bonus QR";
  code: "QR-AUWLFRFC";
  points: 100;
  isUsed: false;
  expiryDate: "2026-02-24T04:06:39.861Z";
  createdAt: "2026-01-25T04:06:39.862Z";
};

const QRCodeTable = () => {
  const { data, isLoading } = useGetQrQuery(undefined);
  const qrList = data?.data || [];
  //   const qrList = MOCK_DATA; // Using mock data for display

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Logic to determine the visual status
  const getStatus = (isUsed: boolean, expiryDate: string) => {
    if (isUsed) {
      return {
        label: "Redeemed",
        color: "bg-blue-50 text-blue-700 border-blue-200",
        icon: CheckCircle2,
      };
    }
    const isExpired = isPast(parseISO(expiryDate));
    if (isExpired) {
      return {
        label: "Expired",
        color: "bg-gray-100 text-gray-500 border-gray-200",
        icon: XCircle,
      };
    }
    return {
      label: "Active",
      color: "bg-emerald-50 text-emerald-600 border-emerald-200",
      icon: CheckCircle2,
    };
  };

  if (isLoading) return <FullScreenLoader />;

  return (
    <div className="container mx-auto py-10 px-4 md:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            QR Rewards
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage generated QR codes and point allocations.
          </p>
        </div>
        <Button className="bg-[#081028] hover:bg-[#0f1c42]">
          + Generate QR
        </Button>
      </div>

      {/* Table Card */}
      <Card className="border shadow-sm bg-white overflow-hidden">
        <CardHeader className="bg-gray-50/50 border-b py-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-gray-700">
              Generated Codes
            </CardTitle>
            <Badge variant="outline" className="bg-white">
              Total: {qrList.length}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent bg-gray-50/30">
                <TableHead className="w-[300px] py-4 pl-6 text-xs uppercase tracking-wider font-semibold text-gray-500">
                  QR Campaign Info
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold text-gray-500">
                  Unique Code
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold text-gray-500">
                  Points
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold text-gray-500">
                  Status
                </TableHead>
                <TableHead className="text-right pr-6 text-xs uppercase tracking-wider font-semibold text-gray-500">
                  Expiry
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {qrList.map((item) => {
                const status = getStatus(item.isUsed, item.expiryDate);
                const StatusIcon = status.icon;

                return (
                  <TableRow
                    key={item._id}
                    className="group border-b border-gray-100 hover:bg-blue-50/30 transition-colors"
                  >
                    {/* Column 1: Title & Icon */}
                    <TableCell className="pl-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gray-900 flex items-center justify-center text-white shadow-sm">
                          <QrCode size={24} />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="font-semibold text-gray-900">
                            {item.title}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Calendar size={12} />
                            Created:{" "}
                            {format(parseISO(item.createdAt), "MMM dd, yyyy")}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Column 2: Code (Copyable) */}
                    <TableCell>
                      <div
                        onClick={() => handleCopy(item.code, item._id)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-dashed border-gray-300 bg-gray-50 w-fit cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors group/code"
                      >
                        <span className="font-mono text-sm font-medium text-gray-700 group-hover/code:text-blue-700">
                          {item.code}
                        </span>
                        {copiedId === item._id ? (
                          <Check size={14} className="text-green-500" />
                        ) : (
                          <Copy
                            size={14}
                            className="text-gray-400 group-hover/code:text-blue-400"
                          />
                        )}
                      </div>
                    </TableCell>

                    {/* Column 3: Points */}
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <Coins
                          className="text-yellow-500 fill-yellow-500/20"
                          size={18}
                        />
                        <span className="font-bold text-gray-900 text-lg">
                          {item.points}
                        </span>
                      </div>
                    </TableCell>

                    {/* Column 4: Status Badge */}
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          "flex w-fit items-center gap-1.5 px-2.5 py-1",
                          status.color,
                        )}
                      >
                        <StatusIcon size={12} />
                        {status.label}
                      </Badge>
                    </TableCell>

                    {/* Column 5: Expiry & Actions */}
                    <TableCell className="text-right pr-6">
                      <div className="flex items-center justify-end gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-700">
                            {format(parseISO(item.expiryDate), "MMM dd, yyyy")}
                          </p>
                          <p className="text-xs text-gray-400">
                            {format(parseISO(item.expiryDate), "h:mm a")}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRCodeTable;
