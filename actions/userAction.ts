"use server"

import bcryptjs from "bcryptjs"
import { dbConnect } from "@/helper/dbConnect"
import prisma from "@/prisma"

export const createNewUser = async (formData: FormData) => {

    try {

        const data = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        }
        // ensure the fields are required
        if (!data?.name || !data?.email || !data?.password) {
            return {
                error: "Required all information."
            }
        }
        await dbConnect();
        // check if the user is already existing
        const isUserExist = await prisma.user.findUnique({
            where: {
                email: data?.email
            }
        })

        if (isUserExist) {
            return {
                error: "You already have an account!"
            }
        }
        // convert the plain password to hashed password
        // - generate salt
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(data?.password, salt);

        // save the user data

        await prisma.user.create({
            data: {
                name: data?.name,
                email: data?.email,
                hashedPassword: hashedPassword,
            }
        })

        return {
            success: true,
        }


    } catch (error) {
        return {
            error: "There was an error!"
        }
    }


}