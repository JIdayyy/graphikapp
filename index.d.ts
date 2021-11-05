import Drawing from ".prisma/client";

export type TDrawing = {
    id: string;
    name: string;
    url: string;
    theme: string;
};

export type TTheme = {
    id: string;
    name: string;
    drawings: TDrawing[];
};

export type BodyPicturePost = {
    author_id?: string;
    theme_id?: string;
    drawing_name?: string;
};

type DrawingInput = Omit<Drawing.Drawing, "id">;
