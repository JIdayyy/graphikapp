/* eslint-disable react/no-children-prop */
import React, { ChangeEvent, ReactElement } from "react";
import { CheckIcon } from "@chakra-ui/icons";
import {
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightElement,
} from "@chakra-ui/react";

interface Props {
    name: string;
    label: string;
    placeholder: string;
    value: string | undefined;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function ControlledInput({
    value,
    handleChange,
    name,
    label,
    placeholder,
}: Props): ReactElement {
    return (
        <InputGroup>
            <InputLeftAddon
                backgroundColor="gray.200"
                color="black"
                children={label}
            />
            <Input
                color="black"
                isRequired
                boxShadow="inset 0px 1px 8px rgba(0, 0, 0, 0.5)"
                backgroundColor="gray.300"
                width="100%"
                type="text"
                value={value}
                name={name}
                placeholder={placeholder}
                _placeholder={{ color: "gray.300" }}
                border="2px"
                onChange={handleChange}
                z-index={1}
            />
            <InputRightElement children={<CheckIcon color="green.500" />} />
        </InputGroup>
    );
}
