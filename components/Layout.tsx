import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function PageWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: HTMLAttributes<HTMLElement>["className"];
}) {
  return (
    <div className={cn("mx-auto max-w-5xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
