// ===== LENSGLOW — SHARED COMPONENTS =====
// This file injects the shared premium navbar and footer across all pages

(function () {
    'use strict';

    // --- Configuration ---
    const BRAND_NAME = 'LensGlow';
    const BRAND_TAGLINE = 'Mobile Headlight Restoration & Lens Polishing';
    const CURRENT_YEAR = new Date().getFullYear();
    const PHONE = '+1 (555) 892-4710';
    const EMAIL = 'hello@lensglow.co';
    const ADDRESS = '127 Clearview Drive, Metro City';

    const NAV_LINKS = [
        { label: 'Home', href: 'index.html', icon: 'fa-home' },
        { label: 'Home 2', href: 'home2.html', icon: 'fa-door-open' },
        { label: 'Services', href: 'services.html', icon: 'fa-wrench' },
        { label: 'Gallery', href: 'gallery.html', icon: 'fa-images' },
        { label: 'Pricing', href: 'pricing.html', icon: 'fa-tags' },
        { label: 'Zones', href: 'zones.html', icon: 'fa-map-marker-alt' },
        { label: 'Booking', href: 'booking.html', icon: 'fa-calendar-check' },
        { label: 'Contact', href: 'contact.html', icon: 'fa-envelope' }
    ];

    const SOCIAL_LINKS = [
        { icon: 'fab fa-facebook-f', href: '#', hoverColor: 'hover:text-sky-600 dark:hover:text-sky-400', label: 'Facebook' },
        { icon: 'fab fa-instagram', href: '#', hoverColor: 'hover:text-pink-600 dark:hover:text-pink-400', label: 'Instagram' },
        { icon: 'fab fa-youtube', href: '#', hoverColor: 'hover:text-red-600 dark:hover:text-red-400', label: 'YouTube' },
        { icon: 'fab fa-tiktok', href: '#', hoverColor: 'hover:text-gray-900 dark:hover:text-gray-100', label: 'TikTok' }
    ];

    const HEADLIGHT_SVG = `<svg width="34" height="34" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="transition-transform duration-500 group-hover:rotate-12">
        <ellipse cx="50" cy="50" rx="38" ry="32" fill="var(--logo-glass-fill)" stroke="var(--logo-primary)" stroke-width="2.5"/>
        <ellipse cx="50" cy="50" rx="22" ry="18" fill="var(--logo-beam-fill)" stroke="var(--logo-primary)" stroke-width="1.5"/>
        <circle cx="50" cy="50" r="8" fill="var(--logo-primary)" opacity="0.9"/>
        <circle cx="50" cy="50" r="4" fill="var(--logo-glow)"/>
        <path d="M68 38 L92 22" stroke="var(--logo-primary)" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
        <path d="M72 50 L96 50" stroke="var(--logo-primary)" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
        <path d="M68 62 L92 78" stroke="var(--logo-primary)" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
    </svg>`;

    // --- Get current page filename ---
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // --- Render Navbar ---
    function renderNavbar() {
        const navLinksDesktop = NAV_LINKS.map(link => {
            const isActive = link.href === currentPage ||
                (currentPage === '' && link.href === 'index.html') ||
                (currentPage === 'headlight' && link.href === 'index.html');
            return `<a href="${link.href}" class="nav-link whitespace-nowrap text-xs xl:text-[13px] font-semibold tracking-wider uppercase transition-all duration-300 hover:text-sky-500 dark:hover:text-sky-400 relative group ${isActive ? 'text-sky-500 dark:text-sky-400' : 'text-slate-700 dark:text-slate-300'}">
                ${link.label}
                <span class="absolute -bottom-1 left-0 h-0.5 bg-sky-500 dark:bg-sky-400 transition-all duration-300 group-hover:w-full ${isActive ? 'w-full' : 'w-0'}"></span>
            </a>`;
        }).join('');

        const navLinksMobile = NAV_LINKS.map(link => {
            const isActive = link.href === currentPage ||
                (currentPage === '' && link.href === 'index.html');
            return `<a href="${link.href}" class="nav-link flex items-center px-4 py-3.5 text-base font-bold border-b border-slate-100 dark:border-slate-800 hover:text-sky-500 dark:hover:text-sky-400 transition-all duration-300 ${isActive ? 'text-sky-500 dark:text-sky-400 bg-sky-50/50 dark:bg-sky-900/10' : 'text-slate-700 dark:text-slate-200'}">
                <i class="fas ${link.icon} w-6 text-sm opacity-50 mr-2 rtl:mr-0 rtl:ml-2 text-center"></i> ${link.label}
            </a>`;
        }).join('');

        return `
        <nav id="main-nav" class="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-all duration-300">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 xl:px-6">
                <div class="flex justify-between items-center h-20">
                    <!-- Logo -->
                    <a href="index.html" class="flex items-center gap-2 group">
                        ${HEADLIGHT_SVG}
                        <span class="font-bold text-xl tracking-tight text-slate-950 dark:text-sky-100 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors" style="font-family: 'Outfit', sans-serif;">
                            ${BRAND_NAME}
                        </span>
                    </a>

                    <!-- Desktop Nav Links -->
                    <div id="desktop-links" class="hidden xl:flex items-center gap-3 xl:gap-5">
                        ${navLinksDesktop}
                    </div>

                    <!-- Right Side Actions -->
                    <div class="flex items-center gap-2 xl:gap-2.5">
                        <!-- RTL Toggle -->
                        <button id="dir-toggle" class="js-dir-toggle hidden xl:flex w-10 h-10 items-center justify-center rounded-xl bg-slate-100/40 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700 hover:border-sky-500/50 hover:bg-sky-50 dark:hover:bg-slate-700 transition-all shadow-sm group" aria-label="Toggle text direction">
                            <i class="fas fa-exchange-alt text-sm text-slate-600 dark:text-slate-400 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors"></i>
                        </button>

                        <!-- Theme Toggle -->
                        <button id="theme-toggle-desktop" class="js-theme-toggle hidden xl:flex w-10 h-10 items-center justify-center rounded-xl bg-slate-100/40 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700 hover:border-sky-500/50 hover:bg-sky-50 dark:hover:bg-slate-700 transition-all shadow-sm group" aria-label="Toggle theme">
                            <i class="fas fa-moon text-sm text-slate-600 dark:text-slate-400 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors"></i>
                        </button>

                        <!-- Secondary CTA -->
                        <a href="booking.html" class="hidden xl:inline-block border border-sky-500 text-sky-500 dark:text-sky-400 dark:border-sky-400 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500 dark:hover:text-white px-3 py-2 xl:px-4 xl:py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-sm whitespace-nowrap">
                            Book Now
                        </a>

                        <!-- Primary CTA -->
                        <a href="signup.html" class="hidden xl:inline-block bg-sky-500 text-white px-3 py-2 xl:px-4 xl:py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-sky-600 dark:bg-sky-500 dark:hover:bg-sky-600 shadow-lg shadow-sky-500/20 transition-all active:scale-95 btn-shine whitespace-nowrap">
                            Sign Up
                        </a>

                        <!-- Mobile Menu Button -->
                        <button id="mobile-menu-btn" class="xl:hidden p-2 text-slate-700 dark:text-slate-300 focus:outline-none hover:bg-slate-100/50 dark:hover:bg-slate-800 rounded-lg transition-colors" aria-label="Toggle menu">
                            <i class="fas fa-bars text-2xl" id="menu-icon"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Mobile Menu -->
            <div id="mobile-menu" class="hidden xl:hidden bg-white/95 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 transition-all duration-300 max-h-[85vh] overflow-y-auto">
                <div class="max-w-7xl mx-auto px-4 pt-4 pb-8">
                    <div class="grid grid-cols-1 gap-1 mb-6">
                        ${navLinksMobile}
                    </div>
                    <div class="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-850 pt-6">
                        <div class="flex gap-3 w-full sm:w-auto">
                            <button class="js-dir-toggle flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100/40 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700 transition-all flex-1 sm:flex-none justify-center">
                                <i class="fas fa-exchange-alt text-sm"></i>
                                <span class="text-xs font-bold uppercase tracking-widest">LTR / RTL</span>
                            </button>
                            <button class="js-theme-toggle flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100/40 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700 transition-all flex-1 sm:flex-none justify-center">
                                <i class="fas fa-moon text-sm"></i>
                                <span class="text-xs font-bold uppercase tracking-widest">Theme</span>
                            </button>
                        </div>
                        <div class="flex gap-2 w-full sm:w-auto">
                            <a href="booking.html" class="flex-1 sm:flex-none text-center border border-sky-500 text-sky-500 dark:text-sky-400 dark:border-sky-400 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500 dark:hover:text-white px-5 py-3.5 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all">
                                Book Now
                            </a>
                            <a href="signup.html" class="flex-1 sm:flex-none text-center bg-sky-500 text-white px-5 py-3.5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-sky-600 dark:bg-sky-500 dark:hover:bg-sky-600 shadow-lg transition-all">
                                Sign Up
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>`;
    }

    // --- Render Footer ---
    function renderFooter() {
        const socialLinksHtml = SOCIAL_LINKS.map(s =>
            `<a href="${s.href}" aria-label="${s.label}" class="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 ${s.hoverColor} hover:-translate-y-1 transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-sky-500/30 hover:shadow-lg">
                <i class="${s.icon}"></i>
            </a>`
        ).join('');

        return `
        <footer class="bg-slate-50/40 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-850 pt-16 pb-6 transition-colors duration-300">
            <div class="max-w-7xl mx-auto px-4">
                <!-- Main Footer Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <!-- Brand Column -->
                    <div class="lg:col-span-1 space-y-6">
                        <a href="index.html" class="flex items-center gap-2 group">
                            ${HEADLIGHT_SVG}
                            <span class="font-bold text-xl tracking-tight text-slate-900 dark:text-sky-100" style="font-family: 'Outfit', sans-serif;">${BRAND_NAME}</span>
                        </a>
                        <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            ${BRAND_TAGLINE}. We come to you — restoring clarity, safety, and value to your vehicle's headlights with professional-grade UV protection.
                        </p>
                        <div class="flex gap-3">
                            ${socialLinksHtml}
                        </div>
                    </div>

                    <!-- Quick Links -->
                    <div class="lg:pl-8">
                        <h4 class="font-bold mb-6 text-slate-900 dark:text-white uppercase text-xs tracking-widest">Quick Links</h4>
                        <ul class="text-sm space-y-3 text-slate-600 dark:text-slate-400">
                            <li><a href="index.html" class="hover:text-sky-500 dark:hover:text-sky-400 hover:pl-2 transition-all duration-200 block">Home</a></li>
                            <li><a href="home2.html" class="hover:text-sky-500 dark:hover:text-sky-400 hover:pl-2 transition-all duration-200 block">Home 2 (Premium)</a></li>
                            <li><a href="services.html" class="hover:text-sky-500 dark:hover:text-sky-400 hover:pl-2 transition-all duration-200 block">Our Services</a></li>
                            <li><a href="gallery.html" class="hover:text-sky-500 dark:hover:text-sky-400 hover:pl-2 transition-all duration-200 block">Before & After Gallery</a></li>
                            <li><a href="pricing.html" class="hover:text-sky-500 dark:hover:text-sky-400 hover:pl-2 transition-all duration-200 block">Pricing & Calculator</a></li>
                        </ul>
                    </div>

                    <!-- Resources -->
                    <div>
                        <h4 class="font-bold mb-6 text-slate-900 dark:text-white uppercase text-xs tracking-widest">Resources</h4>
                        <ul class="text-sm space-y-3 text-slate-600 dark:text-slate-400">
                            <li><a href="zones.html" class="hover:text-sky-500 dark:hover:text-sky-400 hover:pl-2 transition-all duration-200 block">Service Zones</a></li>
                            <li><a href="booking.html" class="hover:text-sky-500 dark:hover:text-sky-400 hover:pl-2 transition-all duration-200 block">Book Appointment</a></li>
                            <li><a href="contact.html" class="hover:text-sky-500 dark:hover:text-sky-400 hover:pl-2 transition-all duration-200 block">Contact Us</a></li>
                            <li><a href="comingsoon.html" class="hover:text-sky-500 dark:hover:text-sky-400 hover:pl-2 transition-all duration-200 block">Coming Soon</a></li>
                            <li><a href="404.html" class="hover:text-sky-500 dark:hover:text-sky-400 hover:pl-2 transition-all duration-200 block">404 Page</a></li>
                        </ul>
                    </div>

                    <!-- Newsletter -->
                    <div class="bg-sky-50/30 dark:bg-slate-900/50 p-6 rounded-2xl border border-sky-100/40 dark:border-slate-800 transition-all hover:shadow-lg">
                        <h4 class="font-bold mb-2 text-slate-900 dark:text-white">Stay Clear</h4>
                        <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">Subscribe for headlight care tips, seasonal offers, and restoration guides.</p>
                        <form id="newsletter-form" class="space-y-2">
                            <input type="email" required placeholder="Enter your email"
                                class="w-full px-4 py-3 text-sm bg-white dark:bg-slate-800 border border-slate-250 dark:border-slate-700 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 dark:focus:border-sky-400 dark:focus:ring-sky-400 rounded-xl outline-none transition-all dark:text-white" />
                            <button type="submit" class="w-full bg-sky-500 hover:bg-sky-600 dark:bg-sky-500 dark:hover:bg-sky-600 text-white text-sm font-bold py-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-sky-500/20">
                                Subscribe
                            </button>
                        </form>
                        <p id="newsletter-success" class="hidden text-[10px] text-emerald-500 mt-2 font-bold animate-pulse text-center uppercase tracking-wider">Thanks for joining! 💡</p>
                    </div>
                </div>

                <!-- Bottom Bar -->
                <div class="border-t border-slate-100 dark:border-slate-850 pt-8 pb-4">
                    <div class="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p class="text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                            &copy; ${CURRENT_YEAR} ${BRAND_NAME}. <span class="mx-1">|</span> Engineered with 💎 & precision.
                        </p>
                        <div class="flex items-center gap-6">
                            <a href="#" class="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">Privacy</a>
                            <a href="#" class="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">Terms</a>
                            <a href="#" class="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">${PHONE}</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

        <!-- Back to Top Button -->
        <button id="back-to-top" aria-label="Back to top" class="fixed bottom-8 right-8 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-sky-500 text-white border-none cursor-pointer opacity-0 translate-y-5 transition-all duration-300 hover:bg-sky-600 shadow-lg hover:-translate-y-1 hover:scale-105 active:scale-95">
            <i class="fas fa-chevron-up"></i>
        </button>`;
    }

    // --- Inject Global Styles ---
    function injectGlobalStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .card {
                display: flex !important;
                flex-direction: column !important;
                height: 100% !important;
                align-self: stretch !important;
            }
            .card > *:last-child {
                margin-top: auto !important;
            }
            .pricing-card {
                display: flex !important;
                flex-direction: column !important;
                height: 100% !important;
                align-self: stretch !important;
            }
            .pricing-card .btn {
                margin-top: auto !important;
            }
            .grid-2 {
                display: grid !important;
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 24px !important;
                align-items: stretch !important;
            }
            .grid-3 {
                display: grid !important;
                grid-template-columns: repeat(3, 1fr) !important;
                gap: 24px !important;
                align-items: stretch !important;
            }
            .grid-4 {
                display: grid !important;
                grid-template-columns: repeat(4, 1fr) !important;
                gap: 24px !important;
                align-items: stretch !important;
            }
            .animate-on-scroll.visible {
                transform: none !important;
                will-change: auto !important;
            }
            @media (max-width: 1024px) {
                .grid-2 {
                    grid-template-columns: 1fr !important;
                }
                .grid-3 {
                    grid-template-columns: repeat(2, 1fr) !important;
                }
                .grid-4 {
                    grid-template-columns: repeat(2, 1fr) !important;
                }
            }
            @media (min-width: 769px) and (max-width: 1024px) {
                .grid-3 > *:last-child:nth-child(odd),
                .grid-4 > *:last-child:nth-child(odd) {
                    grid-column: 1 / span 2 !important;
                    max-width: calc(50% - 12px) !important;
                    width: 100% !important;
                    margin: 0 auto !important;
                }
            }
            @media (max-width: 768px) {
                .grid-3 {
                    grid-template-columns: 1fr !important;
                }
                .grid-4 {
                    grid-template-columns: 1fr !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // --- Initialize ---
    function init() {
        injectGlobalStyles();

        const navContainer = document.getElementById('navbar-container');
        if (navContainer) {
            navContainer.innerHTML = renderNavbar();
        }

        const footerContainer = document.getElementById('footer-container');
        if (footerContainer) {
            footerContainer.innerHTML = renderFooter();
        }

        initTheme();
        initDirection();
        initMobileMenu();
        initScrollEffects();
        initNewsletter();
        initScrollReveal();
    }

    // --- Theme Logic ---
    function initTheme() {
        const html = document.documentElement;
        const themeBtns = document.querySelectorAll('.js-theme-toggle');

        const setTheme = (isDark) => {
            if (isDark) {
                html.classList.add('dark');
                themeBtns.forEach(btn => {
                    const icon = btn.querySelector('i');
                    if (icon) icon.className = 'fas fa-sun text-sm text-yellow-400';
                    const span = btn.querySelector('span');
                    if (span) span.textContent = 'Light Mode';
                });
                localStorage.setItem('lg-dark-mode', 'true');
            } else {
                html.classList.remove('dark');
                themeBtns.forEach(btn => {
                    const icon = btn.querySelector('i');
                    if (icon) icon.className = 'fas fa-moon text-sm text-slate-600 dark:text-slate-400';
                    const span = btn.querySelector('span');
                    if (span) span.textContent = 'Dark Mode';
                });
                localStorage.setItem('lg-dark-mode', 'false');
            }
        };

        themeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                setTheme(!html.classList.contains('dark'));
            });
        });

        const storedTheme = localStorage.getItem('lg-dark-mode');
        if (storedTheme === 'true' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setTheme(true);
        } else {
            setTheme(false);
        }
    }

    // --- RTL/LTR Direction ---
    function initDirection() {
        const html = document.documentElement;
        const dirBtns = document.querySelectorAll('.js-dir-toggle');

        const setDir = (dir) => {
            html.setAttribute('dir', dir);
            localStorage.setItem('lg-rtl', dir === 'rtl' ? 'true' : 'false');
            dirBtns.forEach(btn => {
                const span = btn.querySelector('span');
                if (span) {
                    span.textContent = dir === 'rtl' ? 'RTL' : 'LTR';
                }
            });
        };

        dirBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const currentDir = html.getAttribute('dir') || 'ltr';
                setDir(currentDir === 'ltr' ? 'rtl' : 'ltr');
            });
        });

        if (localStorage.getItem('lg-rtl') === 'true') {
            setDir('rtl');
        } else {
            setDir('ltr');
        }
    }

    // --- Mobile Menu ---
    function initMobileMenu() {
        const menuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuIcon = document.getElementById('menu-icon');

        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', () => {
                const isHidden = mobileMenu.classList.toggle('hidden');
                if (menuIcon) {
                    menuIcon.className = isHidden ? 'fas fa-bars text-2xl' : 'fas fa-times text-2xl';
                }
            });
        }
    }

    // --- Scroll Effects ---
    function initScrollEffects() {
        const backToTop = document.getElementById('back-to-top');
        const nav = document.getElementById('main-nav');

        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;

            if (backToTop) {
                if (scrollTop > 400) {
                    backToTop.classList.remove('opacity-0', 'translate-y-5');
                    backToTop.classList.add('opacity-100', 'translate-y-0');
                } else {
                    backToTop.classList.remove('opacity-100', 'translate-y-0');
                    backToTop.classList.add('opacity-0', 'translate-y-5');
                }
            }

            if (nav) {
                if (scrollTop > 10) {
                    nav.classList.add('shadow-lg', 'bg-white/95', 'dark:bg-slate-950/95');
                } else {
                    nav.classList.remove('shadow-lg');
                }
            }
        });

        if (backToTop) {
            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    // --- Newsletter Form ---
    function initNewsletter() {
        const form = document.getElementById('newsletter-form');
        if (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                const btn = this.querySelector('button');
                const success = document.getElementById('newsletter-success');

                btn.innerHTML = '<i class="fas fa-circle-notch animate-spin"></i> Subscribing...';

                setTimeout(() => {
                    this.classList.add('hidden');
                    if (success) success.classList.remove('hidden');
                }, 1500);
            });
        }
    }

    // --- Scroll Reveal ---
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal');
        if (revealElements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        revealElements.forEach(el => observer.observe(el));
    }

    // --- DOM Ready ---
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
