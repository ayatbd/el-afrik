"use client";
import { FullScreenLoader } from "@/app/loading";
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { require } from "./../../../../node_modules/next/dist/compiled/webpack/bundle5";

const SendOtp = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [forgotPassword, { isLoading, error }] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword({ email }).unwrap();
      // Store email in sessionStorage to use in the next step
      sessionStorage.setItem("resetEmail", email);
      router.push("/verify-otp");
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return <FullScreenLoader />;
  } else if (error) {
    console.error(error);
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-center">
          An error occurred. Please try again.
        </p>
      </div>
    );
  }
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          {/* Header */}
          <div className="text-start mb-8">
            <h2 className="text-[32px] font-medium text-primary-black">
              Email
            </h2>
            <p className="mt-2 text-[20px] text-[#3E3E3E]">
              Enter your email address to get a verification code for resetting
              your password.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 border border-[#FFE0A7] rounded-lg focus:ring-2 focus:ring-[#ddbe85] focus:border-[#ddbe85] focus:outline-none"
                required
              />
            </div>

            {/* Submit Button */}
            {/* <Link href="/verify-otp"> */}
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 sm:py-3 border border-transparent rounded-lg shadow-sm text-[20px]  font-bold text-[#181818] bg-[#FFE0A7] hover:bg-[#e9cc96]focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e9cc96]"
            >
              {isLoading ? "Sending..." : "Send OTP"}
            </button>
            {/* </Link> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendOtp;
