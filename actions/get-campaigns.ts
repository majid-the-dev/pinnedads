import prismadb from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCampaigns() {

  try {
    const session = await getSession();
    const campaigns = await prismadb.campaign.findMany({
      where: {
        active: true
      }
    });

    if (!session) {
      return null;
    }

  
    return campaigns;
  } catch (error: any) {
    throw new Error(error);
  }
}

