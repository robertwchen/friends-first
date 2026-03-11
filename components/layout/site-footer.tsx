import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/40 bg-white/45">
      <div className="container flex flex-col gap-4 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-foreground">Friends First</p>
          <p>Structured IRL social events for students who are overperforming online.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/how-it-works">How it works</Link>
          <Link href="/admin">Admin</Link>
          <Link href="/apply">Apply</Link>
        </div>
      </div>
    </footer>
  );
}

