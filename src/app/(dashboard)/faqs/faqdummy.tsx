"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2"; // Or use window.confirm / Toastify

// UI Components (Assuming Shadcn/UI structure from previous prompts)
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// --- Types ---
interface FaqItem {
  id: string;
  question: string;
  description: string;
}

interface FaqFormValues {
  question: string;
  description: string;
}

// --- Mock Data ---
const initialFaqs: FaqItem[] = [
  {
    id: "1",
    question: "How do I reset my password?",
    description:
      "Go to settings and click on 'Reset Password'. You will receive an email.",
  },
  {
    id: "2",
    question: "What is the refund policy?",
    description:
      "You can request a refund within 30 days of purchase if you are not satisfied.",
  },
];

export default function AdminFaqPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>(initialFaqs);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);

  // --- Actions ---

  // 1. Delete FAQ
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setFaqs((prev) => prev.filter((item) => item.id !== id));
        Swal.fire("Deleted!", "Your FAQ has been deleted.", "success");
      }
    });
  };

  // 2. Open Modal for Add
  const openAddModal = () => {
    setEditingFaq(null); // Reset edit state
    setIsModalOpen(true);
  };

  // 3. Open Modal for Edit
  const openEditModal = (faq: FaqItem) => {
    setEditingFaq(faq); // Set item to edit
    setIsModalOpen(true);
  };

  // 4. Handle Save (passed to the form component)
  const handleSave = (data: FaqFormValues) => {
    if (editingFaq) {
      // Update existing
      setFaqs((prev) =>
        prev.map((item) =>
          item.id === editingFaq.id ? { ...item, ...data } : item,
        ),
      );
      Swal.fire("Updated!", "FAQ updated successfully.", "success");
    } else {
      // Create new
      const newFaq: FaqItem = {
        id: Math.random().toString(36).substr(2, 9), // Simple ID generator
        ...data,
      };
      setFaqs((prev) => [newFaq, ...prev]);
      Swal.fire("Added!", "New FAQ added successfully.", "success");
    }
    setIsModalOpen(false);
  };

  // Filter FAQs based on search
  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
        <Button
          onClick={openAddModal}
          className="bg-[#00B25D] hover:bg-[#009e52] text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New FAQ
        </Button>
      </div>

      {/* --- Search Bar --- */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search FAQs..."
          className="pl-10 h-11 bg-white border-gray-200"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* --- FAQ List --- */}
      <div className="space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between gap-4"
            >
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold text-gray-800 text-lg">
                  {faq.question}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                  {faq.description}
                </p>
              </div>

              <div className="flex items-start gap-2 min-w-fit">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditModal(faq)}
                  className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                >
                  <Pencil className="h-4 w-4 mr-1" /> Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(faq.id)}
                  className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Delete
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-gray-400 bg-white rounded-lg border border-dashed border-gray-300">
            <p>No FAQs found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
