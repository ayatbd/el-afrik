"use client";

import React, { useState } from "react";
import { format, isPast, parseISO } from "date-fns";
import { QRCodeCanvas } from "qrcode.react"; // Import the QR library

// Imports for the Modal/Dialog (Ensure you have these in your shadcn/ui components)
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

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
  Calendar,
  Coins,
  CheckCircle2,
  XCircle,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetQrQuery } from "@/redux/api/qrApi";
import { FullScreenLoader } from "@/app/loading";

type QRCode = {
  _id: string;
  title: string;
  code: string; // The value we turn into a QR Image
  points: number;
  isUsed: boolean;
  expiryDate: string;
  createdAt: string;
};

const QRCodeTable = () => {
  const { data, isLoading } = useGetQrQuery(undefined);
  const qrList = data?.data || [];

  // State for the modal
  const [selectedQr, setSelectedQr] = useState<QRCode | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [copiedId, setCopiedId] = useState<string | null>(null);

  // Function to handle downloading the QR code as an image
  const downloadQR = () => {
    const canvas = document.getElementById("qr-gen") as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${selectedQr?.code || "qrcode"}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  // Standard copy text function
  // const handleCopy = (code: string, id: string) => {
  //   navigator.clipboard.writeText(code);
  //   setCopiedId(id);
  //   setTimeout(() => setCopiedId(null), 2000);
  // };

  // Open the view modal
  const handleViewQr = (item: QRCode) => {
    setSelectedQr(item);
    setIsModalOpen(true);
  };

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
        <Button className="bg-[#00B25D] hover:bg-[#009e52] cursor-pointer">
          + Generate QR
        </Button>
      </div>

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
                <TableHead className="w-75 py-4 pl-6 text-xs uppercase tracking-wider font-semibold text-gray-500">
                  QR Campaign Info
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold text-gray-500">
                  Code & Action
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
              {qrList.map((item: QRCode) => {
                const status = getStatus(item.isUsed, item.expiryDate);
                const StatusIcon = status.icon;

                return (
                  <TableRow
                    key={item._id}
                    className="group border-b border-gray-100 hover:bg-blue-50/30 transition-colors"
                  >
                    {/* Column 1: Info */}
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
                            {format(parseISO(item.createdAt), "MMM dd, yyyy")}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Column 2: The View/Download Button */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {/* View/Download Button */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewQr(item)}
                          className="h-8 gap-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-700"
                        >
                          <QrCode size={14} />
                          View QR
                        </Button>

                        {/* Quick Copy Button (Optional) */}
                        {/* <button
                          onClick={() => handleCopy(item.code, item._id)}
                          className="p-2 hover:bg-gray-100 rounded-md transition-colors text-gray-400 hover:text-gray-700"
                          title="Copy text code"
                        >
                          {copiedId === item._id ? (
                            <Check size={14} className="text-green-500" />
                          ) : (
                            <Copy size={14} />
                          )}
                        </button> */}
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

                    {/* Column 4: Status */}
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

                    {/* Column 5: Expiry */}
                    <TableCell className="text-right pr-6">
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-700">
                          {format(parseISO(item.expiryDate), "MMM dd, yyyy")}
                        </p>
                        <p className="text-xs text-gray-400">
                          {format(parseISO(item.expiryDate), "h:mm a")}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* =========================================================
          QR CODE PREVIEW & DOWNLOAD MODAL
      ========================================================= */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>QR Code Details</DialogTitle>
            <DialogDescription>
              Scan this code to redeem points or download the image.
            </DialogDescription>
          </DialogHeader>

          {selectedQr && (
            <div className="flex flex-col items-center justify-center py-6 space-y-6">
              <div className="p-4 bg-white border rounded-xl shadow-sm">
                {/* The Actual QR Generator Canvas */}
                <QRCodeCanvas
                  id="qr-gen"
                  value={selectedQr.code}
                  size={200}
                  level={"H"} // High error correction
                  includeMargin={true}
                />
              </div>

              <div className="text-center space-y-1">
                {/* <p className="font-mono text-xl font-bold tracking-wider text-gray-800">
                  {selectedQr.code}
                </p> */}
                <p className="text-sm text-gray-500">{selectedQr.title}</p>
                <Badge className="mt-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-none">
                  Value: {selectedQr.points} Points
                </Badge>
              </div>
            </div>
          )}

          <DialogFooter className="sm:justify-between gap-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
            <Button
              className="bg-[#00B25D] hover:bg-[#009e52] w-full sm:w-auto gap-2"
              onClick={downloadQR}
            >
              <Download size={16} />
              Download PNG
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QRCodeTable;
