import React from "react";
import { Text } from "@chakra-ui/react";
import Link from "next/link";
import { motion } from "framer-motion";

type TLink = {
    name: string;
    link: string;
    icon: string;
    id: string;
};

interface Props {
    link: TLink;
}

const MotionText = motion(Text);

const MenuItem = ({ link }: Props): JSX.Element => (
    <Link passHref href={link.link}>
        <MotionText
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            fontWeight="bold"
            fontSize="xl"
            color="purple.default"
        >
            {link.name}
        </MotionText>
    </Link>
);

export default MenuItem;