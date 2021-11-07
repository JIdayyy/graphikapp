import { NextApiRequest, NextApiResponse } from "next";
import createTheme from "./createTheme";
import deleteTheme from "./deleteTheme";
import getDrawings from "./getDrawings";
import getThemes from "./getThemes";

const comment = {
    get: async (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
        getThemes(req, res),

    create: async (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
        createTheme(req, res),
    delete: async (
        req: NextApiRequest,
        res: NextApiResponse,
        id: string | string[],
    ): Promise<void> => deleteTheme(req, res, id),
    getDrawingsById: async (
        req: NextApiRequest,
        res: NextApiResponse,
    ): Promise<void> => getDrawings(req, res),
};

export default comment;
