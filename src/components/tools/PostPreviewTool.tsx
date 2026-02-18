"use client";

import { useState } from "react";
import { Smile, Image, Link2, Type, Bold, Italic, List, Quote, Sparkles } from "lucide-react";

const emojis = ["🚀", "💡", "🔥", "⭐", "✨", "💪", "🎯", "📈", "🧠", "✅", "💼", "👀", "🤔", "📝", "🎉", "👏", "🙌", "🔔", "📢", "💬"];

export default function PostPreviewTool() {
  const [postText, setPostText] = useState("");
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const insertEmoji = (emoji: string) => {
    setPostText(postText + " " + emoji);
    setShowEmojiPicker(false);
  };

  const addFormatting = (type: string) => {
    const textarea = document.getElementById('post-textarea') as HTMLTextAreaElement;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = postText.substring(start, end);
    
    let newText = "";
    switch(type) {
      case "bold":
        newText = postText.substring(0, start) + "**" + selectedText + "**" + postText.substring(end);
        break;
      case "italic":
        newText = postText.substring(0, start) + "_" + selectedText + "_" + postText.substring(end);
        break;
      case "bullet":
        newText = postText.substring(0, start) + "\n• " + selectedText + postText.substring(end);
        break;
      case "number":
        newText = postText.substring(0, start) + "\n1. " + selectedText + postText.substring(end);
        break;
      case "quote":
        newText = postText.substring(0, start) + "\n> " + selectedText + postText.substring(end);
        break;
      default:
        return;
    }
    setPostText(newText);
  };

  const insertTemplate = (template: string) => {
    setPostText(postText + "\n\n" + template);
  };

  const getPreviewText = (text: string) => {
    const cutoff = viewMode === "mobile" ? 140 : 210;
    if (text.length <= cutoff) return text;
    return {
      visible: text.slice(0, cutoff),
      hidden: text.slice(cutoff),
    };
  };

  const preview = getPreviewText(postText);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Write Your Post</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("desktop")}
              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                viewMode === "desktop" ? "bg-pink-100 text-pink-700" : "bg-gray-100 text-gray-600"
              }`}
            >
              Desktop
            </button>
            <button
              onClick={() => setViewMode("mobile")}
              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                viewMode === "mobile" ? "bg-pink-100 text-pink-700" : "bg-gray-100 text-gray-600"
              }`}
            >
              Mobile
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="p-2 text-gray-500 hover:text-pink-500 hover:bg-pink-50 rounded-lg" title="Add Emoji">
            <Smile className="w-5 h-5" />
          </button>
          <button onClick={() => addFormatting("bold")} className="p-2 text-gray-500 hover:text-pink-500 hover:bg-pink-50 rounded-lg" title="Bold">
            <Bold className="w-5 h-5" />
          </button>
          <button onClick={() => addFormatting("italic")} className="p-2 text-gray-500 hover:text-pink-500 hover:bg-pink-50 rounded-lg" title="Italic">
            <Italic className="w-5 h-5" />
          </button>
          <button onClick={() => addFormatting("bullet")} className="p-2 text-gray-500 hover:text-pink-500 hover:bg-pink-50 rounded-lg" title="Bullet List">
            <List className="w-5 h-5" />
          </button>
          <button onClick={() => addFormatting("number")} className="p-2 text-gray-500 hover:text-pink-500 hover:bg-pink-50 rounded-lg" title="Numbered List">
            <Type className="w-5 h-5" />
          </button>
          <button onClick={() => addFormatting("quote")} className="p-2 text-gray-500 hover:text-pink-500 hover:bg-pink-50 rounded-lg" title="Quote">
            <Quote className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-pink-500 hover:bg-pink-50 rounded-lg" title="Add Image">
            <Image className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-pink-500 hover:bg-pink-50 rounded-lg" title="Add Link">
            <Link2 className="w-5 h-5" />
          </button>
        </div>

        {showEmojiPicker && (
          <div className="mb-3 p-3 bg-gray-50 rounded-lg flex flex-wrap gap-2">
            {emojis.map((emoji, i) => (
              <button key={i} onClick={() => insertEmoji(emoji)} className="text-2xl hover:scale-125 transition">{emoji}</button>
            ))}
          </div>
        )}

        <div className="mb-3">
          <label className="text-xs text-gray-500 mb-1 block">Quick Templates</label>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => insertTemplate("🧠 Something I learned today:\n\n")} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">💡 Idea</button>
            <button onClick={() => insertTemplate("⚡ Quick tip:\n\n")} className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full">⚡ Tip</button>
            <button onClick={() => insertTemplate("🎯 My take on...\n\n")} className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">🎯 Opinion</button>
            <button onClick={() => insertTemplate("📢 Announcement:\n\n")} className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">📢 News</button>
            <button onClick={() => insertTemplate("❓ Poll: What do you think about...\n\n")} className="text-xs px-2 py-1 bg-pink-100 text-pink-700 rounded-full">❓ Poll</button>
            <button onClick={() => insertTemplate("🎉 Excited to share...\n\n")} className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">🎉 Milestone</button>
          </div>
        </div>

        <textarea
          id="post-textarea"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="Write your LinkedIn post here... Use the formatting tools above!"
          rows={8}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
        />
        
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-gray-500">
            {postText.length} characters (LinkedIn limit: ~3000)
          </p>
          <p className={`text-xs ${postText.length > 3000 ? "text-red-500" : "text-green-500"}`}>
            {postText.length > 3000 ? "Over limit!" : "Within limit"}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">Preview</h3>
        
        <div className={`border border-gray-200 rounded-lg overflow-hidden ${viewMode === "mobile" ? "max-w-sm mx-auto" : ""}`}>
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0A66C2] to-[#7c3aed] rounded-full flex items-center justify-center text-white font-bold">
                Y
              </div>
              <div>
                <p className="font-semibold text-gray-900">Your Name</p>
                <p className="text-sm text-gray-500">Your Headline • 1m</p>
              </div>
            </div>
          </div>

          <div className="p-4">
            {typeof preview === "string" ? (
              <p className="text-gray-800 whitespace-pre-wrap">{preview}</p>
            ) : (
              <>
                <p className="text-gray-800 whitespace-pre-wrap">{preview.visible}</p>
                <details className="mt-1">
                  <summary className="text-[#0A66C2] cursor-pointer text-sm">...see more</summary>
                  <p className="text-gray-800 whitespace-pre-wrap mt-1">{preview.hidden}</p>
                </details>
              </>
            )}
          </div>

          <div className="bg-gray-100 h-48 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <Image className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <span className="text-sm">Image/Video Preview</span>
            </div>
          </div>

          <div className="p-3 border-t border-gray-100 flex justify-around">
            {["Like", "Comment", "Repost", "Send"].map((action) => (
              <button key={action} className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm">
                <span className="text-lg">{action === "Like" ? "👍" : action === "Comment" ? "💬" : action === "Repost" ? "🔄" : "➤"}</span>
                <span>{action}</span>
              </button>
            ))}
          </div>
        </div>

        {typeof preview === "object" && (
          <p className="text-xs text-gray-500 mt-3 text-center">
            {viewMode === "mobile" ? "Mobile" : "Desktop"} shows ~{viewMode === "mobile" ? 140 : 210} chars before "see more"
          </p>
        )}
      </div>
    </div>
  );
}
