import type { NextApiRequest, NextApiResponse } from "next";
import auth from "@Fetcher/RESOLVERS/auth/auth";

const RegisterHandler = (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> | void => {
    if (req.method === "POST") {
        return auth.register(req, res);
    }
    throw new Error("Method not allowed");
};
export default RegisterHandler;
