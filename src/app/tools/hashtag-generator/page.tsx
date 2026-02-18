import HashtagGeneratorTool from "@/components/tools/HashtagGeneratorTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free LinkedIn Hashtag Generator | Boost Your Post Reach",
  description: "Generate relevant hashtags for your LinkedIn posts. Increase your visibility and reach with trending hashtags. Best hashtags for LinkedIn marketing.",
  keywords: "linkedin hashtag generator, linkedin hashtags, post reach, linkedin marketing, hashtags for linkedin, trending hashtags, linkedin growth",
};

export default function HashtagGeneratorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#057642] to-[#7c3aed] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">LinkedIn Hashtag Generator</h1>
          <p className="text-xl text-green-100 mb-6">Generate relevant hashtags to boost your post reach</p>
          <div className="flex items-center justify-center gap-2 text-sm text-green-200">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Free to use - Instant Results
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <HashtagGeneratorTool />
      </div>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use Hashtags on LinkedIn</h2>
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Where to Place Hashtags</h3>
            <p className="text-gray-600">Place hashtags at the end of your post, not in the middle. This keeps your content readable while still making it discoverable. You can also add 1-2 hashtags within your content for natural integration.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">How Many Hashtags?</h3>
            <p className="text-gray-600">LinkedIn recommends using 3-5 hashtags per post. Using too many can look spammy and reduce engagement. Some experts suggest up to 10, but quality matters more than quantity.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Mix Popular & Niche</h3>
            <p className="text-gray-600">Combine popular hashtags (#careers, #leadership) with niche ones specific to your industry for best results. Popular hashtags give you broad reach, while niche hashtags help you target your specific audience.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Create Your Own Hashtags</h3>
            <p className="text-gray-600">If you're building a personal brand, create a unique hashtag that represents your content. Use it consistently across your posts to build recognition and make your content discoverable.</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular LinkedIn Hashtags by Category</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Career & Jobs</h3>
            <div className="flex flex-wrap gap-2">
              {["#LinkedIn", "#Career", "#Jobs", "#CareerAdvice", "#JobSearch", "#Hiring", "#Recruiting", "#CareerGrowth", "#Professional", "#WorkLife"].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm cursor-pointer hover:bg-green-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Business & Leadership</h3>
            <div className="flex flex-wrap gap-2">
              {["#Business", "#Leadership", "#Entrepreneur", "#Startup", "#Management", "#CEO", "#BusinessGrowth", "#Success", "#Motivation", "#Inspiration"].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm cursor-pointer hover:bg-blue-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Technology & Innovation</h3>
            <div className="flex flex-wrap gap-2">
              {["#Tech", "#Technology", "#Innovation", "#AI", "#DigitalTransformation", "#Software", "#DataScience", "#CloudComputing", "#Cybersecurity", "#TechNews"].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm cursor-pointer hover:bg-purple-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Marketing & Sales</h3>
            <div className="flex flex-wrap gap-2">
              {["#Marketing", "#DigitalMarketing", "#Sales", "#SocialMedia", "#Branding", "#ContentMarketing", "#GrowthHacking", "#MarketingTips", "#SocialMediaMarketing"].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm cursor-pointer hover:bg-orange-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Industry Specific</h3>
            <div className="flex flex-wrap gap-2">
              {["#Finance", "#Healthcare", "#Education", "#RealEstate", "#Manufacturing", "#Retail", "#Consulting", "#Legal", "#NonProfit", "#Government"].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm cursor-pointer hover:bg-gray-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12 bg-white rounded-2xl mx-4 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Best Practices for LinkedIn Hashtags</h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <span className="text-green-600 font-bold">1</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Research Before Using</h3>
              <p className="text-gray-600 text-sm">Check if hashtags are active and relevant. Some hashtags have millions of posts but low engagement. Look for hashtags with consistent engagement.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <span className="text-green-600 font-bold">2</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Use a Mix of Hashtag Sizes</h3>
              <p className="text-gray-600 text-sm">Combine high-volume hashtags (100k+ posts), medium hashtags (10k-100k), and low-competition hashtags (under 10k) for the best reach.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <span className="text-green-600 font-bold">3</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Rotate Your Hashtags</h3>
              <p className="text-gray-600 text-sm">Don't use the same hashtags every time. LinkedIn may view this as spam. Create sets of 5 hashtags and rotate them across posts.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <span className="text-green-600 font-bold">4</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Include Industry-Specific Hashtags</h3>
              <p className="text-gray-600 text-sm">Use hashtags specific to your industry or niche. These have less competition and higher engagement from your target audience.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Hashtags Matter on LinkedIn</h2>
        <div className="bg-green-50 p-6 rounded-xl border border-green-200">
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <div>
                <strong className="text-gray-900">Discoverability:</strong> Hashtags help your content appear in LinkedIn searches and feeds
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <div>
                <strong className="text-gray-900">Targeted Reach:</strong> Niche hashtags connect you with your ideal audience
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <div>
                <strong className="text-gray-900">Brand Building:</strong> Consistent hashtag use builds recognition over time
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <div>
                <strong className="text-gray-900">Algorithm Boost:</strong> Properly tagged posts perform better in LinkedIn's algorithm
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <div>
                <strong className="text-gray-900">Content Organization:</strong> Hashtags help categorize your content for your audience
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Do hashtags actually work on LinkedIn?</h3>
            <p className="text-gray-600 text-sm">Yes! Hashtags help your content get discovered by people interested in those topics. However, they work best when combined with quality content and consistent posting.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Should I use the same hashtags every time?</h3>
            <p className="text-gray-600 text-sm">It's better to rotate different sets of hashtags. Using the same hashtags repeatedly may reduce reach as LinkedIn's algorithm deprioritizes repetitive content.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">How do I find the best hashtags for my industry?</h3>
            <p className="text-gray-600 text-sm">Look at what hashtags top influencers in your industry use, check trending topics on LinkedIn, and experiment with different hashtags to see which get the best engagement.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
