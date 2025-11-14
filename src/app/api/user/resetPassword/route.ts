import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/Prisma"
import bcrypt from "bcryptjs";

export async function PUT(req: NextRequest) {
  try {
    const { token, newPassword } = await req.json();

    console.log("Token from frontend:", token);

    const user = await prisma.user.findFirst({
  where: {
    forgotPasswordToken: token,
    forgotPasswordTokenExpiry: {
      gt: new Date(), // Prisma uses `gt` instead of `$gt`
    },
  },
});

    console.log("User found:", user);

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    await prisma.user.update({
  where: { id: user.id },
  data: {
    password: await bcrypt.hash(newPassword, 10),
    forgotPasswordToken: null,
    forgotPasswordTokenExpiry: null,
  },
});

    return NextResponse.json({ message: "Password reset successful" },{ status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
