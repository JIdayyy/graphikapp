import axiosInstance from "./axiosInstance";

export const theme = {
    getAll: () => axiosInstance.get("/themes").then((r) => r.data),
    getDrawings: (id: string) =>
        axiosInstance.get(`/themes/${id}/drawings`).then((r) => r.data),
};
export const comment = {
    getAll: () => axiosInstance.get("/themes").then((r) => r.data),
};
