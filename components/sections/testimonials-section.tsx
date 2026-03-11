import { testimonials } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";

const toneMap = {
  warm: "bg-[#fff1e6]",
  sky: "bg-[#e8f7fb]",
  gold: "bg-[#fff5cc]"
};

export function TestimonialsSection() {
  return (
    <section className="container py-16 md:py-24">
      <div className="max-w-2xl">
        <p className="font-display text-sm uppercase tracking-[0.28em] text-muted-foreground">Testimonials</p>
        <h2 className="mt-3 font-display text-4xl md:text-5xl">Proof that campus friendship can feel curated without feeling cringe.</h2>
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className={toneMap[testimonial.tone]}>
            <CardContent className="p-6">
              <p className="font-display text-2xl leading-9">“{testimonial.quote}”</p>
              <div className="mt-6 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">{testimonial.name}</p>
                <p>{testimonial.context}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

