/* eslint-disable no-console */

import { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "index";
import { Theme } from ".prisma/client";
import prisma from "../../../../prisma/client";

export default async function getThemes(
    req: NextApiRequest,
    res: NextApiResponse<Theme[] | ApiError>,
) {
    try {
        const themes = await prisma.theme.findMany();

        return res.status(200).json(themes);
    } catch (error: unknown) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong",
            type: "GET_ERROR",
        });
    }
}
