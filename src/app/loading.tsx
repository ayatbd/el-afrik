"use client";

import { Loader2 } from "lucide-react";

const Loading = ({ text = "Loading..." }: { text?: string }) => {
  return (
    <div className="flex items-center justify-center gap-2 py-6 text-muted-foreground">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span className="text-sm">{text}</span>
    </div>
  );
};

export default Loading;
