import prisma from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getSession() {
  return await getServerSession(authOptions);
}


export default async function getPendingInfluencer() {
    try {
        const session = await getSession();
    
        if (!session?.user?.email) {
            return null;
          }

        const currentUser = await prisma.admin.findUnique({
            where: {
              email: session.user.email as string,
            },
          });
      
          if (!currentUser) {
            return null;
          }
    
        const influencers = await prisma.influencer.findMany({
          where: {
            instaVerified: false,
            linkSub: true
          }
        });
    
        if (!influencers) {
          return null ;
        }
    
        return influencers;
    
      } catch (error: any) {
        throw new Error(error);
      }

  }