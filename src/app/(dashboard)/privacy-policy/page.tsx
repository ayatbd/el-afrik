"use client";

import { useState, useEffect } from "react";
import {
  Save,
  Eye,
  History,
  CheckCircle2,
  Loader2,
  Bold,
  Italic,
  Underline,
  Link as LinkIcon,
  List,
  ListOrdered,
} from "lucide-react";
import { toast } from "react-toastify";

// Assuming you have these UI components from shadcn/ui
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// Placeholder for your actual RTK Query hooks
// import { useGetPrivacyPolicyQuery, useUpdatePrivacyPolicyMutation } from "@/redux/api/settingsApi";

export default function PrivacyPolicyManager() {
  const [activeTab, setActiveTab] = useState("edit");
  const [content, setContent] = useState("");

  // Simulated RTK Query Hooks (Replace with real ones)
  const isLoading = false; // const { data, isLoading } = useGetPrivacyPolicyQuery();
  const [updatePolicy, { isLoading: isUpdating }] = [
    async () => new Promise((resolve) => setTimeout(resolve, 1500)), // Mock API call
    { isLoading: false },
  ]; // const [updatePolicy, { isLoading: isUpdating }] = useUpdatePrivacyPolicyMutation();

  // Load existing data
  useEffect(() => {
    // if (data) setContent(data.content);
    setContent(
      "<h2>1. Introduction</h2>\n<p>Welcome to our platform. We value your privacy...</p>",
    );
  }, []);

  const handleSave = async (status: "draft" | "published") => {
    try {
      // await updatePolicy({ content, status }).unwrap();
      await updatePolicy(); // Mock
      toast.success(
        status === "published"
          ? "Privacy Policy Published!"
          : "Draft Saved Successfully!",
      );
    } catch (error) {
      toast.error("Failed to save the privacy policy.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-[#00B25D]" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Privacy Policy Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Update and publish the privacy policy visible to your users.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 py-1"
          >
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Currently Live
          </Badge>
          <span className="text-xs text-gray-400">
            Last updated: Jan 18, 2026
          </span>
        </div>
      </div>

      <Card className="bg-white shadow-sm border-gray-100">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <CardHeader className="border-b border-gray-100 pb-0">
            <div className="flex justify-between items-end">
              <TabsList className="bg-gray-50 border-gray-100 -mb-px">
                <TabsTrigger
                  value="edit"
                  className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#00B25D] data-[state=active]:shadow-none rounded-none px-6"
                >
                  <PencilIcon className="w-4 h-4 mr-2" />
                  Editor
                </TabsTrigger>
                <TabsTrigger
                  value="preview"
                  className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#00B25D] data-[state=active]:shadow-none rounded-none px-6"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </TabsTrigger>
              </TabsList>

              {/* Optional: Version History Button */}
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700 mb-2"
              >
                <History className="w-4 h-4 mr-2" />
                Version History
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {/* EDIT TAB */}
            <TabsContent value="edit" className="m-0 border-none outline-none">
              {/* Simulated Rich Text Toolbar */}
              <div className="bg-gray-50 border-b border-gray-100 p-2 flex items-center gap-1">
                <ToolbarButton
                  icon={<Bold className="w-4 h-4" />}
                  label="Bold"
                />
                <ToolbarButton
                  icon={<Italic className="w-4 h-4" />}
                  label="Italic"
                />
                <ToolbarButton
                  icon={<Underline className="w-4 h-4" />}
                  label="Underline"
                />
                <div className="w-[1px] h-4 bg-gray-300 mx-2" />
                <ToolbarButton
                  icon={<LinkIcon className="w-4 h-4" />}
                  label="Link"
                />
                <div className="w-[1px] h-4 bg-gray-300 mx-2" />
                <ToolbarButton
                  icon={<List className="w-4 h-4" />}
                  label="Bullet List"
                />
                <ToolbarButton
                  icon={<ListOrdered className="w-4 h-4" />}
                  label="Numbered List"
                />
              </div>

              {/* Note: In production, replace this Textarea with a rich text editor like Tiptap or React-Quill */}
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your privacy policy here..."
                className="min-h-[500px] border-none focus-visible:ring-0 p-6 text-base resize-y"
              />
            </TabsContent>

            {/* PREVIEW TAB */}
            <TabsContent
              value="preview"
              className="m-0 p-8 min-h-[500px] bg-gray-50"
            >
              <div
                className="max-w-3xl mx-auto bg-white p-8 border border-gray-200 rounded-md shadow-sm prose prose-green"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>

      {/* Action Footer */}
      <div className="flex justify-end gap-3 pt-4">
        <Button
          variant="outline"
          onClick={() => handleSave("draft")}
          disabled={isUpdating}
          className="px-6 border-gray-200"
        >
          {isUpdating ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Save as Draft
        </Button>
        <Button
          onClick={() => handleSave("published")}
          disabled={isUpdating}
          className="px-8 bg-[#00B25D] hover:bg-[#00924c] text-white"
        >
          {isUpdating ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <Eye className="w-4 h-4 mr-2" />
          )}
          Publish to Live
        </Button>
      </div>
    </div>
  );
}

// Sub-component for Editor Toolbar button
function ToolbarButton({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 text-gray-600 hover:bg-gray-200"
      title={label}
    >
      {icon}
    </Button>
  );
}

function PencilIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}
