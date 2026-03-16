import axios from 'axios';

export type Provider = 'OpenAI' | 'OpenRouter' | 'Gemini';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const callApi = async (provider: Provider, apiKey: string, messages: Message[]) => {
  try {
    if (provider === 'OpenAI') {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: messages.map(m => ({ role: m.role, content: m.content })),
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data.choices[0].message.content;
    } else if (provider === 'OpenRouter') {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'openai/gpt-3.5-turbo',
          messages: messages.map(m => ({ role: m.role, content: m.content })),
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': window.location.origin,
            'X-Title': 'Universal AI API Tester',
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data.choices[0].message.content;
    } else if (provider === 'Gemini') {
      // Gemini's REST API is a bit different
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          contents: messages.map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }],
          })),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data.candidates[0].content.parts[0].text;
    }
  } catch (error: any) {
    const errorMsg = error.response?.data?.error?.message || error.message || 'An unknown error occurred';
    throw new Error(`🚨 Error (${provider}): ${errorMsg}`);
  }
};
