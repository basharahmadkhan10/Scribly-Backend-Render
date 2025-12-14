import express from 'express';
import {
  summarizeText,
  improveText,
  extractKeyPoints,
  changeTone,
  generateTags,
  expandText,
  translateText,
  healthCheck
} from '../controllers/ai.controller.js';

const router = express.Router();

// Public health check
router.get('/health', healthCheck);

// AI Routes (add authentication middleware later if needed)
router.post('/summarize', summarizeText);
router.post('/improve', improveText);
router.post('/key-points', extractKeyPoints);
router.post('/change-tone', changeTone);
router.post('/generate-tags', generateTags);
router.post('/expand', expandText);
router.post('/translate', translateText);

export default router;
