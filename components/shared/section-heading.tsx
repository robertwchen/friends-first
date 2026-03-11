import { Badge } from "@/components/ui/badge";

export function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl space-y-4">
      <Badge>{eyebrow}</Badge>
      <h1 className="font-display text-4xl leading-tight md:text-6xl">{title}</h1>
      <p className="text-lg leading-8 text-muted-foreground">{description}</p>
    </div>
  );
}

