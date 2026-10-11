-- Run this once in Supabase → SQL Editor to create the inquiries log.
create table if not exists public.inquiries (
  id            bigint generated always as identity primary key,
  created_at    timestamptz not null default now(),
  name          text not null,
  phone         text not null,
  email         text not null,
  qualification text not null,
  course        text not null,
  message       text,
  page          text,
  channel       text not null default 'email',
  status        text not null default 'new'   -- new / contacted / enrolled / closed
);

-- Only the website server (service role key) can write; nothing is public.
alter table public.inquiries enable row level security;

create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
