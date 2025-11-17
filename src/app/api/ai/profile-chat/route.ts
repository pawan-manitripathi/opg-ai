import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/Prisma";
import { Groq } from "groq-sdk";

const groq = new Groq();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, message } = body;

    if (!userId || typeof userId !== "number") {
      return NextResponse.json(
        { error: "Valid userId is required" },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message is required and cannot be empty" },
        { status: 400 }
      );
    }

    // Validate message length
    if (message.length > 1000) {
      return NextResponse.json(
        { error: "Message is too long (max 1000 characters)" },
        { status: 400 }
      );
    }

    // Fetch user profile and validate it's public
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        profession: true,
        contactNum: true,
        location: true,
        linkedin: true,
        github: true,
        summary: true,
        bachelorCourse: true,
        bachelorUniversity: true,
        bachelorCgpa: true,
        bachelorStart: true,
        bachelorEnd: true,
        masterCourse: true,
        masterUniversity: true,
        masterCgpa: true,
        masterStart: true,
        masterEnd: true,
        jobTitle: true,
        companyName: true,
        employmentType: true,
        jobLocation: true,
        workDescription: true,
        projectTitle: true,
        projectLink: true,
        projectDesc: true,
        skill: true,
        isPublic: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }

    if (!user.isPublic) {
      return NextResponse.json(
        { error: "This profile is not publicly accessible" },
        { status: 403 }
      );
    }

    // Build profile context for AI
    const profileContext = `
Name: ${user.name || "Not provided"}
Profession: ${user.profession || "Not provided"}
Location: ${user.location || "Not provided"}
Contact: ${user.contactNum || "Not provided"}
LinkedIn: ${user.linkedin || "Not provided"}
GitHub: ${user.github || "Not provided"}

Professional Summary:
${user.summary || "Not provided"}

Education:
Bachelor's: ${user.bachelorCourse || "Not provided"} at ${user.bachelorUniversity || "Not provided"} (${user.bachelorStart || ""} - ${user.bachelorEnd || ""}) - CGPA: ${user.bachelorCgpa || "Not provided"}
Master's: ${user.masterCourse || "Not provided"} at ${user.masterUniversity || "Not provided"} (${user.masterStart || ""} - ${user.masterEnd || ""}) - CGPA: ${user.masterCgpa || "Not provided"}

Experience:
Job Title: ${user.jobTitle || "Not provided"}
Company: ${user.companyName || "Not provided"}
Employment Type: ${user.employmentType || "Not provided"}
Location: ${user.jobLocation || "Not provided"}
Description: ${user.workDescription || "Not provided"}

Projects:
Title: ${user.projectTitle || "Not provided"}
Link: ${user.projectLink || "Not provided"}
Description: ${user.projectDesc || "Not provided"}

Skills: ${user.skill || "Not provided"}
`.trim();

    // ---- SYSTEM PROMPT ----
    const systemPrompt = `
You are a helpful AI assistant that answers questions about a professional's profile.
You have access to their complete professional information including education, experience, projects, skills, and summary.
Answer questions accurately based only on the information provided in the profile.
Be professional, concise, and helpful.
If asked about information not in the profile, politely state that the information is not available.
Do not make up or infer information that is not explicitly stated in the profile.
`;

    // ---- USER PROMPT ----
    const userPrompt = `
Here is the professional's profile information:

${profileContext}

User Question: ${message.trim()}

Please provide a helpful answer based on the profile information above.
`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      model: "meta-llama/llama-4-maverick-17b-128e-instruct",
      temperature: 0.7,
      top_p: 1,
      stream: false,
    });

    const aiResponse =
      chatCompletion.choices?.[0]?.message?.content?.trim() ?? "";

    if (!aiResponse) {
      return NextResponse.json(
        { error: "AI did not return a response." },
        { status: 500 }
      );
    }

    return NextResponse.json({ response: aiResponse }, { status: 200 });
  } catch (error: any) {
    console.error("AI profile chat error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

