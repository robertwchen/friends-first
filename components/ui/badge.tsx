import { cn } from "@/lib/utils";

export function Badge({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}

