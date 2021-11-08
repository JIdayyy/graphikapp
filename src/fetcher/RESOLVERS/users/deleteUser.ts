/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "index";
import prisma from "../../../../prisma/client";
import { User } from ".prisma/client";

export default async function deleteUser(
    req: NextApiRequest,
    res: NextApiResponse<User | ApiError>,
): Promise<void> {
    const { id } = req.query;

    try {
        await prisma.user.delete({
            where: {
                id: id as string,
            },
        });
        await prisma.$disconnect();
        res.status(204).send({
            message: "user deleted",
            type: "DELETE_USER",
        });
    } catch (error: unknown) {
        console.log(error);

        res.status(500).json({
            type: "DELETE_USER_ERROR",
            message: "error during user DELETE",
            error,
        });
    }
}
