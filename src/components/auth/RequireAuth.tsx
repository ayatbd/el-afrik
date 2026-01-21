"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const { accessToken } = useSelector((state: any) => state.auth);
  const router = useRouter();

  useEffect(() => {
    // If no token, kick them to login
    if (!accessToken) {
      router.push("/login");
    }
  }, [accessToken, router]);

  // Don't render content until we confirm token exists
  if (!accessToken) {
    return null;
  }

  return <>{children}</>;
}
