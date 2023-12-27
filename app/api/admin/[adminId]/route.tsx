import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'


export async function PATCH(
    request: Request,
    { params }: { params: { adminId: string} }
  ): Promise<void | Response> {
    const body = await request.json();
    const { approved } = body;

    if (typeof approved !== 'boolean') {
      return new NextResponse('Invalid option value', { status: 400 });
  }


    const admin =  await prisma.admin.update({
        where: {
          id: params.adminId,
        },
        data: {
          admin: approved
        }
      });

    if(!admin){
        throw new Error("pin not updated")
    }


    return NextResponse.json(admin);
  };