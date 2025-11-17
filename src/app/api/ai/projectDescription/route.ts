import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/Prisma";
import { Groq } from 'groq-sdk';

const groq = new Groq();

export async function POST(req: NextRequest) {
    try {
        // Verify user token
        const decodedToken = verifyToken(req);
        if (!decodedToken) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        
        const user = await prisma.user.findUnique({
            where: { id: Number(decodedToken.id) },
            select: { projectTitle: true },
        });

        if (!user || !user.projectTitle) {
            return NextResponse.json({ error: "Project title not found" }, { status: 404 });
        }

        
        const body = await req.json();
        const { roughDescription } = body;

        if (!roughDescription || roughDescription.trim().length === 0) {
            return NextResponse.json({ error: "Rough description is required" }, { status: 400 });
        }

        // ---- SYSTEM PROMPT ----
        const systemPrompt = `
You are a professional project and resume writing assistant.
Your task is to rewrite a user's project description into a concise, polished, professional summary suitable for a resume, portfolio, or LinkedIn.

Rules:
- Base your output ONLY on the project title (from database) and the rough description provided by the user.
- Make it formal, engaging, and highlight functionality, achievements, or impact.
- Do not add technologies, results, or experiences not mentioned by the user.
- Return only the rewritten project summary as plain text.
`;

        // ---- USER PROMPT ----
        const userPrompt = `
Project Title: ${user.projectTitle}

User's Rough Project Description:
${roughDescription}

Rewrite this into a concise, professional project summary suitable for a resume or portfolio. Return only the summary.
`;

        
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            model: "meta-llama/llama-4-maverick-17b-128e-instruct",
            temperature: 1,
            top_p: 1,
            stream: false,
        });

        const summary = chatCompletion.choices[0].message.content?.trim() || "";

        return NextResponse.json({ summary }, { status: 200 });

    } catch (error) {
        console.error("Error generating project summary:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
