const scrollBar = {
    "&::-webkit-scrollbar": {
        width: "3px",
    },
    "&::-webkit-scrollbar-thumb": {
        borderRadius: "20px",
        backgroundColor: "rgb(100, 100, 99)",
    },
};

export const NavScrollBar = {
    "&::-webkit-scrollbar": {
        width: "1px",
        height: "1px",
    },
    "&::-webkit-scrollbar-thumb": {
        borderRadius: "0px",
        backgroundColor: "rgb(100, 100, 99)",
    },
};

export default scrollBar;
