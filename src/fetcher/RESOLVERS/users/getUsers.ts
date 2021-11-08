import { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "index";
import { User } from ".prisma/client";
import prisma from "../../../../prisma/client";

export default async function getUsers(
    req: NextApiRequest,
    res: NextApiResponse<User[] | ApiError>,
): Promise<void> {
    try {
        const users = await prisma.user.findMany();
        await prisma.$disconnect();
        res.status(200).json(users);
    } catch (error: unknown) {
        res.status(500).json({
            type: "USET_GETALL_ERROR",
            message: error as string,
            error,
        });
    }
}
