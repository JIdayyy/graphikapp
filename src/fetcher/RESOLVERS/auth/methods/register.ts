/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import Cookies from "cookies";
import jwt from "jsonwebtoken";
import prisma from "../../../../../prisma/client";
import { User } from ".prisma/client";

type UserWithoutPassword = Omit<User, "password">;

export default async function register(
    req: NextApiRequest,
    res: NextApiResponse<UserWithoutPassword | Error | { message: string }>,
): Promise<void> {
    const { email, password, name } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
        const createdUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });
        await prisma.$disconnect();
        return res.status(200).json(createdUser);
    } catch (error) {
        console.log(error);
        return res.status(404).send({ message: "error during register" });
    }
}
