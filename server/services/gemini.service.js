import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 2048,
  }
});

export const generateAI = async (prompt) => {
  const result = await model.generateContent(prompt);
  return result.response.text();
};
