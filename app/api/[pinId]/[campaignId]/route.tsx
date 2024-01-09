import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'


export async function PATCH(
    request: Request,
    { params }: { params: { pinId: string, campaignId: string} }
  ): Promise<void | Response> {
    const body = await request.json();
    const { message, status } = body;

    if (typeof message !== 'string') {
      return new NextResponse('Invalid option value', { status: 400 });
  }

  if ( !status || typeof status !== 'string') {
    return new NextResponse('Invalid option value', { status: 400 });
}

  const campaign = await prisma.campaign.findUnique({
    where: {
      id: params.campaignId,
    },
  })
  
  if(status === "accepted"){

  const number = campaign?.pinned == undefined? 1 : campaign?.pinned + 1

    await prisma.campaign.update({
      where: {
        id: params.campaignId,
      },
      data: {
        pinned: number
      }
    })
  
    
  }

  if(status === "rejected"){

    const number = campaign?.pinned == undefined? 0 : campaign?.pinned
  
      await prisma.campaign.update({
        where: {
          id: params.campaignId,
        },
        data: {
          pinned: number
        }
      })
    
    }

    if(campaign?.pinned === campaign?.pins){
    
        await prisma.campaign.update({
          where: {
            id: params.campaignId,
          },
          data: {
            active: false
          }
        })
      
      }else{

        await prisma.campaign.update({
          where: {
            id: params.campaignId,
          },
          data: {
            active: true
          }
        })
      }
 

    const pin =  await prisma.pin.update({
        where: {
          id: params.pinId,
        },
        data: {
          status: status,
          message: message,
          reviewed: true
        }
      });

    if(!pin){
        throw new Error("pin not updated")
    }


    return NextResponse.json(pin);
  };