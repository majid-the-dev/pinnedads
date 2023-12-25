
import { NextResponse } from 'next/server';
import type { NextApiRequest, NextApiResponse } from 'next';


import prismadb from '@/libs/prismadb';

export async function POST(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    
    const body = await req.json();

    const { name, instagram, adtext, adtext1, adtext2, adtext3, rewrite, pinprice, pins, price, daily, audience } = body;

    if (!name) {
      throw new Error("Name is required");
    }

    if (!instagram) {
      throw new Error("Instagram is required");
    }

    if (!adtext) {
      throw new Error("Description is required");
    }

    if (!pinprice) {
      throw new Error("pinprice is required");
    }

    if (!pins) {
        throw new Error("pins is required");
      }

    if (!price) {
        throw new Error("Price is required");
      }

      if (!audience) {
        throw new Error("Audience is required");
      }

    if (!params.userId) {
      throw new Error("Post id is required");
    }

    const user = await prismadb.user.findUnique({
      where:{
        id: params.userId
      }
    })

    if (!user) {
        throw new Error("No user found");
      }


    const campaign = await prismadb.campaign.create({
      data: {
        name, 
        instagram,  
        rewrite, 
        pinprice: Number(pinprice), 
        pins: Number(pins), 
        price, 
        daily: Number(daily),
        audience,
        userId: params.userId
      }
    });

    await prismadb.adtext.create({
        data: {
            adtext1: adtext,
            adtext2: adtext1,
            adtext3: adtext2,
            adtext4: adtext3,
            campaignId: campaign.id
        }
    })

    if (!campaign) {
      throw new Error("Post not created");
    }
  
    return NextResponse.json(campaign);
  } catch (error) {
    console.log('[CAMPAIGN_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};