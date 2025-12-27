import styles from "./../auth.module.css";
const AdminPasswordReset = () => {
  return (
    <div
      className={`min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 ${styles.customStyle1}`}
    >
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
          <form className="space-y-6">
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
                id="email"
                className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 border border-[#FFE0A7] rounded-lg focus:ring-2 focus:ring-[#ddbe85] focus:border-[#ddbe85] focus:outline-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 sm:py-3 border border-transparent rounded-lg shadow-sm text-[20px]  font-bold text-[#181818] bg-[#FFE0A7] hover:bg-[#e9cc96]focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e9cc96]"
            >
              <span>Get OTP</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPasswordReset;
