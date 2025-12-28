"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Swal from "sweetalert2";
import { useState } from "react";
import ViewDriverDetails from "@/components/modules/rider-tracking/ViewDriverDetails";

// mock data

interface RiderRequest {
  id: number;
  name: string;
  email: string;
  avatar: string;
  contact: string;
  location: string;
  userType: string;
}

const requests: RiderRequest[] = [
  {
    id: 1,
    name: "DZ Bra Panties Shop",
    email: "redaniel@gmail.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    contact: "+1 (239) 555-0108",
    location: "0 / 77 Purdy Crescent,...",
    userType: "Rider",
  },
  {
    id: 2,
    name: "Nature's Cart",
    email: "zitka@mail.ru",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    contact: "+1 (470) 918 8511",
    location: "09 Arnulfo Crossing, B...",
    userType: "Rider",
  },
  {
    id: 3,
    name: "Flavors & Feasts",
    email: "seema@gmail.com",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
    contact: "+1 (704) 555-0127",
    location: "3 / 621 Juvenal Ridge,...",
    userType: "Rider",
  },
  {
    id: 4,
    name: "Taste Retreat",
    email: "fzaaaaa@gmail.com",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop",
    contact: "+1 (302) 555-0107",
    location: "208 Olson Boulevard,...",
    userType: "Rider",
  },
  {
    id: 5,
    name: "Taste Retreat",
    email: "fzaaaaa@gmail.com",
    avatar:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop",
    contact: "+1 (302) 555-0107",
    location: "208 Olson Boulevard,...",
    userType: "Rider",
  },
  {
    id: 6,
    name: "Taste Retreat",
    email: "fzaaaaa@gmail.com",
    avatar:
      "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&h=150&fit=crop",
    contact: "+1 (302) 555-0107",
    location: "208 Olson Boulevard,...",
    userType: "Rider",
  },
  {
    id: 7,
    name: "Taste Retreat",
    email: "fzaaaaa@gmail.com",
    avatar:
      "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=150&h=150&fit=crop",
    contact: "+1 (302) 555-0107",
    location: "208 Olson Boulevard,...",
    userType: "Rider",
  },
  {
    id: 8,
    name: "Taste Retreat",
    email: "fzaaaaa@gmail.com",
    avatar:
      "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150&h=150&fit=crop",
    contact: "+1 (302) 555-0107",
    location: "208 Olson Boulevard,...",
    userType: "Rider",
  },
];

export default function RiderTrackingPage() {
  const [approve, setApprove] = useState(true);
  const handleApprove = (id: number) => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Approved Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    setApprove(false);
  };

  // --- Delete Handler ---
  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Cancelled!", "Your request has been cancelled.", "success");
      }
    });
  };
  return (
    <div className="min-h-screen w-full bg-white p-6 md:p-10 font-sans text-gray-900">
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/"
          className="p-1 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="h-6 w-6 text-gray-800" />
        </Link>
        <h1 className="text-xl font-semibold text-gray-900">Rider Request</h1>
      </div>

      <div className="w-full overflow-hidden rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F9FAFB] hover:bg-[#F9FAFB] border-b-0">
              <TableHead className="w-25 text-black font-semibold text-base py-5">
                Serial no.
              </TableHead>
              <TableHead className="text-black font-semibold text-base py-5">
                Name
              </TableHead>
              <TableHead className="text-black font-semibold text-base py-5">
                Contact
              </TableHead>
              <TableHead className="text-black font-semibold text-base py-5">
                Location
              </TableHead>
              <TableHead className="text-black font-semibold text-base py-5">
                User Types
              </TableHead>
              <TableHead className="text-black font-semibold text-base text-right pr-12 py-5">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {requests.map((request, index) => (
              <TableRow
                key={request.id}
                className={`border-b-0 hover:bg-opacity-80 ${
                  index % 2 === 0 ? "bg-[#F9FAFB]" : "bg-white"
                }`}
              >
                <TableCell className="font-medium text-gray-700 py-6">
                  {request.id}.
                </TableCell>

                <TableCell className="py-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border border-gray-100">
                      <AvatarImage
                        src={request.avatar}
                        alt={request.name}
                        className="object-cover"
                      />
                      <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-gray-900 font-medium text-base">
                        {request.name}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {request.email}
                      </span>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="text-gray-600 text-base py-6">
                  {request.contact}
                </TableCell>

                <TableCell className="text-gray-600 text-base py-6 max-w-50 truncate">
                  {request.location}
                </TableCell>

                <TableCell className="text-gray-600 text-base py-6">
                  {request.userType}
                </TableCell>

                <TableCell className="text-right py-6">
                  <div className="flex justify-end gap-3">
                    <ViewDriverDetails />
                    <Button
                      onClick={() => handleApprove(request.id)}
                      className="bg-[#00C058] hover:bg-[#00a84d] text-white rounded-full px-3 text-[12px] font-medium shadow-none cursor-pointer transition-all delay-75"
                    >
                      {!approve ? "Approved" : "Approve"}
                    </Button>
                    <Button
                      onClick={handleCancel}
                      className="bg-[#D32F2F] hover:bg-[#b71c1c] text-white rounded-full px-3 text-[12px] font-medium shadow-none cursor-pointer transition-all delay-75"
                    >
                      Cancel
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
