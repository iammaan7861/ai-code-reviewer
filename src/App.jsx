import { useState } from "react";
import { callGrok } from "./api/grok";

const LANGUAGES = ["C++", "Python", "JavaScript", "Java", "TypeScript", "Go"];

export default function App() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("C++");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleReview = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setReview("");
    const prompt = `Review this ${language} code. Cover: bugs, improvements, time/space complexity, and best practices. Be concise.\n\n\`\`\`${language}\n${code}\n\`\`\``;
    const res = await callGrok(prompt);
    setReview(res);
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(review);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f0f", color: "#fff", padding: "32px", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "8px" }}> AI Code Reviewer</h1>
      <p style={{ textAlign: "center", color: "#888", marginBottom: "32px" }}>Paste your code and get instant AI feedback</p>

      <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* Left */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{ background: "#1a1a1a", border: "1px solid #333", color: "#fff", padding: "8px 12px", borderRadius: "8px" }}
          >
            {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
          </select>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here..."
            style={{ background: "#1a1a1a", border: "1px solid #333", color: "#fff", padding: "12px", borderRadius: "8px", height: "320px", resize: "none", fontFamily: "monospace", fontSize: "13px" }}
          />

          <button
            onClick={handleReview}
            disabled={loading}
            style={{ background: loading ? "#333" : "#6366f1", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", fontSize: "15px", cursor: loading ? "not-allowed" : "pointer", fontWeight: "600" }}
          >
            {loading ? "Reviewing..." : "Review Code "}
          </button>
        </div>

        {/* Right */}
        <div style={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: "8px", padding: "16px", height: "400px", overflowY: "auto", position: "relative" }}>
          {review && (
            <button
              onClick={handleCopy}
              style={{ position: "absolute", top: "10px", right: "10px", background: "#333", color: "#fff", border: "none", padding: "4px 10px", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          )}
          <pre style={{ margin: 0, whiteSpace: "pre-wrap", fontFamily: "monospace", fontSize: "13px", color: review ? "#e2e2e2" : "#555" }}>
            {review || "Review will appear here..."}
          </pre>
        </div>
      </div>
    </div>
  );
}