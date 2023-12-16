import bcrypt from 'bcrypt'
import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request): Promise<void | Response> {
    const body = await request.json();
    const { fname, lname, email, password, company, country } = body;

    if(!fname || !email || !password || !lname || !company || !country) {
        return new NextResponse('Missing Fields', { status: 400 })
    }

    if(typeof country !== 'string'){
        throw new Error('country not a string');
    }

    const exist = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if(exist) {
        throw new Error('Email already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {fname,lname,email, hashedPassword, country, company}
    });

    if(!user){
        throw new Error("user not created")
    }

    await prisma.bank.create({
        data: {
          userId: user.id,
        },
      });

    return NextResponse.json(user);

}