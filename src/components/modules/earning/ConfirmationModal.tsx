"use client";

import { Bounce, toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import React from "react";

export default function ConfirmationModal() {
  const [open, setOpen] = React.useState(false);

  const handleConfirm = () => {
    toast.success("Refund has been issued", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-50 h-12 bg-[#00C058] hover:bg-[#00a049] text-white rounded-full text-base font-medium">
          Continue
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-125 bg-white p-8 md:p-10">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-base text-center">
            Are you sure want to issue a refund?
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <Label className="text-base">Order ID</Label>
            <input
              type="text"
              className="w-full p-2 mt-3 border border-gray-300 rounded-md text-black"
            />
          </div>
          <div>
            <Label className="text-base">Refund Amount</Label>
            <input
              type="number"
              className="w-full p-2 mt-3 border border-gray-300 rounded-md text-black"
            />
          </div>
          <div>
            <Label className="text-base">Payment method</Label>
            <input
              type="number"
              className="w-full p-2 mt-3 border border-gray-300 rounded-md text-black"
            />
          </div>

          <div className="pt-6 flex justify-center gap-3">
            <Button
              onClick={handleConfirm}
              className="w-50 h-12 bg-[#00C058] hover:bg-[#00a049] text-white rounded-full text-base font-medium cursor-pointer"
            >
              Continue
            </Button>
            <DialogClose asChild>
              <Button className="w-50 h-12 bg-[#CE502A] hover:bg-[#c75431] text-white rounded-full text-base font-medium cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
