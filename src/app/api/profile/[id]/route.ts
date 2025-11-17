import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/Prisma";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const userId = parseInt(params.id);

        if (isNaN(userId)) {
            return NextResponse.json(
                { error: "Invalid user ID" },
                { status: 400 }
            );
        }

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
        } as any);

        if (!user) {
            return NextResponse.json(
                { error: "Profile not found" },
                { status: 404 }
            );
        }

        const userWithPublic = user as any;

        if (!userWithPublic.isPublic) {
            return NextResponse.json(
                { error: "This profile is not publicly accessible" },
                { status: 403 }
            );
        }

        // Remove isPublic from response (not needed by frontend)
        const { isPublic, ...publicProfile } = userWithPublic;

        return NextResponse.json({ profile: publicProfile }, { status: 200 });
    } catch (error) {
        console.error("Error fetching public profile:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

