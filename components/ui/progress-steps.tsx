import { cn } from "@/lib/utils";

export function ProgressSteps({
  current,
  total
}: {
  current: number;
  total: number;
}) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, index) => {
        const active = index + 1 <= current;

        return (
          <span
            key={index}
            className={cn(
              "h-2 flex-1 rounded-full transition",
              active ? "bg-primary" : "bg-white/60"
            )}
          />
        );
      })}
    </div>
  );
}

