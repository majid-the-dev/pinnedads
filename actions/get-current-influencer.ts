import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/libs/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentInfluencer() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    console.log("Fetching user from the database...");

    const currentUser = await prisma.influencer.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    console.error("Error fetching user:", error);
    return null;
  }
}