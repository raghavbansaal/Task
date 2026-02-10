import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from '../config/env.js';
const genAI = new GoogleGenerativeAI(config.geminiKey);
export async function getAIAnswer(question) {
  if (typeof question !== 'string' || !question.trim()) {
    throw new Error('Invalid question for AI');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const prompt = `Respond with ONLY a single word answer (no sentences, no punctuation): ${question}`;
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    return text.split(/\s+/)[0] || 'Unknown';
  } catch (error) {
    console.error('AI API error:', error.message);
    throw new Error('AI service error');
  }
}