import React, { ChangeEvent, ReactElement } from "react";
import { UAParser } from "ua-parser-js";
import { Input } from "@chakra-ui/react";

interface Props {
    handleImage: (e: ChangeEvent<HTMLInputElement>) => void;
}

const parser = new UAParser();

export default function ControlledFileInput({
    handleImage,
}: Props): ReactElement {
    const device = parser.getDevice();
    return (
        <>
            {device.type === "mobile" ? (
                <Input
                    width="100%"
                    onChange={handleImage}
                    accept="image/*"
                    multiple={false}
                    type="file"
                    name="image"
                    capture="environment"
                />
            ) : (
                <Input
                    boxShadow="inset 0px 1px 8px rgba(0, 0, 0, 0.8)"
                    width="100%"
                    accept="image/*"
                    multiple={false}
                    type="file"
                    name="image"
                    onChange={handleImage}
                />
            )}
        </>
    );
}
