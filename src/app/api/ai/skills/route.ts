import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/Prisma";
import { Groq } from 'groq-sdk';

const groq = new Groq();


export async function GET(req: NextRequest) {
    try {
        const decodedToken = verifyToken(req);

        if (!decodedToken) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const user = await prisma.user.findUnique({
            where: { id: Number(decodedToken.id) },
            select: {
                skill: true,
                masterCourse: true,
                bachelorCourse: true,
                summary: true,
                jobTitle: true
            },
        });

        if (!user) {
            return NextResponse.json("User Not Found")
        }

        // ---- SYSTEM PROMPT ----
        const systemPrompt = `
You are an expert career and skill-development assistant.
You will receive user information including skills, education, summary, and job title.
Your job is to analyze this information and return ONLY an array of skills the user should improve or learn.
Do not return explanations. Do not return any text outside the array.
Return JSON array only.
`;

        // ---- USER PROMPT ----
        const userPrompt = `
Here is the user's information:

Skills: ${user.skill}
Master Course: ${user.masterCourse}
Bachelor Course: ${user.bachelorCourse}
Job Title: ${user.jobTitle}
Summary: ${user.summary}

Suggest only an array of skill improvements.
`;

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            model: "meta-llama/llama-4-maverick-17b-128e-instruct",
            temperature: 1,
            top_p: 1,
            stream: false, // ❗ No streaming
        });

        // console.log(chatCompletion)
        // RESULT
        // RESULT
        let suggestionsText = chatCompletion.choices[0].message.content;

        let suggestions;
        try {
            suggestions = JSON.parse(suggestionsText || ""); // convert text → array
        } catch (err) {
            console.error("Failed to parse JSON from LLM:", err);
            return NextResponse.json(
                { error: "Invalid response format from AI" },
                { status: 500 }
            );
        }

        return NextResponse.json({ suggestions }, { status: 200 });

    } catch (error) {
        console.error("Error verifying user:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
