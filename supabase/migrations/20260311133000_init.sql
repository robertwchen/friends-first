create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  role text not null default 'student' check (role in ('student', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  full_name text not null,
  university text not null,
  year text not null,
  major text not null,
  instagram text,
  bio text,
  student_verified_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  campus text not null,
  venue text not null,
  event_starts_at timestamptz not null,
  capacity integer not null check (capacity > 0),
  application_deadline timestamptz not null,
  status text not null default 'draft' check (status in ('draft', 'open', 'closed', 'completed')),
  created_at timestamptz not null default now()
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  event_id uuid not null references public.events(id) on delete cascade,
  vibe text not null,
  looking_for text not null,
  availability text not null,
  status text not null default 'pending' check (status in ('pending', 'selected', 'waitlist', 'rejected', 'withdrawn')),
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create table if not exists public.tickets (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  event_id uuid not null references public.events(id) on delete cascade,
  stripe_reservation_id text,
  confirmation_deadline timestamptz,
  confirmed_at timestamptz,
  ticket_status text not null default 'pending' check (ticket_status in ('pending', 'reserved', 'confirmed', 'expired', 'checked_in')),
  created_at timestamptz not null default now()
);

create table if not exists public.checkIns (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references public.tickets(id) on delete cascade,
  checked_in_by uuid references public.users(id),
  checked_in_at timestamptz not null default now(),
  student_id_verified boolean not null default false,
  notes text
);

create table if not exists public.connectionSubmissions (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  submitted_by_profile_id uuid not null references public.profiles(id) on delete cascade,
  connected_profile_name text not null,
  note text,
  submitted_at timestamptz not null default now()
);

create table if not exists public.contactConsent (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  event_id uuid not null references public.events(id) on delete cascade,
  consent_to_share boolean not null default false,
  preferred_contact text,
  created_at timestamptz not null default now(),
  unique (profile_id, event_id)
);

create table if not exists public.mutualMatches (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  submission_a_id uuid not null references public.connectionSubmissions(id) on delete cascade,
  submission_b_id uuid not null references public.connectionSubmissions(id) on delete cascade,
  match_status text not null default 'pending_consent' check (match_status in ('pending_consent', 'ready_to_share', 'shared', 'archived')),
  contact_shared_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  quote text not null,
  context text not null,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.adminNotes (
  id uuid primary key default gen_random_uuid(),
  admin_user_id uuid not null references public.users(id) on delete cascade,
  application_id uuid references public.applications(id) on delete cascade,
  ticket_id uuid references public.tickets(id) on delete cascade,
  note text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_profiles_user_id on public.profiles(user_id);
create index if not exists idx_applications_event_id on public.applications(event_id);
create index if not exists idx_applications_user_id on public.applications(user_id);
create index if not exists idx_tickets_event_id on public.tickets(event_id);
create index if not exists idx_connection_submissions_event_id on public.connectionSubmissions(event_id);
create index if not exists idx_contact_consent_profile_event on public.contactConsent(profile_id, event_id);
create index if not exists idx_mutual_matches_event_id on public.mutualMatches(event_id);

