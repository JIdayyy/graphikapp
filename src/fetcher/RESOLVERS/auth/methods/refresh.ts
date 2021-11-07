/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";
import { ApiError, UserPayload } from "index";
import jwt from "jsonwebtoken";

export default async function refresh(
    req: NextApiRequest,
    res: NextApiResponse<UserPayload | ApiError>,
): Promise<void> {
    try {
        const cookies = new Cookies(req, res);
        const token = cookies.get("token");
        if (!token) {
            return res
                .status(401)
                .json({ message: "You need to login", type: "LOGIN_ERROR" });
        }
        const user = jwt.verify(token, process.env.TOKEN_SECRET as string);

        if (typeof user === "string") {
            return res
                .status(401)
                .json({ message: "You need to login", type: "LOGIN_ERROR" });
        }
        return res.status(200).json(user as UserPayload);
    } catch (error) {
        console.log(error);
        return res.status(404).send({
            message: "error during login",
            type: "REFRESH_TOKEN_ERROR",
        });
    }
}
