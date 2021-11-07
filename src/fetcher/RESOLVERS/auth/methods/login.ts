/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import Cookies from "cookies";
import jwt from "jsonwebtoken";
import prisma from "../../../../../prisma/client";
import { User } from ".prisma/client";

type UserWithoutPassword = Omit<User, "password">;

export default async function login(
    req: NextApiRequest,
    res: NextApiResponse<UserWithoutPassword | Error | { message: string }>,
): Promise<void> {
    const { body } = req;
    const cookies = new Cookies(req, res);
    try {
        const user = await prisma.user.findFirst({
            where: { email: body.email },
            rejectOnNotFound: true,
        });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        if (!bcrypt.compareSync(body.password, user.password as string)) {
            return res.status(401).json({
                message: "wrong password",
            });
        }

        const token = jwt.sign(
            {
                email: user.email,
                id: user.id,
                role: user.roles,
                name: user.name,
            },
            process.env.TOKEN_SECRET as string,
            {
                expiresIn: "3600s",
            },
        );

        const { password, ...userWithoutPassword } = user;

        await prisma.$disconnect();
        cookies.set("token", token, {
            maxAge: 3600 * 1000,
            secure: false, // set to true if your using https
            httpOnly: true,
        });
        await prisma.$disconnect();
        return res.status(201).send(userWithoutPassword);
    } catch (error: unknown) {
        console.log(error);
        res.status(500).json({
            name: "Error invalid credentials",
            message: error as string,
        });
    }
    throw new Error("Unreachable");
}
