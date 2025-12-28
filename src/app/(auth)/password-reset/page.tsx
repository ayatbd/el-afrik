"use client";
import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  return (
    <div
      className={`min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8`}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          {/* Header */}
          <div className="text-start mb-8">
            <h2 className="text-[32px] font-medium text-primary-black">
              Set New Password
            </h2>
            <p className="mt-2 text-[20px] text-[#3E3E3E]">
              A password should be more than 8 characters, including digits,
              letters, and symbols
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6">
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
                  type="password"
                  id="password"
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
            {/* Password */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="password"
              >
                Confirm Password
              </label>

              <div className="mt-1 relative">
                <input
                  type="password"
                  id="password"
                  className="block w-full px-3 py-2 sm:px-4 sm:py-3 border border-[#FFE0A7] rounded-lg focus:ring-2 focus:ring-[#ddbe85] focus:border-[#ddbe85] focus:outline-none"
                  required
                />

                {/* Icons inside button */}
                <button
                  type="button"
                  onClick={() => setShowPassword2(!showPassword2)}
                  className="absolute right-3 top-3 text-gray-400"
                >
                  {showPassword2 ? (
                    <HiOutlineEyeOff size={20} />
                  ) : (
                    <HiOutlineEye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button className="w-full flex justify-center py-2 px-4 sm:py-3 border border-transparent rounded-lg shadow-sm text-[20px]  font-bold text-[#181818] bg-[#FFE0A7] hover:bg-[#e9cc96]focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e9cc96]">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
