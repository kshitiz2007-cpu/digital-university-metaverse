-- Initial schema foundation. Apply only after configuring a Supabase project.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  role text not null default 'student' check (role in ('student','faculty','admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.campus_buildings (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  route text not null,
  model_url text,
  position jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.books (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  subtitle text,
  description text,
  cover_url text,
  author text,
  subject text,
  language text not null default 'Hindi',
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.book_chapters (
  id uuid primary key default gen_random_uuid(),
  book_id uuid not null references public.books(id) on delete cascade,
  title text not null,
  chapter_order integer not null,
  content jsonb not null default '[]'::jsonb,
  unique (book_id, chapter_order)
);

create table if not exists public.reading_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  book_id uuid not null references public.books(id) on delete cascade,
  chapter_id uuid references public.book_chapters(id) on delete set null,
  current_page integer not null default 1 check (current_page > 0),
  progress_percent numeric(5,2) not null default 0 check (progress_percent between 0 and 100),
  updated_at timestamptz not null default now(),
  unique (user_id, book_id)
);

create table if not exists public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  book_id uuid not null references public.books(id) on delete cascade,
  chapter_id uuid references public.book_chapters(id) on delete set null,
  page_number integer not null check (page_number > 0),
  created_at timestamptz not null default now()
);

create table if not exists public.annotations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  book_id uuid not null references public.books(id) on delete cascade,
  chapter_id uuid references public.book_chapters(id) on delete set null,
  page_number integer,
  selected_text text,
  note text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_book_chapters_book_order on public.book_chapters(book_id, chapter_order);
create index if not exists idx_reading_progress_user on public.reading_progress(user_id);
create index if not exists idx_bookmarks_user_book on public.bookmarks(user_id, book_id);
create index if not exists idx_annotations_user_book on public.annotations(user_id, book_id);

alter table public.profiles enable row level security;
alter table public.reading_progress enable row level security;
alter table public.bookmarks enable row level security;
alter table public.annotations enable row level security;

create policy "Users can read their own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update their own profile" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "Users manage their own reading progress" on public.reading_progress for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage their own bookmarks" on public.bookmarks for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage their own annotations" on public.annotations for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
