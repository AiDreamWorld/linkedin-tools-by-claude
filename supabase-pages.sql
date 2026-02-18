-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/vocjpezmaalmcayucddu/sql
-- This adds the pages table for the Admin Panel → Pages tab

-- 1. Create pages table
create table if not exists pages (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  content text default '',
  status text default 'published' check (status in ('published', 'draft')),
  meta_title text default '',
  meta_description text default '',
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Enable RLS
alter table pages enable row level security;

-- 3. Allow all operations (admin panel - no auth yet)
create policy "Allow all operations on pages" on pages
  for all using (true) with check (true);

-- 4. Seed the 7 core site pages
insert into pages (title, slug, status, meta_title, meta_description, sort_order) values
('Home', '/', 'published', 'LinkForge - Free LinkedIn Tools for Students & Professionals', 'Free LinkedIn tools to boost your career. Profile analyzer, CV generator, post writer, and 45+ more tools. No signup required.', 1),
('All Tools', '/tools', 'published', 'All LinkedIn Tools - Free & Easy to Use', 'Browse 45+ free LinkedIn tools for profile optimization, content creation, job tracking, and career growth.', 2),
('Blog', '/blog', 'published', 'LinkedIn Blog – Tips, Guides & Strategies', 'Expert LinkedIn tips, career strategies, and profile guides to help you grow professionally.', 3),
('FAQ', '/faq', 'published', 'Frequently Asked Questions - LinkForge', 'Find answers to common questions about LinkForge LinkedIn tools, privacy, data, and features.', 4),
('About Us', '/about', 'published', 'About LinkForge - Free LinkedIn Tools Platform', 'Learn about LinkForge, our mission to make LinkedIn tools free and accessible for everyone.', 5),
('Contact', '/contact', 'published', 'Contact LinkForge - Get in Touch', 'Have a question or feedback? Contact the LinkForge team. We are here to help.', 6),
('Privacy Policy', '/privacy', 'published', 'Privacy Policy - LinkForge', 'How LinkForge handles your data. All processing happens locally in your browser. We do not store personal information.', 7),
('Terms of Service', '/terms', 'published', 'Terms of Service - LinkForge', 'Terms and conditions for using LinkForge LinkedIn tools. Free to use, no account required.', 8);
