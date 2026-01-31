/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { User, Camera, Save, Loader2, ShieldCheck, Lock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/profileApi";
import PasswordChangeForm from "@/components/modules/profile/PasswordChangingForm";

// Helper to format Date
const formatDateForInput = (isoString: string | null) => {
  if (!isoString) return "";
  return new Date(isoString).toISOString().split("T")[0];
};

export default function MyProfilePage() {
  // 1. Fetch Data
  const { data: response, isLoading, isError } = useGetProfileQuery(undefined);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const profileData = response?.data;

  // 2. Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    location: "",
    dob: "",
  });

  // Image State
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  // 3. Populate State
  useEffect(() => {
    if (profileData) {
      setFormData({
        firstName: profileData.firstName || "",
        lastName: profileData.lastName || "",
        contact: profileData.contact || "",
        location: profileData.location || "",
        dob: formatDateForInput(profileData.dob),
      });
      setImagePreview(profileData.image || "");
    }
  }, [profileData]);

  // 4. Handlers
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("data", JSON.stringify(formData)); // Adjust key 'data' based on backend
      if (imageFile) {
        data.append("image", imageFile);
      }
      const res = await updateProfile(data).unwrap();
      if (res.success) {
        toast.success("Profile updated successfully!");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  if (isLoading) {
    return (
      <div className="h-[80vh] w-full flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-[#00B25D] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (isError || !profileData) {
    return <div className="p-10 text-red-500">Failed to load profile.</div>;
  }

  return (
    <div className="min-h-screen w-full bg-[#F9FAFB] p-6 md:p-10 font-sans text-gray-800">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-500">
          Manage your profile details and password.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- LEFT COLUMN: Profile Summary Card --- */}
        <Card className="lg:col-span-1 h-fit shadow-sm border-gray-200">
          <CardContent className="pt-8 flex flex-col items-center text-center">
            {/* Avatar Upload */}
            <div className="relative group mb-4">
              <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                <AvatarImage src={imagePreview} className="object-cover" />
                <AvatarFallback className="text-4xl bg-gray-100 text-gray-400">
                  {formData.firstName?.[0]}
                </AvatarFallback>
              </Avatar>
              <label
                htmlFor="imageUpload"
                className="absolute bottom-0 right-0 bg-[#00B25D] text-white p-2 rounded-full cursor-pointer hover:bg-[#009e52] transition-all shadow-md"
              >
                <Camera className="h-5 w-5" />
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <h2 className="text-xl font-bold text-gray-900">
              {profileData.firstName} {profileData.lastName}
            </h2>
            <div className="flex items-center gap-2 mt-2 mb-6">
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 px-3 capitalize">
                {profileData.role}
              </Badge>
              {profileData.isOtpVerified && (
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 px-2 gap-1">
                  <ShieldCheck className="h-3 w-3" /> Verified
                </Badge>
              )}
            </div>

            <Separator className="mb-6" />

            {/* Stats */}
            {/* <div className="w-full grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500 uppercase font-semibold">
                  Points
                </p>
                <p className="text-xl font-bold text-[#00B25D]">
                  {profileData.point}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500 uppercase font-semibold">
                  Tier
                </p>
                <div className="flex items-center justify-center gap-1 text-amber-600 font-bold text-lg">
                  <Award className="h-4 w-4" />
                  {profileData.loyalityTier}
                </div>
              </div>
            </div> */}
          </CardContent>
        </Card>

        {/* --- RIGHT COLUMN: Tabs System --- */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 h-12">
              <TabsTrigger value="profile" className="text-sm font-medium">
                <User className="mr-2 h-4 w-4" /> Profile Details
              </TabsTrigger>
              <TabsTrigger value="password" className="text-sm font-medium">
                <Lock className="mr-2 h-4 w-4" /> Change Password
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: PROFILE FORM */}
            <TabsContent value="profile">
              <Card className="shadow-sm border-gray-200">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="contact">Contact Number</Label>
                        <Input
                          id="contact"
                          name="contact"
                          value={formData.contact}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input
                          id="dob"
                          name="dob"
                          type="date"
                          value={formData.dob}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-500">
                        Email Address (Read-only)
                      </Label>
                      <Input
                        id="email"
                        value={profileData.email}
                        disabled
                        className="bg-gray-100 cursor-not-allowed"
                      />
                    </div>

                    <div className="pt-2 flex justify-end">
                      <Button
                        type="submit"
                        disabled={isUpdating}
                        className="bg-[#00B25D] hover:bg-[#009e52]"
                      >
                        {isUpdating ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Save className="mr-2 h-4 w-4" />
                        )}
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 2: PASSWORD FORM */}
            <TabsContent value="password">
              <PasswordChangeForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
