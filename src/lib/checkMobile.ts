import { NextRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { UAParser } from "ua-parser-js";

const parser = new UAParser();

const checkMobile = async (
    setter: Dispatch<SetStateAction<boolean | null>>,
    router: NextRouter,
) => {
    const device = parser.getDevice();
    if (device.type !== "mobile") {
        await router.push("/desktop/");
        setter(true);
    }
    if (device.type === "mobile") {
        await router.push("/");
        setter(false);
    }
};

export default checkMobile;
