import Link from "next/link";

export function ApplyCallout() {
  return (
    <section className="container pb-8">
      <div className="rounded-[2.25rem] border border-white/70 bg-[linear-gradient(135deg,#201914,#42261b_55%,#ff6b3d)] p-8 text-white shadow-polaroid md:p-12">
        <p className="font-display text-sm uppercase tracking-[0.28em] text-white/70">Next event</p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl leading-tight md:text-5xl">
          Meet the friend you will sit with next year.
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-white/75">
          Applications stay short. The room stays good. The follow-up stays mutual. That is the whole point.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/apply" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-foreground">
            Start application
          </Link>
          <Link href="/connect" className="rounded-full border border-white/30 px-5 py-3 text-sm font-medium text-white">
            View post-event flow
          </Link>
        </div>
      </div>
    </section>
  );
}

