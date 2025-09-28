
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


// Add this script to both main.html and upload.html
// Place it before the closing </body> tag

// Create and inject header navigation
function createHeaderNavigation() {
    const headerHTML = `
        <header class="header">
            <nav class="nav">
                <div class="nav-brand">
                    <a href="main.html" class="brand-link">
                        <i class="fas fa-play-circle"></i>
                        <span>𝙰𝙼𝚅 𝚅𝙴𝚁𝚂𝙴</span>
                    </a>
                </div>
                <div class="nav-links">
                    <a href="main.html" class="nav-link" data-page="gallery">
                        <i class="fas fa-images"></i>
                        <span>𝙵𝚒𝚕𝚎 𝙿𝚛𝚎𝚟𝚒𝚎𝚠</span>
                    </a>
                    <a href="upload.html" class="nav-link" data-page="upload">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <span>𝙵𝚒𝚕𝚎 𝙼𝚊𝚗𝚊𝚐𝚎𝚛</span>
                    </a>
                </div>
            </nav>
        </header>
        
        <style>
            .header {
                position: sticky;
                top: 0;
                z-index: 1000;
                background: var(--surface-color);
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }

            .nav {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem 15px;
                max-width: 1200px;
                margin: 0 auto;
            }

            .nav-brand {
                display: flex;
                align-items: center;
            }

            .brand-link {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--text-color);
                text-decoration: none;
                font-weight: 700;
                font-size: 1.2rem;
            }

            .brand-link i {
                color: var(--primary-color);
                font-size: 1.5rem;
            }

            .nav-links {
                display: flex;
                gap: 1.5rem;
            }

            .nav-link {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--text-color-secondary);
                text-decoration: none;
                padding: 0.5rem 1rem;
                border-radius: var(--border-radius);
                transition: all 0.3s ease;
                font-weight: 500;
                position: relative;
            }

            .nav-link:hover {
                color: var(--text-color);
                background: rgba(255, 255, 255, 0.05);
            }

            .nav-link.active {
                color: var(--text-color);
                background: rgba(229, 9, 20, 0.1);
            }

            .nav-link.active::after {
                content: '';
                position: absolute;
                bottom: -1px;
                left: 50%;
                transform: translateX(-50%);
                width: 30px;
                height: 2px;
                background: var(--primary-color);
                border-radius: 1px;
            }

            @media (max-width: 768px) {
                .nav {
                    flex-direction: column;
                    gap: 1rem;
                }

                .nav-links {
                    width: 100%;
                    justify-content: center;
                }

                .nav-link span {
                    display: none;
                }

                .nav-link {
                    padding: 0.5rem;
                }

                .nav-link i {
                    font-size: 1.2rem;
                }
            }

            .page-transition {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--background-color);
                z-index: 9999;
                transform: translateX(100%);
                transition: transform 0.4s ease-in-out;
            }

            .page-transition.active {
                transform: translateX(0);
            }
        </style>
    `;
    
    // Inject header at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
}

// Initialize navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'main.html';
    
    // Set active link
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
        
        // Add click event for smooth transitions
        link.addEventListener('click', function(e) {
            if (linkPage === currentPage) {
                e.preventDefault();
                return;
            }
            
            e.preventDefault();
            navigateWithTransition(linkPage);
        });
    });
}

// Handle page transitions
function navigateWithTransition(url) {
    // Create transition overlay
    const transitionOverlay = document.createElement('div');
    transitionOverlay.className = 'page-transition active';
    document.body.appendChild(transitionOverlay);
    
    // Navigate after animation
    setTimeout(() => {
        window.location.href = url;
    }, 400);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createHeaderNavigation();
    initNavigation();
});

// Handle browser back/forward navigation
window.addEventListener('pageshow', function(event) {
    // Re-initialize navigation when page is shown (including from cache)
    if (event.persisted) {
        initNavigation();
    }
});
