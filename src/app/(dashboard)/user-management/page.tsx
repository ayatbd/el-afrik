"use client";

import { ArrowLeft, Search, ChevronLeft, ChevronRight } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { FaUserCircle } from "react-icons/fa";
import { GoBlocked } from "react-icons/go";
import Link from "next/link";
import { users } from "@/app/data/userData";

// --- Component ---

export default function UserManagementPage() {
  return (
    <div className="min-h-screen w-full bg-[#F9FAFB] p-6 md:p-10 font-sans text-gray-900">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="text-gray-900 hover:opacity-70 transition-opacity"
          >
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">
            User Management
          </h1>
        </div>

        <div className="relative w-full md:w-75">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input className="pl-10 bg-transparent border-gray-800 rounded-md focus-visible:ring-0 focus-visible:border-black placeholder:text-gray-500" />
        </div>
      </div>

      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow className="border-b-0 hover:bg-transparent">
              <TableHead className="text-black font-semibold text-base pl-0">
                User Name
              </TableHead>
              <TableHead className="text-black font-semibold text-base">
                Mobile Number
              </TableHead>
              <TableHead className="text-black font-semibold text-base">
                Email
              </TableHead>
              <TableHead className="text-black font-semibold text-base">
                Date Joined
              </TableHead>
              <TableHead className="text-black font-semibold text-base">
                User Type
              </TableHead>
              <TableHead className="text-black font-semibold text-base text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                className="border-b-0 hover:bg-gray-100/50"
              >
                <TableCell className="py-4 pl-0">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-gray-700">
                      {user.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-4 text-gray-600">
                  {user.mobile}
                </TableCell>
                <TableCell className="py-4 text-gray-600">
                  {user.email}
                </TableCell>
                <TableCell className="py-4 text-gray-600">
                  {user.dateJoined}
                </TableCell>
                <TableCell className="py-4 text-gray-600">
                  {user.userType}
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center justify-center gap-3">
                    <Link
                      href={`/user-management/${user.id}`}
                      className="p-0.5 rounded-sm border border-gray-800 text-gray-700 bg-gray-900 hover:bg-gray-800 transition-colors"
                    >
                      <FaUserCircle fill="white" className="h-4 w-4" />
                    </Link>
                    <button className="p-0.5 rounded-sm border border-gray-800 text-gray-700 hover:bg-gray-100 transition-colors">
                      <GoBlocked className="h-4 w-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-10 flex items-center justify-center gap-4 text-sm font-medium text-gray-600">
        <button className="p-2 text-black cursor-pointer">
          <ChevronLeft className="h-7 w-7" />
        </button>

        <span className="flex h-8 w-8 items-center justify-center rounded bg-gray-300 text-black">
          1
        </span>
        <span className="cursor-pointer hover:text-black">2</span>
        <span className="cursor-pointer hover:text-black">3</span>
        <span className="cursor-default tracking-widest text-gray-400">
          4.....30
        </span>
        <span className="cursor-pointer hover:text-black">60</span>
        <span className="cursor-pointer hover:text-black">120</span>

        <button className="p-2 text-black cursor-pointer">
          <ChevronRight className="h-7 w-7" />
        </button>
      </div>
    </div>
  );
}
