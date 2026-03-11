import { NextResponse } from "next/server";
import { hasSupabaseServerEnv } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { connectionSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = connectionSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        status: "error",
        message: "Connection payload is invalid.",
        issues: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  if (!hasSupabaseServerEnv()) {
    return NextResponse.json({
      status: "mock",
      message: "Supabase environment variables are missing. Connection flow is wired but not live."
    });
  }

  try {
    const supabase = createServerSupabaseClient();
    const values = parsed.data;

    const { data: event, error: eventError } = await supabase
      .from("events")
      .select("id, name")
      .eq("name", values.eventName)
      .maybeSingle();

    if (eventError) {
      throw eventError;
    }

    if (!event) {
      return NextResponse.json(
        {
          status: "error",
          message: `Event "${values.eventName}" was not found in Supabase.`
        },
        { status: 404 }
      );
    }

    const { data: attendeeProfile, error: attendeeError } = await supabase
      .from("profiles")
      .select("id")
      .eq("full_name", values.attendeeName)
      .maybeSingle();

    if (attendeeError) {
      throw attendeeError;
    }

    if (!attendeeProfile) {
      return NextResponse.json(
        {
          status: "error",
          message: `Attendee "${values.attendeeName}" was not found in Supabase profiles.`
        },
        { status: 404 }
      );
    }

    const { error: consentError } = await supabase.from("contactConsent").upsert(
      {
        profile_id: attendeeProfile.id,
        event_id: event.id,
        consent_to_share: values.consentToShare,
        preferred_contact: values.attendeeName
      },
      {
        onConflict: "profile_id,event_id"
      }
    );

    if (consentError) {
      throw consentError;
    }

    const { data: newSubmission, error: submissionError } = await supabase
      .from("connectionSubmissions")
      .insert({
        event_id: event.id,
        submitted_by_profile_id: attendeeProfile.id,
        connected_profile_name: values.connectedName,
        note: values.note
      })
      .select("id")
      .single();

    if (submissionError) {
      throw submissionError;
    }

    const { data: reverseSubmission, error: reverseError } = await supabase
      .from("connectionSubmissions")
      .select("id, submitted_by_profile_id")
      .eq("event_id", event.id)
      .eq("connected_profile_name", values.attendeeName)
      .neq("submitted_by_profile_id", attendeeProfile.id);

    if (reverseError) {
      throw reverseError;
    }

    let mutual = false;

    if ((reverseSubmission ?? []).length > 0) {
      const { data: matchingProfile, error: matchingProfileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("full_name", values.connectedName)
        .maybeSingle();

      if (matchingProfileError) {
        throw matchingProfileError;
      }

      const reverse = reverseSubmission.find((submission) => submission.submitted_by_profile_id === matchingProfile?.id);

      if (reverse) {
        mutual = true;

        const { data: existingMatch, error: existingMatchError } = await supabase
          .from("mutualMatches")
          .select("id")
          .eq("event_id", event.id)
          .eq("submission_a_id", reverse.id)
          .eq("submission_b_id", newSubmission.id)
          .maybeSingle();

        if (existingMatchError) {
          throw existingMatchError;
        }

        if (!existingMatch) {
          const { error: matchInsertError } = await supabase.from("mutualMatches").insert({
            event_id: event.id,
            submission_a_id: reverse.id,
            submission_b_id: newSubmission.id,
            match_status: "pending_consent"
          });

          if (matchInsertError) {
            throw matchInsertError;
          }
        }
      }
    }

    return NextResponse.json({
      status: "saved",
      mutual,
      message: mutual
        ? "Connection saved and a mutual match record was created."
        : "Connection saved. Waiting to see if the other student submits you too."
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to save connection."
      },
      { status: 500 }
    );
  }
}
