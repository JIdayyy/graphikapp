import { NextApiRequest, NextApiResponse } from "next";
import register from "./methods/register";
import login from "./methods/login";
import refresh from "./methods/refresh";

const auth = {
    login: async (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
        login(req, res),
    register: async (
        req: NextApiRequest,
        res: NextApiResponse,
    ): Promise<void> => register(req, res),
    refresh: async (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
        refresh(req, res),
};

export default auth;
