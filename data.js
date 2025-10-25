// Image data for AMV VERSE
const images = [
    "may-i-ask-for-one-final-thing-card.jpg",
    "a-couple-of-cuckoos-card.jpg",
    "a-couple-of-cuckoos-season-2-card.jpg",
    "a-silent-voice-card.jpg",
    "alya-sometimes-hides-her-feelings-in-russian-card.jpg",
    "ameku-md-doctor-detective-card.jpg",
    "attack-on-titan-card.jpg",
    "attack-on-titan-oad-card.jpg",
    "attack-on-titan-season-2-card.jpg",
    "attack-on-titan-season-4-card.jpg",
    "attack-on-titan-the-movie-the-last-attack-card.jpg",
    "battle-through-the-heavens-card.jpg",
    "blue-lock-movie-episode-nagi-card.jpg",
    "dan-da-dan-card.jpg",
    "dan-da-dan-season-2-card.jpg",
    "demon-slayer-infinity-castle-card.jpg",
    "demon-slayer-kimetsu-no-yaiba-season-2-card.jpg",
    "demon-slayer-mugen-train-card.jpg",
    "eclipse-of-illusion-card.jpg",
    "fragrant-flower-blooms-with-dignity-card.jpg",
    "garden-of-words-card.jpg",
    "hello-world-card.jpg",
    "honey-lemon-soda-card.jpg",
    "horimiya-the-missing-piece-card.jpg",
    "horimiya-the-missing-piece-season-2-card.jpg",
    "im-getting-married-to-a-girl-i-hate-card.jpg",
    "jujutsu-kaisen-0-card.jpg",
    "jujutsu-kaisen-card.jpg",
    "jujutsu-kaisen-s2-card.jpg",
    "lord-of-the-mysteries-card.jpg",
    "maha-narsimha-card.jpg",
    "makeine-too-many-losing-heroines-card.jpg",
    "ne-zha-2-card.jpg",
    "ne-zha-card.jpg",
    "over-the-divine-realms-card.jpg",
    "sakamoto-days-card.jpg",
    "solo-leveling-2-card.jpg",
    "solo-leveling-card.jpg",
    "soul-land-2-card.jpg",
    "soul-land-card.jpg",
    "suzume-no-tojimari-card.jpg",
    "the-angel-next-door-spoils-me-rotten-card.jpg",
    "the-apothecary-diaries-2-card.jpg",
    "the-apothecary-diaries-card.jpg",
    "throne-of-seal-movie-the-crownless-god-card.jpg",
    "vtuber-legend-how-i-went-viral-card.jpg",
    "weathering-with-you-card.jpg",
    "white-snake-card.jpg",
    "your-name-card.jpg",
    "battle-through-the-heavens-character-Xiao_Yan.jpg",
    "battle-through-the-heavens-character-Xiao_Yi_Xian.jpg",
    "battle-through-the-heavens-character-Yao_Lao.jpg",
    "battle-through-the-heavens-character-Xun_Er.jpg",
    "battle-through-the-heavens-character-Medusa.jpg",
    "battle-through-the-heavens-character-Zi_Yan.jpg",
    "battle-through-the-heavens-poster-1.jpg",
    "soul-land-2-character-Huo_Yuhao.jpg",
    "soul-land-2-character-Tang_Wutong.jpg",
    "soul-land-2-character-Skydream_Iceworm.jpg",
    "soul-land-2-character-Ice_Empress.jpg",
    "soul-land-2-character-Snow_Emperor.jpg",
    "soul-land-2-character-Bei_Bei.jpg",
    "soul-land-2-screenshot-1.jpg",
    "soul-land-2-screenshot-2.jpg",
    "soul-land-2-screenshot-3.jpg",
    "soul-land-2-screenshot-4.jpg",
    "soul-land-character-Tang_San.jpg",
    "soul-land-character-Xiao_Wu.jpg",
    "soul-land-character-Dai_Mubai.jpg",
    "soul-land-character-Zhu_Zhuqing.jpg",
    "soul-land-character-Ning_Rongrong.jpg",
    "soul-land-character-Oscar.jpg",
    "soul-land-character-Ma_Hongjun.jpg",
    "soul-land-character-Bai_Chenxiang.jpg",
    "soul-land-screenshot-1.jpg",
    "soul-land-screenshot-2.jpg",
    "soul-land-screenshot-3.jpg",
    "soul-land-screenshot-4.jpg",
    "eclipse-of-illusion-poster-1.jpg",
    "eclipse-of-illusion-character-Yan_Che.jpg",
    "eclipse-of-illusion-character-Lu_Qichao.jpg",
    "eclipse-of-illusion-character-Yue_Wangshu.jpg",
    "eclipse-of-illusion-screenshot-1.jpg",
    "eclipse-of-illusion-screenshot-2.jpg",
    "eclipse-of-illusion-screenshot-3.jpg",
    "eclipse-of-illusion-screenshot-4.jpg",
    "eclipse-of-illusion-screenshot-5.jpg",
    "eclipse-of-illusion-screenshot-6.jpg",
    "eclipse-of-illusion-screenshot-7.jpg",
    "demon-slayer-kimetsu-no-yaiba-season-1-card.jpg",
    "battle-through-the-heavens-poster.jpg",
    "soul-land-2-poster.jpg",
    "eclipse-of-illusion-poster.jpg",
    "soul-land-2-screenshot-7.jpg",
    "true-beauty-card.jpg",
    "my-status-as-an-assassin-obviously-exceeds-the-hero-card.jpg",
    "no-longer-allowed-in-another-world-card.jpg",
    "the-glassworker-card.jpg",
    "berserk-of-gluttony-card.jpg",
    "new-saga-card.jpg",
    "true-beauty-poster.jpg",
    "soul-land-2-poster-2.jpg",
    "soul-land-2-poster-1.jpg",
    "battle-through-the-heavens-screenshot-1.jpg",
    "battle-through-the-heavens-screenshot-2.jpg",
    "battle-through-the-heavens-screenshot-3.jpg",
    "battle-through-the-heavens-screenshot-4.jpg",
    "battle-through-the-heavens-screenshot-5.jpg",
    "jujutsu-kaisen-2-card.jpg",
    "my-status-as-an-assassin-obviously-exceeds-the-hero-poster.jpg",
    "soul-land-2-poster-3.jpg",
    "lord-of-the-mysteries-screenshot-1.jpg",
    "lord-of-the-mysteries-screenshot-2.jpg",
    "lord-of-the-mysteries-screenshot-3.jpg",
    "lord-of-the-mysteries-screenshot-4.jpg",
    "eclipse-of-illusion-poster-2.jpg"
];


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
        link.addEventListener('click', function (e) {
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
document.addEventListener('DOMContentLoaded', function () {
    createHeaderNavigation();
    initNavigation();
});

// Handle browser back/forward navigation
window.addEventListener('pageshow', function (event) {
    // Re-initialize navigation when page is shown (including from cache)
    if (event.persisted) {
        initNavigation();
    }
});
