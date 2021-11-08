/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "index";
import prisma from "../../../../prisma/client";
import { Comment } from ".prisma/client";

export default async function createComment(
    req: NextApiRequest,
    res: NextApiResponse<Comment | ApiError>,
): Promise<void> {
    const { body } = req;

    try {
        const comment = await prisma.comment.create({
            data: {
                content: body.content,
                author: {
                    connect: {
                        id: body.authorId,
                    },
                },
                drawing: {
                    connect: {
                        id: body.drawingId,
                    },
                },
            },
        });
        await prisma.$disconnect();
        res.status(201).json(comment);
    } catch (error: unknown) {
        res.status(500).json({
            type: "COMMENT_CREATE_ERROR",
            message: "error creating the comment",
            error,
        });
    }
}
