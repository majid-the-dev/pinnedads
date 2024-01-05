import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'


export async function PATCH(
    request: Request,
    { params }: { params: { influencerId: string} }
  ): Promise<void | Response> {
    const body = await request.json();
    const { link } = body;

    if (!link) {
      return new NextResponse('Link is required', { status: 400 });
  }
  


    const influencer =  await prisma.influencer.update({
        where: {
          id: params.influencerId,
        },
        data: {
          link: link,
          linkSub: true
        }
      });

    if(!influencer){
        throw new Error("influencer not updated")
    }


    return NextResponse.json(influencer);
  };