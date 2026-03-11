"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { HeartHandshake } from "lucide-react";
import { ConnectionValues, connectionSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ConnectionForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submissionMode, setSubmissionMode] = useState<"live" | "mock">("mock");
  const [serverMessage, setServerMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<ConnectionValues>({
    resolver: zodResolver(connectionSchema),
    defaultValues: {
      attendeeName: "",
      connectedName: "",
      eventName: "Spring Mixer",
      consentToShare: false,
      note: ""
    }
  });

  const onSubmit = async (values: ConnectionValues) => {
    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/connections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Connection submission failed.");
      }

      setSubmissionMode(data.status === "saved" ? "live" : "mock");
      setServerMessage(data.message ?? "Connection saved.");
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Connection submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="max-w-3xl">
      <CardContent className="p-6 md:p-8">
        {submitted ? (
          <div>
            <HeartHandshake className="h-10 w-10 text-primary" />
            <h2 className="mt-5 font-display text-3xl">Connection submitted</h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              {submissionMode === "live"
                ? "Your connection was saved. If the other person submits you too, Friends First can release contact details after consent review."
                : "This route is wired, but no live Supabase project is configured in the local environment yet."}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">{serverMessage}</p>
          </div>
        ) : (
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Your name" error={form.formState.errors.attendeeName?.message}>
                <Input {...form.register("attendeeName")} placeholder="Nina Patel" />
              </Field>
              <Field label="Who did you connect with?" error={form.formState.errors.connectedName?.message}>
                <Input {...form.register("connectedName")} placeholder="Ava Brooks" />
              </Field>
            </div>
            <Field label="Event" error={form.formState.errors.eventName?.message}>
              <Input {...form.register("eventName")} />
            </Field>
            <Field label="Optional context" error={form.formState.errors.note?.message}>
              <Textarea
                {...form.register("note")}
                placeholder="We talked about studio art, both live off-campus, and wanted an intro if it is mutual."
              />
            </Field>
            <label className="flex items-start gap-3 rounded-[1.5rem] border border-white/70 bg-background/70 p-4 text-sm">
              <input type="checkbox" className="mt-1 h-4 w-4" {...form.register("consentToShare")} />
              <span>
                I consent to Friends First sharing my submitted contact info if the connection is mutual.
                {form.formState.errors.consentToShare?.message ? (
                  <span className="mt-1 block text-primary">{form.formState.errors.consentToShare.message}</span>
                ) : null}
              </span>
            </label>
            {submitError ? <p className="text-sm text-primary">{submitError}</p> : null}
            <Button type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit connection"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}

function Field({
  label,
  error,
  children
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error ? <p className="text-sm text-primary">{error}</p> : null}
    </div>
  );
}
