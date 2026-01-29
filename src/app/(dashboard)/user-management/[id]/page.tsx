"use client";

import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShieldCheck,
  Award,
  Coins,
  Hash,
  Clock,
  User,
  Copy,
} from "lucide-react";
import { toast } from "react-toastify";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Used Shadcn Avatar

// --- Interface ---
interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  contact: string;
  location: string;
  dob: string;
  refercode: string;
  status: "in-progress" | "active" | "banned";
  role: string;
  fcmToken: string;
  point: number;
  loyalityTier: string;
  isOtpVerified: boolean;
  createdAt: string;
  updatedAt: string;
  image: string;
}

// Mock Import
import { useGetSingleUserQuery } from "@/redux/api/userApi";

export default function UserDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  // Fetch data
  const { data: response, isLoading, error } = useGetSingleUserQuery(id);

  if (isLoading) {
    return (
      <div className="h-[80vh] w-full flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-[#00B25D] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // --- 2. HANDLE ERROR / EMPTY STATE SECOND ---
  const userData = response?.data as UserData;

  if (error || !userData) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-semibold text-red-500">User not found</h2>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  // --- 3. DESTRUCTURE DATA SAFELY ---
  const {
    fullName,
    email,
    contact,
    location,
    dob,
    refercode,
    status,
    role,
    point,
    loyalityTier,
    isOtpVerified,
    createdAt,
    updatedAt,
    image,
    _id,
  } = userData;

  // --- Helpers ---
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // --- Main Render ---
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      {/* Top Navigation Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.back()}
            className="h-10 w-10 border-gray-200 hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{fullName}</h1>
            <p className="text-sm text-gray-500 capitalize">
              {role} Account • {status}
            </p>
          </div>
        </div>

        {/* <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleBlockUser}
            className="text-red-600 hover:text-white hover:bg-red-600 border-red-200 transition-colors"
          >
            <Ban className="mr-2 h-4 w-4" />
            Block User
          </Button>
        </div> */}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* --- LEFT COLUMN: Identity Card --- */}
        <Card className="xl:col-span-1 border-gray-200 shadow-sm h-fit">
          <CardContent className="pt-8 pb-8 flex flex-col items-center">
            {/* Avatar Section using Shadcn Avatar */}
            <div className="relative group">
              <Avatar className="h-32 w-32 border-4 border-white shadow-lg bg-gray-100">
                <AvatarImage src={image} className="object-cover" />
                <AvatarFallback className="text-3xl font-bold text-gray-400">
                  {fullName?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>

              {/* OTP Verified Badge */}
              {isOtpVerified && (
                <div
                  className="absolute bottom-1 right-1 bg-[#00B25D] text-white p-1.5 rounded-full border-2 border-white shadow-sm"
                  title="OTP Verified"
                >
                  <ShieldCheck className="h-4 w-4" />
                </div>
              )}
            </div>

            {/* Name & Role */}
            <div className="mt-4 text-center">
              <h2 className="text-xl font-bold text-gray-900">{fullName}</h2>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Badge
                  className={`capitalize shadow-none px-3 py-1 ${
                    status === "active"
                      ? "bg-green-100 text-green-700 hover:bg-green-100"
                      : status === "in-progress"
                        ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                        : "bg-red-100 text-red-700 hover:bg-red-100"
                  }`}
                >
                  {status}
                </Badge>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Stats Grid */}
            <div className="grid grid-cols-2 w-full gap-4">
              <div className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100">
                <div className="flex justify-center mb-2">
                  <div className="h-8 w-8 bg-[#00B25D]/10 rounded-full flex items-center justify-center text-[#00B25D]">
                    <Coins className="h-4 w-4" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">{point}</p>
                <p className="text-xs font-medium text-gray-500 uppercase">
                  Points
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100">
                <div className="flex justify-center mb-2">
                  <div className="h-8 w-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                    <Award className="h-4 w-4" />
                  </div>
                </div>
                <p className="text-xl font-bold text-gray-900 truncate px-1">
                  {loyalityTier || "Bronze"}
                </p>
                <p className="text-xs font-medium text-gray-500 uppercase">
                  Tier
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* --- RIGHT COLUMN: Detailed Info --- */}
        <div className="xl:col-span-2 space-y-6">
          {/* Section 1: Personal Info */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-[#00B25D]" />
                <CardTitle className="text-lg">Personal Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <InfoItem
                icon={Mail}
                label="Email Address"
                value={email}
                copyable
                onCopy={() => copyToClipboard(email)}
              />

              <InfoItem icon={Phone} label="Phone Number" value={contact} />

              <InfoItem
                icon={Calendar}
                label="Date of Birth"
                value={dob ? formatDate(dob) : "N/A"}
              />

              <InfoItem icon={MapPin} label="Location" value={location} />
            </CardContent>
          </Card>

          {/* Section 2: Account Details */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Hash className="h-5 w-5 text-[#00B25D]" />
                <CardTitle className="text-lg">Account Details</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <InfoItem
                  icon={Hash}
                  label="Referral Code"
                  value={refercode}
                  isCode
                />

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    User ID
                  </label>
                  <div
                    className="flex items-center gap-2 group cursor-pointer w-fit"
                    onClick={() => copyToClipboard(_id)}
                  >
                    <p className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded border border-gray-200">
                      {_id}
                    </p>
                    <Copy className="h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                <InfoItem
                  icon={Clock}
                  label="Joined On"
                  value={formatDate(createdAt)}
                />

                <InfoItem
                  icon={Clock}
                  label="Last Updated"
                  value={formatDate(updatedAt)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Sub-Component
interface InfoItemProps {
  icon: any;
  label: string;
  value: string;
  copyable?: boolean;
  onCopy?: () => void;
  isCode?: boolean;
}

function InfoItem({
  icon: Icon,
  label,
  value,
  copyable,
  onCopy,
  isCode,
}: InfoItemProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2 text-gray-500">
        <Icon className="h-3.5 w-3.5" />
        <span className="text-xs font-medium uppercase tracking-wide">
          {label}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {isCode ? (
          <span className="text-sm font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
            {value || "N/A"}
          </span>
        ) : (
          <p className="text-sm font-medium text-gray-900">{value || "N/A"}</p>
        )}

        {copyable && value && (
          <button
            onClick={onCopy}
            className="text-gray-400 hover:text-[#00B25D] transition-colors"
            title="Copy"
          >
            <Copy className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
