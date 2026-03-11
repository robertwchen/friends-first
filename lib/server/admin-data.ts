import { adminApplications, events as mockEvents, matchQueue as mockMatchQueue } from "@/lib/mock-data";
import { ApplicationSummary, EventRecord, MatchQueueItem } from "@/lib/types";
import { hasSupabaseServerEnv } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export interface AdminDashboardData {
  source: "supabase" | "mock";
  events: EventRecord[];
  applications: ApplicationSummary[];
  matchQueue: MatchQueueItem[];
}

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  if (!hasSupabaseServerEnv()) {
    return {
      source: "mock",
      events: mockEvents,
      applications: adminApplications,
      matchQueue: mockMatchQueue
    };
  }

  try {
    const supabase = createServerSupabaseClient();

    const [{ data: eventRows, error: eventsError }, { data: ticketRows, error: ticketsError }] = await Promise.all([
      supabase
        .from("events")
        .select("id, name, campus, venue, event_starts_at, capacity")
        .order("event_starts_at", { ascending: true }),
      supabase.from("tickets").select("event_id, ticket_status")
    ]);

    if (eventsError) {
      throw eventsError;
    }

    if (ticketsError) {
      throw ticketsError;
    }

    const confirmedCountByEvent = new Map<string, number>();

    for (const ticket of ticketRows ?? []) {
      if (ticket.ticket_status === "confirmed" || ticket.ticket_status === "checked_in") {
        confirmedCountByEvent.set(ticket.event_id, (confirmedCountByEvent.get(ticket.event_id) ?? 0) + 1);
      }
    }

    const liveEvents: EventRecord[] = (eventRows ?? []).map((event) => ({
      id: event.id,
      name: event.name,
      campus: event.campus,
      date: new Date(event.event_starts_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }),
      venue: event.venue,
      capacity: event.capacity,
      confirmed: confirmedCountByEvent.get(event.id) ?? 0
    }));

    const [{ data: applicationRows, error: applicationsError }, { data: profileRows, error: profilesError }] = await Promise.all([
      supabase
        .from("applications")
        .select("id, user_id, status, vibe, submitted_at")
        .order("submitted_at", { ascending: false })
        .limit(8),
      supabase.from("profiles").select("user_id, full_name, year, major")
    ]);

    if (applicationsError) {
      throw applicationsError;
    }

    if (profilesError) {
      throw profilesError;
    }

    const profilesByUserId = new Map((profileRows ?? []).map((profile) => [profile.user_id, profile]));

    const liveApplications: ApplicationSummary[] = (applicationRows ?? []).map((application) => {
      const profile = profilesByUserId.get(application.user_id);

      return {
        id: application.id,
        name: profile?.full_name ?? "Unknown applicant",
        year: profile?.year ?? "Unknown year",
        major: profile?.major ?? "Unknown major",
        status: application.status as ApplicationSummary["status"],
        energy: application.vibe
      };
    });

    const [
      { data: matchRows, error: matchesError },
      { data: submissionRows, error: submissionsError },
      { data: consentRows, error: consentError }
    ] = await Promise.all([
      supabase.from("mutualMatches").select("id, submission_a_id, submission_b_id, match_status").order("created_at", { ascending: false }).limit(8),
      supabase.from("connectionSubmissions").select("id, submitted_by_profile_id, connected_profile_name").limit(50),
      supabase.from("contactConsent").select("profile_id, consent_to_share").limit(50)
    ]);

    if (matchesError) {
      throw matchesError;
    }

    if (submissionsError) {
      throw submissionsError;
    }

    if (consentError) {
      throw consentError;
    }

    const [{ data: allProfiles, error: allProfilesError }] = await Promise.all([
      supabase.from("profiles").select("id, full_name")
    ]);

    if (allProfilesError) {
      throw allProfilesError;
    }

    const profilesById = new Map((allProfiles ?? []).map((profile) => [profile.id, profile.full_name]));
    const submissionsById = new Map((submissionRows ?? []).map((submission) => [submission.id, submission]));
    const consentByProfileId = new Map((consentRows ?? []).map((consent) => [consent.profile_id, consent.consent_to_share]));

    const liveMatches: MatchQueueItem[] = (matchRows ?? []).map((match) => {
      const submission = submissionsById.get(match.submission_a_id);
      const attendeeName = submission ? profilesById.get(submission.submitted_by_profile_id) : null;

      return {
        id: match.id,
        attendee: attendeeName ?? "Unknown attendee",
        connectedWith: submission?.connected_profile_name ?? "Unknown connection",
        mutual: match.match_status !== "archived",
        consentCaptured: submission ? Boolean(consentByProfileId.get(submission.submitted_by_profile_id)) : false
      };
    });

    return {
      source: "supabase",
      events: liveEvents.length > 0 ? liveEvents : mockEvents,
      applications: liveApplications.length > 0 ? liveApplications : adminApplications,
      matchQueue: liveMatches.length > 0 ? liveMatches : mockMatchQueue
    };
  } catch {
    return {
      source: "mock",
      events: mockEvents,
      applications: adminApplications,
      matchQueue: mockMatchQueue
    };
  }
}

