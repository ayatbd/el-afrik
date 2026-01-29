"use client";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { toast } from "react-toastify";
const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  // RTK Query hook
  const [login, { isLoading, error }] = useLoginMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("saciyof997@feanzier.com");
  const [password, setPassword] = useState("Rayhan@1234");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // 1. Trigger the mutation
      const result = await login({ email, password }).unwrap();

      // 2. Handle success based on your API structure
      const { accessToken, refreshToken } = result.data;

      // 3. Store in Redux and LocalStorage
      dispatch(setCredentials({ accessToken }));
      localStorage.setItem("refreshToken", refreshToken);

      router.push("/");
    } catch (err) {
      console.error("Failed to login:", err);
      // alert("Login failed");
      toast.error("Login failed");
    }
  };
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          {/* Header */}
          <div className="text-start mb-8 ml-14">
            <h2 className="text-[32px] font-medium text-primary-black">
              Welcome
            </h2>
            <p className="mt-2 text-[20px] text-[#3E3E3E]">
              Please sign in for better experience
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 border border-[#FFE0A7] rounded-lg focus:ring-2 focus:ring-[#ddbe85] focus:border-[#ddbe85] focus:outline-none"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="password"
              >
                Password
              </label>

              <div className="mt-1 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-2 sm:px-4 sm:py-3 border border-[#FFE0A7] rounded-lg focus:ring-2 focus:ring-[#ddbe85] focus:border-[#ddbe85] focus:outline-none"
                  required
                />

                {/* Icons inside button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400"
                >
                  {showPassword ? (
                    <HiOutlineEyeOff size={20} />
                  ) : (
                    <HiOutlineEye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm font-bold text-gray-700"
                >
                  Remember me
                </label>
              </div>

              <Link
                href="/send-otp"
                className="text-[18px] text-[#8C7B5C] hover:text-[#776a52]"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              disabled={isLoading}
              type="submit"
              className="w-full flex justify-center py-2 px-4 sm:py-3 border border-transparent rounded-lg shadow-sm text-[20px]  font-bold text-[#181818] bg-[#FFE0A7] hover:bg-[#ebd3a6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e9cc96] cursor-pointer"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
            {error && (
              <p className="text-red-500 text-center">
                {(error as any)?.data?.message || "Login failed"}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
