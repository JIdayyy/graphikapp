/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "index";
import { Drawing } from ".prisma/client";
import prisma from "../../../../prisma/client";

export default async function getDrawings(
    req: NextApiRequest,
    res: NextApiResponse<Drawing[] | ApiError>,
) {
    const { id } = req.query;
    try {
        const drawings = await prisma.theme
            .findUnique({
                where: {
                    id: id as string,
                },
                rejectOnNotFound: true,
            })
            .drawings();

        return res.status(200).json(drawings);
    } catch (error: unknown) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong",
            type: "GET_THEME_DRAWINGS_ERROR",
        });
    }
}
