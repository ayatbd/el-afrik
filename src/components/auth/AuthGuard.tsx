"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/hooks";
import { useRefreshMutation } from "@/redux/features/auth/authApi";
import { logout } from "@/redux/features/auth/authSlice";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [refresh, { isLoading }] = useRefreshMutation();
  const [hasTriedRefresh, setHasTriedRefresh] = useState(false);

  useEffect(() => {
    // 1. If already authenticated, do nothing.
    if (isAuthenticated) return;

    // 2. Prevent running this logic multiple times if we already tried
    if (hasTriedRefresh) return;

    const checkAuth = async () => {
      const persistedRefreshToken =
        typeof window !== "undefined"
          ? localStorage.getItem("refreshToken")
          : null;

      // 3. No token? Redirect immediately
      if (!persistedRefreshToken) {
        router.push("/login");
        return;
      }

      try {
        setHasTriedRefresh(true); // Mark that we are attempting
        // 4. Attempt refresh
        await refresh(persistedRefreshToken).unwrap();
        // If successful, Redux updates automatically, triggering a re-render
      } catch (error) {
        // 5. Failed? Logout and Redirect
        console.error("Session restore failed", error);
        dispatch(logout());
        router.push("/login");
      }
    };

    checkAuth();
  }, [isAuthenticated, hasTriedRefresh, refresh, router, dispatch]);

  // --- RENDERING LOGIC ---

  // A. Happy Path: User is authenticated. Show Dashboard.
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // B. Loading Path: We are currently calling the API or haven't checked yet.
  if (isLoading || !hasTriedRefresh) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading Dashboard...
      </div>
    );
  }

  // C. Error/Redirect Path: We tried, failed, and are waiting for router.push to finish.
  // We return null to render nothing while redirecting.
  return null;
}
