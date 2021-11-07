/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/naming-convention */
import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import cloudinary from "cloudinary";
import createDrawing from "@Fetcher/RESOLVERS/drawings/createDrawing";
import { ApiError, DrawingInput } from "../../..";

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
    res: NextApiResponse<ApiError | { drawing_url: string } | DrawingInput>,
) => {
    try {
        const { files: incomingFile, fields: formFields } = await new Promise(
            (resolve, reject) => {
                const form = new IncomingForm();

                form.parse(req, (err, fields, files): void => {
                    if (err) return reject(err);
                    return resolve({ files, fields });
                });
            },
        );
        const { drawing_name, author_id, theme_id } = formFields;
        if (incomingFile.image.size > 10000000) {
            return res.status(413).send({
                type: "FILE_TOO_BIG",
                message: "File is too big, limit is 10Mo",
            });
        }

        const cloudinaryRes = await cloudinary.v2.uploader.upload(
            incomingFile.image.filepath,
            signUpload(),
            async (error, result) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send({
                        message: "Error during upload",
                        type: "CLOUDINARY_ERROR",
                    });
                }
                if (result) {
                    console.log("UPLOADED SUCCESSFULLY");
                    const newDrawing = await createDrawing({
                        author_id,
                        drawing_name,
                        theme_id,
                        url: result.secure_url,
                        isEnable: true,
                    });

                    return console.log(
                        "Drawing saved successfully",
                        newDrawing,
                    );
                }
                return error;
            },
        );

        return res.status(201).send({ drawing_url: cloudinaryRes.secure_url });
    } catch (error) {
        return res.status(500).send({
            message: "Error during upload",
            type: "UPLOAD_ERROR",
            error,
        });
    }
};

export default UploadHandler;
