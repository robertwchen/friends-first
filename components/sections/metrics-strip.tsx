import { stats } from "@/lib/mock-data";

export function MetricsStrip() {
  return (
    <section className="container">
      <div className="grid gap-4 rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-polaroid md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-[1.5rem] bg-background/70 p-4">
            <p className="font-display text-3xl text-primary">{stat.value}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

