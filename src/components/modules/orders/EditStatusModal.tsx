/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

  const handleSubmit = async () => {
    if (!orderId || !status) return;

    try {
      await updateOrderStatus({
        id: orderId,
        status: status,
        note: note,
      }).unwrap();

      toast.success("Order status updated successfully");

      // Reset state after successful submission
      setStatus("");
      setNote("");

      onClose();
    } catch (error: any) {
      const message = error?.data?.message || "Something Went Wrong.";
      toast.error(message);
    }
  };

  // Optional: Helper to close and reset if user clicks Cancel
  const handleClose = () => {
    setStatus("");
    setNote("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-106.25 bg-white text-black">
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
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
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
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
