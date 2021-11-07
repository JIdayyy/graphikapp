import type { NextApiRequest, NextApiResponse } from "next";
import users from "../../../src/fetcher/RESOLVERS/users/users";

export default async function UserHandler(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    if (req.method === "POST") {
        return users.create(req, res);
    }
    if (req.method === "GET") {
        return users.get(req, res);
    }
    if (req.method === "DELETE") {
        return users.deleteUser(req, res);
    }
    throw new Error("Method not allowed");
}
