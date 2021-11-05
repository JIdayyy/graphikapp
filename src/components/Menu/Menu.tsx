import React, { ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { forwardRef, Box } from "@chakra-ui/react";
import MenuList from "./MenuList";

interface IProps {
    isMenu: boolean;
}
const MotionBox = motion(Box);

const Menu = forwardRef(
    ({ isMenu }: IProps, ref): ReactElement => (
        <div ref={ref}>
            <AnimatePresence>
                {isMenu && (
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
                        initial={{ x: -999 }}
                        animate={{ x: 0, width: "70%" }}
                        transition={{ default: { duration: 0.5 } }}
                        exit={{ width: 0, x: -999 }}
                    >
                        <MenuList />
                    </MotionBox>
                )}
            </AnimatePresence>
        </div>
    ),
);
export default Menu;
