import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table, // <--- 1. IMPORT TABLE COMPONENT HERE
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetProductsQuery } from "@/redux/api/productApi";
import { Star } from "lucide-react"; // <--- 2. REMOVE 'Table' FROM HERE

const Items = () => {
  const { data: initialData, isLoading } = useGetProductsQuery(undefined);

  // Ensure the path to data is correct based on your API response
  const items = initialData?.data?.result || [];

  console.log("Items count:", items.length);

  if (isLoading) {
    return <div className="w-full h-full text-center">Loading...</div>;
  }

  // If data exists but map doesn't work, ensure items is actually an array
  if (!Array.isArray(items)) {
    console.error("Items is not an array:", items);
    return <div>Error: Data format incorrect</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="border-b-0 hover:bg-transparent">
            <TableHead className="w-25 text-base font-semibold text-black">
              Item Image
            </TableHead>
            <TableHead className="text-base font-semibold text-black">
              Item Name
            </TableHead>
            <TableHead className="text-base font-semibold text-black">
              Revenue Generated
            </TableHead>
            <TableHead className="text-base font-semibold text-black">
              Avg.Rating
            </TableHead>
            <TableHead className="text-base font-semibold text-black">
              Category
            </TableHead>
            <TableHead className="text-base font-semibold text-black text-right pr-6">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.slice(0, 5).map((item) => (
            <TableRow
              key={item?.id || Math.random()}
              className="border-b-0 hover:bg-gray-50/50 transition-colors"
            >
              {/* Image Column */}
              <TableCell className="py-4">
                <Avatar className="h-14 w-14 border border-gray-100">
                  <AvatarImage
                    src={item?.images}
                    alt={item?.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-orange-100 text-orange-600">
                    {item?.name?.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </TableCell>

              {/* Name Column */}
              <TableCell className="py-4 text-base font-medium text-gray-700">
                {item?.name}
              </TableCell>

              {/* Revenue Column */}
              <TableCell className="py-4 text-base text-gray-700">
                Data Loading...
              </TableCell>

              {/* Rating Column */}
              <TableCell className="py-4">
                <div className="flex items-center gap-1.5 text-base text-gray-700">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{item?.rating}</span>
                </div>
              </TableCell>

              {/* Category Column */}
              <TableCell className="py-4 text-base text-gray-700">
                {item?.category?.categoryName}
              </TableCell>

              {/* Status Column */}
              <TableCell className="py-4 text-right pr-6">
                <Badge className="bg-[#E6F8EB] text-[#00B25D] hover:bg-[#d8f5df] border-0 rounded-md px-3 py-1 text-sm font-normal shadow-none">
                  {item?.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Items;
