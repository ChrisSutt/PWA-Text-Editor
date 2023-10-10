// Get the reference to the install button
const installButton = document.getElementById("buttonInstall");


window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the default behavior of the install prompt
    event.preventDefault();

    // Store the event for later use
    window.deferredPrompt = event;

    // Show the install button by removing the 'hidden' class
    installButton.classList.toggle('hidden', false);
});


installButton.addEventListener('click', async () => {
    // Retrieve the stored prompt event
    const promptEvent = window.deferredPrompt;
    
    // Check if the prompt event is available
    if (!promptEvent) {
        return;
    }

    // Display the installation prompt to the user
    promptEvent.prompt();

    // Reset the deferred prompt variable as it can only be used once
    window.deferredPrompt = null;

    // Hide the install button after the prompt is shown
    installButton.classList.toggle('hidden', true);
});


window.addEventListener('appinstalled', (event) => {
    // Clear the stored prompt event after the app is successfully installed
    window.deferredPrompt = null;
});
