
/* Service worker registration + update handling */
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(reg => {
        console.log('SW registered', reg);

        if (reg.waiting) showUpdateUI();

        reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    showUpdateUI();
                }
            });
        });
    });

    navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
    });
}

function showUpdateUI() {
    document.getElementById('update-banner').style.display = 'block';
}

document.getElementById('refresh-btn').addEventListener('click', () => {
    navigator.serviceWorker.getRegistration().then(reg => {
        if (!reg || !reg.waiting) return;
        reg.waiting.postMessage({ type: 'SKIP_WAITING' });
    });
});

/* beforeinstallprompt: custom install button */
let deferredPrompt;
const installBtn = document.getElementById('pwa-install-btn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'inline-block';
});

installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    installBtn.style.display = 'none';
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    console.log('User choice', choice);
    deferredPrompt = null;
});

window.addEventListener('appinstalled', () => {
    console.log('App installed');
});

