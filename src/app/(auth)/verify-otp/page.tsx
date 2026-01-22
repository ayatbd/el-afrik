"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { useVerifyOtpMutation } from "@/redux/features/auth/authApi";

export default function VerifyOtp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const [verifyOtp, { isLoading, error }] = useVerifyOtpMutation();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("resetEmail");
    if (!storedEmail) router.push("/forgot-password");
    else setEmail(storedEmail);
  }, [router]);

  // Handle Input Change (Auto-focus next field)
  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Backspace (Focus previous field)
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length !== 6) return;

    try {
      await verifyOtp({ email, otp: otpCode }).unwrap();
      sessionStorage.setItem("resetOtp", otpCode); // Save valid OTP for next step
      router.push("/reset-password");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Enter OTP</h2>
          <p className="text-gray-500 mt-2 text-sm">
            We sent a 6-digit code to{" "}
            <span className="font-bold text-gray-800">{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-xl font-bold border border-[#FFE0A7] rounded-lg focus:ring-2 focus:ring-[#ddbe85] focus:border-[#ddbe85] focus:outline-none"
                // className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 border border-[#FFE0A7] rounded-lg focus:ring-2 focus:ring-[#ddbe85] focus:border-[#ddbe85] focus:outline-none"
              />
            ))}
          </div>

          {error && (
            <p className="text-center text-red-500 text-sm">
              Invalid or expired OTP
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading || otp.join("").length !== 6}
            className="w-full flex justify-center py-2 px-4 sm:py-3 border border-transparent rounded-lg shadow-sm text-[20px]  font-bold text-[#181818] bg-[#FFE0A7] hover:bg-[#e9cc96]focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e9cc96]"
          >
            {isLoading ? "Verifying..." : "Verify Code"}
          </button>

          <p className="text-center text-sm text-gray-500">
            Didn&apos;t receive the code?
            <button
              type="button"
              className="text-[#ebb44d] font-semibold hover:underline ml-2"
            >
              Resend
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
