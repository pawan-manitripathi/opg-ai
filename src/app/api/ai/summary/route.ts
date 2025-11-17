import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { Groq } from "groq-sdk";

const groq = new Groq();

export async function POST(req: NextRequest) {
  try {
    const decodedToken = verifyToken(req);
    if (!decodedToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const userSummary = (body.summary || "").toString().trim();

    // Basic validation
    const wordCount = userSummary ? userSummary.split(/\s+/).filter(Boolean).length : 0;
    if (wordCount < 10) {
      return NextResponse.json(
        { error: "Please write at least 10 words before generating." },
        { status: 400 }
      );
    }

    // ---- SYSTEM PROMPT ----
    const systemPrompt = `
You are an expert resume writer and career assistant.
The user will provide a rough professional summary written in their own words.
Your task is to rewrite it into a polished, formal, ATS-friendly professional summary.
Make it concise, engaging, and suitable for a resume.
Do not add new skills or experiences that the user did not mention.
Do not include explanations.
Return only the rewritten summary as plain text.
`;


    const userPrompt = `
Rewrite the following professional summary:

"${userSummary}"
`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      model: "meta-llama/llama-4-maverick-17b-128e-instruct",
      temperature: 0.7,
      top_p: 1,
      stream: false,
    });

    const rewritten = chatCompletion.choices?.[0]?.message?.content?.trim() ?? "";

    if (!rewritten) {
      return NextResponse.json({ error: "AI did not return a summary." }, { status: 500 });
    }

    return NextResponse.json({ summary: rewritten }, { status: 200 });

  } catch (error) {
    console.error("AI summary error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
