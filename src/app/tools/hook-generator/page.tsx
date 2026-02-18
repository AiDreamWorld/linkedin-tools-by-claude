import HookGeneratorTool from "@/components/tools/HookGeneratorTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free LinkedIn Hook Generator | Create Engaging Opening Lines",
  description: "Generate attention-grabbing hooks for your LinkedIn posts. Get more engagement and views with proven opening lines that stop the scroll.",
  keywords: "linkedin hook generator, linkedin post opener, engagement tips, viral post, linkedin content strategy, linkedin engagement",
};

export default function HookGeneratorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#ea580c] to-[#7c3aed] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">LinkedIn Hook Generator</h1>
          <p className="text-xl text-orange-100 mb-6">Create engaging hooks that stop the scroll</p>
          <div className="flex items-center justify-center gap-2 text-sm text-orange-200">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Free to use - No signup required
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <HookGeneratorTool />
      </div>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What Makes a Great LinkedIn Hook?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">✅ Do's</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span> Start with a question to engage the reader
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span> Make a bold statement that challenges assumptions
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span> Create curiosity - leave them wanting more
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span> Share a surprising fact or statistic
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span> Address pain points your audience experiences
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span> Use numbers and lists for structure
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span> Start with "What if" or "Imagine"
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">❌ Don'ts</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span> Start with "I" - focus on the reader
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span> Use generic openings like "Today I want to talk about"
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span> Be too long - hooks should be punchy
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span> Give everything away in the hook
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span> Use clickbait that doesn't deliver
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span> Use all caps or excessive punctuation
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span> Start with "I am a" - too boring
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Types of Effective Hooks</h2>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">1. Curiosity Hooks</h3>
            <p className="text-gray-600 text-sm mb-3">Make readers curious to learn more. The best curiosity hooks promise value but don't give everything away.</p>
            <div className="p-3 bg-orange-50 rounded-lg">
              <p className="text-gray-800 text-sm">"Think you know the secret to career success? You might be surprised..."</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">2. Pain Point Hooks</h3>
            <p className="text-gray-600 text-sm mb-3">Address a problem your audience faces. Show them you understand their struggles.</p>
            <div className="p-3 bg-orange-50 rounded-lg">
              <p className="text-gray-800 text-sm">"This one mistake could be costing you thousands in your career..."</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">3. Story Hooks</h3>
            <p className="text-gray-600 text-sm mb-3">Start with a teaser to your personal story. People love stories and will read to find out more.</p>
            <div className="p-3 bg-orange-50 rounded-lg">
              <p className="text-gray-800 text-sm">"5 years ago I made this LinkedIn mistake. Here's what I learned..."</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">4. Numbered List Hooks</h3>
            <p className="text-gray-600 text-sm mb-3">Lists are scannable and promise structured value. They work because readers know what to expect.</p>
            <div className="p-3 bg-orange-50 rounded-lg">
              <p className="text-gray-800 text-sm">"7 lessons about leadership that changed my career..."</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">5. Question Hooks</h3>
            <p className="text-gray-600 text-sm mb-3">Ask a question that makes readers think. Questions naturally pull people into your content.</p>
            <div className="p-3 bg-orange-50 rounded-lg">
              <p className="text-gray-800 text-sm">"What's your take on remote work? Drop your thoughts below 👇"</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">6. Contrarian Hooks</h3>
            <p className="text-gray-600 text-sm mb-3">Challenge conventional wisdom. People love to read opinions that go against the grain.</p>
            <div className="p-3 bg-orange-50 rounded-lg">
              <p className="text-gray-800 text-sm">"Hot take: LinkedIn networking is overrated. Here's why..."</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12 bg-white rounded-2xl mx-4 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Pro Tips for Viral Hooks</h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
              <span className="text-orange-600 font-bold">1</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Keep It Under 210 Characters</h3>
              <p className="text-gray-600 text-sm">Your hook should fit before the "see more" cutoff. Anything after that requires extra effort from readers.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
              <span className="text-orange-600 font-bold">2</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Use Power Words</h3>
              <p className="text-gray-600 text-sm">Words like "secret", "mistake", "truth", "shocking", "powerful" trigger emotional responses.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
              <span className="text-orange-600 font-bold">3</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Test and Iterate</h3>
              <p className="text-gray-600 text-sm">Not every hook will work. Test different styles and see what resonates with your audience.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
              <span className="text-orange-600 font-bold">4</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Match Hook to Content</h3>
              <p className="text-gray-600 text-sm">Your hook must deliver on its promise. Don't clickbait - it will hurt your credibility.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Hook Examples by Category</h2>
        <div className="space-y-4">
          <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
            <p className="font-medium text-gray-900">"Think you know the secret to career success? You might be surprised..."</p>
            <p className="text-sm text-orange-600 mt-1">Creates curiosity - makes readers want to know the secret</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
            <p className="font-medium text-gray-900">"This one mistake could be costing you thousands..."</p>
            <p className="text-sm text-orange-600 mt-1">Addresses pain point - speaks to a problem</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
            <p className="font-medium text-gray-900">"5 years ago I made this LinkedIn mistake. Here's what I learned..."</p>
            <p className="text-sm text-orange-600 mt-1">Personal story teaser - promises lessons learned</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
            <p className="font-medium text-gray-900">"What's your take on remote work? Share below 👇"</p>
            <p className="text-sm text-orange-600 mt-1">Question hook - invites engagement</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
            <p className="font-medium text-gray-900">"The truth about networking that nobody talks about..."</p>
            <p className="text-sm text-orange-600 mt-1">Contrarian hook - challenges conventional wisdom</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">What is a LinkedIn hook?</h3>
            <p className="text-gray-600 text-sm">A hook is the opening line of your LinkedIn post. It's designed to grab attention and make people want to read more. With only 210 characters before "see more", your hook is crucial for engagement.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">How long should a hook be?</h3>
            <p className="text-gray-600 text-sm">Aim for under 210 characters so it displays fully in the feed. The best hooks are usually 20-50 words - punchy and to the point.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">How do I know if my hook is good?</h3>
            <p className="text-gray-600 text-sm">Test different hooks and monitor your engagement rates. Good hooks result in more comments, shares, and saves. Ask yourself: "Would I keep reading this?"</p>
          </div>
        </div>
      </section>
    </div>
  );
}
