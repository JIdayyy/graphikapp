import { ApiError } from "index";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";

export default async function deleteTheme(
    req: NextApiRequest,
    res: NextApiResponse<ApiError>,
    id: string | string[],
) {
    try {
        await prisma.theme.delete({
            where: {
                id: id as string,
            },
        });
        return res.status(204).send({
            message: "theme deleted",
            type: "DELETE_theme",
        });
    } catch (error: unknown) {
        return res
            .status(500)
            .json({ message: "Error", type: error as string });
    }
}
