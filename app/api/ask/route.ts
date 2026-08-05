import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { getCuratedProfileContext } from "@/lib/command-engine";
import type { Language } from "@/data/profile";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
    const language: Language = body.language === "pl" ? "pl" : "en";

    if (!prompt) {
      return NextResponse.json({ error: language === "en" ? "Please provide a question." : "Podaj pytanie." }, { status: 400 });
    }

    if (prompt.length > 300) {
      return NextResponse.json({
        error: language === "en" ? "Question is too long (maximum 300 characters)." : "Pytanie jest za dlugie (maksymalnie 300 znakow)."
      }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        answer: language === "en"
          ? "The AI assistant is not configured yet. Please set GEMINI_API_KEY in the environment variables."
          : "Asystent AI nie jest jeszcze skonfigurowany. Ustaw GEMINI_API_KEY w zmiennych srodowiskowych."
      });
    }

    const profileContext = getCuratedProfileContext(language);
    const systemInstruction = language === "en"
      ? `You are a professional AI portfolio assistant for ${profileContext.name}. Answer questions about their background, skills, projects, and education strictly and exclusively from the verified JSON profile data below. Do not assume or invent details. If information is unavailable, say so briefly and suggest contacting ${profileContext.name} at ${profileContext.email}. Be concise and professional: answer in at most three short sentences, or up to three short bullet points.\n\nProfile Data:\n${JSON.stringify(profileContext, null, 2)}`
      : `Jestes profesjonalnym asystentem AI portfolio dla ${profileContext.name}. Odpowiadaj na pytania o doswiadczenie, umiejetnosci, projekty i edukacje wylacznie na podstawie zweryfikowanych danych JSON ponizej. Nie zakladaj ani nie wymyslaj informacji. Gdy informacji nie ma w profilu, powiedz to krotko i zasugeruj kontakt z ${profileContext.name} przez ${profileContext.email}. Odpowiedzi maja byc konkretne i profesjonalne: maksymalnie trzy krotkie zdania albo trzy krotkie punkty.\n\nDane profilu:\n${JSON.stringify(profileContext, null, 2)}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [{ role: "user", parts: [{ text: `${systemInstruction}\n\nUser Question: ${prompt}` }] }]
    });

    return NextResponse.json({
      answer: response.text || (language === "en" ? "No response generated." : "Brak odpowiedzi.")
    });
  } catch (error: unknown) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Internal server error"
    }, { status: 500 });
  }
}
