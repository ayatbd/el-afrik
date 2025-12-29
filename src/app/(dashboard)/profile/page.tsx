"use client";

import Link from "next/link";
import { ArrowLeft, Pencil, Image as ImageIcon, Loader2 } from "lucide-react";
import { useState, useRef, ChangeEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Swal from "sweetalert2"; // Optional: for nice alerts

export default function ProfilePage() {
  // --- States ---
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form Data State
  const [formData, setFormData] = useState({
    fullName: "Giring Furqon",
    displayName: "EL AFRIK LOUNGE", // Added for the big header name
    email: "alma.lawson@example.com",
    phone: "(+33)7 00 55 57 60",
    dob: "1990-01-01",
    location: "312 3rd St. Albany, New York 12206, USA",
  });

  // Image States
  const [avatarPreview, setAvatarPreview] = useState(
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop"
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Handlers ---

  // 1. Toggle Edit Mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // 2. Handle Text Input Changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // 3. Trigger File Input (Only if editing)
  const handleImageClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 4. Handle File Selection & Preview
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Create preview URL
      const objectUrl = URL.createObjectURL(file);
      setAvatarPreview(objectUrl);
    }
  };

  // 5. Submit / Integration Process
  const handleUpdate = async () => {
    setIsLoading(true);

    try {
      // --- INTEGRATION PROCESS START ---

      // A. Prepare FormData (Required for sending files + text)
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("displayName", formData.displayName);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("location", formData.location);

      // B. Append the file only if one was chosen
      if (selectedFile) {
        data.append("avatar", selectedFile);
      }

      // C. Make the API Call (Simulated here)
      // const response = await fetch('/api/user/profile', {
      //   method: 'PUT',
      //   body: data,
      //   // Note: Do not set Content-Type header when using FormData,
      //   // the browser sets it automatically with the boundary.
      // });

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // --- INTEGRATION PROCESS END ---

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your changes have been saved successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      setIsEditing(false); // Lock fields again
    } catch (error) {
      console.error("Upload failed", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while updating.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white p-6 md:p-10 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/"
            className="p-1 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-800" />
          </Link>
          <h1 className="text-xl font-medium text-gray-900">Profile</h1>
        </div>

        {/* --- Profile Header Card --- */}
        <div className="relative bg-[#F4F5F7] rounded-xl flex flex-col items-center justify-center py-10 mb-10 transition-all">
          {/* Pen Button (Toggle) */}
          <button
            onClick={toggleEdit}
            className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
              isEditing
                ? "bg-[#D85C2F] text-white shadow-lg"
                : "text-gray-400 hover:text-gray-600 hover:bg-white"
            }`}
            title={isEditing ? "Cancel Editing" : "Edit Profile"}
          >
            <Pencil className="h-5 w-5" />
          </button>

          <div className="relative mb-4">
            <Avatar className="h-28 w-28 border-4 border-white shadow-sm">
              <AvatarImage
                src={avatarPreview}
                alt="Profile"
                className="object-cover"
              />
              <AvatarFallback>EL</AvatarFallback>
            </Avatar>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />

            {/* Camera Icon - Clickable only when isEditing is true */}
            <div
              onClick={handleImageClick}
              className={`absolute bottom-0 right-0 p-1.5 rounded-full shadow-md border border-gray-100 transition-all duration-300
                ${
                  isEditing
                    ? "bg-white cursor-pointer hover:bg-gray-50 text-[#D85C2F] scale-110"
                    : "bg-gray-200 cursor-not-allowed text-gray-400 grayscale"
                }
              `}
            >
              <ImageIcon className="h-4 w-4" />
            </div>
          </div>

          {/* Editable Display Name */}
          {isEditing ? (
            <input
              id="displayName"
              value={formData.displayName}
              onChange={handleInputChange}
              className="text-2xl font-semibold text-center bg-transparent border-b border-gray-400 focus:border-[#D85C2F] outline-none text-gray-800 uppercase tracking-wide w-1/2"
            />
          ) : (
            <h2 className="text-2xl font-semibold text-gray-400 uppercase tracking-wide">
              {formData.displayName}
            </h2>
          )}
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b border-gray-100 rounded-none mb-8">
            <TabsTrigger
              value="profile"
              className="rounded-none border-b-4 border-transparent px-4 pb-3 pt-2 font-semibold text-gray-500 data-[state=active]:border-[#D85C2F] data-[state=active]:text-gray-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-base transition-all"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="password"
              className="rounded-none border-b-4 border-transparent px-4 pb-3 pt-2 font-semibold text-gray-500 data-[state=active]:border-[#D85C2F] data-[state=active]:text-gray-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-base transition-all"
            >
              Change Password
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="profile"
            className="space-y-8 animate-in fade-in-50 duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-3">
                <Label htmlFor="fullName" className="text-gray-700 font-normal">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`h-12 border-gray-200 focus-visible:ring-[#D85C2F] ${
                    !isEditing && "bg-gray-50 text-gray-500"
                  }`}
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="email" className="text-gray-700 font-normal">
                  Email
                </Label>
                <Input
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`h-12 border-gray-200 focus-visible:ring-[#D85C2F] ${
                    !isEditing && "bg-gray-50 text-gray-500"
                  }`}
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="phone" className="text-gray-700 font-normal">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`h-12 border-gray-200 focus-visible:ring-[#D85C2F] ${
                    !isEditing && "bg-gray-50 text-gray-500"
                  }`}
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="dob" className="text-gray-700 font-normal">
                  Date of birth
                </Label>
                <Input
                  id="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  type="date"
                  className={`h-12 border-gray-200 focus-visible:ring-[#D85C2F] ${
                    !isEditing && "bg-gray-50 text-gray-500"
                  }`}
                />
              </div>

              <div className="space-y-3 md:col-span-2">
                <Label htmlFor="location" className="text-gray-700 font-normal">
                  Location
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`h-12 border-gray-200 focus-visible:ring-[#D85C2F] ${
                    !isEditing && "bg-gray-50 text-gray-500"
                  }`}
                />
              </div>
            </div>
            <div className="pt-4 animate-in slide-in-from-bottom-5 fade-in duration-300">
              <Button
                onClick={handleUpdate}
                disabled={isLoading || !isEditing}
                className="bg-[#D85C2F] hover:bg-[#b04b26] text-white h-12 px-8 rounded-md text-base font-medium min-w-37.5"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Update Profile"
                )}
              </Button>
            </div>
          </TabsContent>

          {/* Password Tab Content (Simplified) */}
          <TabsContent value="password">
            <form className="w-1/2 space-y-8">
              <div className="space-y-3">
                <Label htmlFor="fullName" className="text-gray-700 font-normal">
                  Curren Password
                </Label>
                <Input
                  id="currentPassword"
                  type="password"
                  placeholder="Input your password"
                  className={`h-12 border-gray-200 focus-visible:ring-[#D85C2F] ${
                    !isEditing && "bg-gray-50 text-gray-500"
                  }`}
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="fullName" className="text-gray-700 font-normal">
                  New Password
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Input your password"
                  className={`h-12 border-gray-200 focus-visible:ring-[#D85C2F] ${
                    !isEditing && "bg-gray-50 text-gray-500"
                  }`}
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="fullName" className="text-gray-700 font-normal">
                  Confirm New Password
                </Label>
                <Input
                  id="confirmNewPassword"
                  type="password"
                  placeholder="Input your password"
                  className={`h-12 border-gray-200 focus-visible:ring-[#D85C2F] ${
                    !isEditing && "bg-gray-50 text-gray-500"
                  }`}
                />
              </div>
              <div className="pt-4 animate-in slide-in-from-bottom-5 fade-in duration-300">
                <Button
                  onClick={handleUpdate}
                  disabled={isLoading}
                  className="bg-[#D85C2F] hover:bg-[#b04b26] text-white h-12 px-8 rounded-md text-base font-medium min-w-37.5"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Update Profile"
                  )}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
