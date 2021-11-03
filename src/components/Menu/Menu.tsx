import { AnimatePresence } from "framer-motion";
import React, { ReactElement } from "react";

import MenuList from "../Lists/MenuList";

interface IProps {
    isMenu: boolean;
}

export default function Menu({ isMenu }: IProps): ReactElement {
    return <AnimatePresence>{isMenu && <MenuList />}</AnimatePresence>;
}
