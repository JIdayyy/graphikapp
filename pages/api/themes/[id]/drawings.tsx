import themes from "@Fetcher/RESOLVERS/themes/themes";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function DrawingsByThemeHandler(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    if (req.method === "GET") {
        return themes.getDrawingsById(req, res);
    }
    throw new Error("Method not allowed");
}
