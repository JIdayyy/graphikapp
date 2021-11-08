import { NextApiRequest, NextApiResponse } from "next";
import getUser from "./getUsers";
import createUser from "./createUser";
import deleteUser from "./deleteUser";

const comment = {
    get: async (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
        getUser(req, res),
    create: async (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
        createUser(req, res),
    deleteUser: async (
        req: NextApiRequest,
        res: NextApiResponse,
    ): Promise<void> => deleteUser(req, res),
};

export default comment;
