"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, RefreshCw, Check } from "lucide-react";
import {
  useVerifyOtpMutation,
  useForgotPasswordMutation,
} from "@/redux/features/auth/authApi";

export default function VerifyOtp() {
  // --- State & Hooks ---
  const router = useRouter();
  const [email, setEmail] = useState("");

  // OTP Input State
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer State
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  // API Mutations
  const [verifyOtp, { isLoading: isVerifying, error: verifyError }] =
    useVerifyOtpMutation();
  const [resendOtpApi, { isLoading: isResending }] =
    useForgotPasswordMutation();

  // --- Effects ---

  // 1. Load Email from Session
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("resetEmail");
    if (!storedEmail) router.push("/forgot-password");
    else setEmail(storedEmail);
  }, [router]);

  // 2. Countdown Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // --- Handlers ---

  // Handle Input Change
  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Submit OTP
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length !== 6) return;

    try {
      await verifyOtp({ email, otp: otpCode }).unwrap();
      sessionStorage.setItem("resetOtp", otpCode);
      router.push("/password-reset");
    } catch (err) {
      console.error(err);
    }
  };

  // Resend OTP Logic
  const handleResend = async () => {
    if (!canResend || isResending) return;

    try {
      // Reuse the forgotPassword endpoint to trigger a new OTP
      await resendOtpApi({ email }).unwrap();

      // Reset UI states
      setTimer(60);
      setCanResend(false);
      setResendSuccess(true);

      // Clear success message after 3 seconds
      setTimeout(() => setResendSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to resend OTP", err);
    }
  };

  // Format Time (e.g., 0:59)
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Enter Verification Code
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            We sent a 6-digit code to{" "}
            <span className="font-bold text-gray-800">{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* OTP Inputs */}
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-xl font-bold border border-[#FFE0A7] rounded-lg focus:ring-2 focus:ring-[#ddbe85] focus:border-[#ddbe85] focus:outline-none"
              />
            ))}
          </div>

          {/* Error Message */}
          {verifyError && (
            <p className="text-center text-red-500 text-sm bg-red-50 p-2 rounded">
              Invalid or expired OTP. Please try again.
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isVerifying || otp.join("").length !== 6}
            className="w-full py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-[#181818] bg-[#FFE0A7] hover:bg-[#e9cc96] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e9cc96]"
            // className="w-full flex justify-center py-2 px-4 sm:py-3 border border-transparent rounded-lg shadow-sm text-[20px]  font-bold text-[#181818] bg-[#FFE0A7] hover:bg-[#e9cc96]focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e9cc96]"
          >
            {isVerifying ? "Verifying..." : "Verify Code"}
          </button>

          {/* Resend Section */}
          <div className="flex flex-col items-center justify-center space-y-2 pt-2 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Didn&apos;t receive the code?
            </p>

            {resendSuccess ? (
              <div className="flex items-center gap-1 text-green-600 text-sm font-medium animate-pulse">
                <Check size={16} /> Code Sent Successfully!
              </div>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={!canResend || isResending}
                className={`flex items-center gap-2 text-sm font-medium transition ${
                  canResend
                    ? "text-[#e7b963] hover:text-[#e2bb73] hover:underline cursor-pointer"
                    : "text-gray-400 cursor-not-allowed"
                }`}
              >
                {isResending ? (
                  <>Sending...</>
                ) : (
                  <>
                    <RefreshCw
                      size={14}
                      className={canResend ? "" : "animate-spin-slow"}
                    />
                    {canResend
                      ? "Resend Code"
                      : `Resend in ${formatTime(timer)}`}
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
