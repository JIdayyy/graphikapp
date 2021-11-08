import { NextApiRequest, NextApiResponse } from "next";
import createComment from "./createComment";
import deleteComment from "./deleteComment";
import getComments from "./getComments";

const comment = {
    get: async (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
        getComments(req, res),

    create: async (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
        createComment(req, res),
    delete: async (
        req: NextApiRequest,
        res: NextApiResponse,
        id: string | string[],
    ): Promise<void> => deleteComment(req, res, id),
};

export default comment;
