import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TicketCard({
  title,
  subtitle,
  body,
  footer
}: {
  title: string;
  subtitle: string;
  body: string;
  footer: React.ReactNode;
}) {
  return (
    <Card className="ticket-edge overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(255,247,240,0.95))] shadow-ticket">
      <CardHeader>
        <p className="font-display text-xs uppercase tracking-[0.34em] text-muted-foreground">Reserved ticket</p>
        <CardTitle className="font-display text-3xl">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-base leading-7 text-muted-foreground">{body}</p>
        {footer}
      </CardContent>
    </Card>
  );
}

