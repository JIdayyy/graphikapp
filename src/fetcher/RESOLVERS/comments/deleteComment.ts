import { ApiError } from "index";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";
import { Comment } from ".prisma/client";

export default async function deleteComment(
    req: NextApiRequest,
    res: NextApiResponse<Comment | ApiError>,
    id: string | string[],
) {
    try {
        await prisma.comment.delete({
            where: {
                id: id as string,
            },
        });
        await prisma.$disconnect();
        return res.status(204).send({
            message: "Comment deleted",
            type: "DELETE_COMMENT",
        });
    } catch (error: unknown) {
        return res
            .status(500)
            .json({ message: "Error", type: error as string });
    }
}
