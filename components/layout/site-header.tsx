import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { navItems } from "@/lib/mock-data";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/40 bg-background/70 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/80 bg-white shadow-polaroid">
            <span className="font-display text-xl">FF</span>
          </div>
          <div>
            <p className="font-display text-lg">Friends First</p>
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Campus social club</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-muted-foreground transition hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/apply" className={buttonVariants({ className: "hidden md:inline-flex" })}>
          Apply now
        </Link>
      </div>
    </header>
  );
}
