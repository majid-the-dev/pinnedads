import prisma from "@/libs/prismadb";

interface IParams {
  adminId: string;
}

export default async function getAdminById(
  params: IParams
) {
  try {
    const { adminId } = params;

    const admin = await prisma.admin.findUnique({
      where: {
        id: adminId,
      }
    });

    if (!admin) {
      return null;
    }

    return admin;

  } catch (error: any) {
    throw new Error(error);
  }
}