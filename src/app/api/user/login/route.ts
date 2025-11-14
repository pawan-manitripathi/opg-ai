import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/lib/Prisma"

  
export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    const user = await prisma.user.findUnique({ where: { email }});
    if (!user) {
      return NextResponse.json({ error: "Please check your email and password" }, { status: 400 })
    }

    const existingUser = await bcrypt.compare(password, user.password);
    if (!existingUser) {
      return NextResponse.json({ error: "Please check your email and password" }, { status: 400 })
    }

    // create token data
    const tokenData = {
      id: user.id,
      name: user.name,
      role: user.isAdmin ? "ADMIN" : "USER"
    }
    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })

    const response = NextResponse.json({
      message: "Login Successful",
      success: true
    })
    response.cookies.set("token", token, {
      httpOnly: true
    })
    return response;

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

}