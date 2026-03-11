export type StatusTone = "warm" | "sky" | "gold";

export interface EventRecord {
  id: string;
  name: string;
  campus: string;
  date: string;
  venue: string;
  capacity: number;
  confirmed: number;
}

export interface TestimonialRecord {
  id: string;
  quote: string;
  name: string;
  context: string;
  tone: StatusTone;
}

export interface ApplicationSummary {
  id: string;
  name: string;
  year: string;
  major: string;
  status: "pending" | "selected" | "waitlist";
  energy: string;
}

export interface MatchQueueItem {
  id: string;
  attendee: string;
  connectedWith: string;
  mutual: boolean;
  consentCaptured: boolean;
}

