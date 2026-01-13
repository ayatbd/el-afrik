"use client";
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";

export default function Navbar() {
  // logout by using redux
  const dispatch = useAppDispatch();
  return (
    <header className="z-50 bg-[#081028] sticky top-0 min-h-25!">
      <div className="flex items-center justify-between p-4">
        <div></div>
        <button
          onClick={() => dispatch(logout())}
          type="button"
          className="px-6 py-2.5 cursor-pointer text-white text-sm tracking-wider font-medium border-0 outline-0 bg-indigo-700 hover:bg-indigo-800"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
