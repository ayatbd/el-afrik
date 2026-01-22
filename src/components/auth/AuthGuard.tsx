"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { accessToken } = useSelector((state: any) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Check Redux State
    if (accessToken) {
      setIsLoading(false);
      return;
    }

    // 2. Fallback: Check LocalStorage manually
    // (Just in case Redux hasn't hydrated yet)
    const storedToken = localStorage.getItem("accessToken");

    if (storedToken) {
      // Token exists, allow access
      setIsLoading(false);
    } else {
      // No token found anywhere -> Redirect
      router.replace("/login");
    }
  }, [accessToken, router]);

  // Show a loading spinner while checking to prevent "Flash of Content"
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // If authenticated, render the protected page
  return <>{children}</>;
}
