"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function ViewDriverDetails() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-3 text-[12px] font-medium shadow-none cursor-pointer transition-all delay-75">
          View Details
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-125 bg-white p-6 md:p-8">
        <div>
          <Card>
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl text-center">
                Rider Details
              </DialogTitle>
            </DialogHeader>
            <CardContent className="flex flex-col items-center px-6 pb-8">
              {/* Profile Image */}
              <div className="relative w-40 h-40 mb-4 rounded-3xl overflow-hidden">
                {/* Replace this src with your actual profile image */}
                <Image
                  src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=400&auto=format&fit=crop"
                  alt="Rider Profile"
                  fill
                  className="object-cover grayscale"
                />
              </div>

              {/* Rider Personal Info */}
              <h2 className="text-xl font-medium text-gray-900 mb-2">
                Nature’s Cart
              </h2>

              <div className="space-y-1 text-center mb-6">
                <p className="text-gray-500">Email : zitka@mail.ru</p>
                <p className="text-gray-500">Contact Info: +1 (470) 918 8511</p>
                <p className="text-gray-500 px-4">
                  Location : 09 Arnulfo Crossing, Botsfordborough
                </p>
              </div>
              <div className="w-full space-y-3">
                <div className="relative flex items-center justify-center flex-col rounded-xl overflow-hidden gap-3">
                  <h3 className="text-lg font-medium text-gray-800 text-left">
                    Driving License :
                  </h3>
                  {/* Replace this src with your actual license image */}
                  <Image
                    width={340}
                    height={210}
                    src="/images/dashboard/image.png"
                    alt="Driving License"
                    className="object-cover opacity-90 hover:scale-105 transition-transform duration-300"
                  />

                  {/* Overlay to simulate the ID look if image fails or for styling */}
                  <div className="absolute inset-0 bg-linear-to-tr from-gray-100/20 to-transparent pointer-events-none" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
