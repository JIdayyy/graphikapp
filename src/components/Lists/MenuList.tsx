import React, { ReactElement } from "react";

import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";
import MenuItem from "./Items/MenuItem";

const menuLinks = [
    { id: "1", name: "Se Connecter", link: "/", icon: "/icons/profile" },
    { id: "2", name: "Themes", link: "/theme", icon: "/icons/themes" },
    {
        id: "3",
        name: "Mes dessins",
        link: "/drawings",
        icon: "/icons/drawings",
    },
    {
        id: "4",
        name: "Mes commentaires",
        link: "/:id/comments/",
        icon: "/icons/comments",
    },
    { id: "5", name: "Réglages", link: "/settings", icon: "/icons/settings" },
];

const MotionBox = motion(Box);

const MenuList = (): ReactElement => (
    <MotionBox
        shadow="dark-lg"
        position="fixed"
        display="flex"
        flexDirection="column"
        padding="20px"
        zIndex={999}
        backgroundColor="white"
        height="100%"
        boxSize="100%"
        initial={{ x: -10, width: 0 }}
        animate={{ width: "70%" }}
        exit={{ width: 0, x: -999 }}
    >
        {menuLinks.map((link) => (
            <MenuItem link={link} />
        ))}
    </MotionBox>
);

export default MenuList;
