"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Loader2, Save } from "lucide-react";
import Swal from "sweetalert2";

// Redux Hooks
import { useCreateCateringBookingMutation } from "@/redux/api/cateringBookingApi";
import { useGetAllCateringQuery } from "@/redux/api/cateringApi"; // To fetch package list
import { FullScreenLoader } from "@/app/loading";

const INITIAL_DATA = {
  packageId: "",
  guestCount: "",
  eventDate: "",
  venueAddress: "",
  contactNumber: "",
  notes: "",
};

interface CateringItem {
  _id: string;
  id?: string;
  name: string;
  description: string;
  pricePerPerson: number;
  minGuests: number;
  menu: string[];
  image?: string;
}

export default function CateringBookingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(INITIAL_DATA);

  // 1. Fetch Packages for the Dropdown
  const { data: packageData } = useGetAllCateringQuery({}); // Fetch enough to show in dropdown
  const packages = packageData?.data?.result || [];

  // 2. Mutation Hook
  const [createCateringBooking, { isLoading }] =
    useCreateCateringBookingMutation();

  // Handle Text/Number Changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Dropdown Change
  const handlePackageChange = (value: string) => {
    setFormData((prev) => ({ ...prev, packageId: value }));
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic Validation
    if (
      !formData.packageId ||
      !formData.guestCount ||
      !formData.eventDate ||
      !formData.contactNumber
    ) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill in all required fields.",
      });
      return;
    }

    try {
      // Construct payload according to your JSON requirement
      const payload = {
        packageId: formData.packageId,
        guestCount: Number(formData.guestCount), // Ensure number
        eventDate: formData.eventDate,
        venueAddress: formData.venueAddress,
        contactNumber: formData.contactNumber,
        notes: formData.notes,
      };

      await createCateringBooking(payload).unwrap();

      Swal.fire({
        icon: "success",
        title: "Booking Created!",
        text: "The catering booking has been successfully recorded.",
        timer: 2000,
        showConfirmButton: false,
      });

      // Reset and Close
      setFormData(INITIAL_DATA);
      setIsOpen(false);
    } catch (err: any) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: err?.data?.message || "Something went wrong.",
      });
    }
  };

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Calendar size={16} className="mr-2" /> Create Booking
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-150 bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Catering Booking</DialogTitle>
          <DialogDescription>
            Enter the event details to create a manual reservation.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Package Selection */}
            <div className="space-y-2 md:col-span-2">
              <Label className="text-gray-700">
                Select Package <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.packageId}
                onValueChange={handlePackageChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a catering package..." />
                </SelectTrigger>
                <SelectContent>
                  {packages.map((pkg: any) => (
                    <SelectItem key={pkg._id} value={pkg._id}>
                      {pkg.name} — ${pkg.pricePerPerson}/head
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Event Date */}
            <div className="space-y-2">
              <Label className="text-gray-700">
                Event Date <span className="text-red-500">*</span>
              </Label>
              <Input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]} // Prevent past dates
              />
            </div>

            {/* Guest Count */}
            <div className="space-y-2">
              <Label className="text-gray-700">
                Guest Count <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                name="guestCount"
                placeholder="e.g. 70"
                value={formData.guestCount}
                onChange={handleChange}
                min={10}
              />
            </div>

            {/* Contact Number */}
            <div className="space-y-2">
              <Label className="text-gray-700">
                Contact Number <span className="text-red-500">*</span>
              </Label>
              <Input
                type="tel"
                name="contactNumber"
                placeholder="+8801700000000"
                value={formData.contactNumber}
                onChange={handleChange}
              />
            </div>

            {/* Venue Address */}
            <div className="space-y-2 md:col-span-2">
              <Label className="text-gray-700">Venue Address</Label>
              <Input
                type="text"
                name="venueAddress"
                placeholder="Green Valley Convention Hall..."
                value={formData.venueAddress}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label className="text-gray-700">Special Requests / Notes</Label>
            <Textarea
              name="notes"
              placeholder="E.g. Food served by 8:30 PM. No spice in roast..."
              value={formData.notes}
              onChange={handleChange}
              className="resize-none h-24"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> Confirm Booking
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
