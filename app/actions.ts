"use server";

import { model } from "@/lib/gemini";

export async function getAvailableModels(): Promise<string[]> {
  try {
    const result = await genAI.listModels();

    // We extract the model names (e.g., "models/gemini-1.5-flash")
    // and return them as an array of strings.
    return result.models.map((m) => m.name);
  } catch (error) {
    console.error("Error fetching Gemini models:", error);
    // Return an empty array or a fallback if the call fails
    return [];
  }
}

export async function generateAIContent(
  userInput: string,
  task: "summarize" | "code"
) {
  let prompt = "";
  if (task === "summarize") {
    prompt = `Summarize the following text in a few bullet points: ${userInput}`;
  } else {
    prompt = `Generate a high-quality code snippet for: ${userInput}. Include brief comments.`;
  }

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw new Error("Failed to generate content.");
  }
}
