import { AdminDashboardData } from "@/lib/server/admin-data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AdminDashboard({ source, events, applications, matchQueue }: AdminDashboardData) {
  return (
    <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <Card className="bg-[#201914] text-white">
        <CardHeader>
          <Badge className="border-white/20 bg-white/10 text-white">
            {source === "supabase" ? "Supabase live data" : "Mock auth + mock data"}
          </Badge>
          <CardTitle className="font-display text-3xl">Ops checklist</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-white/75">
          <p>1. Review applications and mark selection batches.</p>
          <p>2. Confirm ticket holds and expiry windows.</p>
          <p>3. Verify student IDs at check-in.</p>
          <p>4. Review post-event submissions and release mutual matches.</p>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        <div className="grid gap-6 md:grid-cols-3">
          {events.map((event) => (
            <Card key={event.id}>
              <CardHeader>
                <CardTitle className="font-display text-2xl">{event.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>{event.campus}</p>
                <p>{event.date}</p>
                <p>
                  {event.confirmed}/{event.capacity} confirmed
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-2xl">Application queue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {applications.map((application) => (
              <div key={application.id} className="flex flex-col gap-2 rounded-[1.5rem] bg-background/80 p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-medium">{application.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {application.year} • {application.major}
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">{application.energy}</div>
                <Badge>{application.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-2xl">Mutual match review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {matchQueue.map((match) => (
              <div key={match.id} className="flex flex-col gap-3 rounded-[1.5rem] bg-background/80 p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-medium">
                    {match.attendee} → {match.connectedWith}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Consent: {match.consentCaptured ? "captured" : "missing"} • Status: {match.mutual ? "mutual" : "awaiting second submission"}
                  </p>
                </div>
                <Badge>{match.mutual ? "Ready to release" : "Hold"}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
