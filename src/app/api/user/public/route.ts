import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/Prisma";

export async function PUT(req: NextRequest) {
  try {
    const decodedToken = verifyToken(req);

    if (!decodedToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { isPublic } = body;

    if (typeof isPublic !== "boolean") {
      return NextResponse.json(
        { error: "isPublic must be a boolean value" },
        { status: 400 }
      );
    }

    const user = await prisma.user.update({
      where: { id: Number(decodedToken.id) },
      data: { isPublic },
      select: {
        id: true,
        isPublic: true,
      },
    });

    return NextResponse.json(
      { message: "Profile visibility updated", isPublic: user.isPublic },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating profile visibility:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const decodedToken = verifyToken(req);

    if (!decodedToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(decodedToken.id) },
      select: {
        id: true,
        isPublic: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ isPublic: user.isPublic }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching profile visibility:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

