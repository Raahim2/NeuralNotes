import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { prompt, selectedText } = await req.json();

    // Fix: Use 'gemini-pro' as it is the most stable alias.
    // Or try 'gemini-1.5-flash-latest' if you specifically need flash.
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const fullPrompt = `
      You are an AI text editor.
      Original Text: "${selectedText}"
      User Command: ${prompt}
      
      Output ONLY the rewritten text. No markdown formatting, no "Here is the text".
    `;

    const result = await model.generateContentStream(fullPrompt);
    
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            if (chunkText) {
                controller.enqueue(new TextEncoder().encode(chunkText));
            }
        }
        controller.close();
      },
    });

    return new NextResponse(stream, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });

  } catch (error) {
    console.error('AI API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}