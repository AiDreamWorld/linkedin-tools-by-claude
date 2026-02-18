-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/vocjpezmaalmcayucddu/sql

-- 1. Create blog_posts table
create table if not exists blog_posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  status text default 'draft' check (status in ('published', 'draft', 'scheduled')),
  author text default 'LinkForge Team',
  category text,
  tags text[] default '{}',
  views integer default 0,
  image_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Create faqs table
create table if not exists faqs (
  id uuid default gen_random_uuid() primary key,
  question text not null,
  answer text not null,
  category text default 'General',
  "order" integer default 0,
  status text default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz default now()
);

-- 3. Enable public read access (RLS policies)
alter table blog_posts enable row level security;
alter table faqs enable row level security;

-- Allow anyone to read published posts
create policy "Public can read published posts" on blog_posts
  for select using (status = 'published');

-- Allow anyone to read/write (for admin panel - no auth system yet)
create policy "Allow all operations" on blog_posts
  for all using (true) with check (true);

create policy "Allow all operations on faqs" on faqs
  for all using (true) with check (true);

-- 4. Seed initial blog posts
insert into blog_posts (title, slug, excerpt, content, status, author, category, tags, views) values
(
  '10 Tips for LinkedIn Success in 2025',
  '10-tips-linkedin-2025',
  'Master LinkedIn with these proven strategies to boost your professional presence and get noticed by recruiters.',
  'LinkedIn has become the world''s largest professional network with over 1 billion members. Standing out requires strategy. Here are 10 proven tips to help you succeed on LinkedIn in 2025.

1. Optimize Your Profile Photo
Use a high-quality, professional headshot. Profiles with photos get 21x more views and 36x more messages.

2. Write a Compelling Headline
Don''t just list your job title. Include your value proposition. Example: ''Marketing Manager | Helping B2B SaaS Companies Drive 3x Pipeline Growth''

3. Craft a Powerful About Section
Tell your story. What do you do, who do you help, and what makes you different? Use the first 2 lines wisely — they show before the ''See more'' cutoff.

4. List All Relevant Skills
Add up to 50 skills. Get endorsements from colleagues. Skills help you appear in recruiter searches.

5. Post Consistently
Aim for 3-5 posts per week. Share insights, lessons learned, and industry news. Consistency beats virality.

6. Engage With Others
Comment thoughtfully on posts in your industry. This gets you visibility beyond your immediate network.

7. Use LinkedIn Creator Mode
Turn on Creator Mode to grow your following and access features like LinkedIn Live and newsletters.

8. Personalize Connection Requests
Always add a note when connecting. Mention why you want to connect. It dramatically increases acceptance rates.

9. Ask for Recommendations
Reach out to former managers and colleagues for written recommendations. They add huge credibility to your profile.

10. Track Your Profile Views
Monitor who''s viewing your profile. Reach out to interesting visitors. Use LinkedIn analytics to see what content performs best.',
  'published', 'LinkForge Team', 'Career', array['linkedin','career','tips'], 5423
),
(
  'How to Write the Perfect LinkedIn Headline',
  'perfect-linkedin-headline',
  'Your headline is your first impression. Learn how to craft a compelling headline that gets you discovered by recruiters.',
  'Your LinkedIn headline is one of the most important parts of your profile. It appears next to your name in search results, connection requests, and comments.

Why Your Headline Matters
LinkedIn gives you 220 characters for your headline. Most people waste this space by only listing their current job title. Don''t make that mistake.

The Formula for a Great Headline
A great headline answers three questions:
- What do you do?
- Who do you help?
- What result do you deliver?

Examples of Weak vs Strong Headlines

Weak: ''Software Engineer at Google''
Strong: ''Software Engineer | Building scalable APIs that handle 10M+ requests/day | Open to senior roles''

Weak: ''Marketing Professional''
Strong: ''B2B Marketing Leader | Helping SaaS companies grow from 0 to $10M ARR | Demand Gen & Content Strategy''

Keywords Are Critical
Recruiters search LinkedIn using keywords. Include your top skills and job titles in your headline so you appear in relevant searches.

Update It Regularly
As your career evolves, so should your headline. Review it every 6 months and update it to reflect your current goals.',
  'published', 'LinkForge Team', 'Profile Tips', array['headline','profile','branding'], 3212
),
(
  'Best Times to Post on LinkedIn in 2025',
  'best-times-to-post',
  'Maximize your reach with optimal posting times. Data-backed strategies for better LinkedIn engagement.',
  'Timing your LinkedIn posts correctly can dramatically increase your reach and engagement.

Overall Best Times
Based on LinkedIn engagement data, the best times to post are:
- Tuesday through Thursday: 8am–10am and 12pm–2pm
- Wednesday at 9am–10am is consistently the top performing slot
- Avoid weekends and late evenings for professional content

Why These Times Work
LinkedIn is primarily a professional platform. People check it during work hours — especially in the morning when they start their day and at lunch.

Industry-Specific Timing
- Tech & Startups: Tuesday–Thursday, 9am–11am
- Finance & Banking: Monday–Wednesday, 7am–9am
- Healthcare: Wednesday–Friday, 12pm–2pm
- Education: Tuesday and Wednesday, 10am–12pm

Consistency Beats Perfect Timing
Posting at the ''perfect'' time every day beats posting only when you find the perfect moment. Build a consistent schedule your audience can rely on.',
  'published', 'LinkForge Team', 'Content Strategy', array['timing','engagement','content'], 2156
),
(
  'How to Grow Your LinkedIn Network Fast',
  'grow-linkedin-network',
  'Proven strategies to grow your LinkedIn network meaningfully — without spamming or appearing desperate.',
  'Growing a strong LinkedIn network is one of the most valuable career investments you can make.

Start With People You Know
Begin by connecting with colleagues, classmates, professors, and friends. These warm connections form the foundation of your network.

Personalize Every Request
Always include a personal note with connection requests. Mention how you know them, why you want to connect, or what you admire about their work.

Engage Before You Connect
Comment on someone''s post before sending a connection request. This warms up the relationship and dramatically increases acceptance rates.

Join LinkedIn Groups
Find groups relevant to your industry or interests. Participate in discussions. Group members are much more likely to accept connection requests.

Share Valuable Content
Post consistently. When people find your content valuable, they come to you. Inbound connections are the highest quality.

The 80/20 Rule of Networking
Spend 80% of your networking time giving — sharing insights, making introductions, celebrating others'' wins. Spend only 20% asking for things.',
  'published', 'LinkForge Team', 'Networking', array['connections','networking','growth'], 1876
),
(
  'LinkedIn Profile Photo: The Complete Guide',
  'profile-photo-guide',
  'Make a great first impression with the perfect profile picture. Tips on lighting, background, attire, and expression.',
  'Your LinkedIn profile photo is the first thing people see. Profiles with professional photos receive 21x more profile views and 36x more messages.

The Right Photo Size
LinkedIn recommends a photo between 400x400 and 7680x4320 pixels. Use a square crop.

Lighting Tips
- Natural light is your best friend. Sit facing a window.
- Avoid harsh overhead lighting which creates unflattering shadows.
- Softbox lights work great for indoor photos.

Background Advice
- Simple, uncluttered backgrounds work best.
- A plain wall, blurred office background, or outdoor setting all work.
- Avoid busy backgrounds that distract from your face.

What to Wear
- Dress as you would for a meeting with an important client.
- Solid colors photograph better than busy patterns.

Expression and Posture
- Smile genuinely — it makes you appear approachable and warm.
- Make eye contact with the camera.
- Your face should fill about 60% of the frame.',
  'published', 'LinkForge Team', 'Profile Tips', array['photo','profile','branding'], 1543
),
(
  'Writing LinkedIn Messages That Get Responses',
  'linkedin-messages-that-work',
  'Craft outreach messages that actually get replies and build genuine professional relationships.',
  'LinkedIn messaging is a superpower when done right — and a fast way to get ignored when done wrong.

The #1 Rule: Make It About Them
Most LinkedIn messages fail because they''re entirely about the sender. Flip this. Lead with something genuine about the recipient.

The Perfect Message Structure
1. Personalized opener (mention something specific about them)
2. Brief context (who you are in one sentence)
3. Clear value or reason for reaching out
4. Simple, low-friction call to action

Keep It Short
Your opening message should be under 150 words. People are busy. Respect their time.

Example for networking:
''Hi [Name], I loved your post on [topic] — especially the point about [specific detail]. I''m also working in [field] and trying to solve [similar challenge]. Would love to hear more about your experience if you''re open to a quick chat.''

What to Avoid
- Generic openers like ''I came across your profile''
- Asking for too much too soon
- Long walls of text
- Obviously copy-paste messages',
  'published', 'LinkForge Team', 'Outreach', array['messages','outreach','networking'], 1234
);

-- 5. Seed initial FAQs
insert into faqs (question, answer, category, "order", status) values
('Are these tools really free?', 'Yes! All LinkedIn tools on LinkForge are 100% free for students and professionals. No hidden fees, no subscriptions, no credit card required — ever.', 'General', 1, 'active'),
('Do I need to create an account?', 'No account required! All tools work instantly in your browser without any sign-up. Just visit the tool page and start using it right away.', 'General', 2, 'active'),
('How do I use the CV Generator?', 'Simply fill in your personal details, work experience, education, and skills in the CV Generator. Choose a template, preview your CV, and download it as a PDF.', 'Tools', 3, 'active'),
('Can I export my job application data?', 'Yes! The Job Tracker tool has a built-in CSV export feature. Click the Export CSV button to download all your tracked applications.', 'Features', 4, 'active'),
('Is my data secure and private?', 'Absolutely. We don''t store your personal data on any server. All processing happens locally in your browser using localStorage. Your information never leaves your device.', 'Privacy', 5, 'active'),
('Why is my data gone after clearing my browser?', 'LinkForge saves data in your browser''s localStorage, which is cleared when you clear your browser history. Use the export feature in tools like Job Tracker before clearing.', 'Privacy', 6, 'active'),
('How do I track my job applications?', 'Use our Job Tracker tool to add every position you apply for. Track status (Applied, Interview, Offer, Rejected), add notes, and see your job search progress at a glance.', 'Tools', 7, 'active'),
('Can I use these tools on mobile?', 'Yes! LinkForge is fully responsive and works on mobile browsers. However, some tools like the CV Generator and Banner Maker are best experienced on a desktop.', 'General', 8, 'active'),
('How do I download my LinkedIn banner?', 'In the Banner Maker tool, customize your banner, then click ''Download Banner as PNG''. The banner will be downloaded as a high-resolution PNG file.', 'Tools', 9, 'active'),
('Are the generated posts ready to use on LinkedIn?', 'The generated content is a great starting point! We recommend personalizing the output with your own voice and specific experiences before posting.', 'Features', 10, 'active');
