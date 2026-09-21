create table if not exists public.contact_inquiries (
  id bigint generated always as identity primary key,
  reference_id text not null unique,
  client_type text,
  full_name text not null,
  email text not null,
  subject text not null,
  phone text,
  company_name text,
  role text,
  company_size text,
  industry text,
  project_name text,
  project_stage text,
  service_category text,
  timeline text,
  message text not null,
  newsletter_opt_in boolean not null default false,
  submitted_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table public.contact_inquiries enable row level security;

revoke all on public.contact_inquiries from anon, authenticated;
grant insert on public.contact_inquiries to service_role;
