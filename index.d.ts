import Drawing from ".prisma/client";

type TDrawing = {
    id: string;
    name: string;
    url: string;
    theme: string;
};

type DrawingInput = Omit<Drawing.Drawing, "id">;
