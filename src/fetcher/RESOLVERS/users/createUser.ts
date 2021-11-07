/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "index";
import prisma from "../../../../prisma/client";
import { User } from ".prisma/client";

export default async function createUser(
    req: NextApiRequest,
    res: NextApiResponse<User | ApiError>,
): Promise<void> {
    const { body } = req;
    try {
        const user = await prisma.user.create({
            data: {
                ...body,
            },
        });
        await prisma.$disconnect();
        res.status(201).json(user);
    } catch (error: unknown) {
        res.status(500).json({
            type: "Error",
            message: "CREATE_USER_ERROR",
            error,
        });
    }
}
