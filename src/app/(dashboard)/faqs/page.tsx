"use client";
import AddFaqModal from "@/components/modules/faq/AddFaqModal";
import EditFaqModal from "@/components/modules/faq/EditFaqModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetFaqQuery } from "@/redux/api/faqApi";
import { Search, Trash2 } from "lucide-react";

interface FAQ {
  _id: string;
  question?: string;
  answer?: string;
  Ques?: string;
  Answere?: string;
}

const FaqPage = () => {
  // 1. Get query result
  const { data: faqs, isLoading, isError } = useGetFaqQuery(undefined);

  // 2. Handle Loading State FIRST
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  // 3. Handle Error State
  if (isError || !faqs) {
    return (
      <div className="text-red-500 text-center mt-10">Error loading FAQs.</div>
    );
  }

  // 4. Now it is safe to access data
  // Using optional chaining just in case structure differs
  const faqsData = faqs?.data?.result || [];

  console.log("Faq Data:", faqsData);

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto min-h-screen bg-gray-50/50">
      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">FAQ Management</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage questions and answers for your customers.
          </p>
        </div>
        <AddFaqModal />
      </div>

      {/* --- Search Bar --- */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search FAQs..."
          className="pl-10 h-11 bg-white border-gray-200"
        />
      </div>

      {/* --- FAQ List --- */}
      <div className="space-y-4">
        {faqsData.length > 0 ? (
          faqsData.map((faq: FAQ) => (
            <div
              // FIX: Use _id as defined in your Interface
              key={faq._id}
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between gap-4"
            >
              <div className="flex-1 space-y-2">
                {/* FIX: Ensure these match your API response (question vs Ques) */}
                <h3 className="font-semibold text-gray-800 text-lg">
                  {faq.question || faq["Ques"]}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                  {faq.answer || faq["Answere"]}
                </p>
              </div>

              <div className="flex items-start gap-2 min-w-fit">
                <EditFaqModal faqData={faq} />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Delete
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No FAQs found.</div>
        )}
      </div>
    </div>
  );
};

export default FaqPage;
