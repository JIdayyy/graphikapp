import React, { ReactElement } from "react";
import { AnimatePresence } from "framer-motion";
import { forwardRef } from "@chakra-ui/react";

import MenuList from "./MenuList";

interface IProps {
    isMenu: boolean;
}

const Menu = forwardRef(
    ({ isMenu }: IProps, ref): ReactElement => (
        <div ref={ref}>
            <AnimatePresence>{isMenu && <MenuList />}</AnimatePresence>
        </div>
    ),
);
export default Menu;
