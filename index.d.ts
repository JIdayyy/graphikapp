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

type ApiError = {
    type: string;
    message: string;
    error?: unknown;
};

interface UserPayload {
    email: string;
    id: string;
    role: Role;
}

type DrawingInput = Omit<Drawing.Drawing, "id">;
