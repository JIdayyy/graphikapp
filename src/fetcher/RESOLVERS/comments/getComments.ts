/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "index";
import { Comment } from ".prisma/client";
import prisma from "../../../../prisma/client";

export default async function getComments(
    req: NextApiRequest,
    res: NextApiResponse<Comment[] | ApiError>,
) {
    try {
        const comments = await prisma.comment.findMany();

        return res.status(200).json(comments);
    } catch (error: unknown) {
        return res.status(500).json({
            message: "Something went wrong",
            type: "INTERNAL_SERVER_ERROR",
            error,
        });
    }
}
