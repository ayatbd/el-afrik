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

export default function TierModal() {
  const handleConfirm = () => {
    toast.success("Successfully updated", {
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
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 h-10 rounded-md shadow-sm transition-all flex items-center gap-2">
          Tier Management
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-125 bg-white p-8 md:p-10">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-base text-center">
            Tier Management
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <Label className="text-base">Set tier names</Label>
            <input
              type="text"
              className="w-full p-2 mt-3 border border-gray-300 rounded-md text-black"
            />
          </div>
          <div>
            <Label className="text-base">Set tier requirements</Label>
            <input
              type="text"
              className="w-full p-2 mt-3 border border-gray-300 rounded-md text-black"
            />
          </div>
          <div>
            <Label className="text-base">Tier-specific perks</Label>
            <input
              type="text"
              className="w-full p-2 mt-3 border border-gray-300 rounded-md text-black"
            />
          </div>
          <div>
            <Label className="text-base">
              Access control (Platinum-only sections)
            </Label>
            <input
              type="text"
              className="w-full p-2 mt-3 border border-gray-300 rounded-md text-black"
            />
          </div>

          <div className="pt-6 flex justify-center gap-3">
            <DialogClose asChild>
              <Button
                onClick={handleConfirm}
                className="w-50 h-12 bg-[#00C058] hover:bg-[#00a049] text-white rounded-full text-base font-medium cursor-pointer"
              >
                Submit
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
