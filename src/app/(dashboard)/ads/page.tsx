"use client";

import { FullScreenLoader } from "@/app/loading";

// Shadcn & UI Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tag, AlertCircle, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useDeleteAdMutation, useGetAdsQuery } from "@/redux/api/adsApi";
import AdAdditionModal from "@/components/modules/ads/AdAdditionModal";

const AllAdsPage = () => {
  const { data: response, isLoading, isError } = useGetAdsQuery(undefined);
  const allAds = response?.data || [];
  //   console.log(allAds);

  const [deleteAd] = useDeleteAdMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteAd(id).unwrap();
      toast.success("Ad deleted successfully!");
    } catch (error: unknown) {
      const errorMessage =
        (((error as Record<string, unknown>)?.data as Record<string, unknown>)
          ?.message as string | undefined) || "Failed to delete Ad";
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="h-[80vh] w-full flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-[#00B25D] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center text-red-500 gap-2">
        <AlertCircle size={40} />
        <p className="font-medium">Failed to load promotions.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Ads Management
          </h2>
          <p className="text-muted-foreground mt-1">Manage your ads here.</p>
        </div>
        <AdAdditionModal />
      </div>

      {/* Main Table Card */}
      <Card className="border shadow-sm overflow-hidden bg-white">
        <CardHeader className="bg-gray-50/50 border-b py-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-gray-700">
              All Active & Past Promos
            </CardTitle>
            <Badge variant="outline" className="bg-white">
              Total: {allAds.length}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent bg-gray-50/30">
                <TableHead className="w-75 py-4 pl-6 text-xs uppercase tracking-wider font-semibold text-gray-500">
                  Sl. No.
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold text-gray-500">
                  Image
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold text-gray-500">
                  Create Time
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold text-gray-500">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allAds?.map((singleAd: any, index: number) => {
                return (
                  <TableRow
                    key={singleAd._id}
                    className="group border-b border-gray-100 hover:bg-blue-50/30 transition-all duration-200"
                  >
                    {/* Product Info */}
                    <TableCell className="pl-8">{index + 1}</TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-14 w-14 rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-white group-hover:shadow-md transition-shadow">
                          <Avatar className="h-full w-full rounded-none">
                            <AvatarImage
                              src={singleAd?.image}
                              className="object-cover"
                            />
                          </Avatar>
                        </div>
                      </div>
                    </TableCell>

                    {/* Product Name */}
                    <TableCell>
                      <span className="font-semibold text-gray-900 line-clamp-1">
                        {new Date(singleAd?.createdAt).toLocaleDateString()}
                        {/* {singleAd?.createdAt} */}
                      </span>
                    </TableCell>

                    {/* Action */}
                    <TableCell>
                      <Button
                        onClick={() => handleDelete(singleAd._id)}
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 group-hover:bg-white group-hover:shadow-sm border border-transparent group-hover:border-gray-100 transition-all cursor-pointer"
                      >
                        <Trash2 size={16} className="text-red-400" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {/* Empty State */}
          {allAds.length === 0 && (
            <div className="py-20 text-center">
              <div className="bg-gray-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Tag className="text-gray-300" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                No Promos Found
              </h3>
              <p className="text-gray-500 max-w-sm mx-auto mt-1">
                You haven&apos;t created any special promotion campaigns yet.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AllAdsPage;
