import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

export const summarizeText = async (text) => {
  try {
    const prompt = `Summarize the following text in 2-3 clear sentences:\n\n${text}`;
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Summarize error:", error);
    throw new Error("Failed to summarize text");
  }
};

export const improveText = async (text) => {
  try {
    const prompt = `Improve the following text for clarity, grammar, and flow. Keep the meaning the same:\n\n${text}`;
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Improve error:", error);
    throw new Error("Failed to improve text");
  }
};

export const extractKeyPoints = async (text) => {
  try {
    const prompt = `Extract 3-5 key points from the following text as bullet points:\n\n${text}`;
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Key points error:", error);
    throw new Error("Failed to extract key points");
  }
};

export const changeTone = async (text, tone) => {
  try {
    const prompt = `Rewrite the following text in a ${tone} tone:\n\n${text}`;
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Tone change error:", error);
    throw new Error(`Failed to change tone to ${tone}`);
  }
};

export const generateTags = async (text) => {
  try {
    const prompt = `Generate 5-7 relevant tags or keywords for this text. Format as comma-separated:\n\n${text}`;
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Tags error:", error);
    throw new Error("Failed to generate tags");
  }
};

export const expandText = async (text) => {
  try {
    const prompt = `Expand on this idea, adding more details and depth:\n\n${text}`;
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Expand error:", error);
    throw new Error("Failed to expand text");
  }
};

export const translateText = async (text, language) => {
  try {
    const prompt = `Translate the following text to ${language}. Keep the meaning and tone:\n\n${text}`;
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Translation error:", error);
    throw new Error(`Failed to translate to ${language}`);
  }
};
