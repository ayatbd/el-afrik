"use client";

import Link from "next/link";
import { ArrowLeft, RotateCw, Trash2 } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { products } from "@/app/data/categoriesData";
import AddCategoryModal from "@/components/modules/categories/AddCategoryModal";
import EditCategoryModal from "@/components/modules/categories/EditCategoryModal";

export default function ManageProductsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] p-6 font-sans text-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center gap-2">
          <Link
            href="#"
            className="p-1 hover:bg-gray-200 rounded-full transition"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">Categories</h1>
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

        <AddCategoryModal />
      </div>

      <div className="bg-transparent overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b-0 hover:bg-transparent">
              <TableHead className="text-gray-500 font-medium">S. no</TableHead>
              <TableHead className="text-gray-500 font-medium">
                Product Image
              </TableHead>
              <TableHead className="text-gray-500 font-medium">
                Category Name
              </TableHead>
              <TableHead className="text-gray-500 font-medium">
                Rewards
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
                  <div className="">
                    <Avatar className="h-10 w-10 rounded-md">
                      <AvatarImage
                        src={product.image}
                        alt={product.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="rounded-md">P</AvatarFallback>
                    </Avatar>
                  </div>
                </TableCell>

                <TableCell className="py-4 text-gray-500">
                  {product.category}
                </TableCell>

                <TableCell className="py-4 text-gray-500">
                  {product.id}
                </TableCell>

                <TableCell className="py-4">
                  <div className="flex items-center justify-center gap-3">
                    <EditCategoryModal />
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
