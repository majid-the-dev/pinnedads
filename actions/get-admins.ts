import prisma from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getSession() {
  return await getServerSession(authOptions);
}



export default async function getAdmins() {
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
    
        const admins = await prisma.admin.findMany();
    
        if (!admins) {
          return null ;
        }
    
        return admins;
    
      } catch (error: any) {
        throw new Error(error);
      }

  }