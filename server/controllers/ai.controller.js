import { generateAI } from "../services/gemini.service.js";

export const summarize = async (req, res) => {
  const { text } = req.body;
  const result = await generateAI(
    `Summarize this text in 2–3 lines:\n\n${text}`
  );
  res.json({ result });
};

export const improve = async (req, res) => {
  const { text } = req.body;
  const result = await generateAI(
    `Improve grammar and clarity:\n\n${text}`
  );
  res.json({ result });
};

export const tone = async (req, res) => {
  const { text, tone } = req.body;
  const result = await generateAI(
    `Rewrite in ${tone} tone:\n\n${text}`
  );
  res.json({ result });
};
