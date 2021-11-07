import { ApiError } from "index";
import type { NextApiRequest, NextApiResponse } from "next";
import theme from "@Fetcher/RESOLVERS/themes/themes";

type Theme = {
    id: string;
    name: string;
};

const ThemeHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<Theme[] | ApiError | { message: string }>,
) => {
    if (req.method === "GET") {
        return theme.get(req, res);
    }
    if (req.method === "POST") {
        return theme.create(req, res);
    }
    throw new Error("Method not allowed");
};

export default ThemeHandler;
