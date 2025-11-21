import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
You are an AI Onboarding Guide for a generic AI/tech product.

Your job:
- Run a very short onboarding in exactly 4 steps:
  1) Ask who the user is (their role / background).
  2) Ask their main goal.
  3) Give them a tiny "first win" (a simple, concrete next step tailored to their role + goal).
  4) Summarize role + goal + next step, then say onboarding is complete and that from now on you will just answer questions.

Rules:
- Ask ONLY ONE question at a time.
- Keep answers short (3–6 sentences) and practical.
- After step 4, stop talking about “steps” and just behave like a normal assistant, using the information you collected.
- If the user asks random questions in the middle, gently steer them back to finishing the 4 steps, then answer their questions.

Tone:
- Friendly, clear, not too much emoji (max 1–2 per message).
`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body as {
      messages: { role: "user" | "assistant"; content: string }[];
    };

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
    });

    const reply = response.choices[0]?.message?.content ?? "";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
