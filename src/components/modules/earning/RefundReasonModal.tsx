"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import RefundAmountModal from "./RefundAmountModal";

export default function RefundReasonModal() {
  const [selectedReason, setSelectedReason] = React.useState("wrong-item");
  console.log(selectedReason);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#00C058] hover:bg-[#00a34b] text-white rounded-full px-6 h-8 text-xs font-medium shadow-sm">
          Refund
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-125 bg-white p-8 md:p-10">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-bold text-left">
            Select Refund Reason
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Radio Group Options */}
          <RadioGroup
            defaultValue="wrong-item"
            className="flex flex-col space-y-4"
            onValueChange={setSelectedReason}
          >
            {[
              { id: "wrong-item", label: "Wrong Item delivered" },
              { id: "late-delivery", label: "Late Delivery" },
              { id: "missing-items", label: "Missing Items" },
              { id: "poor-quality", label: "Poor Quality Food" },
              { id: "customer-request", label: "Customer Request" },
            ].map((option) => (
              <div key={option.id} className="flex items-center space-x-4">
                <RadioGroupItem
                  value={option.id}
                  id={option.id}
                  className="h-6 w-6 border-2 border-[#00C058] text-[#00C058] data-[state=checked]:bg-transparent data-[state=checked]:border-[#00C058] [&_span]:text-[#00C058]"
                />
                <Label
                  htmlFor={option.id}
                  className="text-base font-normal text-gray-900 cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {/* Others / Textarea Section */}
          <div className="space-y-3 pt-2">
            <Label
              htmlFor="others"
              className="text-base font-normal text-gray-900"
            >
              Others
            </Label>
            <Textarea
              id="others"
              className="min-h-30 resize-none border-gray-300 focus-visible:ring-[#00C058] text-base"
            />
          </div>

          {/* Continue Button */}
          <div className="pt-6 flex justify-center">
            <RefundAmountModal />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
