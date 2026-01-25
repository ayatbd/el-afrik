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
import { MoreHorizontal, Trash2, Eye, Loader2 } from "lucide-react";
import {
  useDeleteCateringMutation,
  useGetAllCateringQuery,
} from "@/redux/api/cateringApi";
import Link from "next/link";
import EditCateringModal from "@/components/modules/catering/EditCateringModal";

// Interface for your data type
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

const CateringTable = () => {
  // 1. Fetch Data
  const {
    data: responseData,
    isLoading,
    isError,
  } = useGetAllCateringQuery(undefined);

  // Safe access to data
  const caterings: CateringItem[] = responseData?.data?.result || [];

  // 2. Delete data
  const [deleteCatering, { isLoading: isDeleting }] =
    useDeleteCateringMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteCatering(id).unwrap();
      // Toast notification (optional)
      // toast.success("Deleted successfully");
    } catch (err) {
      console.error(err);
      // toast.error("Failed to delete");
    }
  };

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
        {/* Update URL to match your structure */}
        <Link href="/add-catering">
          <Button className="bg-[#00B25D] hover:bg-[#009e52]">
            Add New Package
          </Button>
        </Link>
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
              caterings.map((item) => (
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
                      <span className="text-xs text-muted-foreground line-clamp-1 max-w-62.5">
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
                      {item.menu?.slice(0, 2).map((m, i) => (
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

                        {/* <DropdownMenuItem className="cursor-pointer">
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem> */}

                        {/* --- EDIT BUTTON CHANGE --- */}
                        {/* We use asChild so the Link behaves as the menu item */}
                        <DropdownMenuItem asChild>
                          <EditCateringModal catering={item} />
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="cursor-pointer text-red-600 focus:text-red-600"
                          // Prevent closing immediately if you want to show loading state,
                          // or handle via a separate dialog for safety.
                          onSelect={(e) => e.preventDefault()}
                        >
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="flex items-center w-full"
                            disabled={isDeleting}
                          >
                            {isDeleting ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="mr-2 h-4 w-4" />
                            )}
                            {isDeleting ? "Deleting..." : "Delete"}
                          </button>
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

// ... TableSkeleton code remains the same ...
const TableSkeleton = () => (
  // ... (Keep your skeleton code here)
  <div className="container mx-auto py-10 px-4">
    <Skeleton className="h-8 w-50 mb-4" />
    <div className="border rounded-md p-4">
      <Skeleton className="h-64 w-full" />
    </div>
  </div>
);

export default CateringTable;
