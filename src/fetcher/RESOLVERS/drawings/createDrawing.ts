/* eslint-disable no-useless-catch */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/naming-convention */
import { DrawingInput } from "../../../..";
import prisma from "../../../../prisma/client";

const createDrawing = async (drawing: DrawingInput, callback: () => void) => {
    const { drawing_name, author_id, theme_id, url } = drawing;

    try {
        const newDrawing = await prisma.drawing.create({
            data: {
                drawing_name,
                theme: {
                    connect: {
                        id: theme_id,
                    },
                },
                author: {
                    connect: {
                        id: author_id,
                    },
                },
                url,
            },
        });

        if (newDrawing) {
            console.log("Drawing saved successfully");
            return newDrawing;
        }
        return null;
    } catch (error: unknown) {
        callback();
        throw error;
        // throw error;
    }
};

export default createDrawing;
