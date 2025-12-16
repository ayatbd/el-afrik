"use client";

import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft, RotateCw, Calendar as CalendarIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
const CateringPage = () => {
  const [date, setDate] = React.useState<Date>();
  return (
    <div className="min-h-screen bg-[#FAFAFA] md:px-36 p-6 font-sans text-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-1 -ml-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-900" />
          </Link>
          <h1 className="text-xl font-medium text-gray-900">Catering</h1>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100/80 rounded-md text-gray-600 text-sm hover:bg-gray-200 transition-colors">
            Data Refresh
            <RotateCw className="h-4 w-4 text-blue-600" />
          </button>
          <div className="px-4 py-2 bg-white border border-gray-100 rounded-md text-sm text-gray-500 shadow-sm">
            March 25,2024 10:43 Am
          </div>
        </div>
      </div>

      <div className="w-full">
        <h2 className="text-2xl font-bold text-black mb-8">
          Reservation Form:
        </h2>

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-20 gap-y-6">
            <div className="space-y-3">
              <Label
                htmlFor="fullName"
                className="text-gray-600 font-normal text-base"
              >
                Full Name
              </Label>
              <Input
                id="fullName"
                className="h-12 border-gray-200 bg-white focus-visible:ring-1 focus-visible:ring-gray-300"
              />
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="phone"
                className="text-gray-600 font-normal text-base"
              >
                Phone Number
              </Label>
              <Input
                id="phone"
                className="h-12 border-gray-200 bg-white focus-visible:ring-1 focus-visible:ring-gray-300"
              />
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="email"
                className="text-gray-600 font-normal text-base"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                className="h-12 border-gray-200 bg-white focus-visible:ring-1 focus-visible:ring-gray-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-20 gap-y-6">
            <div className="space-y-3 flex flex-col">
              <Label className="text-gray-600 font-normal text-base">
                Event Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "h-12 w-full justify-between text-left font-normal border-gray-200 bg-white hover:bg-white text-gray-500",
                      !date && "text-muted-foreground"
                    )}
                  >
                    {date ? format(date, "PPP") : <span>Select Date</span>}
                    <CalendarIcon className="h-5 w-5 text-gray-600" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="guests"
                className="text-gray-600 font-normal text-base"
              >
                Number Of Guests
              </Label>
              <Input
                id="guests"
                type="number"
                className="h-12 border-gray-200 bg-white focus-visible:ring-1 focus-visible:ring-gray-300"
              />
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="address"
                className="text-gray-600 font-normal text-base"
              >
                Address/Location
              </Label>
              <Input
                id="address"
                className="h-12 border-gray-200 bg-white focus-visible:ring-1 focus-visible:ring-gray-300"
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-gray-600 font-normal text-base">
              Food Package
            </Label>
            <RadioGroup
              defaultValue="standard"
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="standard"
                  id="standard"
                  className="h-5 w-5 border-2 border-green-500 cursor-pointer text-green-500 data-[state=checked]:border-green-500 data-[state=checked]:text-green-500"
                />
                <Label
                  htmlFor="standard"
                  className="font-normal text-base cursor-pointer"
                >
                  Standard
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="premium"
                  id="premium"
                  className="h-5 w-5 border-2 border-green-500 cursor-pointer text-green-500 data-[state=checked]:border-green-500 data-[state=checked]:text-green-500"
                />
                <Label
                  htmlFor="premium"
                  className="font-normal text-base cursor-pointer"
                >
                  Premium
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="custom"
                  id="custom"
                  className="h-5 w-5 border-2 border-green-500 cursor-pointer text-green-500 data-[state=checked]:border-green-500 data-[state=checked]:text-green-500"
                />
                <Label
                  htmlFor="custom"
                  className="font-normal text-base cursor-pointer"
                >
                  Custom
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="instructions"
              className="text-gray-600 font-normal text-base"
            >
              Write Special Instructions
            </Label>
            <Textarea
              id="instructions"
              className="min-h-37.5 border-gray-200 bg-white resize-none p-4 focus-visible:ring-1 focus-visible:ring-gray-300"
            />
          </div>

          <div className="flex justify-center pt-8 pb-4">
            <Button className="w-full md:w-64 h-12 text-base font-medium bg-[#C85226] hover:bg-[#a6421d] text-white shadow-sm rounded-md">
              Publish
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CateringPage;
