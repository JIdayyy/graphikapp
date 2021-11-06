import React from "react";
import { Text } from "@chakra-ui/react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

type TLink = {
    name: string;
    link: string;
    icon: string;
    id: string;
};

interface Props {
    link: TLink;
    icon: string;
}

const MotionText = motion(Text);

const MenuItem = ({ link, icon }: Props): JSX.Element => (
    <Link passHref href={link.link}>
        <MotionText
            width="100%"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            display="flex"
            paddingX={2}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            fontWeight="bold"
            fontSize="base"
            marginY="0.5rem"
            color="purple.default"
        >
            {link.name}
            <Image src={icon} width={24} height={24} />
        </MotionText>
    </Link>
);

export default MenuItem;
