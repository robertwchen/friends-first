import { ApplicationForm } from "@/components/forms/application-form";
import { SectionHeading } from "@/components/shared/section-heading";

export default function ApplyPage() {
  return (
    <div className="container py-16 md:py-24">
      <SectionHeading
        eyebrow="Application"
        title="Find someone just as specific as you."
        description="A short, low-pressure application to help us shape the room: personality, logistics, and the kind of energy you want to walk into."
      />
      <div className="mt-10">
        <ApplicationForm />
      </div>
    </div>
  );
}

