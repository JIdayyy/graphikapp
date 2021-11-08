/* eslint-disable no-console */
import React from "react";
import { Button, Box, Text } from "@chakra-ui/react";
import { toast } from "react-toastify";

type THandleClick = () => void;

const notify = (handleClick: THandleClick) =>
    toast(
        <Box display="flex" justifyContent="center" flexDirection="column">
            <Text textAlign="center">
                This app can be install on your phone/computer. <br />
                Please click the install button to install the app.
            </Text>
            <Button onClick={handleClick}>INSTALL ! 🖥️</Button>
        </Box>,
    );

export default function beforeInstallPromptNotify(
    handleClick: THandleClick,
): void {
    window.addEventListener("beforeinstallprompt", (event) => {
        console.log("👍", "beforeinstallprompt", event);
        // Stash the event so it can be triggered later.
        window.deferredPrompt = event;
        notify(handleClick);
    });
}
