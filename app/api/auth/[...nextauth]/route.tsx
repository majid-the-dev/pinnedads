import NextAuth from "next-auth/next";
import prisma from '@/libs/prismadb'
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import InstagramProvider from "next-auth/providers/instagram";
import bcrypt from 'bcrypt'
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        InstagramProvider({
            clientId: process.env.INSTAGRAM_CLIENT_ID as string,
            clientSecret: process.env.INSTAGRAM_CLIENT_SECRET as string
          }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
                userType: { label: "Username", type: "text", placeholder: "advertiser or influencer" },
            },
            async authorize(credentials, req) {
              
                // check to see if email and password is there
                if(!credentials?.email || !credentials.password) {
                    throw new Error('Please enter an email and password')
                }
                if(credentials.userType === 'advertiser'){
                     // check to see if user exists
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                // if no user was found 
                if (!user || !user?.hashedPassword) {
                    throw new Error('No user found')
                }

                // check to see if password matches
                const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword)

                // if password does not match
                if (!passwordMatch) {
                    throw new Error('Incorrect password')
                }

                return user;
                } else if (credentials.userType === 'influencer'){
                     // check to see if user exists
                const user = await prisma.influencer.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                // if no user was found 
                if (!user || !user?.hashedPassword) {
                    throw new Error('No user found')
                }

                // check to see if password matches
                const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword)

                // if password does not match
                if (!passwordMatch) {
                    throw new Error('Incorrect password')
                }

                return user;
                } else if (credentials.userType === 'admin'){
                    // check to see if user exists
               const user = await prisma.admin.findUnique({
                   where: {
                       email: credentials.email
                   }
               });

               // if no user was found 
               if (!user || !user?.hashedPassword) {
                   throw new Error('No user found')
               }

               // check to see if password matches
               const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword)

               // if password does not match
               if (!passwordMatch) {
                   throw new Error('Incorrect password')
               }

               return user;
               }
                throw new Error('Invalid user type');
            },
        }),  
    ],
    secret: process.env.SECRET,
    session: {
        strategy: "jwt",
    },
    debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST}