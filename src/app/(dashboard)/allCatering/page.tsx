"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MoreHorizontal, FileEdit, Trash2, Eye } from "lucide-react";
import { useGetAllCateringQuery } from "@/redux/api/cateringApi";

const CateringTable = () => {
  // 1. Fetch Data
  const {
    data: responseData,
    isLoading,
    isError,
  } = useGetAllCateringQuery(undefined);
  const caterings = responseData?.data?.result || [];

  // --- Loading State ---
  if (isLoading) {
    return <TableSkeleton />;
  }

  // --- Error State ---
  if (isError) {
    return <div className="text-red-500 p-10">Failed to load data.</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Catering List</h2>
          <p className="text-muted-foreground text-sm">
            Manage your event packages and menus.
          </p>
        </div>
        <Button>Add New Package</Button>
      </div>

      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/50">
              <TableHead className="w-25">Image</TableHead>
              <TableHead className="min-w-50">Package Name</TableHead>
              <TableHead>Price / Head</TableHead>
              <TableHead>Min. Guests</TableHead>
              <TableHead className="hidden md:table-cell">
                Menu Preview
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {caterings.length > 0 ? (
              caterings?.map((item: any) => (
                <TableRow
                  key={item._id || item.id}
                  className="hover:bg-gray-50/50"
                >
                  {/* Image Column */}
                  <TableCell>
                    <div className="h-12 w-16 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                      <img
                        src={item.image || "/placeholder-food.jpg"}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </TableCell>

                  {/* Name & Description */}
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900">
                        {item.name}
                      </span>
                      <span className="text-xs text-muted-foreground line-clamp-1 max-w-[250px]">
                        {item.description}
                      </span>
                    </div>
                  </TableCell>

                  {/* Price */}
                  <TableCell>
                    <Badge variant="secondary" className="font-mono">
                      ${item.pricePerPerson}
                    </Badge>
                  </TableCell>

                  {/* Min Guests */}
                  <TableCell>
                    <div className="text-sm font-medium text-gray-700">
                      {item.minGuests}{" "}
                      <span className="text-gray-400 font-normal">ppl</span>
                    </div>
                  </TableCell>

                  {/* Menu List (Truncated) */}
                  <TableCell className="hidden md:table-cell max-w-75">
                    <div className="flex flex-wrap gap-1">
                      {item.menu?.slice(0, 2).map((m: string, i: number) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="text-xs bg-white text-gray-600 font-normal"
                        >
                          {m}
                        </Badge>
                      ))}
                      {item.menu?.length > 2 && (
                        <Badge
                          variant="outline"
                          className="text-xs bg-gray-100 text-gray-500"
                        >
                          +{item.menu.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>

                  {/* Actions Dropdown */}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="cursor-pointer">
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <FileEdit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// --- Helper Component: Loading Skeleton ---
const TableSkeleton = () => (
  <div className="container mx-auto py-10 px-4">
    <div className="space-y-4">
      <div className="flex justify-between">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-10 w-[120px]" />
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className="h-4 w-[60px]" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-[150px]" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-[80px]" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-[80px]" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-[200px]" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-[40px]" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5].map((i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-12 w-16 rounded" />
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[180px]" />
                    <Skeleton className="h-3 w-[120px]" />
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-12 rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-10" />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-8 w-8 ml-auto" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
);

export default CateringTable;
