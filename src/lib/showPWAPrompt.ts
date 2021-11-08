/* eslint-disable no-console */
export default function showPWAPrompt(): void {
    if (window.deferredPrompt) {
        window.deferredPrompt.prompt();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.deferredPrompt.userChoice.then((choiceResult: any) => {
            console.log("👍", "userChoice", choiceResult);
            window.deferredPrompt = null;
        });
    }
}
