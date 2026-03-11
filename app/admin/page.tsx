import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { SectionHeading } from "@/components/shared/section-heading";

export default function AdminPage() {
  return (
    <div className="container py-16 md:py-24">
      <SectionHeading
        eyebrow="Admin"
        title="A simple operations surface for the first event team."
        description="Mock auth is enabled in this MVP. Use this page to review applications, process check-ins, and queue mutual match handoffs."
      />
      <div className="mt-10">
        <AdminDashboard />
      </div>
    </div>
  );
}

