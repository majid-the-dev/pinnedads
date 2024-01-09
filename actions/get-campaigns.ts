import prismadb from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCampaigns() {

  try {
    const session = await getSession();

    if (!session) {
      return null;
    }

    const campaigns = await prismadb.campaign.findMany({
      where: {
        active: true
      },
      include: {
        links: true
      }
    });

    return campaigns;
  } catch (error: any) {
    throw new Error(error);
  }
}

