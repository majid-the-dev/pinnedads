import prismadb from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getUserCampaigns() {

  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const user = await prismadb.user.findUnique({
      where: {
        email: session?.user?.email
      }
    })

    if (!user) {
      return null;
    }

    const campaigns = await prismadb.campaign.findMany({
      where:{
        userId: user.id
      }
    });

    return campaigns;
  } catch (error: any) {
    throw new Error(error);
  }
}

