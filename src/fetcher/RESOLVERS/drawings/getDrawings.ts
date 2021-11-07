import { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "index";
import { Drawing } from ".prisma/client";
import prisma from "../../../../prisma/client";

export default async function getDrawings(
    req: NextApiRequest,
    res: NextApiResponse<Drawing[] | ApiError>,
) {
    try {
        const drawings = await prisma.drawing.findMany();

        return res.status(200).json(drawings);
    } catch (error: unknown) {
        return res.status(500).json({
            message: "Something went wrong",
            type: "INTERNAL_SERVER_ERROR",
            error,
        });
    }
}
