import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'


export async function PATCH(
    request: Request,
    { params }: { params: { pinId: string} }
  ): Promise<void | Response> {
    const body = await request.json();
    const { approved } = body;

    if (typeof approved !== 'boolean') {
      return new NextResponse('Invalid option value', { status: 400 });
  }


    const pin =  await prisma.pin.update({
        where: {
          id: params.pinId,
        },
        data: {
          completed: approved
        }
      });

    if(!pin){
        throw new Error("pin not updated")
    }


    return NextResponse.json(pin);
  };