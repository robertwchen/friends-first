import { ApplicationSummary, EventRecord, MatchQueueItem, TestimonialRecord } from "@/lib/types";

export const navItems = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/apply", label: "Apply" },
  { href: "/pending", label: "Waitlist" },
  { href: "/confirm", label: "Confirm Invite" },
  { href: "/connect", label: "Post-Event" },
  { href: "/admin", label: "Admin" }
] as const;

export const stats = [
  { label: "Applications reviewed manually", value: "100%" },
  { label: "Invite window", value: "24 hrs" },
  { label: "Students per room", value: "80-120" },
  { label: "Contact share only after mutual interest", value: "2-way" }
] as const;

export const steps = [
  {
    title: "Apply with enough specificity to be useful",
    description:
      "Students answer a short form about energy, logistics, and what kind of campus connection would actually improve their week."
  },
  {
    title: "Selections are curated, not optimized by a black box",
    description:
      "Friends First reviews applications by hand so the room feels balanced instead of random, overloaded, or painfully same-y."
  },
  {
    title: "Selected students reserve, then verify on arrival",
    description:
      "Invitees confirm within 24 hours, place a card on file, then check in with student ID at the door."
  },
  {
    title: "Mutual match flow happens after the event",
    description:
      "Each attendee submits one person they connected with. If both names match and consent is on file, contact info is shared."
  }
] as const;

export const events: EventRecord[] = [
  {
    id: "evt_spring_mixer",
    name: "Spring Mixer",
    campus: "Columbia University",
    date: "Apr 16, 2026",
    venue: "Faculty House, West Room",
    capacity: 96,
    confirmed: 71
  },
  {
    id: "evt_roommate_night",
    name: "Roommate Night",
    campus: "NYU",
    date: "May 1, 2026",
    venue: "Greenwich Loft",
    capacity: 84,
    confirmed: 48
  }
];

export const testimonials: TestimonialRecord[] = [
  {
    id: "tes_1",
    quote: "It felt weirdly curated in the best way. I met the person I now sit with in lecture.",
    name: "Ari, sophomore",
    context: "Met a future class friend",
    tone: "warm"
  },
  {
    id: "tes_2",
    quote: "Partiful energy, but with actual intention. Nobody was trying to play a character.",
    name: "Mina, first-year",
    context: "Found a club co-founder",
    tone: "sky"
  },
  {
    id: "tes_3",
    quote: "I submitted one name after the event and Friends First handled the awkward part for me.",
    name: "Evan, junior transfer",
    context: "Mutual connection follow-up",
    tone: "gold"
  }
];

export const adminApplications: ApplicationSummary[] = [
  {
    id: "app_101",
    name: "Nina Patel",
    year: "Sophomore",
    major: "Economics",
    status: "selected",
    energy: "Observant, funny, not trying too hard"
  },
  {
    id: "app_102",
    name: "Theo Kim",
    year: "First-year",
    major: "Computer Science",
    status: "pending",
    energy: "Wants more campus people outside his dorm"
  },
  {
    id: "app_103",
    name: "Lena Torres",
    year: "Junior",
    major: "Architecture",
    status: "waitlist",
    energy: "Creative extrovert, roommate-search era"
  }
];

export const matchQueue: MatchQueueItem[] = [
  {
    id: "match_1",
    attendee: "Nina Patel",
    connectedWith: "Ava Brooks",
    mutual: true,
    consentCaptured: true
  },
  {
    id: "match_2",
    attendee: "Theo Kim",
    connectedWith: "Samir Bell",
    mutual: false,
    consentCaptured: false
  },
  {
    id: "match_3",
    attendee: "Maya Johnson",
    connectedWith: "Rachel Lin",
    mutual: true,
    consentCaptured: false
  }
];

