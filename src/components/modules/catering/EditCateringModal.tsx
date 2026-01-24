"use client";

import { Pencil, X, Loader2, Plus, Trash2, FileEdit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have this ui component
import { toast } from "sonner"; // or "react-toastify"
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useEditCateringMutation } from "@/redux/api/cateringApi";
import { cn } from "@/lib/utils";

interface Catering {
  _id: string;
  name: string;
  description: string;
  pricePerPerson: number;
  minGuests: number;
  menu: string[];
  image: string;
}

export default function EditCateringModal({
  catering,
}: {
  catering: Catering;
}) {
  const [open, setOpen] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<string | number>("");
  const [guests, setGuests] = useState<string | number>("");
  const [menuItems, setMenuItems] = useState<string[]>([""]);

  // Image State
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [editCatering, { isLoading }] = useEditCateringMutation();

  // Sync state with prop when modal opens
  useEffect(() => {
    if (open && catering) {
      setName(catering.name);
      setDescription(catering.description);
      setPrice(catering.pricePerPerson);
      setGuests(catering.minGuests);
      setMenuItems(catering.menu?.length ? catering.menu : [""]);
      setPreview(catering.image);
      setImageFile(null);
    }
  }, [open, catering]);

  // Handle New Image Selection
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Remove Image
  const removeImage = () => {
    setImageFile(null);
    setPreview(null);
  };

  const handleClose = () => {
    setOpen(false);
    if (preview && preview !== catering.image) {
      URL.revokeObjectURL(preview);
    }
  };

  // Menu Handlers
  const handleMenuChange = (index: number, value: string) => {
    const updated = [...menuItems];
    updated[index] = value;
    setMenuItems(updated);
  };

  const addMenuField = () => setMenuItems([...menuItems, ""]);

  const removeMenuField = (index: number) => {
    setMenuItems(menuItems.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    // 1. Validation
    if (!name.trim() || !price) {
      toast.error("Package Name and Price are required");
      return;
    }
    if (!preview) {
      toast.error("Package image is required");
      return;
    }

    try {
      const formData = new FormData();

      // 2. Append Body
      const bodyData = {
        name,
        description,
        pricePerPerson: Number(price),
        minGuests: Number(guests),
        menu: menuItems.filter((item) => item.trim() !== ""),
      };

      formData.append("body", JSON.stringify(bodyData));

      // 3. Append Image
      if (imageFile) {
        formData.append("image", imageFile);
      }

      // 4. API Call
      await editCatering({
        id: catering._id,
        data: formData,
      }).unwrap();

      toast.success("Catering package updated successfully!");
      handleClose();
    } catch (error: any) {
      console.error(error);
      const errMsg = error?.data?.message || "Failed to update package";
      toast.error(errMsg);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={cn(
            "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:text-destructive! [&_svg:not([class*='text-'])]:text-muted-foreground relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer w-full",
          )}
        >
          <FileEdit className="mr-2 h-4 w-4" /> Edit
        </button>
      </DialogTrigger>

      {/* Increased max-width and added scroll for larger form */}
      <DialogContent className="sm:max-w-2xl bg-white p-6 md:p-8 gap-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Edit Catering Package
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          {/* Image Upload Section (Same as Category Modal) */}
          <div className="space-y-3">
            <Label className="text-gray-500 font-normal">
              Cover Image <span className="text-red-500">*</span>
            </Label>
            <div className="grid grid-cols-2 gap-4">
              {/* Upload Box */}
              <label
                htmlFor="editCateringImageUpload"
                className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-gray-500 mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h4l2 2h8a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 13l2-2 3 3 3-3"
                  />
                </svg>
                <p className="text-green-500 font-medium text-lg text-center px-2">
                  Change Image
                </p>
                <input
                  id="editCateringImageUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

              {/* Preview */}
              {preview && (
                <div className="relative h-48 w-full group rounded-lg overflow-hidden border border-gray-200">
                  <Image
                    width={300}
                    height={300}
                    src={preview}
                    alt="Catering Preview"
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1 bg-white/80 hover:bg-white text-red-500 rounded-full shadow-sm transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Name & Description */}
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-3">
              <Label className="text-gray-500 font-normal">
                Package Name <span className="text-red-500">*</span>
              </Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Royal Wedding"
                className="h-12 border-gray-200 bg-white focus-visible:ring-[#4BD37B]"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-gray-500 font-normal">Description</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief details..."
                className="resize-none border-gray-200 bg-white focus-visible:ring-[#4BD37B]"
                rows={3}
              />
            </div>
          </div>

          {/* Price & Guests */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label className="text-gray-500 font-normal">Price ($)</Label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="h-12 border-gray-200 bg-white focus-visible:ring-[#4BD37B]"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-gray-500 font-normal">Min Guests</Label>
              <Input
                type="number"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="h-12 border-gray-200 bg-white focus-visible:ring-[#4BD37B]"
              />
            </div>
          </div>

          {/* Dynamic Menu List */}
          <div className="space-y-3">
            <Label className="text-gray-500 font-normal">Menu Items</Label>
            <div className="space-y-2">
              {menuItems.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) => handleMenuChange(index, e.target.value)}
                    placeholder={`Item ${index + 1}`}
                    className="h-10 border-gray-200 bg-white focus-visible:ring-[#4BD37B]"
                  />
                  {menuItems.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeMenuField(index)}
                      className="text-red-500 hover:bg-red-50 h-10 w-10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addMenuField}
              className="mt-1 text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              <Plus className="h-3.5 w-3.5 mr-2" /> Add Item
            </Button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-center mt-4">
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-[#00B25D] hover:bg-[#00924c] text-white px-12 h-11 text-base font-medium rounded-md w-50 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
