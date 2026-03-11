import Link from "next/link";
import { adminApplications, matchQueue } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AdminSnapshot() {
  return (
    <section className="container py-16 md:py-24">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="bg-[#201914] text-white">
          <CardHeader>
            <Badge className="border-white/20 bg-white/10 text-white">Admin snapshot</Badge>
            <CardTitle className="font-display text-4xl">Mutual match ops, minus the spreadsheet dread.</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-white/75">
            <p>
              Review applications, mark student ID check-ins, inspect post-event submissions, and only share contact info after mutual consent.
            </p>
            <Link href="/admin" className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-medium text-foreground">
              Open admin dashboard
            </Link>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-2xl">Applications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {adminApplications.map((application) => (
                <div key={application.id} className="rounded-2xl bg-background/70 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium">{application.name}</p>
                    <span className="text-xs uppercase tracking-[0.24em] text-muted-foreground">{application.status}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {application.year} • {application.major}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-display text-2xl">Match queue</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {matchQueue.map((match) => (
                <div key={match.id} className="rounded-2xl bg-background/70 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium">{match.attendee}</p>
                    <span className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      {match.mutual ? "Mutual" : "Pending"}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">Submitted: {match.connectedWith}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

