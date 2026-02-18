import CharacterCounterTool from "@/components/tools/CharacterCounterTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free LinkedIn Character Counter | Check Post, About, Headline Limits",
  description: "Check character count for LinkedIn posts, about section, headline, and messages. See remaining characters and optimize your content for maximum engagement.",
  keywords: "linkedin character counter, linkedin post length, linkedin about limit, linkedin headline characters, linkedin post optimization, character count tool",
};

export default function CharacterCounterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#0A66C2] to-[#7c3aed] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">LinkedIn Character Counter</h1>
          <p className="text-xl text-blue-100 mb-6">Check character count for your LinkedIn content</p>
          <div className="flex items-center justify-center gap-2 text-sm text-blue-200">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Free to use - No login required
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <CharacterCounterTool />
      </div>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">LinkedIn Character Limits</h2>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Section</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Limit</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">"See More" Cutoff</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-sm text-gray-700">LinkedIn Post</td>
                <td className="px-6 py-4 text-sm text-gray-700">3,000 characters</td>
                <td className="px-6 py-4 text-sm text-gray-700">~210 characters</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-700">About Section</td>
                <td className="px-6 py-4 text-sm text-gray-700">2,600 characters</td>
                <td className="px-6 py-4 text-sm text-gray-700">~200 characters</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-700">Headline</td>
                <td className="px-6 py-4 text-sm text-gray-700">220 characters</td>
                <td className="px-6 py-4 text-sm text-gray-700">Full visible</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-700">Connection Message</td>
                <td className="px-6 py-4 text-sm text-gray-700">300 characters</td>
                <td className="px-6 py-4 text-sm text-gray-700">Full visible</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-700">InMail</td>
                <td className="px-6 py-4 text-sm text-gray-700">1,900 characters</td>
                <td className="px-6 py-4 text-sm text-gray-700">~150 characters</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-700">Summary</td>
                <td className="px-6 py-4 text-sm text-gray-700">2,600 characters</td>
                <td className="px-6 py-4 text-sm text-gray-700">~200 characters</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-700">Company Description</td>
                <td className="px-6 py-4 text-sm text-gray-700">2,000 characters</td>
                <td className="px-6 py-4 text-sm text-gray-700">~150 characters</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Tips for LinkedIn Content</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Hook Matters Most</h3>
            <p className="text-gray-600 text-sm">The first 210 characters appear before "see more" in the feed. Make them engaging to get more clicks. Use this space to hook your reader and make them want to read more.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Use Hashtags Wisely</h3>
            <p className="text-gray-600 text-sm">Add 3-5 relevant hashtags at the end of your post for better discoverability. Don't stuff hashtags - LinkedIn's algorithm may penalize excessive hashtag use.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">About Section Strategy</h3>
            <p className="text-gray-600 text-sm">Your About section has 2,600 characters. Use them wisely! Tell your story, highlight achievements, and include relevant keywords for better search visibility.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Connection Messages</h3>
            <p className="text-gray-600 text-sm">With only 300 characters, make your connection request count. Mention something specific about the person and explain why you want to connect.</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12 bg-white rounded-2xl mx-4 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Optimize Your LinkedIn Posts</h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 font-bold">1</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Write a Strong Opening</h3>
              <p className="text-gray-600 text-sm">Your first 210 characters are crucial. They appear in the feed before "see more." Make them compelling to stop the scroll and encourage clicks.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 font-bold">2</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Use Line Breaks</h3>
              <p className="text-gray-600 text-sm">Long paragraphs get skipped. Use line breaks, bullet points, and spacing to make your content easy to scan and read.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 font-bold">3</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Include a Call to Action</h3>
              <p className="text-gray-600 text-sm">End your posts with a question or CTA. "What's your experience?" or "Share your thoughts below" encourages engagement.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 font-bold">4</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Add Relevant Hashtags</h3>
              <p className="text-gray-600 text-sm">Hashtags help your content get discovered. Use 3-5 relevant hashtags that match your content and industry.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Character Count Matters</h2>
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <div>
                <strong className="text-gray-900">Algorithm Friendly:</strong> Posts within optimal length perform better on LinkedIn's algorithm
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <div>
                <strong className="text-gray-900">Better Engagement:</strong> Shorter, focused posts get more comments and shares
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <div>
                <strong className="text-gray-900">Professional Image:</strong> Properly formatted content looks more professional
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <div>
                <strong className="text-gray-900">Mobile Optimization:</strong> Most LinkedIn users are on mobile - shorter posts read better on small screens
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Does LinkedIn count spaces?</h3>
            <p className="text-gray-600 text-sm">Yes, LinkedIn counts all characters including spaces, line breaks, and emojis. Our character counter accurately reflects LinkedIn's counting method.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">What happens if I exceed the character limit?</h3>
            <p className="text-gray-600 text-sm">LinkedIn will not let you publish content that exceeds the character limit. You'll need to shorten your text to fit within the limit.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">What's the ideal LinkedIn post length?</h3>
            <p className="text-gray-600 text-sm">Most experts agree that 1,300-1,500 characters is the sweet spot. Long enough to provide value, short enough to keep attention. Always put your key message in the first 210 characters.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
