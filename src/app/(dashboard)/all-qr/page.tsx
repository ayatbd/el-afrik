"use client";

import React, { useState } from "react";
import { format, isPast, parseISO } from "date-fns";
import { QRCodeCanvas } from "qrcode.react";
import { useGetQrQuery } from "@/redux/api/qrApi";
import { FullScreenLoader } from "@/app/loading";
import CreateQrModal from "@/components/modules/qr/CreateQrModal";

// UI Imports
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

type QRCode = {
  _id: string;
  title: string;
  code: string;
  points: number;
  isUsed: boolean;
  expiryDate: string;
  createdAt: string;
};

const QRCodeTable = () => {
  // 1. Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // 2. Fetch Data with Pagination
  const { data: responseData, isLoading } = useGetQrQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  // 3. Safe Access to Data
  const qrList: QRCode[] = responseData?.data.result || [];
  // console.log(qrList);
  const meta = responseData?.data?.meta || { totalPage: 1, total: 0 };

  // Modal State
  const [selectedQr, setSelectedQr] = useState<QRCode | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); // Create Modal

  // Helper Functions
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

  // Pagination Handler
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= meta.totalPage) {
      setCurrentPage(newPage);
    }
  };

  // Get Visible Pages Logic
  const getVisiblePages = () => {
    const total = meta.totalPage;
    const maxVisible = 5;

    if (total <= maxVisible) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(total, currentPage + 2);

    if (currentPage <= 3) {
      end = 5;
      start = 1;
    } else if (currentPage >= total - 2) {
      start = total - 4;
      end = total;
    }

    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  if (isLoading) {
    return (
      <div className="h-[80vh] w-full flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-[#00B25D] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-8 space-y-8 min-h-screen bg-gray-50/30">
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
        <Button
          onClick={() => setShowModal(true)}
          className="bg-[#00B25D] hover:bg-[#009e52] cursor-pointer"
        >
          + Generate QR
        </Button>
        <CreateQrModal open={showModal} setOpen={setShowModal} />
      </div>

      <Card className="border shadow-sm bg-white overflow-hidden">
        <CardHeader className="bg-white border-b py-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-gray-700">
              Generated Codes
            </CardTitle>
            <Badge variant="secondary" className="bg-gray-100 text-gray-600">
              Total: {meta.total}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent bg-gray-50/50">
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
              {qrList.length > 0 ? (
                qrList.map((item: QRCode) => {
                  const status = getStatus(item.isUsed, item.expiryDate);
                  const StatusIcon = status.icon;

                  return (
                    <TableRow
                      key={item._id}
                      className="group border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                    >
                      {/* Column 1: Info */}
                      <TableCell className="pl-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-lg bg-gray-900 flex items-center justify-center text-white shadow-sm">
                            <QrCode size={20} />
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="font-semibold text-gray-900 text-sm">
                              {item.title}
                            </span>
                            <span className="text-[10px] text-gray-500 flex items-center gap-1">
                              <Calendar size={10} />
                              {format(parseISO(item.createdAt), "MMM dd, yyyy")}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      {/* Column 2: The View/Download Button */}
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewQr(item)}
                          className="h-7 text-xs gap-1.5 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-600"
                        >
                          <QrCode size={12} />
                          View QR
                        </Button>
                      </TableCell>

                      {/* Column 3: Points */}
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <Coins
                            className="text-yellow-500 fill-yellow-500/20"
                            size={16}
                          />
                          <span className="font-bold text-gray-900">
                            {item.points}
                          </span>
                        </div>
                      </TableCell>

                      {/* Column 4: Status */}
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn(
                            "flex w-fit items-center gap-1 px-2 py-0.5 text-[10px]",
                            status.color,
                          )}
                        >
                          <StatusIcon size={10} />
                          {status.label}
                        </Badge>
                      </TableCell>

                      {/* Column 5: Expiry */}
                      <TableCell className="text-right pr-6">
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-700">
                            {format(parseISO(item.expiryDate), "MMM dd, yyyy")}
                          </p>
                          <p className="text-[10px] text-gray-400">
                            {format(parseISO(item.expiryDate), "h:mm a")}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-48 text-center text-gray-500"
                  >
                    No QR Codes generated yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>

        {/* --- Pagination Footer --- */}
        {meta.totalPage > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50">
            <span className="text-xs text-gray-500 font-medium">
              Page {currentPage} of {meta.totalPage}
            </span>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-white"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex gap-1">
                {getVisiblePages().map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`h-8 w-8 rounded-md text-xs font-medium transition-colors border ${
                      page === currentPage
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-white"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === meta.totalPage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
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
