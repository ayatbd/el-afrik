"use client";

import { useState } from "react";
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
// import { users } from "@/app/data/userData"; // Keeping your import, but using mock below for demo
import Swal from "sweetalert2";

// --- Mock Data (If you use your import, delete this array and uncomment the import above) ---
const users = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  mobile: `+1 555 000 ${i + 10}`,
  email: `user${i + 1}@example.com`,
  dateJoined: "2024-01-01",
  userType: i % 3 === 0 ? "Admin" : "Customer",
  avatar: "",
}));
// -----------------------------------------------------------------------------------------

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Change this number to show more/less rows

  const handleBlock = () => {
    Swal.fire("Are you sure?", "You want to block this user!", "warning");
  };

  // 1. Filter Logic
  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.mobile.includes(term)
    );
  });

  // 2. Pagination Math
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // 3. Handlers
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 when searching
  };

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

        {/* Search Input */}
        <div className="relative w-full md:w-75">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by name, email, or mobile..."
            className="pl-10 bg-transparent border-gray-800 rounded-md focus-visible:ring-0 focus-visible:border-black placeholder:text-gray-500"
          />
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
            {currentData.length > 0 ? (
              currentData.map((user) => (
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
                      <button
                        type="button"
                        onClick={handleBlock}
                        className="p-0.5 rounded-sm border border-gray-800 text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <GoBlocked className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-10 text-gray-500"
                >
                  No users found matching "{searchTerm}"
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-4 text-sm font-medium text-gray-600">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 text-black cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          {/* Generate Page Numbers Dynamically */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            // Simple logic: Show all pages if less than 7, otherwise simple slice could be added
            // For now, this renders all page numbers.
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`flex h-8 w-8 items-center justify-center rounded transition-colors ${
                currentPage === page
                  ? "bg-gray-300 text-black cursor-default"
                  : "cursor-pointer hover:bg-gray-200 hover:text-black"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 text-black cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        </div>
      )}
    </div>
  );
}
