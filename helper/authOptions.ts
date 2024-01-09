import bcryptjs from 'bcryptjs';
import { NextAuthOptions, User as IUser } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/prisma"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "./dbConnect";

interface ICustomDataOfUser extends IUser {
    roles: number[];
    status: boolean;
    is_admin: boolean;
    provider: string;
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as any,
    secret: process.env.NEXTAUTH_SECRET as string,
    pages: {
        signIn: '/login'
    },
    session: {
        strategy: "jwt",
        maxAge: 10 * 24 * 60 * 60,
        updateAge: 2 * 24 * 60 * 60
    },
    debug: process.env.NODE_ENV !== "production" && true,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                const formEmail = credentials?.email as string;
                const formPassword = credentials?.password as string;
                await dbConnect();

                // check if the user is already existing
                const isUserExist = await prisma.user.findUnique({
                    where: {
                        email: formEmail
                    }
                })
                if (!isUserExist) {
                    throw new Error("Invalid email or password");
                }

                const isValidPassword = await bcryptjs.compare(formPassword, isUserExist?.hashedPassword as string)

                // check if the password is not correct
                if (!isValidPassword) {
                    throw new Error("Invalid email or password");
                }
                return {
                    id: isUserExist?.id,
                    name: isUserExist?.name || "Guest",
                    email: isUserExist?.email
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user }) {
            const isUserActive = await prisma.user.findUnique({
                where: {
                    email: user?.email as string,
                }
            })
            // validate user status
            if (isUserActive?.status) {
                return true
            } {
                return false
            }
        },
        async jwt({ token, user, account }) {
            if (account) {
                token.accessToken = account.access_token
            }
            let customData;
            if (user) {
                token.id = user?.id
                const userNewData = user as ICustomDataOfUser

                if (!userNewData?.provider) {
                    const existUser = await prisma.user.findUnique({
                        where: {
                            email: user?.email as string,
                        }
                    })
                    customData = {
                        id: existUser?.id,
                        name: existUser?.name,
                        email: existUser?.email,
                        image: existUser?.image,
                        roles: existUser?.roles,
                        status: existUser?.status,
                        is_admin: existUser?.is_admin,
                    }
                } else {
                    customData = {
                        id: userNewData?.id,
                        name: userNewData?.name,
                        email: userNewData?.email,
                        image: userNewData?.image,
                        roles: userNewData?.roles,
                        status: userNewData?.status,
                        is_admin: userNewData?.is_admin,
                    }
                }
            }
            return ({ ...token, ...customData });
        },

        async session({ session, token }) {
            session.user = token as any
            return session

        }

    }
}