import prisma from "@/lib/Prisma"
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer'


export async function PUT(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { email } = reqBody;

        const user = await prisma.user.findUnique({ where: { email } });


        const token = uuidv4();
    
        await prisma.user.update({
            where: { email },
            data: {
                forgotPasswordToken: token,
                forgotPasswordTokenExpiry: new Date(Date.now() + 15 * 60 * 1000),
            },
        });


        const transporter = nodemailer.createTransport({
            // @ts-ignore
            host: process.env.SMPT_HOST,
            port: process.env.SMPT_PORT,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.SMPT_MAIL,
                pass: process.env.SMPT_PASSWORD,
            },
        });
        await transporter.sendMail({
            from: `"Reset Password" <${process.env.SMPT_MAIL}>`,
            to: email,
            subject: "Reset Password Link",
            html: `<p>Click <a href="${process.env.APP_LINK}/resetPassword/${token}">here</a> to reset your password. The link expires in 15 minutes.</p>`
        });



        return NextResponse.json({ message: "If email exists, A reset link has been sent" })


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }


}