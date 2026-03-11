import Link from "next/link";
import { Clock3, MailCheck } from "lucide-react";
import { StatusPanel } from "@/components/shared/status-panel";

export default function PendingPage() {
  return (
    <div className="container py-16 md:py-24">
      <StatusPanel
        badge="Pending review"
        title="Your application is in the very tasteful pile."
        description="Selections are sent in batches. If you are picked, you will receive a 24-hour invitation window to confirm your seat."
        actions={
          <>
            <Link
              href="/how-it-works"
              className="rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              See the event flow
            </Link>
            <Link
              href="/"
              className="rounded-full border border-border bg-white px-5 py-3 text-sm font-medium text-foreground transition hover:border-primary"
            >
              Back to landing
            </Link>
          </>
        }
        highlights={[
          {
            icon: Clock3,
            title: "Selection batches",
            body: "Review is manual so the room stays balanced across year, vibe, and availability."
          },
          {
            icon: MailCheck,
            title: "24-hour confirmation",
            body: "Selected students get one reminder and one simple confirm action before the seat is released."
          }
        ]}
      />
    </div>
  );
}

