import { ConnectionForm } from "@/components/forms/connection-form";
import { SectionHeading } from "@/components/shared/section-heading";

export default function ConnectPage() {
  return (
    <div className="container py-16 md:py-24">
      <SectionHeading
        eyebrow="After the event"
        title="No app. No algorithm. Just real interaction."
        description="Submit the name of someone you connected with. If it is mutual, Friends First shares contact info only after both students opt in."
      />
      <div className="mt-10">
        <ConnectionForm />
      </div>
    </div>
  );
}

