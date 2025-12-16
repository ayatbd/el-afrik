"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  RotateCw,
  Search,
  Plus,
  Pencil,
  UserCircle,
  Trash2,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { products, ProductStatus } from "@/app/data/categoriesData";

const getStatusBadgeStyles = (status: ProductStatus) => {
  switch (status) {
    case "Available":
      return "bg-green-100 text-green-600 hover:bg-green-100";
    case "unavailable":
      return "bg-red-100 text-red-500 hover:bg-red-100";
    case "Short Stock":
      return "bg-purple-100 text-purple-700 hover:bg-purple-100";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default function ManageProductsPage() {
  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] p-6 font-sans text-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="p-1 hover:bg-gray-200 rounded-full transition"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">
            Manage Products
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <button className="cursor-pointer flex items-center gap-2 text-gray-500 text-sm hover:text-gray-900 transition-colors">
            Data Refresh
            <RotateCw className="h-4 w-4" />
          </button>
          <div className="px-4 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-500 shadow-sm">
            March 25,2024 10:43 Am
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-70">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search..."
              className="pl-10 h-11 border-gray-300 bg-white"
            />
          </div>

          <Select>
            <SelectTrigger className="w-45 h-11 border-gray-300 bg-white text-gray-500">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="foods">Foods</SelectItem>
              <SelectItem value="drinks">Drinks</SelectItem>
              <SelectItem value="snacks">Snacks</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="cursor-pointer bg-[#00B25D] hover:bg-[#009e52] text-white px-6 h-11">
          Add Products
          <Plus className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="mb-6 text-sm">
        <span className="text-purple-700 font-medium">Total Products:</span>
        <span className="ml-2 text-gray-900 font-semibold">All</span>
        <span className="ml-1 text-gray-500">(160)</span>
        <span className="mx-3 text-gray-300">|</span>
        <span className="text-purple-700 font-medium">Publish:</span>
        <span className="ml-1 text-gray-500">(16)</span>
      </div>

      <div className="bg-transparent overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b-0 hover:bg-transparent">
              <TableHead className="w-12.5 text-gray-500 font-medium">
                S. no
              </TableHead>
              <TableHead className="text-gray-500 font-medium">
                Product Name
              </TableHead>
              <TableHead className="text-gray-500 font-medium">
                Weight
              </TableHead>
              <TableHead className="text-gray-500 font-medium">
                Category
              </TableHead>
              <TableHead className="text-gray-500 font-medium">Price</TableHead>
              <TableHead className="text-gray-500 font-medium">Date</TableHead>
              <TableHead className="text-gray-500 font-medium">Stock</TableHead>
              <TableHead className="text-gray-500 font-medium">
                Status
              </TableHead>
              <TableHead className="text-center text-gray-500 font-medium">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                className="border-b border-gray-100 hover:bg-white/50"
              >
                <TableCell className="py-4 text-gray-500">
                  {product.id}.
                </TableCell>

                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 rounded-md">
                      <AvatarImage
                        src={product.image}
                        alt={product.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="rounded-md">P</AvatarFallback>
                    </Avatar>
                    <span className="text-gray-600 font-normal">
                      {product.name}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="py-4 text-gray-500">
                  {product.weight}
                </TableCell>
                <TableCell className="py-4 text-gray-500">
                  {product.category}
                </TableCell>
                <TableCell className="py-4 text-gray-500">
                  {product.price}
                </TableCell>

                <TableCell
                  className={`py-4 ${
                    product.isDateLate
                      ? "text-red-600 font-medium"
                      : "text-gray-500"
                  }`}
                >
                  {product.date}
                </TableCell>

                <TableCell
                  className={`py-4 ${
                    product.status === "Short Stock"
                      ? "text-blue-600 font-medium"
                      : "text-gray-500"
                  }`}
                >
                  {product.stock}
                </TableCell>

                <TableCell className="py-4">
                  <Badge
                    className={`rounded-sm px-3 py-1 font-normal border-0 shadow-none ${getStatusBadgeStyles(
                      product.status
                    )}`}
                  >
                    {product.status}
                  </Badge>
                </TableCell>

                <TableCell className="py-4">
                  <div className="flex items-center justify-center gap-3">
                    <button className="cursor-pointer text-[#5D5FEF] hover:text-[#4a4ccf]">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button className="cursor-pointer text-gray-700 hover:text-black">
                      <UserCircle className="h-5 w-5" />
                    </button>
                    <button className="cursor-pointer text-red-500 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </button>
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
