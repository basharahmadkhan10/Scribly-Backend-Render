import * as geminiService from '../services/gemini.service.js';

export const summarizeText = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Text is required' });
    
    const result = await geminiService.summarizeText(text);
    res.json({ success: true, result });
  } catch (error) {
    console.error('Summarize controller error:', error);
    res.status(500).json({ error: error.message || 'Failed to summarize' });
  }
};

export const improveText = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Text is required' });
    
    const result = await geminiService.improveText(text);
    res.json({ success: true, result });
  } catch (error) {
    console.error('Improve controller error:', error);
    res.status(500).json({ error: error.message || 'Failed to improve text' });
  }
};

export const extractKeyPoints = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Text is required' });
    
    const result = await geminiService.extractKeyPoints(text);
    res.json({ success: true, result });
  } catch (error) {
    console.error('Key points controller error:', error);
    res.status(500).json({ error: error.message || 'Failed to extract key points' });
  }
};

export const changeTone = async (req, res) => {
  try {
    const { text, tone } = req.body;
    if (!text || !tone) return res.status(400).json({ error: 'Text and tone are required' });
    
    const result = await geminiService.changeTone(text, tone);
    res.json({ success: true, result });
  } catch (error) {
    console.error('Tone controller error:', error);
    res.status(500).json({ error: error.message || 'Failed to change tone' });
  }
};

export const generateTags = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Text is required' });
    
    const result = await geminiService.generateTags(text);
    res.json({ success: true, result });
  } catch (error) {
    console.error('Tags controller error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate tags' });
  }
};

export const expandText = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Text is required' });
    
    const result = await geminiService.expandText(text);
    res.json({ success: true, result });
  } catch (error) {
    console.error('Expand controller error:', error);
    res.status(500).json({ error: error.message || 'Failed to expand text' });
  }
};

export const translateText = async (req, res) => {
  try {
    const { text, language } = req.body;
    if (!text || !language) return res.status(400).json({ error: 'Text and language are required' });
    
    const result = await geminiService.translateText(text, language);
    res.json({ success: true, result });
  } catch (error) {
    console.error('Translate controller error:', error);
    res.status(500).json({ error: error.message || 'Failed to translate' });
  }
};

// Health check for AI service
export const healthCheck = async (req, res) => {
  try {
    // Test with a simple prompt to verify Gemini connection
    const testPrompt = "Hello";
    const testResult = await geminiService.summarizeText(testPrompt);
    
    res.json({ 
      success: true, 
      message: 'AI Service is operational',
      gemini: 'Connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'AI Service is down',
      error: error.message,
      gemini: 'Disconnected'
    });
  }
};
