import dotenv from 'dotenv';

dotenv.config();

export const config = {
  geminiKey: process.env.GEMINI_API_KEY,
  officialEmail: process.env.OFFICIAL_EMAIL,
  port: process.env.PORT || 3000,
};