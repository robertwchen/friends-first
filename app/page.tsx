import { AdminSnapshot } from "@/components/sections/admin-snapshot";
import { ApplyCallout } from "@/components/sections/apply-callout";
import { EventFlow } from "@/components/sections/event-flow";
import { HeroSection } from "@/components/sections/hero-section";
import { MetricsStrip } from "@/components/sections/metrics-strip";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

export default function HomePage() {
  return (
    <div className="pb-24">
      <HeroSection />
      <MetricsStrip />
      <EventFlow />
      <TestimonialsSection />
      <AdminSnapshot />
      <ApplyCallout />
    </div>
  );
}

