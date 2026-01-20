"use client";

import { useState, useEffect, ChangeEvent } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Camera,
  Save,
  Loader2,
  Award,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner"; // or react-toastify
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Import your hooks
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/profileApi";

// Helper to format Date for Input (YYYY-MM-DD)
const formatDateForInput = (isoString: string | null) => {
  if (!isoString) return "";
  return new Date(isoString).toISOString().split("T")[0];
};

export default function MyProfilePage() {
  // 1. Fetch Data
  const { data: response, isLoading, isError } = useGetProfileQuery(undefined);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const profileData = response?.data;
  // console.log(response);

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

  // 3. Populate State on Data Fetch
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

      // Append text data as JSON string (common pattern) or individual fields
      // Option A: If backend expects a "data" string field
      data.append("data", JSON.stringify(formData));

      // Option B: If backend expects individual fields (Uncomment if needed)
      // Object.entries(formData).forEach(([key, value]) => data.append(key, value));

      // Append Image if changed
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
      <div className="flex h-[80vh] w-full items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#00B25D]" />
      </div>
    );
  }

  if (isError || !profileData) {
    return (
      <div className="w-full mx-auto">
        <div className="flex h-[80vh] flex-col items-center justify-center text-red-500">
          <p>Failed to load profile data.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#F9FAFB] p-6 md:p-10 font-sans text-gray-800">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- LEFT COLUMN: Profile Card --- */}
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

            {/* Name & Role */}
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
            <div className="w-full grid grid-cols-2 gap-4">
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
            </div>

            <div className="w-full mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100 text-left">
              <p className="text-xs text-blue-500 uppercase font-bold mb-1">
                Referral Code
              </p>
              <p className="text-lg font-mono font-semibold text-blue-900 tracking-wider">
                {profileData.refercode}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* --- RIGHT COLUMN: Edit Form --- */}
        <Card className="lg:col-span-2 shadow-sm border-gray-200">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5 text-[#00B25D]" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="h-11 bg-gray-50/50"
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="h-11 bg-gray-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact */}
                <div className="space-y-2">
                  <Label htmlFor="contact" className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-gray-500" /> Contact
                    Number
                  </Label>
                  <Input
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    className="h-11 bg-gray-50/50"
                  />
                </div>

                {/* DOB */}
                <div className="space-y-2">
                  <Label htmlFor="dob" className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-gray-500" /> Date of
                    Birth
                  </Label>
                  <Input
                    id="dob"
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="h-11 bg-gray-50/50"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-gray-500" /> Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="h-11 bg-gray-50/50"
                />
              </div>

              {/* Email (Read Only) */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="flex items-center gap-2 text-gray-500"
                >
                  <Mail className="h-3.5 w-3.5" /> Email Address (Read-only)
                </Label>
                <Input
                  id="email"
                  value={profileData.email}
                  disabled
                  className="h-11 bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="bg-[#00B25D] hover:bg-[#009e52] text-white px-8 h-11 text-base font-medium"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" /> Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
