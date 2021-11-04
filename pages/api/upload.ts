/* eslint-disable @typescript-eslint/naming-convention */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import cloudinary from "cloudinary";

type Data = {
    type: string;
    message: string;
    url: string;
};
export const config = {
    api: {
        bodyParser: false,
    },
};

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const signUpload = async () => {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const params = {
        timestamp,
        async: true,
    };
    const signature = await cloudinary.v2.utils.api_sign_request(
        params,
        process.env.API_SECRET as string,
    );
    return { timestamp, signature };
};

const UploadHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<Data | { message: string }>,
) => {
    try {
        const { files: incomingFile } = await new Promise((resolve, reject) => {
            const form = new IncomingForm();

            form.parse(req, (err, fields, files): void => {
                if (err) return reject(err);
                return resolve({ files });
            });
        });

        if (incomingFile.image.size > 50000) {
            return res.status(400).send({
                type: "FILE_TOO_BIG",
                message: "File is too big, limit is 5Mo",
            });
        }

        const { secure_url } = await cloudinary.v2.uploader.upload(
            incomingFile.image.filepath,
            signUpload(),
            (error, result) => {
                if (error) {
                    console.log(error);
                }
                if (result) {
                    console.log(result);
                }
            },
        );

        return res.status(200).json({
            message: "Upload successfull",
            url: secure_url,
        });
    } catch (error) {
        return res.status(500).send({ message: "Error during upload" });
    }
};
export default UploadHandler;
