import type { NextApiRequest, NextApiResponse } from "next";
import auth from "@Fetcher/RESOLVERS/auth/auth";

interface Data {
    email: string;
    password: string;
}

const UserHandler = (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> | void => {
    if (req.method === "POST") {
        return auth.login(req, res);
    }
    throw new Error("Method not allowed");
};
export default UserHandler;
