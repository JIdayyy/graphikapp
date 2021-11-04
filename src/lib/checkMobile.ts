import { NextRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

const checkMobile = async (
    width: number,
    setter: Dispatch<SetStateAction<boolean | null>>,
    router: NextRouter,
) => {
    if (width > 768 && width !== 0) {
        await router.push("/desktop/");
        setter(true);
    }
    if (width < 768 && width !== 0) {
        await router.push("/");
        setter(false);
    }
};

export default checkMobile;
