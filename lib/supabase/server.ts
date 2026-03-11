import { createClient } from "@supabase/supabase-js";
import { hasSupabaseServerEnv } from "@/lib/env";

export function createServerSupabaseClient() {
  if (!hasSupabaseServerEnv()) {
    throw new Error("Missing Supabase server environment variables.");
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
