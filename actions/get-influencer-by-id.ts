import prisma from "@/libs/prismadb";

interface IParams {
  influencerId: string;
}

export default async function getInfluencerById(
  params: IParams
) {
  try {
    const { influencerId } = params;

    const pin = await prisma.influencer.findUnique({
      where: {
        id: influencerId,
      }
    });

    if (!pin) {
      return null;
    }

    return pin;

  } catch (error: any) {
    throw new Error(error);
  }
}