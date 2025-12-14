import api from './api'; // Your Axios instance pointing to backend

export const aiService = {
  // Main AI actions
  summarizeText: async (text) => {
    const response = await api.post('/ai/summarize', { text });
    return response.data; // or response.data.result based on your backend
  },

  improveWriting: async (text) => {
    const response = await api.post('/ai/improve', { text });
    return response.data;
  },

  extractKeyPoints: async (text) => {
    const response = await api.post('/ai/key-points', { text });
    return response.data;
  },

  changeTone: async (text, tone) => {
    const response = await api.post('/ai/change-tone', { text, tone });
    return response.data;
  },

  generateTags: async (text) => {
    const response = await api.post('/ai/generate-tags', { text });
    return response.data;
  },

  expandIdea: async (text) => {
    const response = await api.post('/ai/expand', { text });
    return response.data;
  },

  translate: async (text, language) => {
    const response = await api.post('/ai/translate', { text, language });
    return response.data;
  },

  // Connection test - call a simple backend endpoint
  testConnection: async () => {
    try {
      await api.get('/ai/health');
      return true;
    } catch {
      return false;
    }
  },

  // Check if service is available (now always true since we use backend)
  isServiceAvailable: () => true
};

export default aiService;
