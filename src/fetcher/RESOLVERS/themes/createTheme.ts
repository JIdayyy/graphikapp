/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from "next";
import { Theme } from ".prisma/client";
import prisma from "../../../../prisma/client";

export default async function createTheme(
    req: NextApiRequest,
    res: NextApiResponse<Theme | Error>,
): Promise<void> {
    const { body } = req;

    try {
        const theme = await prisma.theme.create({
            data: {
                name: body.name,
            },
        });
        res.status(201).json(theme);
    } catch (error: unknown) {
        console.log(error);
        res.status(500).json({ name: "Error", message: error as string });
    }
}
