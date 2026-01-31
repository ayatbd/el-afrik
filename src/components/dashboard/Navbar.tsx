"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bell, LogOut, User } from "lucide-react";
import { useGetProfileQuery } from "@/redux/api/profileApi";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/features/auth/authSlice";

export default function Navbar() {
  const { data: response, isLoading } = useGetProfileQuery(undefined);
  const user = response?.data || {};

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
    <header className="z-50 bg-[#081028] sticky top-0 h-24 flex items-center px-6 md:px-10 shadow-lg">
      {/* 1. Left Side: Branding / Logo (Optional Placeholder) */}
      <div className="flex-1">
        <h1 className="text-white font-bold text-xl tracking-wide">
          ADMIN<span className="text-orange-500">DASH</span>
        </h1>
      </div>

      {/* 2. Right Side: Actions */}
      <div className="flex items-center gap-4">
        {/* Notification Icon */}
        <Link href="/notifications">
          <Button className=" text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer">
            <Bell className="h-14 w-14" />
          </Button>
        </Link>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-10 w-10 cursor-pointer border-2 border-transparent hover:border-gray-400 transition-all">
              <AvatarImage
                src={user?.image || "https://github.com/shadcn.png"}
                alt="@shadcn"
              />
              <AvatarFallback className="bg-orange-600 text-white font-semibold">
                AD
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56 mt-2">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Admin</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {isLoading ? "Loading..." : user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <Link href="/profile">
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
            </Link>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
