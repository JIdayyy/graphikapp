import { ApiError } from "index";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";

export default async function deleteDrawing(
    req: NextApiRequest,
    res: NextApiResponse<ApiError>,
    id: string | string[],
) {
    try {
        await prisma.drawing.delete({
            where: {
                id: id as string,
            },
        });
        return res.status(204).send({
            message: "drawing deleted successfully",
            type: "DELETE_DRAWING",
        });
    } catch (error: unknown) {
        return res
            .status(500)
            .json({ message: "Error", type: error as string });
    }
}
