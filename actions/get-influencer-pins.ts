import prisma from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getSession() {
  return await getServerSession(authOptions);
}



export default async function getInfluencerPins() {
    try {
        const session = await getSession();
    
        if (!session?.user?.email) {
            return null;
          }

        const currentUser = await prisma.influencer.findUnique({
            where: {
              email: session.user.email as string,
            },
          });
      
          if (!currentUser) {
            return null;
          }
    
        const pins = await prisma.pin.findMany({
          where: {
            influencerId: currentUser.id,
          }
        });
    
        if (!pins) {
          return null ;
        }
    
        return pins;
    
      } catch (error: any) {
        throw new Error(error);
      }

  }