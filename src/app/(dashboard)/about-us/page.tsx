"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import {
  useGetAboutUsQuery,
  useUpdateAboutUsMutation,
} from "@/redux/api/aboutUs";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
  loading: () => (
    <div className="h-125 w-full bg-gray-100 animate-pulse rounded-md" />
  ),
});

export default function AboutUs() {
  const editor = useRef(null);
  const [content, setContent] = useState<string>("");

  const { data: aboutUsData, isLoading: isFetching } =
    useGetAboutUsQuery(undefined);
  const [updateAboutUs, { isLoading: isUpdating }] = useUpdateAboutUsMutation();

  useEffect(() => {
    // Check if data exists
    if (aboutUsData?.data) {
      const backendHtml = aboutUsData.data.aboutUs;

      // Ensure we set a string (fallback to "" if null/undefined)
      setContent(backendHtml || "");
    }
  }, [aboutUsData]);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing...",
      height: 500,
      width: "100%",
      enableDragAndDropFileToEditor: true,
      uploader: {
        insertImageAsBase64URI: true,
      },
      buttons: [
        "bold",
        "italic",
        "underline",
        "|",
        "fontsize",
        "paragraph",
        "|",
        "ul",
        "ol",
        "|",
        "link",
        "image",
        "|",
        "undo",
        "redo",
        "source",
      ],
    }),
    [],
  );

  const handleSave = async () => {
    try {
      // 3. UPDATED: Send the data with the key 'privacyPolicy' to match your backend structure
      // (If your API explicitly expects "content", change this back to "content")
      const response = await updateAboutUs({
        aboutUs: content,
      }).unwrap();

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error: any) {
      Swal.fire("Error", "Failed to update policy", "error");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F9FAFB] p-6 md:p-10 font-sans">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">About Us</h1>
        <Button
          onClick={handleSave}
          disabled={isUpdating || isFetching}
          className="bg-[#00B25D] hover:bg-[#009e52] text-white px-6"
        >
          {isUpdating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Save Changes
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        {isFetching ? (
          <div className="h-125 flex items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-gray-400" />
          </div>
        ) : (
          <JoditEditor
            ref={editor}
            // 4. Safety Check: Ensure value is always a string
            value={content}
            config={config as any}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
          />
        )}
      </div>
    </div>
  );
}
