"use client";

import { useState, useEffect } from "react";
import { X, Loader2, Save } from "lucide-react";
import Swal from "sweetalert2";
import { useCreateQrMutation } from "@/redux/api/qrApi";

interface CreateBonusModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const INITIAL_DATA = {
  title: "",
  points: "",
  daysValid: "",
};

export default function CreateQrModal({
  open,
  setOpen,
}: CreateBonusModalProps) {
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [createBonus, { isLoading }] = useCreateQrMutation();

  // Reset form when modal closes
  useEffect(() => {
    if (!open) setFormData(INITIAL_DATA);
  }, [open]);

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.points || !formData.daysValid) {
      Swal.fire({
        icon: "warning",
        title: "Required",
        text: "Please fill all fields",
      });
      return;
    }

    try {
      const payload = {
        title: formData.title,
        points: Number(formData.points), // Convert to Number
        daysValid: Number(formData.daysValid), // Convert to Number
      };

      const res = await createBonus(payload).unwrap();

      Swal.fire({
        icon: "success",
        title: "Created!",
        text: "Bonus added successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      setOpen(false); // Close Modal on success
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err?.data?.message || "Failed to create bonus",
      });
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      {/* Modal Container */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">Add New Bonus QR</h2>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title Input */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Welcome Bonus QR 2"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Points Input */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Points
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="points"
                  value={formData.points}
                  onChange={handleChange}
                  placeholder="150"
                  className="w-full pl-4 pr-8 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                  PTS
                </span>
              </div>
            </div>

            {/* Days Valid Input */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Days Valid
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="daysValid"
                  value={formData.daysValid}
                  onChange={handleChange}
                  placeholder="60"
                  className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                  DAYS
                </span>
              </div>
            </div>
          </div>

          {/* Footer / Buttons */}
          <div className="pt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 py-2.5 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Save size={18} />
              )}
              {isLoading ? "Saving..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
