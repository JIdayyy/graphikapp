/* eslint-disable react/no-children-prop */
import React, { ChangeEvent, ReactElement } from "react";
import { BsCheckLg } from "react-icons/bs";
import {
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightElement,
} from "@chakra-ui/react";
import { BodyPicturePost, TTheme } from "../../..";

interface Props {
    name: string;
    placeholder: string;
    postFormData: BodyPicturePost;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function ControlledInput({
    postFormData,
    handleChange,
    name,
    placeholder,
}: Props): ReactElement {
    return (
        <InputGroup>
            <InputLeftAddon
                backgroundColor="gray.200"
                color="black"
                children="Auteur"
            />
            <Input
                color="black"
                isRequired
                boxShadow="inset 0px 1px 8px rgba(0, 0, 0, 0.5)"
                backgroundColor="gray.300"
                width="100%"
                type="text"
                value={postFormData?.author_id}
                name="author_id"
                placeholder="Auteur"
                _placeholder={{ color: "gray.300" }}
                border="2px"
                onChange={handleChange}
            />
            <InputRightElement children={<BsCheckLg color="green.500" />} />
        </InputGroup>
    );
}
