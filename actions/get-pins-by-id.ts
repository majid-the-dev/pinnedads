import prisma from "@/libs/prismadb";

interface IParams {
  pinId: string;
}

export default async function getPinsById(
  params: IParams
) {
  try {
    const { pinId } = params;

    const pin = await prisma.pin.findUnique({
      where: {
        id: pinId,
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