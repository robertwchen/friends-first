"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { events } from "@/lib/mock-data";

export function HeroSection() {
  const featuredEvent = events[0];

  return (
    <section className="container py-12 md:py-20">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="space-y-6"
        >
          <Badge>Friends first. Student verified.</Badge>
          <h1 className="font-display text-5xl leading-[0.95] md:text-7xl">
            Meet your next roommate.
            <span className="block text-primary">Or at least your next favorite campus person.</span>
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
            Friends First is a structured in-person social event for undergrads who want real connection without pretending to love apps.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/apply" className={buttonVariants({ size: "lg", className: "gap-2" })}>
              Apply for the next event
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/how-it-works" className={buttonVariants({ variant: "outline", size: "lg" })}>
              See how it works
            </Link>
          </div>
          <div className="flex items-center gap-3 rounded-full border border-white/70 bg-white/70 px-4 py-3 text-sm text-muted-foreground shadow-polaroid">
            <Sparkles className="h-4 w-4 text-primary" />
            No app. No algorithm. Just real interaction.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, rotate: -5, scale: 0.96 }}
          animate={{ opacity: 1, rotate: -2, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mx-auto w-full max-w-md rounded-[2rem] border border-white/80 bg-white p-4 shadow-polaroid"
        >
          <div className="rounded-[1.6rem] bg-[linear-gradient(135deg,#ffd0b2,#fff6ef_35%,#d7eff5)] p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-display text-2xl">{featuredEvent.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{featuredEvent.campus}</p>
              </div>
              <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                MVP
              </div>
            </div>
            <div className="mt-10 space-y-4 rounded-[1.5rem] bg-white/80 p-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Date</span>
                <span>{featuredEvent.date}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Venue</span>
                <span>{featuredEvent.venue}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Confirmed</span>
                <span>
                  {featuredEvent.confirmed}/{featuredEvent.capacity}
                </span>
              </div>
            </div>
            <p className="mt-6 font-display text-xl">Meet the friend you will sit with next year.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
