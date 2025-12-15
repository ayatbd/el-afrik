"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex items-center shrink-0 rounded-full border border-transparent shadow-xs transition-all outline-none",
        "h-7 w-14", // ⬅️ INCREASE SIZE HERE
        "data-[state=checked]:bg-[#00B047] data-[state=unchecked]:bg-input",
        "focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full bg-background transition-transform",
          "h-6 w-6", // ⬅️ THUMB SIZE
          "data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-1"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
