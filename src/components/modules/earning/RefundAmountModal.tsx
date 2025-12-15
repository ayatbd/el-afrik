"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ConfirmationModal from "./ConfirmationModal";

export default function RefundAmountModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-50 h-12 bg-[#00C058] hover:bg-[#00a049] text-white rounded-full text-base font-medium">
          Continue
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-125 bg-white p-8 md:p-10">
        <div className="space-y-6">
          {/* Radio Group Options */}
          <RadioGroup
            defaultValue="wrong-item"
            className="flex flex-col space-y-4"
          >
            <div className="flex items-center space-x-4">
              <RadioGroupItem
                value="Full Refund"
                id="full-refund"
                className="h-6 w-6 border-2 border-[#00C058] text-[#00C058] data-[state=checked]:bg-transparent data-[state=checked]:border-[#00C058] [&_span]:text-[#00C058]"
              />
              <Label
                htmlFor="full-refund"
                className="text-base font-normal text-gray-900 cursor-pointer"
              >
                Full Refund
              </Label>
            </div>
          </RadioGroup>
          <h2 className="font-semibold text-gray-900 cursor-pointer">
            Partial Refund
          </h2>

          <div className="flex items-center gap-3">
            <Label className="flex-1/3 font-normal text-gray-900">
              Enter Amount
            </Label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md text-black"
            />
          </div>

          {/* Continue Button */}
          <div className="pt-6 flex justify-center">
            <ConfirmationModal />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
