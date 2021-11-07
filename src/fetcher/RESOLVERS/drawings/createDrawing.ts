/* eslint-disable @typescript-eslint/naming-convention */
import { DrawingInput } from "../../../..";
import prisma from "../../../../prisma/client";

const createDrawing = async (drawing: DrawingInput) => {
    const { drawing_name, author_id, theme_id, url } = drawing;

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
    return newDrawing;
};

export default createDrawing;
