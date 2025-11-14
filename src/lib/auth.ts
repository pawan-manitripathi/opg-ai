import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: string;
  name: string;
  role: "ADMIN" | "USER"; // use union, not colon
}

export function verifyToken(req: NextRequest): DecodedToken | null {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as DecodedToken;
    return decoded;
  } catch (err) {
    return null;
  }
}
