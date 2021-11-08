import { Box } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import MenuItem from "./Items/MenuItem";

const menuLinks = [
    { id: "1", name: "Se Connecter", link: "/", icon: "/icons/profile.png" },
    { id: "2", name: "Themes", link: "/theme", icon: "/icons/themes.png" },
    {
        id: "3",
        name: "Mes dessins",
        link: "/drawings",
        icon: "/icons/drawings.png",
    },
    {
        id: "4",
        name: "Mes commentaires",
        link: "/:id/comments/",
        icon: "/icons/comments.png",
    },
    {
        id: "5",
        name: "Réglages",
        link: "/settings",
        icon: "/icons/settings.png",
    },
];

const MenuList = (): ReactElement => (
    <Box
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="start"
    >
        {menuLinks.map((link) => (
            <MenuItem link={link} />
        ))}
    </Box>
);

export default MenuList;
