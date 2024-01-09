import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'


export async function PATCH(
    request: Request,
    { params }: { params: { influencerId: string} }
  ): Promise<void | Response> {
    try {
    const body = await request.json();
    const { status } = body;

    if (!params.influencerId) {
      return new NextResponse('Influencer Id required', { status: 400 });
    }

    if (!status) {
      return new NextResponse('Status is required', { status: 400 });
    }

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


} catch (error) {
  console.log('[INFLUENCER_PATCH]', error);
  return new NextResponse("Internal error", { status: 500 });
}
};