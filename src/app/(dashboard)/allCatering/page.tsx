"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, Utensils, DollarSign, ArrowRight } from "lucide-react";
import { useGetAllCateringQuery } from "@/redux/api/cateringApi";

const AllCatering = () => {
  // 1. Fetch Data
  const {
    data: responseData,
    isLoading,
    isError,
  } = useGetAllCateringQuery(undefined);

  // Adjust this based on whether your backend returns { data: [...] } or just [...]
  const caterings = responseData?.data?.result || [];

  // --- Loading State (Skeleton) ---
  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold mb-8">Our Catering Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4 border rounded-xl p-4">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="space-y-2 pt-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- Error State ---
  if (isError) {
    return (
      <div className="text-center w-full py-20 text-red-500">
        Failed to load catering data.
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Catering Packages
          </h2>
          <p className="text-muted-foreground mt-1">
            Choose the perfect menu for your next event.
          </p>
        </div>
        <Button variant="outline">Create New</Button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {caterings.length > 0 ? (
          caterings.map((item) => (
            <CateringCard key={item._id || item.id} item={item} />
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-500">
            No catering packages found.
          </div>
        )}
      </div>
    </div>
  );
};

// --- Sub-Component for individual Cards ---
const CateringCard = ({ item }) => {
  return (
    <Card className="flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 border-gray-200">
      {/* Image Section */}
      <div className="relative h-56 w-full overflow-hidden bg-gray-100 group">
        <img
          src={item.image || "/placeholder-food.jpg"} // Fallback image
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <Badge className="bg-white/90 text-black hover:bg-white shadow-sm backdrop-blur-sm">
            ${item.pricePerPerson} / person
          </Badge>
        </div>
      </div>

      {/* Header Section */}
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold text-gray-900">
            {item.name}
          </CardTitle>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        {/* Stats Row */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-blue-500" />
            <span className="font-medium">Min {item.minGuests} Guests</span>
          </div>
          <div className="flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="font-medium">Premium</span>
          </div>
        </div>

        <Separator className="my-3" />

        {/* Menu Items List */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-2">
            <Utensils className="w-3 h-3" /> Menu Highlights
          </h4>
          <ScrollArea className="h-24 pr-2">
            <ul className="space-y-1.5">
              {item.menu?.map((menuItem, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-700 flex items-start gap-2"
                >
                  <span className="block w-1.5 h-1.5 mt-1.5 rounded-full bg-orange-400 shrink-0" />
                  {menuItem}
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      </CardContent>

      <CardFooter className="bg-gray-50/50 pt-4 pb-4 border-t">
        <Button className="w-full gap-2 bg-gray-900 hover:bg-gray-800">
          View Details <ArrowRight className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AllCatering;
