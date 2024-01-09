import prisma from "@/prisma"

export const dbConnect = async () => {
    try {
        await prisma.$connect();
    } catch (error) {
        throw new Error("Error connecting")
    }
}