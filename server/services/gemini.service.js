import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro"
});

export const summarizeText = async (text) => {
  const prompt = `
Summarize the following text in 2-3 clear sentences:

${text}
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
};

export const improveText = async (text) => {
  const prompt = `
Improve the following text for clarity, grammar, and flow.
Keep the meaning the same:

${text}
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
};

export const changeTone = async (text, tone) => {
  const prompt = `
Rewrite the following text in a ${tone} tone:

${text}
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
};
