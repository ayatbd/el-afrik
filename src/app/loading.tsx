"use client";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility, otherwise remove this wrapper

// --- Variant 1: Standard Spinner ---
interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "primary" | "secondary" | "white";
}

export default function loading({
  size = "md",
  variant = "primary",
  className,
  ...props
}: LoaderProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-10 w-10",
    xl: "h-16 w-16",
  };

  const colorClasses = {
    primary: "text-[#00B25D]", // Your Brand Green
    secondary: "text-gray-400",
    white: "text-white",
  };

  return (
    <div
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      <Loader2
        className={cn("animate-spin", sizeClasses[size], colorClasses[variant])}
      />
    </div>
  );
}

// --- Variant 2: Full Screen Loading Overlay ---
// Useful for initial app load or blocking actions
export function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-[2px]">
      <div className="flex flex-col items-center gap-2">
        {/* <loading size="xl" variant="primary" /> */}
        <p className="text-sm font-medium text-gray-500 animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}

// --- Variant 3: Table Skeleton (Optional but great for your tables) ---
export function TableLoader() {
  return (
    <div className="w-full h-64 flex flex-col items-center justify-center gap-3 text-gray-400">
      {/* <loading size="lg" variant="primary" /> */}
      <span className="text-sm">Fetching records...</span>
    </div>
  );
}
