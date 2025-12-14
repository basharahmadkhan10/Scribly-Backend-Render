import { summarizeText, improveText, changeTone } from "../services/gemini.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const summarize = async (req, res) => {
  const { text } = req.body;

  if (!text || text.trim().length < 10) {
    throw new ApiError(400, "Text too short for summarization");
  }

  const summary = await summarizeText(text);

  res.status(200).json(
    new ApiResponse(200, { result: summary }, "Summarized successfully")
  );
};

export const improve = async (req, res) => {
  const { text } = req.body;

  if (!text || text.trim().length < 10) {
    throw new ApiError(400, "Text too short for improvement");
  }

  const improved = await improveText(text);

  res.status(200).json(
    new ApiResponse(200, { result: improved }, "Improved successfully")
  );
};

export const tone = async (req, res) => {
  const { text, tone } = req.body;

  if (!text || !tone) {
    throw new ApiError(400, "Text and tone are required");
  }

  const tonedText = await changeTone(text, tone);

  res.status(200).json(
    new ApiResponse(200, { result: tonedText }, "Tone changed successfully")
  );
};
