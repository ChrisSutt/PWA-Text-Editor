const butInstall = document.getElementById("buttonInstall");

window.addEventListener('beforeinstallprompt', (event) => {

console.log('Before Install Prompt Event:', event);

window.deferredPrompt = event;

console.log('Install Prompt Prevented. Deferred Prompt:', window.deferredPrompt);

butInstall.classList.toggle('hidden', false);
console.log('Button Install Element Visibility Toggled:', !butInstall.classList.contains('hidden'));
});

    butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        console.warn('No Deferred Prompt available.');
        return;
    }
    console.log('Button Install Clicked. Prompting Install:', promptEvent);
    promptEvent.prompt();
    // Reset the deferred prompt variable, it can only be used once.
    window.deferredPrompt = null;

    console.log('Deferred Prompt Reset. Deferred Prompt:', window.deferredPrompt);
    butInstall.classList.toggle('hidden', true);
    console.log('Button Install Element Visibility Toggled:', butInstall.classList.contains('hidden'));
});
    window.addEventListener('appinstalled', (event) => {
    // Clear the stored prompt event after the app is successfully installed
    console.log('App Installed Event:', event);
    window.deferredPrompt = null;
    console.log('Deferred Prompt Reset on App Installed. Deferred Prompt:', window.deferredPrompt);
});