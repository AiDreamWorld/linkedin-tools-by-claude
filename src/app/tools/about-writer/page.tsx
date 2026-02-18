import AboutWriterTool from "@/components/tools/AboutWriterTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free LinkedIn About Section Generator | AI-Powered Tool",
  description: "Generate a compelling LinkedIn about section (summary) for free. Professional templates for all career levels.",
  keywords: "linkedin about section generator, linkedin summary, about me linkedin, professional bio generator",
};

export default function AboutWriterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#7c3aed] to-[#5b21b6] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">LinkedIn About Section Generator</h1>
          <p className="text-xl text-purple-100 mb-6">Create a compelling "About" section that tells your story</p>
          <div className="flex items-center justify-center gap-2 text-sm text-purple-200">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Free AI-Powered Tool - No Login Required
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <AboutWriterTool />
      </div>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Write a Great LinkedIn About Section</h2>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-600 mb-4">Your LinkedIn About section (formerly Summary) is one of the most important parts of your profile. It appears right below your headline and gives you 2,600 characters to tell your professional story.</p>
          
          <h3 className="font-semibold text-gray-900 mb-3">Structure Your About Section:</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-600 mb-4">
            <li><strong>Opening:</strong> Who you are and what you do</li>
            <li><strong>Value Proposition:</strong> What makes you unique</li>
            <li><strong>Experience:</strong> Key achievements and background</li>
            <li><strong>Goals:</strong> What you're looking for or passionate about</li>
            <li><strong>Call to Action:</strong> How people can connect with you</li>
          </ol>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12 bg-white rounded-2xl mx-4 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Example About Sections</h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">Professional Tone Example:</h3>
            <p className="text-gray-700 text-sm">"Experienced marketing professional with 8+ years driving growth for B2B tech companies. Specialized in demand generation and marketing automation. Led campaigns that generated $5M+ in pipeline and increased brand awareness by 150%. Passionate about data-driven marketing and building high-performing teams. Currently seeking opportunities to help innovative companies scale their marketing efforts."</p>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">Student/Fresh Graduate Example:</h3>
            <p className="text-gray-700 text-sm">"Computer Science student at MIT with a passion for AI and machine learning. Through internships at Google and Meta, I've developed strong skills in Python, TensorFlow, and data analysis. I'm excited to apply my knowledge to real-world problems and contribute to innovative projects. Let's connect to discuss opportunities in the AI space!"</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">LinkedIn About Section Tips</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Write in First Person</h3>
            <p className="text-gray-600 text-sm">Use "I" and "my" to make it personal and engaging. Recruiters prefer authentic, conversational tone.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Include Keywords</h3>
            <p className="text-gray-600 text-sm">Add skills and industry terms that recruiters search for to improve your profile visibility.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Add Numbers & Metrics</h3>
            <p className="text-gray-600 text-sm">Quantify achievements like "increased sales by 40%" to make your impact tangible.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">End with a CTA</h3>
            <p className="text-gray-600 text-sm">Invite people to connect, visit your portfolio, or reach out for collaborations.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
