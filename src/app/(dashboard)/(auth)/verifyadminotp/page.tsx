import styles from "./../auth.module.css";
import Link from "next/link";
// import styles from "./../auth.module.css";
const VerifyOTP = () => {
  return (
    <div
      className={`min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 ${styles.customStyle1}`}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          {/* Header */}
          <div className="text-start mb-8">
            <h2 className="text-[32px] font-medium text-primary-black">
              Verify OTP
            </h2>
            <p className="mt-2 text-[20px] text-[#3E3E3E]">
              We have sent you an OTP to your email address.Please check it and
              place the OTP for resetting password
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6">
            {/* Email */}
            {/* <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 border border-[#FFE0A7] rounded-lg focus:ring-2 focus:ring-[#ddbe85] focus:border-[#ddbe85] focus:outline-none"
                required
              />
            </div> */}
            <div className="flex justify-center space-x-4 mb-6">
              <input
                type="text"
                maxLength={1}
                className="w-12 h-16 text-center text-2xl border-2 border-[#FFE0A7] rounded-xl
              focus:outline-none focus:ring-2 focus:ring-[#FFE0A7]
              dark:bg-gray-600 dark:text-white dark:border-blue-400
              transition-transform duration-300 hover:scale-110"
              />

              <input
                type="text"
                maxLength={1}
                className="w-12 h-16 text-center text-2xl border-2 border-[#FFE0A7] rounded-xl
              focus:outline-none focus:ring-2 focus:ring-[#FFE0A7]
              dark:bg-gray-600 dark:text-white dark:border-blue-400
              transition-transform duration-300 hover:scale-110"
              />

              <input
                type="text"
                maxLength={1}
                className="w-12 h-16 text-center text-2xl border-2 border-[#FFE0A7] rounded-xl
              focus:outline-none focus:ring-2 focus:ring-[#FFE0A7]
              dark:bg-gray-600 dark:text-white dark:border-blue-400
              transition-transform duration-300 hover:scale-110"
              />

              <input
                type="text"
                maxLength={1}
                className="w-12 h-16 text-center text-2xl border-2 border-[#FFE0A7] rounded-xl
              focus:outline-none focus:ring-2 focus:ring-[#FFE0A7]
              dark:bg-gray-600 dark:text-white dark:border-blue-400
              transition-transform duration-300 hover:scale-110"
              />

              <input
                type="text"
                maxLength={1}
                className="w-12 h-16 text-center text-2xl border-2 border-[#FFE0A7] rounded-xl
              focus:outline-none focus:ring-2 focus:ring-[#FFE0A7]
              dark:bg-gray-600 dark:text-white dark:border-blue-400
              transition-transform duration-300 hover:scale-110"
              />

              <input
                type="text"
                maxLength={1}
                className="w-12 h-16 text-center text-2xl border-2 border-[#FFE0A7] rounded-xl
              focus:outline-none focus:ring-2 focus:ring-[#FFE0A7]
              dark:bg-gray-600 dark:text-white dark:border-blue-400
              transition-transform duration-300 hover:scale-110"
              />
            </div>
            {/* Remember + Forgot */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div className="flex items-center">
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm font-bold text-[#222222]"
                >
                  Did&apos;t get and OTP?
                </label>
              </div>

              <Link
                href="/adminpassreset"
                className="text-[24px] text-[#8C7B5C] hover:text-[#776a52]"
              >
                Resend
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 sm:py-3 border border-transparent rounded-lg shadow-sm text-[20px]  font-bold text-[#181818] bg-[#FFE0A7] hover:bg-[#e9cc96]focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e9cc96]"
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
