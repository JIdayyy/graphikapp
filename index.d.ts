import Drawing from ".prisma/client";

export type TDrawing = {
    id: string;
    name: string;
    url: string;
    theme: TTheme;
};

export type TTheme = {
    id: string;
    name: string;
    drawings: TDrawing[];
};

type DrawingInput = Omit<Drawing.Drawing, "id">;
