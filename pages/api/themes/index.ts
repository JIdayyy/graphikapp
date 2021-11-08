import type { NextApiRequest, NextApiResponse } from "next";
import theme from "@Fetcher/RESOLVERS/themes/themes";

const ThemeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        return theme.get(req, res);
    }
    if (req.method === "POST") {
        return theme.create(req, res);
    }
    throw new Error("Method not allowed");
};

export default ThemeHandler;
