"use client";

import { useState } from "react";
import { useChangePasswordMutation } from "@/redux/api/profileApi";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, KeyRound, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

export default function PasswordChangeForm() {
  // State
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validation
    if (passwords.newPassword !== passwords.confirmPassword) {
      return toast.error("New passwords do not match!");
    }
    if (passwords.newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }

    try {
      // 2. API Call
      await changePassword({
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
      }).unwrap();

      toast.success("Password changed successfully!");
      setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" }); // Reset
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to change password");
    }
  };

  return (
    <Card className="shadow-sm border-gray-200">
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Ensure your account is using a long, random password to stay secure.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
          {/* Old Password */}
          <div className="space-y-2">
            <Label htmlFor="oldPassword">Current Password</Label>
            <div className="relative">
              <Input
                id="oldPassword"
                name="oldPassword"
                type={showOld ? "text" : "password"}
                value={passwords.oldPassword}
                onChange={handleChange}
                placeholder="Enter current password"
                required
              />
              <button
                type="button"
                onClick={() => setShowOld(!showOld)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showOld ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Input
                id="newPassword"
                name="newPassword"
                type={showNew ? "text" : "password"}
                value={passwords.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                required
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={passwords.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter new password"
              required
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-black hover:bg-gray-800 text-white w-full md:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                </>
              ) : (
                <>
                  <KeyRound className="mr-2 h-4 w-4" /> Update Password
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
