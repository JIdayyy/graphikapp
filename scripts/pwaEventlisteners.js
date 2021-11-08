/* eslint-disable no-console */
const fireTracking = (label) => {
    console.log(label);
};

const pwaTrackingListeners = () => {
    const fireAddToHomeScreenImpression = (event) => {
        fireTracking("Add to homescreen shown");

        event.userChoice.then((choiceResult) => {
            fireTracking(`User clicked ${choiceResult}`);
        });

        window.removeEventListener(
            "beforeinstallprompt",
            fireAddToHomeScreenImpression,
        );
    };
    window.addEventListener(
        "beforeinstallprompt",
        fireAddToHomeScreenImpression,
    );

    window.addEventListener("appinstalled", () => {
        fireTracking("PWA app installed by user!!! Hurray");
    });

    window.addEventListener("load", () => {
        let trackText;
        if (navigator && navigator.standalone) {
            trackText = "Launched: Installed (iOS)";
        } else if (matchMedia("(display-mode: standalone)").matches) {
            trackText = "Launched: Installed";
        } else {
            trackText = "Launched: Browser Tab";
        }
        fireTracking(trackText);
    });
};
export default pwaTrackingListeners;
