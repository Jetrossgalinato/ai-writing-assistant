"use server";

import { model } from "@/lib/gemini";

export async function generateAIContent(
  userInput: string,
  task: "summarize" | "code"
) {
  // 1. Construct the prompt based on the task
  let prompt = "";
  if (task === "summarize") {
    prompt = `Summarize the following text in a few bullet points: ${userInput}`;
  } else {
    prompt = `Generate a high-quality code snippet for: ${userInput}. Include brief comments.`;
  }

  try {
    // 2. Send the prompt to Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;

    // 3. Return the text result
    return response.text();
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw new Error("Failed to generate content.");
  }
}
