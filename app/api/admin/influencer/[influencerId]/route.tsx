import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'


export async function PATCH(
    request: Request,
    { params }: { params: { influencerId: string} }
  ): Promise<void | Response> {
    const body = await request.json();
    const { followers, status } = body;

    if (!status) {
      return new NextResponse('Status is required', { status: 400 });
    }
  
  if (status == "accepted"){

    if (!followers) {
      return new NextResponse('Followers count required', { status: 400 });
    }

    const influencer =  await prisma.influencer.update({
      where: {
        id: params.influencerId,
      },
      data: {
        instaVerified: true,
        status: status,
        link: "",
        followers: followers
      }
    });


    if(!influencer){
      throw new Error("influencer not updated")
  }

  return NextResponse.json(influencer);
  }


  if (status == "rejected"){

    const influencer =  await prisma.influencer.update({
      where: {
        id: params.influencerId,
      },
      data: {
        status: status,
        linkSub: false
      }
    });


    if(!influencer){
      throw new Error("influencer not updated")
  }

  return NextResponse.json(influencer);
  }

  };