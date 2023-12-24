import { User, Influencer } from "@prisma/client";


export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified" 
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeInfluencer = Omit<
  Influencer,
  "createdAt" | "updatedAt" | "emailVerified" 
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

