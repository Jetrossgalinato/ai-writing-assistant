"use client";

import { useState } from "react";
import { generateAIContent } from "./actions";
import AIResponse from "@/components/AIResponse";

export default function HomePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [task, setTask] = useState<"summarize" | "code">("summarize");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input) return;
    setIsLoading(true);
    try {
      const result = await generateAIContent(input, task);
      setOutput(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 bg-slate-50 flex flex-col items-center">
      <div className="max-w-3xl w-full space-y-6">
        <h1 className="text-3xl font-bold text-slate-900 text-center">
          AI Writing Assistant
        </h1>

        {/* Toggle Switch */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setTask("summarize")}
            className={`px-4 py-2 rounded-lg ${
              task === "summarize"
                ? "bg-blue-600 text-white"
                : "bg-white border text-slate-600"
            }`}
          >
            Summarizer
          </button>
          <button
            onClick={() => setTask("code")}
            className={`px-4 py-2 rounded-lg ${
              task === "code"
                ? "bg-blue-600 text-white"
                : "bg-white border text-slate-600"
            }`}
          >
            Code Gen
          </button>
        </div>

        {/* Input Area */}
        <textarea
          className="w-full h-40 p-4 text-gray-900 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder={
            task === "summarize"
              ? "Paste text to summarize..."
              : "Describe the code you need..."
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 disabled:opacity-50"
        >
          {isLoading ? "Thinking..." : "Generate ✨"}
        </button>

        {/* Output Area */}
        {output && (
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm w-full">
            <h2 className="font-bold mb-4 text-slate-700">Result:</h2>
            {/* 2. Use the new component instead of the simple div */}
            <AIResponse content={output} />
          </div>
        )}
      </div>
    </main>
  );
}
