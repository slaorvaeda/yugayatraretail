create extension if not exists "uuid-ossp";

create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  role text not null check (role in ('admin', 'intern')),
  full_name text not null,
  email text not null unique,
  phone text,
  password_hash text not null,
  status text not null default 'pending',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists intern_profiles (
  intern_id uuid primary key references users(id) on delete cascade,
  batch text,
  resume_url text,
  meet_link text,
  offer_letter_url text,
  completion_certificate_url text,
  activation_status text not null default 'pending' check (activation_status in ('pending', 'active', 'inactive', 'rejected')),
  admin_notes text,
  activated_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists intern_routines (
  id uuid primary key default uuid_generate_v4(),
  intern_id uuid not null references users(id) on delete cascade,
  date date not null,
  title text not null,
  summary text not null,
  status text not null check (status in ('planned', 'in_progress', 'completed', 'blocked')),
  hours_spent numeric(4,2) not null default 0,
  blockers text,
  created_by uuid references users(id),
  created_at timestamptz not null default now()
);

create table if not exists intern_progression (
  id uuid primary key default uuid_generate_v4(),
  intern_id uuid not null references users(id) on delete cascade,
  milestone text not null,
  description text not null,
  progress_percent numeric(5,2) not null,
  target_date date,
  created_by uuid references users(id),
  created_at timestamptz not null default now()
);

create or replace view intern_directory_view as
select
  u.id,
  u.full_name,
  u.email,
  u.phone,
  u.status,
  u.created_at,
  ip.batch,
  ip.resume_url,
  ip.meet_link,
  ip.offer_letter_url,
  ip.completion_certificate_url,
  ip.activation_status,
  ip.admin_notes,
  ip.activated_at
from users u
left join intern_profiles ip on ip.intern_id = u.id
where u.role = 'intern';

create or replace function get_routine_status_counts()
returns table(status text, total bigint)
language sql
as $$
  select status, count(*)::bigint
  from intern_routines
  group by status;
$$;

create index if not exists idx_users_role on users(role);
create index if not exists idx_intern_profiles_activation on intern_profiles(activation_status);
create index if not exists idx_intern_routines_intern on intern_routines(intern_id, date desc);
create index if not exists idx_intern_progression_intern on intern_progression(intern_id, created_at desc);

