import React, { ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { forwardRef, Box } from "@chakra-ui/react";
import Image from "next/image";
import MenuList from "./MenuList";

interface IProps {
    isMenu: boolean;
}

const MotionBox = motion(Box);

const Menu = forwardRef(
    ({ isMenu }: IProps, ref): ReactElement => (
        <AnimatePresence>
            {isMenu && (
                <MotionBox
                    position="fixed"
                    display="flex"
                    flexDirection="row"
                    width="100vw"
                    height="100vh"
                    initial={{ x: -999 }}
                    animate={{ x: 0 }}
                    exit={{ x: -999 }}
                    transition={{ default: { duration: 0.3 } }}
                    zIndex={999}
                >
                    <MotionBox
                        ref={ref}
                        display="flex"
                        flexDirection="column"
                        backgroundColor="white"
                        height="100%"
                        width="50%"
                    >
                        <Box
                            position="relative"
                            backgroundColor="red.default"
                            height="30%"
                            width="100%"
                        >
                            <Image src="/images/logo.png" layout="fill" />
                        </Box>
                        <MenuList />
                    </MotionBox>
                    <MotionBox
                        display="flex"
                        flexDirection="column"
                        padding="20px"
                        backgroundColor="black"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ default: { duration: 0.2, delay: 0.2 } }}
                        exit={{ opacity: 0, transition: { duration: 0 } }}
                        height="100%"
                        width="50%"
                    />
                </MotionBox>
            )}
        </AnimatePresence>
    ),
);
export default Menu;
