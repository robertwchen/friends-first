import { NextResponse } from "next/server";
import { hasSupabaseServerEnv } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { applicationSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = applicationSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        status: "error",
        message: "Application payload is invalid.",
        issues: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  if (!hasSupabaseServerEnv()) {
    return NextResponse.json({
      status: "mock",
      message: "Supabase environment variables are missing. Submission path is wired but not live."
    });
  }

  try {
    const supabase = createServerSupabaseClient();
    const values = parsed.data;
    const email = values.email.trim().toLowerCase();
    const fullName = `${values.firstName.trim()} ${values.lastName.trim()}`;

    let userId: string;

    const { data: existingUser, error: existingUserError } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existingUserError) {
      throw existingUserError;
    }

    if (existingUser) {
      userId = existingUser.id;
    } else {
      const { data: insertedUser, error: userInsertError } = await supabase
        .from("users")
        .insert({
          email,
          role: "student"
        })
        .select("id")
        .single();

      if (userInsertError) {
        throw userInsertError;
      }

      userId = insertedUser.id;
    }

    const { data: existingProfile, error: existingProfileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle();

    if (existingProfileError) {
      throw existingProfileError;
    }

    if (existingProfile) {
      const { error: profileUpdateError } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          university: values.university,
          year: values.year,
          major: values.major,
          instagram: values.instagram?.trim() || null,
          bio: values.vibe
        })
        .eq("id", existingProfile.id);

      if (profileUpdateError) {
        throw profileUpdateError;
      }
    } else {
      const { error: profileInsertError } = await supabase.from("profiles").insert({
        user_id: userId,
        full_name: fullName,
        university: values.university,
        year: values.year,
        major: values.major,
        instagram: values.instagram?.trim() || null,
        bio: values.vibe
      });

      if (profileInsertError) {
        throw profileInsertError;
      }
    }

    const { data: openEvent, error: eventError } = await supabase
      .from("events")
      .select("id, name")
      .eq("status", "open")
      .order("application_deadline", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (eventError) {
      throw eventError;
    }

    if (!openEvent) {
      return NextResponse.json(
        {
          status: "error",
          message: "No open event is configured in Supabase yet."
        },
        { status: 409 }
      );
    }

    const { data: existingApplication, error: existingApplicationError } = await supabase
      .from("applications")
      .select("id")
      .eq("user_id", userId)
      .eq("event_id", openEvent.id)
      .maybeSingle();

    if (existingApplicationError) {
      throw existingApplicationError;
    }

    if (existingApplication) {
      return NextResponse.json(
        {
          status: "duplicate",
          message: `An application for ${openEvent.name} already exists for this email.`
        },
        { status: 409 }
      );
    }

    const { data: application, error: applicationError } = await supabase
      .from("applications")
      .insert({
        user_id: userId,
        event_id: openEvent.id,
        vibe: values.vibe,
        looking_for: values.lookingFor,
        availability: values.availability,
        status: "pending"
      })
      .select("id")
      .single();

    if (applicationError) {
      throw applicationError;
    }

    return NextResponse.json({
      status: "saved",
      applicationId: application.id,
      eventName: openEvent.name,
      message: "Application saved to Supabase."
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to save application."
      },
      { status: 500 }
    );
  }
}

