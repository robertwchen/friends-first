import { z } from "zod";

export const applicationSchema = z.object({
  firstName: z.string().min(2, "First name is required."),
  lastName: z.string().min(2, "Last name is required."),
  email: z.string().email("Use a valid student email."),
  university: z.string().min(2, "University is required."),
  year: z.string().min(2, "Choose your year."),
  major: z.string().min(2, "Major is required."),
  vibe: z.string().min(20, "Tell us more about your vibe."),
  lookingFor: z.string().min(20, "Tell us what connection would feel useful."),
  availability: z.string().min(5, "Share your availability."),
  instagram: z.string().optional(),
  paymentHold: z.boolean().refine((value) => value, {
    message: "You need to agree to the payment hold placeholder."
  })
});

export type ApplicationValues = z.infer<typeof applicationSchema>;

export const connectionSchema = z.object({
  attendeeName: z.string().min(2, "Your name is required."),
  connectedName: z.string().min(2, "Their name is required."),
  eventName: z.string().min(2, "Event name is required."),
  consentToShare: z.boolean().refine((value) => value, {
    message: "Consent is required before contact sharing."
  }),
  note: z.string().min(12, "A short note helps your ops team review it.")
});

export type ConnectionValues = z.infer<typeof connectionSchema>;

