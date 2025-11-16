-- Create profiles table
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text not null,
  description text,
  logo_url text,
  profile_image_url text,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Create programming languages table
create table if not exists public.programming_languages (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  icon_url text,
  created_at timestamp default now()
);

-- Create projects table
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  image_url text,
  link text,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Create edits table (top edits/videos)
create table if not exists public.edits (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  thumbnail_url text,
  video_url text,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Create admin settings table (for password)
create table if not exists public.admin_settings (
  id uuid primary key default gen_random_uuid(),
  admin_password_hash text not null,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.programming_languages enable row level security;
alter table public.projects enable row level security;
alter table public.edits enable row level security;
alter table public.admin_settings enable row level security;

-- Allow public read access for profiles, languages, projects, edits
create policy "profiles_select_public" on public.profiles for select to authenticated using (true);
create policy "profiles_select_anon" on public.profiles for select to anon using (true);

create policy "languages_select_public" on public.programming_languages for select to authenticated using (true);
create policy "languages_select_anon" on public.programming_languages for select to anon using (true);

create policy "projects_select_public" on public.projects for select to authenticated using (true);
create policy "projects_select_anon" on public.projects for select to anon using (true);

create policy "edits_select_public" on public.edits for select to authenticated using (true);
create policy "edits_select_anon" on public.edits for select to anon using (true);

-- Allow admin operations (authenticated users)
create policy "profiles_update_admin" on public.profiles for update to authenticated using (true);
create policy "profiles_insert_admin" on public.profiles for insert to authenticated with check (true);
create policy "profiles_delete_admin" on public.profiles for delete to authenticated using (true);

create policy "languages_update_admin" on public.programming_languages for update to authenticated using (true);
create policy "languages_insert_admin" on public.programming_languages for insert to authenticated with check (true);
create policy "languages_delete_admin" on public.programming_languages for delete to authenticated using (true);

create policy "projects_update_admin" on public.projects for update to authenticated using (true);
create policy "projects_insert_admin" on public.projects for insert to authenticated with check (true);
create policy "projects_delete_admin" on public.projects for delete to authenticated using (true);

create policy "edits_update_admin" on public.edits for update to authenticated using (true);
create policy "edits_insert_admin" on public.edits for insert to authenticated with check (true);
create policy "edits_delete_admin" on public.edits for delete to authenticated using (true);

-- Admin settings read/write
create policy "admin_settings_select" on public.admin_settings for select to authenticated using (true);
create policy "admin_settings_update" on public.admin_settings for update to authenticated using (true);
create policy "admin_settings_insert" on public.admin_settings for insert to authenticated with check (true);

-- Insert default data
insert into public.profiles (name, title, description, profile_image_url) 
values ('Achmad Maulana', 'Creative Editor & Developer', 'Filmmaker • Programmer • Visual Storyteller. Transforming ideas into stunning visual experiences through code and creative vision', 'https://assets.vercel.com/image/upload/v1700000000/placeholder.jpg')
on conflict do nothing;

insert into public.programming_languages (name, icon_url) 
values 
  ('HTML5', 'https://i.pinimg.com/736x/c5/73/ff/c573ff5552d6da9a1d28ec4e27cd1445.jpg'),
  ('CSS3', 'https://i.pinimg.com/736x/ee/b3/5d/eeb35df1a6739f4cea43ed1cba70bc25.jpg'),
  ('JavaScript', 'https://i.pinimg.com/736x/13/40/7c/13407c12f50f08d328800c3caef43f61.jpg'),
  ('PHP', 'https://i.pinimg.com/736x/2d/3a/7d/2d3a7d7d1ad7adeded994de246f60c43.jpg'),
  ('After Effects', 'https://i.pinimg.com/736x/a8/07/99/a8079928e6223bebcb55490de7e2f3d5.jpg'),
  ('Photoshop', 'https://i.pinimg.com/736x/b4/0a/a2/b40aa285831663c8a4f26f31d244d4fe.jpg'),
  ('Premiere Pro', 'https://i.pinimg.com/736x/cb/65/7b/cb657b42cce6b5d713dfd0b5936aecb5.jpg')
on conflict (name) do nothing;

insert into public.projects (title, description, image_url)
values
  ('Visual Project', 'Creative storytelling through motion', 'https://producedbysoon.com/cdn/shop/files/Screenshot_2025-01-27_at_2.39.22_PM.png?v=1738006774&width=2048'),
  ('Digital Experience', 'Interactive web applications', 'https://producedbysoon.com/cdn/shop/files/Screenshot_2025-01-27_at_2.39.22_PM.png?v=1738006774&width=2048'),
  ('Video Production', 'Cinematic content creation', 'https://producedbysoon.com/cdn/shop/files/Screenshot_2025-01-27_at_2.39.22_PM.png?v=1738006774&width=2048'),
  ('Design System', 'UI/UX Design & Development', 'https://producedbysoon.com/cdn/shop/files/Screenshot_2025-01-27_at_2.39.22_PM.png?v=1738006774&width=2048'),
  ('Animation Project', 'Motion graphics & effects', 'https://producedbysoon.com/cdn/shop/files/Screenshot_2025-01-27_at_2.39.22_PM.png?v=1738006774&width=2048'),
  ('Brand Identity', 'Complete visual branding', 'https://producedbysoon.com/cdn/shop/files/Screenshot_2025-01-27_at_2.39.22_PM.png?v=1738006774&width=2048')
on conflict do nothing;

insert into public.edits (title, description, thumbnail_url)
values
  ('Cinematic Promo', '30-second brand video', 'https://producedbysoon.com/cdn/shop/files/Screenshot_2025-01-27_at_2.39.22_PM.png?v=1738006774&width=2048'),
  ('Motion Graphics', 'Animated infographics', 'https://producedbysoon.com/cdn/shop/files/Screenshot_2025-01-27_at_2.39.22_PM.png?v=1738006774&width=2048'),
  ('Vlog Highlights', 'Social media reel', 'https://producedbysoon.com/cdn/shop/files/Screenshot_2025-01-27_at_2.39.22_PM.png?v=1738006774&width=2048'),
  ('Documentary', 'Full-length edit', 'https://producedbysoon.com/cdn/shop/files/Screenshot_2025-01-27_at_2.39.22_PM.png?v=1738006774&width=2048'),
  ('Music Video', 'Creative audio sync', 'https://producedbysoon.com/cdn/shop/files/Screenshot_2025-01-27_at_2.39.22_PM.png?v=1738006774&width=2048'),
  ('Tutorials', 'Educational content', 'https://producedbysoon.com/cdn/shop/files/Screenshot_2025-01-27_at_2.39.22_PM.png?v=1738006774&width=2048')
on conflict do nothing;

-- Initialize admin settings with a default password (bcrypt hash of "admin123")
insert into public.admin_settings (admin_password_hash)
values ('$2a$10$9qXvN7vZ1jJN8pL0kZ9Z5eK6nJ3jK1hL0pL1pL1pL1pL1pL1pL1pL1')
on conflict do nothing;
