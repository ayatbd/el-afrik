/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"; // or generic label
import { Textarea } from "@/components/ui/textarea"; // or generic textarea
import { useUpdateOrderStatusMutation } from "@/redux/api/ordersApi";
import { toast } from "react-toastify";

interface UpdateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string | null;
  currentStatus: string;
}

export function UpdateOrderModal({
  isOpen,
  onClose,
  orderId,
}: UpdateOrderModalProps) {
  const [status, setStatus] = useState<string>("");
  const [note, setNote] = useState("");
  const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation();

  // Reset state when modal opens
  //   useEffect(() => {
  //     if (isOpen) {
  //       // Default to current status or empty
  //       setStatus(currentStatus || "");
  //       setNote("");
  //     }
  //   }, [isOpen, currentStatus]);

  const handleSubmit = async () => {
    if (!orderId || !status) return;

    try {
      await updateOrderStatus({
        id: orderId,
        status: status,
        note: note,
      }).unwrap();

      toast.success("Order status updated successfully");
      onClose();
    } catch (error: any) {
      const message = error?.data?.message || "Something Went Wrong.";
      //console.error("Failed to update order:", error.data.message);
      toast.error(message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-106.25 bg-white text-black">
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
          <DialogDescription>
            Change the status of order #{orderId?.slice(-6)}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Status Selection */}
          <div className="grid gap-2">
            <Label htmlFor="status" className="font-medium">
              New Status
            </Label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="" disabled>
                Select status
              </option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Note Input */}
          <div className="grid gap-2">
            <Label htmlFor="note" className="font-medium">
              Note
              {status === "cancelled" && (
                <span className="text-red-500 ml-1">*</span>
              )}
            </Label>
            <Textarea
              id="note"
              placeholder={
                status === "cancelled"
                  ? "Reason for cancellation..."
                  : "Add a note (optional)..."
              }
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="min-h-25"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              isLoading || !status || (status === "cancelled" && !note.trim())
            }
            className={`${status === "cancelled" ? "bg-red-600 hover:bg-red-700" : "bg-black hover:bg-gray-800"} text-white`}
          >
            {isLoading ? "Updating..." : "Confirm Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
