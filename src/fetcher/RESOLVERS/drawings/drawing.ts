import { NextApiRequest, NextApiResponse } from "next";
import deleteComment from "./deleteDrawing";
import getDrawings from "./getDrawings";

const comment = {
    get: async (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
        getDrawings(req, res),
    delete: async (
        req: NextApiRequest,
        res: NextApiResponse,
        id: string | string[],
    ): Promise<void> => deleteComment(req, res, id),
};

export default comment;
