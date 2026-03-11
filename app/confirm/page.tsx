import Link from "next/link";
import { CheckCircle2, CreditCard, ShieldCheck } from "lucide-react";
import { TicketCard } from "@/components/shared/ticket-card";
import { Badge } from "@/components/ui/badge";

export default function ConfirmPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <Badge>Selected invite</Badge>
          <h1 className="font-display text-4xl leading-tight md:text-6xl">
            You are in. Confirm within 24 hours.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
            Reserve your seat with a payment method now. Stripe is wired as a placeholder in this MVP, so no charge logic is finalized yet.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.75rem] border border-white/70 bg-white/85 p-5 shadow-polaroid">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <h2 className="mt-4 font-display text-xl">Student-verified</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Bring a valid student ID to check in. Tickets are non-transferable.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-white/70 bg-white/85 p-5 shadow-polaroid">
              <CreditCard className="h-6 w-6 text-primary" />
              <h2 className="mt-4 font-display text-xl">Card on file</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Hold the reservation now, capture later. Fine for demos, replace with PaymentIntents in production.
              </p>
            </div>
          </div>
        </div>

        <TicketCard
          title="Friends First: Spring Mixer"
          subtitle="Thursday, April 16, 7:00 PM"
          body="Reserve your spot, arrive with student ID, and meet the friend you will sit with next year."
          footer={
            <div className="space-y-3">
              <div className="rounded-2xl border border-dashed border-border p-4 text-sm text-muted-foreground">
                Stripe placeholder integration ready for your future checkout endpoint.
              </div>
              <Link
                href="/connect"
                className="inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                Mock confirm ticket
              </Link>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Your hold expires in 23 hours 11 minutes.
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}

