import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

type ApiError = {
    type: string;
    message: string;
};

type Theme = {
    id: string;
    name: string;
};

const ThemeHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<Theme[] | ApiError | { message: string }>,
) => {
    if (req.method === "GET") {
        try {
            const themes = await prisma.theme.findMany();
            res.status(200).json(themes);
        } catch (error) {
            res.status(500).json({ message: "error", type: "API_ERROR" });
        }
    }
    // if (req.method === "POST") {
    // }
    // if (req.method === "PUT") {
    // }
    // if (req.method === "DELETE") {
    // }
};

export default ThemeHandler;
