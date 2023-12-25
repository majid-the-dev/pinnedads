import bcrypt from 'bcrypt'
import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request): Promise<void | Response> {
    const body = await request.json();
    const { fname, lname, email, password } = body;

    if(!fname) {
        return new NextResponse('Name is required', { status: 400 })
    }

    if(!lname) {
        return new NextResponse('Last name is required', { status: 400 })
    }

    if(!email){
        return new NextResponse('Mail is required', { status: 400 })
    }

    if(!password){
        return new NextResponse('password is required', { status: 400 })
    }

    const exist = await prisma.admin.findUnique({
        where: {
            email
        }
    });

    if(exist) {
        throw new Error('Email already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.admin.create({
        data: {fname,lname,email, hashedPassword}
    });

    if(!user){
        throw new Error("user not created")
    }

    await prisma.bank.create({
        data: {
          userId: user.id,
        },
      });

    return NextResponse.json(body);

}