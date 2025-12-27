"use client";

import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function EditTerms() {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const handleSave = async () => {
    await fetch("/api/terms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    toast.success("Terms & Conditions updated successfully");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Edit Terms & Conditions</h1>

      <JoditEditor
        ref={editor}
        value={content}
        onBlur={(newContent) => setContent(newContent)}
      />

      <button
        onClick={handleSave}
        className="mt-4 px-5 py-2 bg-black text-white rounded"
      >
        Save
      </button>
    </div>
  );
}
