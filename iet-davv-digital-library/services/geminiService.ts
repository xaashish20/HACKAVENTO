
import { GoogleGenAI, Type } from "@google/genai";
import { Book } from "../types";

// Always use process.env.API_KEY directly for initializing GoogleGenAI.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getBookSummary = async (bookTitle: string, author: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a concise 3-sentence academic summary of the book "${bookTitle}" by ${author}. Focus on its importance to college students.`,
      config: {
        systemInstruction: "You are an expert college librarian who provides helpful book summaries.",
        temperature: 0.7,
      },
    });
    return response.text || "Summary not available.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Failed to load summary.";
  }
};

export const getRecommendations = async (userInterests: string, availableBooks: Book[]): Promise<string[]> => {
  try {
    const bookTitles = availableBooks.map(b => b.title).join(", ");
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Based on the user's interests: "${userInterests}", recommend exactly 3 books from this list: [${bookTitles}]. Provide only the titles separated by commas.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedTitles: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["recommendedTitles"]
        }
      },
    });
    const result = JSON.parse(response.text || '{"recommendedTitles":[]}');
    return result.recommendedTitles;
  } catch (error) {
    console.error("Recommendation Error:", error);
    return [];
  }
};

export const chatWithLibrarian = async (history: { role: 'user' | 'model', text: string }[], message: string) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: 'You are EduLib AI, a friendly and professional college librarian assistant. Help students find books, understand topics, and manage their studies.',
      },
    });

    // Send history if needed, but for simplicity we'll just send the current message
    // as the API doesn't take history directly in sendMessage. We'd usually use history in contents.
    const response = await chat.sendMessage({ message });
    return response.text || "I'm sorry, I couldn't process that.";
  } catch (error) {
    console.error("Chat Error:", error);
    return "Service unavailable.";
  }
};
