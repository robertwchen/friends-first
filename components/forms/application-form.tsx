"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CheckCircle2 } from "lucide-react";
import { ApplicationValues, applicationSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProgressSteps } from "@/components/ui/progress-steps";
import { Textarea } from "@/components/ui/textarea";

const stepFields: Array<Array<keyof ApplicationValues>> = [
  ["firstName", "lastName", "email", "university"],
  ["year", "major", "availability", "instagram"],
  ["vibe", "lookingFor", "paymentHold"]
];

export function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ApplicationValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      university: "",
      year: "",
      major: "",
      vibe: "",
      lookingFor: "",
      availability: "Thursday nights after 7",
      instagram: "",
      paymentHold: false
    }
  });

  const nextStep = async () => {
    const valid = await form.trigger(stepFields[step - 1]);

    if (valid) {
      setStep((current) => Math.min(current + 1, stepFields.length));
    }
  };

  const prevStep = () => setStep((current) => Math.max(current - 1, 1));

  const onSubmit = (values: ApplicationValues) => {
    setSubmitted(true);
    form.reset(values);
  };

  if (submitted) {
    return (
      <Card className="max-w-3xl">
        <CardContent className="p-8">
          <CheckCircle2 className="h-10 w-10 text-primary" />
          <h2 className="mt-5 font-display text-3xl">Application submitted</h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            This MVP keeps submissions client-side for demo purposes. In production, post this payload to a shared backend service or Supabase edge function.
          </p>
          <div className="mt-6 rounded-[1.5rem] bg-background/80 p-5 text-sm text-muted-foreground">
            Expected next step: route the applicant to `/pending`, enqueue a selection review, and create a Stripe setup or reservation hold.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl">
      <CardContent className="space-y-8 p-6 md:p-8">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="font-display text-2xl">Step {step} of 3</p>
            <p className="text-sm text-muted-foreground">Low pressure, still selective.</p>
          </div>
          <ProgressSteps current={step} total={3} />
        </div>

        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          {step === 1 ? (
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="First name" error={form.formState.errors.firstName?.message}>
                <Input {...form.register("firstName")} placeholder="Maya" />
              </Field>
              <Field label="Last name" error={form.formState.errors.lastName?.message}>
                <Input {...form.register("lastName")} placeholder="Johnson" />
              </Field>
              <Field label="Student email" error={form.formState.errors.email?.message}>
                <Input {...form.register("email")} placeholder="maya@university.edu" />
              </Field>
              <Field label="University" error={form.formState.errors.university?.message}>
                <Input {...form.register("university")} placeholder="Columbia University" />
              </Field>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Year" error={form.formState.errors.year?.message}>
                <Input {...form.register("year")} placeholder="Sophomore" />
              </Field>
              <Field label="Major" error={form.formState.errors.major?.message}>
                <Input {...form.register("major")} placeholder="Political Science" />
              </Field>
              <Field label="Availability" error={form.formState.errors.availability?.message}>
                <Input {...form.register("availability")} />
              </Field>
              <Field label="Instagram (optional)" error={form.formState.errors.instagram?.message}>
                <Input {...form.register("instagram")} placeholder="@specificbutfriendly" />
              </Field>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="space-y-5">
              <Field label="Describe your vibe" error={form.formState.errors.vibe?.message}>
                <Textarea
                  {...form.register("vibe")}
                  placeholder="Funny but reserved. Wants a social night that does not feel like networking with LED lighting."
                />
              </Field>
              <Field label="What are you looking for?" error={form.formState.errors.lookingFor?.message}>
                <Textarea
                  {...form.register("lookingFor")}
                  placeholder="Meet the friend I text before lecture, a possible roommate, or someone to start an art club with."
                />
              </Field>
              <label className="flex items-start gap-3 rounded-[1.5rem] border border-white/70 bg-background/70 p-4 text-sm">
                <input type="checkbox" className="mt-1 h-4 w-4" {...form.register("paymentHold")} />
                <span>
                  I understand this MVP uses a Stripe placeholder for reserving a ticket and that no capture logic is finalized yet.
                  {form.formState.errors.paymentHold?.message ? (
                    <span className="mt-1 block text-primary">{form.formState.errors.paymentHold.message}</span>
                  ) : null}
                </span>
              </label>
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={prevStep}>
                Back
              </Button>
            ) : null}
            {step < 3 ? (
              <Button type="button" onClick={nextStep}>
                Continue
              </Button>
            ) : (
              <Button type="submit">Submit application</Button>
            )}
          </div>
        </form>
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

