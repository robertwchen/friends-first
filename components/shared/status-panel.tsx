import { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function StatusPanel({
  badge,
  title,
  description,
  actions,
  highlights
}: {
  badge: string;
  title: string;
  description: string;
  actions: React.ReactNode;
  highlights: Array<{
    icon: LucideIcon;
    title: string;
    body: string;
  }>;
}) {
  return (
    <div className="rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-polaroid md:p-12">
      <Badge>{badge}</Badge>
      <h1 className="mt-5 font-display text-4xl leading-tight md:text-6xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p>
      <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {highlights.map((highlight) => {
          const Icon = highlight.icon;

          return (
            <div key={highlight.title} className="rounded-[1.5rem] border border-white/70 bg-background/70 p-5">
              <Icon className="h-5 w-5 text-primary" />
              <h2 className="mt-4 font-display text-xl">{highlight.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{highlight.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

