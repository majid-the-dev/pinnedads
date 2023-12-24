import bcrypt from 'bcrypt'
import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(
    request: Request,
    { params }: { params: { campaignId: string, influencerId: string } }
  ): Promise<void | Response> {
    const body = await request.json();
    const { link } = body;

    if(!link) {
        return new NextResponse('Link is required', { status: 400 })
    }


    const campaign = await prisma.campaign.findUnique({
        where: {
            id: params.campaignId
        }
    });

    if(!campaign) {
        throw new Error('Campaign does not exist')
    }

    const influencer = await prisma.influencer.findUnique({
        where: {
            id: params.influencerId
        }
    });

    if(!influencer) {
        throw new Error('Influencer does not exist')
    }



    const pin = await prisma.pin.create({
        data: {
            influencerId: params.influencerId,
            campaignId: params.campaignId,
            link: link
        }
    });

    if(!pin){
        throw new Error("pin not created")
    }


    return NextResponse.json(pin);

}