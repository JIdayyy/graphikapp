import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";

interface IProps {
    isList: boolean;
    setIsList: React.Dispatch<React.SetStateAction<boolean>>;
    type: string;
}

function SwitchButton({ isList, setIsList, type }: IProps): JSX.Element {
    return (
        <button type="button" onClick={() => setIsList((c) => !c)}>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Text color="white" margin={1}>
                    {type}
                </Text>
                {!isList && type === "Cartes" ? (
                    <Image src="/icons/checkbox.png" width={15} height={15} />
                ) : null}
                {isList && type === "Liste" ? (
                    <Image src="/icons/checkbox.png" width={15} height={15} />
                ) : null}
            </Box>
        </button>
    );
}

export default SwitchButton;
