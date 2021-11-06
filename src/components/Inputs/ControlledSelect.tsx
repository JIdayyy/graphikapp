/* eslint-disable react/no-children-prop */
import React, { ChangeEvent, ReactElement } from "react";
import { Select, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { BodyPicturePost, TTheme } from "../../..";

interface Props {
    themeList: TTheme[];
    postFormData: BodyPicturePost;
    handleSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
    label: string;
}

export default function ControlledSelect({
    themeList,
    postFormData,
    handleSelect,
    label,
}: Props): ReactElement {
    return (
        <InputGroup>
            <InputLeftAddon
                backgroundColor="gray.300"
                color="black"
                children={label}
            />
            <Select
                bg="white"
                color="gray.700"
                boxShadow="inset 0px 1px 8px rgba(0, 0, 0, 0.5)"
                backgroundColor="gray.300"
                name="theme_id"
                borderLeftRadius={0}
                onChange={handleSelect}
            >
                {themeList &&
                    themeList.map((theme) => (
                        <option color="black" key={theme.id} value={theme.id}>
                            {theme.name}
                        </option>
                    ))}
            </Select>
        </InputGroup>
    );
}
