import { GoogleGenAI } from "@google/genai";
import axios from 'axios';

const getApiKey = () => {
  return process.env.REACT_APP_GOOGLE_API_KEY || process.env.API_KEY || '';
};

// REST API for Gemini
const MODEL = 'gemini-1.5-flash';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

interface ContentPart {
  text: string;
}

interface Content {
  role: 'user' | 'model';
  parts: ContentPart[];
}

/**
 * Gera texto simples a partir de um prompt (usado no tradutor)
 */
export async function generateText(prompt: string, systemInstruction?: string): Promise<string> {
  const apiKey = getApiKey();
  if (!apiKey) return "Erro: Chave de API ausente.";

  try {
    const payload: any = {
      contents: [{ parts: [{ text: prompt }] }]
    };

    if (systemInstruction) {
      payload.system_instruction = { parts: [{ text: systemInstruction }] };
    }

    const response = await axios.post(`${API_URL}?key=${apiKey}`, payload, {
      headers: { 'Content-Type': 'application/json' }
    });

    const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || "Não foi possível gerar uma resposta.";

  } catch (error) {
    console.error('Erro na chamada HTTP Gemini:', error);
    return "Desculpe, serviço indisponível no momento.";
  }
}

/**
 * Gera resposta de chat com histórico (usado no Assistente IA)
 */
export async function generateChatContentREST(
  history: { role: string; parts: { text: string }[] }[],
  newMessage: string,
  systemInstruction?: string
): Promise<string> {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("API Key missing");

  try {
    const contents: Content[] = history.map(msg => ({
      role: msg.role === 'ai' ? 'model' : 'user' as 'model' | 'user',
      parts: msg.parts
    }));

    contents.push({
      role: 'user',
      parts: [{ text: newMessage }]
    });

    const payload: any = {
      contents: contents,
      generationConfig: {
        maxOutputTokens: 1000,
      }
    };

    if (systemInstruction) {
      payload.system_instruction = { parts: [{ text: systemInstruction }] };
    }

    const response = await axios.post(`${API_URL}?key=${apiKey}`, payload, {
      headers: { 'Content-Type': 'application/json' }
    });

    const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || "Sem resposta.";
  } catch (error) {
    console.error('Erro no Chat Gemini:', error);
    throw error;
  }
}

/**
 * SDK Google GenAI para content generation
 */
export const generateChatContent = async (message: string): Promise<string> => {
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      throw new Error("API Key not configured");
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: message
    });

    return response.text?.trim() || "Desculpe, não consegui gerar uma resposta.";
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
};
