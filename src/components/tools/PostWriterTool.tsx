"use client";

import { useState } from "react";

const postTypes = [
  { id: "story", label: "📖 Story", emoji: "📖" },
  { id: "tips", label: "💡 Tips", emoji: "💡" },
  { id: "opinion", label: "💬 Opinion", emoji: "💬" },
  { id: "question", label: "❓ Question", emoji: "❓" },
  { id: "announcement", label: "🎉 Announcement", emoji: "🎉" },
];

export default function PostWriterTool() {
  const [topic, setTopic] = useState("");
  const [postType, setPostType] = useState("story");
  const [tone, setTone] = useState("professional");
  const [posts, setPosts] = useState<string[]>([]);
  const [writing, setWriting] = useState(false);

  const generatePosts = () => {
    setWriting(true);
    setTimeout(() => {
      const t = topic || "this topic";

      const toneTemplates: Record<string, Record<string, string[]>> = {
        professional: {
          story: [
            `Three years ago, I faced a pivotal challenge: ${t}.

Here's what I learned:

• Lesson 1: Preparation beats talent when stakes are high
• Lesson 2: Asking for help is a strength, not a weakness
• Lesson 3: Small consistent actions compound into big results

The outcome? A clearer sense of direction and a stronger professional network.

What's your experience with ${t}?`,
            `A career-defining moment around ${t} changed my perspective.

The situation: I assumed I had all the answers.
The challenge: Reality proved otherwise.
The solution: I leaned on mentors and data instead of intuition alone.
The result: A better outcome than I could have achieved solo.

Professionals often overlook the value of external input. Don't make the same mistake.`,
          ],
          tips: [
            `5 evidence-based strategies for ${t}:

1. Define success before you start — clarity drives better decisions
2. Measure leading indicators, not just outcomes
3. Build feedback loops early and iterate often
4. Invest in relationships before you need them
5. Document what works so you can repeat it

Which of these do you already apply?`,
            `${t} doesn't have to be complicated.

Here are the 3 fundamentals that matter most:

→ Consistency: Show up even when results are slow
→ Clarity: Know exactly what you're optimizing for
→ Community: Surround yourself with people further along the path

Master these before adding complexity.`,
          ],
          opinion: [
            `Unpopular opinion about ${t}: most people are solving the wrong problem.

Here's the data behind my thinking:

• The top performers I've studied focus on fundamentals, not trends
• Short-term thinking drives most of the bad decisions in this space
• The counter-intuitive move usually outperforms the obvious one

Am I wrong? I'd genuinely like to know.`,
          ],
          question: [
            `Quick question for my network:

When it comes to ${t}, what's the one thing you wish someone had told you earlier?

Drop your answer below — I'm compiling insights for a post next week.`,
          ],
          announcement: [
            `I'm thrilled to announce a new development around ${t}.

After months of focused effort, we've reached a meaningful milestone.

Key highlights:
• The problem we set out to solve is now addressable at scale
• Our team executed with precision under significant constraints
• Early results exceed the targets we set at the outset

Thank you to everyone who supported this journey.`,
          ],
        },
        casual: {
          story: [
            `Real talk about ${t} — I didn't see this coming.

I thought I had it figured out. Spoiler: I did not.

Here's what actually happened:
[The situation unfolded in a way I didn't expect]

Honestly? I was frustrated at first. But then something clicked.

Turns out the lesson was hiding in the mess the whole time. 😅

Anyone else been through something similar?`,
            `You won't believe what happened with ${t} recently.

Long story short — I tried the "obvious" approach. It flopped.

Then I tried something completely different on a whim.

It worked. Way better than expected.

Bottom line: don't be afraid to experiment, even when it feels weird.

Share this if it resonates! 👇`,
          ],
          tips: [
            `Okay, ${t} doesn't have to be this hard. Here's what actually works:

✅ Keep it simple — complexity is usually procrastination in disguise
✅ Talk to people who've done it before
✅ Set small targets you'll actually hit
✅ Review what's working every week (seriously, do this)
✅ Celebrate small wins — momentum is real

Save this for later! 🔖`,
            `Hot take: most advice about ${t} is overcomplicated.

Here's what I actually do:

1️⃣ Pick one thing and do it well
2️⃣ Get feedback fast and adjust
3️⃣ Repeat until it clicks

That's it. No fancy frameworks needed. 😊`,
          ],
          opinion: [
            `I'll be honest — I used to think the conventional wisdom about ${t} was right. I was wrong.

Here's what changed my mind:

I stopped following the crowd and started paying attention to what actually produced results.

The difference was night and day.

Now I believe the simpler, more direct approach wins almost every time.

What do you think? Agree or disagree? 👇`,
          ],
          question: [
            `Genuine question for my LinkedIn fam 👋

What's your honest take on ${t}?

A) It's overrated and people overcomplicate it
B) It's underrated and more people should pay attention
C) It depends entirely on context
D) Something else entirely

Curious to see the spread! 🤔`,
          ],
          announcement: [
            `SO EXCITED to share this!! 🎉

Big news about ${t}: something I've been working on is finally ready.

This has been a while in the making and I genuinely couldn't have done it without an incredible team and community.

Here's what this means: more value, more impact, and a lot more to come.

Thank you all! 🙏`,
          ],
        },
        bold: {
          story: [
            `Most people approach ${t} completely wrong. I was one of them.

Here's the uncomfortable truth I had to accept:

The "safe" path was costing me more than the risky one.
The "smart" move was actually the lazy one.
The advice everyone gave me was designed for average outcomes.

I stopped listening. The results speak for themselves.

What conventional wisdom have you stopped following?`,
            `I failed at ${t}. Publicly. Painfully.

And it was the best thing that ever happened to my career.

Here's why failure without honesty is worthless:

You have to name exactly what broke down — not a vague "it didn't work out."
You have to own the decision that led there — no blaming circumstances.
You have to change the actual behavior — not just the strategy on paper.

Most people skip step one. That's why they repeat the same mistakes.

What's a failure you've actually learned from?`,
          ],
          tips: [
            `The real rules for winning at ${t} (that nobody says out loud):

1. Speed beats perfection — ship it, fix it, repeat
2. Relationships are the actual leverage — everything else is tactics
3. The people complaining loudest about the industry are the ones not changing it
4. Comfort is the enemy — if it feels safe, it probably isn't moving the needle
5. Your competition isn't who you think it is

Argue with me in the comments.`,
            `Everyone's teaching the wrong lessons about ${t}.

Here's what the top 1% actually do:

→ They ignore best practices when the data says otherwise
→ They make decisions with incomplete information — on purpose
→ They optimize for learning speed, not just results
→ They have opinions and defend them

Stop waiting for permission to have a point of view.`,
          ],
          opinion: [
            `Most people are getting ${t} completely wrong.

Here's the truth nobody wants to say:

The "right" way is often just the comfortable way dressed up as wisdom.
The consensus opinion in any field is usually 3 years behind reality.
The people who disagree loudly are doing you a favor — listen to them.

This isn't popular. But it's accurate.

Challenge me in the comments.`,
          ],
          question: [
            `Genuine question — and I want honest answers, not polished ones:

What's the biggest lie your industry tells itself about ${t}?

I'll go first: [the lie everyone repeats but nobody tests]

Drop your real answer below. The filtered version isn't useful.`,
          ],
          announcement: [
            `We didn't do this the "right" way. We did it the hard way — and it worked.

Today I'm announcing [a major development around ${t}].

What we refused to do:
✗ Follow the standard playbook
✗ Wait until everything was perfect
✗ Ask for permission

What we did instead:
✓ Moved fast and fixed problems in public
✓ Built with the people who'd actually use it
✓ Said no to distractions — constantly

This is just the beginning.`,
          ],
        },
      };

      const activeToneTemplates = toneTemplates[tone] || toneTemplates.professional;
      const selected = activeToneTemplates[postType] || activeToneTemplates.story;
      setPosts(selected);
      setWriting(false);
    }, 1000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Write Your Post</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Post Type</label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {postTypes.map((type) => (
            <button key={type.id} onClick={() => setPostType(type.id)} className={`py-2 px-3 rounded-lg text-sm font-medium ${postType === type.id ? "bg-pink-600 text-white" : "bg-gray-100 text-gray-600"}`}>
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
        <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500" placeholder="e.g., building a startup" />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
        <div className="flex gap-2">
          {["professional", "casual", "bold"].map((t) => (
            <button key={t} onClick={() => setTone(t)} className={`flex-1 py-2 rounded-lg font-medium ${tone === t ? "bg-pink-600 text-white" : "bg-gray-100 text-gray-600"}`}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <button onClick={generatePosts} disabled={writing} className="w-full bg-gradient-to-r from-[#db2777] to-[#ea580c] text-white py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50">
        {writing ? "Writing..." : "Generate Posts"}
      </button>

      {posts.length > 0 && (
        <div className="mt-6 space-y-4">
          <p className="font-semibold text-gray-900">Generated Posts:</p>
          {posts.map((post, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700 whitespace-pre-line text-sm mb-3">{post}</p>
              <button onClick={() => copyToClipboard(post)} className="text-pink-600 text-sm font-medium">Copy</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
