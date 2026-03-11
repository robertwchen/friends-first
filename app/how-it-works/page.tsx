import { steps } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";

export default function HowItWorksPage() {
  return (
    <div className="container py-16 md:py-24">
      <SectionHeading
        eyebrow="How it works"
        title="A campus social flow with enough structure to make showing up easier."
        description="Friends First uses lightweight logistics, student verification, and a mutual opt-in match flow. No feed. No swiping. Just one unusually good night."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {steps.map((step, index) => (
          <Card key={step.title} className="rounded-[2rem] border-white/60 bg-white/80 shadow-polaroid">
            <CardHeader>
              <p className="font-display text-sm uppercase tracking-[0.3em] text-muted-foreground">
                Step {index + 1}
              </p>
              <CardTitle className="font-display text-2xl">{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-7 text-muted-foreground">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

