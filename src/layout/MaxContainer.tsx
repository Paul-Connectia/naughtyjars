import React from "react";
import { cn } from "@/lib/utils";

type MaxContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function MaxContainer({
  children,
  className,
}: MaxContainerProps) {
  return (
    <div className={cn("mx-auto max-w-[1800px]", className)}>{children}</div>
  );
}
