"use client";
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";

export default function Navbar() {
  // logout by using redux
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    // 1. Clear Redux + LocalStorage
    dispatch(logout());

    // 2. Redirect to Login
    router.push("/login");
  };
  return (
    <header className="z-50 bg-[#081028] sticky top-0 min-h-25!">
      <div className="flex items-center justify-between">
        <div></div>
        <button
          onClick={handleLogout}
          type="button"
          className="px-6 py-2.5 cursor-pointer text-white text-sm tracking-wider font-medium border-0 outline-0 bg-indigo-700 hover:bg-indigo-800"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
