import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/Prisma";

export async function GET(req: NextRequest) {
  try {
    const decodedToken = verifyToken(req);

    if (!decodedToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await prisma.user.findUnique({
      where: { id: Number(decodedToken.id) },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error verifying user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const decodedToken = verifyToken(req);

    if (!decodedToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    // const { name, profession, contactNum,location,linkedin,github} = body;

    const user = await prisma.user.update({
      where: { id: Number(decodedToken.id) },
      data: {
        summary: body.summary,
        name: body.name,
        profession: body.profession,
        contactNum: body.contactNum,
        location: body.location,
        linkedin: body.linkedin,
        github: body.github,
        bachelorCourse: body.bachelorCourse,
        bachelorUniversity: body.bachelorUniversity,
        bachelorCgpa: body.bachelorCgpa,
        bachelorStart: body.bachelorStart,
        bachelorEnd: body.bachelorEnd,
        masterCourse: body.masterCourse,
        masterUniversity: body.masterUniversity,
        masterCgpa: body.masterCgpa,
        masterStart: body.masterStart,
        masterEnd: body.masterEnd,
        jobTitle: body.jobTitle,
        companyName: body.companyName,
        employmentType: body.employmentType,
        jobLocation: body.jobLocation,
        workDescription: body.workDescription,
        projectTitle: body.projectTitle,
        projectLink: body.projectLink,
        projectDesc: body.projectDesc,
        skill: body.skill
      },
    });
    return NextResponse.json({ message: "successful" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });

  }
}
