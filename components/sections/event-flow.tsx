import Link from "next/link";
import { CalendarHeart, IdCard, ShieldEllipsis, UsersRound } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const pillars = [
  {
    icon: CalendarHeart,
    title: "Structured nights",
    description: "One event, one room, one clear social contract: show up curious, not performative."
  },
  {
    icon: ShieldEllipsis,
    title: "Low pressure",
    description: "Applications reduce chaos. Mutual submissions remove the need for awkward cold follow-up."
  },
  {
    icon: IdCard,
    title: "Student verified",
    description: "Ticket confirmation and on-site check-in make the guest list feel safe and accountable."
  },
  {
    icon: UsersRound,
    title: "Portable backend",
    description: "Next.js for web now, Supabase/Postgres for shared data later, Expo-friendly architecture next."
  }
];

export function EventFlow() {
  return (
    <section className="container py-16 md:py-24">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="font-display text-sm uppercase tracking-[0.28em] text-muted-foreground">Event architecture</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Partiful meets Hinge meets a very opinionated campus host.</h2>
        </div>
        <Link href="/how-it-works" className="text-sm font-medium text-primary">
          Read the full flow
        </Link>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;

          return (
            <Card key={pillar.title} className="min-h-[220px]">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary">
                  <Icon className="h-5 w-5 text-foreground" />
                </div>
                <CardTitle className="font-display text-2xl">{pillar.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-7 text-muted-foreground">{pillar.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

