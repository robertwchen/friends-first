insert into public.users (id, email, role) values
  ('00000000-0000-0000-0000-000000000001', 'admin@friendsfirst.club', 'admin'),
  ('00000000-0000-0000-0000-000000000101', 'nina@columbia.edu', 'student'),
  ('00000000-0000-0000-0000-000000000102', 'ava@columbia.edu', 'student'),
  ('00000000-0000-0000-0000-000000000103', 'theo@nyu.edu', 'student')
on conflict (id) do nothing;

insert into public.profiles (id, user_id, full_name, university, year, major, instagram, bio, student_verified_at) values
  ('10000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000101', 'Nina Patel', 'Columbia University', 'Sophomore', 'Economics', '@ninapatel', 'Funny, observant, wants people who actually leave campus.', now()),
  ('10000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000102', 'Ava Brooks', 'Columbia University', 'Junior', 'English', '@avawrites', 'Bookish extrovert with a deep respect for themed events.', now()),
  ('10000000-0000-0000-0000-000000000103', '00000000-0000-0000-0000-000000000103', 'Theo Kim', 'NYU', 'First-year', 'Computer Science', '@theok', 'Trying to meet people outside the CS bubble.', null)
on conflict (id) do nothing;

insert into public.events (id, name, campus, venue, event_starts_at, capacity, application_deadline, status) values
  ('20000000-0000-0000-0000-000000000101', 'Spring Mixer', 'Columbia University', 'Faculty House, West Room', '2026-04-16T19:00:00Z', 96, '2026-04-10T04:00:00Z', 'open'),
  ('20000000-0000-0000-0000-000000000102', 'Roommate Night', 'NYU', 'Greenwich Loft', '2026-05-01T19:30:00Z', 84, '2026-04-23T04:00:00Z', 'draft')
on conflict (id) do nothing;

insert into public.applications (id, user_id, event_id, vibe, looking_for, availability, status, reviewed_at) values
  ('30000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000101', '20000000-0000-0000-0000-000000000101', 'Observant, funny, anti-networking.', 'A future lecture friend or roommate lead.', 'Thursday nights after 7', 'selected', now()),
  ('30000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000102', '20000000-0000-0000-0000-000000000101', 'Warm extrovert who likes doing the hosting.', 'A creative friend group with follow-through.', 'Thursday nights after 7', 'selected', now()),
  ('30000000-0000-0000-0000-000000000103', '00000000-0000-0000-0000-000000000103', '20000000-0000-0000-0000-000000000102', 'Curious, slightly shy, needs an easy entry point.', 'People outside his dorm and major.', 'Fridays after 6', 'pending', null)
on conflict (id) do nothing;

insert into public.tickets (id, application_id, event_id, stripe_reservation_id, confirmation_deadline, confirmed_at, ticket_status) values
  ('40000000-0000-0000-0000-000000000101', '30000000-0000-0000-0000-000000000101', '20000000-0000-0000-0000-000000000101', 'seti_placeholder_nina', '2026-04-11T04:00:00Z', '2026-04-10T14:15:00Z', 'confirmed'),
  ('40000000-0000-0000-0000-000000000102', '30000000-0000-0000-0000-000000000102', '20000000-0000-0000-0000-000000000101', 'seti_placeholder_ava', '2026-04-11T04:00:00Z', '2026-04-10T16:35:00Z', 'checked_in')
on conflict (id) do nothing;

insert into public.checkIns (id, ticket_id, checked_in_by, checked_in_at, student_id_verified, notes) values
  ('50000000-0000-0000-0000-000000000101', '40000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000001', '2026-04-16T18:52:00Z', true, 'Student ID matched roster.')
on conflict (id) do nothing;

insert into public.connectionSubmissions (id, event_id, submitted_by_profile_id, connected_profile_name, note) values
  ('60000000-0000-0000-0000-000000000101', '20000000-0000-0000-0000-000000000101', '10000000-0000-0000-0000-000000000101', 'Ava Brooks', 'Talked about apartment hunting and campus journalism.'),
  ('60000000-0000-0000-0000-000000000102', '20000000-0000-0000-0000-000000000101', '10000000-0000-0000-0000-000000000102', 'Nina Patel', 'Mutual interest in being roommates next year.')
on conflict (id) do nothing;

insert into public.contactConsent (id, profile_id, event_id, consent_to_share, preferred_contact) values
  ('70000000-0000-0000-0000-000000000101', '10000000-0000-0000-0000-000000000101', '20000000-0000-0000-0000-000000000101', true, 'nina@columbia.edu'),
  ('70000000-0000-0000-0000-000000000102', '10000000-0000-0000-0000-000000000102', '20000000-0000-0000-0000-000000000101', true, 'ava@columbia.edu')
on conflict (profile_id, event_id) do nothing;

insert into public.mutualMatches (id, event_id, submission_a_id, submission_b_id, match_status, contact_shared_at) values
  ('80000000-0000-0000-0000-000000000101', '20000000-0000-0000-0000-000000000101', '60000000-0000-0000-0000-000000000101', '60000000-0000-0000-0000-000000000102', 'ready_to_share', null)
on conflict (id) do nothing;

insert into public.testimonials (id, profile_id, quote, context, featured) values
  ('90000000-0000-0000-0000-000000000101', '10000000-0000-0000-0000-000000000101', 'It felt curated without feeling fake.', 'Met a future class friend', true),
  ('90000000-0000-0000-0000-000000000102', '10000000-0000-0000-0000-000000000102', 'Friends First handled the awkward follow-up part for me.', 'Mutual match handoff', true)
on conflict (id) do nothing;

insert into public.adminNotes (id, admin_user_id, application_id, note) values
  ('91000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000101', 'Selected for strong fit and event balance.'),
  ('91000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000103', 'Hold for next batch after transfer-student mix review.')
on conflict (id) do nothing;

