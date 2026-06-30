/* ============================================
   LensGlow — Mobile Headlight Restoration
   Global JavaScript
   ============================================ */

// ---- Dark Mode Toggle ----
function initDarkMode() {
    const stored = localStorage.getItem('lg-dark-mode');
    if (stored === 'true') {
        document.documentElement.classList.add('dark');
    }
    document.querySelectorAll('.dark-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            const isDark = document.documentElement.classList.contains('dark');
            localStorage.setItem('lg-dark-mode', isDark);
            updateDarkIcons();
        });
    });
    updateDarkIcons();
}

function updateDarkIcons() {
    const isDark = document.documentElement.classList.contains('dark');
    document.querySelectorAll('.dark-toggle i').forEach(icon => {
        icon.className = isDark ? 'fas fa-sun text-yellow-400' : 'fas fa-moon';
    });
}

// ---- RTL Toggle ----
function initRTL() {
    const stored = localStorage.getItem('lg-rtl');
    if (stored === 'true') {
        document.documentElement.setAttribute('dir', 'rtl');
    }
    document.querySelectorAll('.rtl-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
            document.documentElement.setAttribute('dir', isRtl ? 'ltr' : 'rtl');
            localStorage.setItem('lg-rtl', !isRtl);
        });
    });
}

// ---- Password Visibility Toggle ----
function initPasswordToggles() {
    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.closest('.input-wrapper').querySelector('input');
            const icon = btn.querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon.className = 'fa-solid fa-eye-slash';
            } else {
                input.type = 'password';
                icon.className = 'fa-solid fa-eye';
            }
        });
    });
}

// ---- Accordion ----
function initAccordion() {
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const body = item.querySelector('.accordion-body');
            const isActive = item.classList.contains('active');

            // Close all
            item.closest('.accordion')?.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.accordion-body').style.maxHeight = '0';
            });

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
                body.style.maxHeight = body.scrollHeight + 'px';
            }
        });
    });
}

// ---- Filter Tabs ----
function initFilterTabs() {
    const tabs = document.querySelectorAll('.filter-tab');
    const items = document.querySelectorAll('[data-category]');
    if (!tabs.length) return;

    const updateCentering = () => {
        const visibleItems = Array.from(items).filter(item => item.style.display !== 'none');
        items.forEach(item => item.classList.remove('grid-item-centered'));
        if (visibleItems.length % 2 !== 0 && visibleItems.length > 0) {
            const lastVisible = visibleItems[visibleItems.length - 1];
            lastVisible.classList.add('grid-item-centered');
        }
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const filter = tab.getAttribute('data-filter');

            items.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = '';
                    item.style.animation = 'scaleIn 0.35s ease';
                } else {
                    item.style.display = 'none';
                }
            });
            updateCentering();
        });
    });

    // Run initial centering
    updateCentering();
}

// ---- Scroll Animations ----
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// ---- Animated Counters ----
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                entry.target.dataset.counted = 'true';
                const target = parseInt(entry.target.getAttribute('data-count'));
                const suffix = entry.target.getAttribute('data-suffix') || '';
                const prefix = entry.target.getAttribute('data-prefix') || '';
                let current = 0;
                const step = Math.ceil(target / 60);
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    entry.target.textContent = prefix + current.toLocaleString() + suffix;
                }, 25);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

// ---- Before/After Slider ----
function initBASliders() {
    document.querySelectorAll('.ba-slider').forEach(slider => {
        const handle = slider.querySelector('.ba-handle');
        const afterImg = slider.querySelector('.ba-after');
        if (!handle || !afterImg) return;

        let isDragging = false;

        const updatePosition = (x) => {
            const rect = slider.getBoundingClientRect();
            let percent = ((x - rect.left) / rect.width) * 100;
            percent = Math.max(2, Math.min(98, percent));
            handle.style.left = percent + '%';
            afterImg.style.clipPath = `inset(0 0 0 ${percent}%)`;
        };

        handle.addEventListener('mousedown', (e) => {
            isDragging = true;
            e.preventDefault();
        });
        slider.addEventListener('mousedown', (e) => {
            isDragging = true;
            updatePosition(e.clientX);
        });

        window.addEventListener('mousemove', (e) => {
            if (isDragging) updatePosition(e.clientX);
        });
        window.addEventListener('mouseup', () => isDragging = false);

        // Touch support
        handle.addEventListener('touchstart', (e) => {
            isDragging = true;
            e.preventDefault();
        });
        slider.addEventListener('touchstart', (e) => {
            isDragging = true;
            updatePosition(e.touches[0].clientX);
        });
        window.addEventListener('touchmove', (e) => {
            if (isDragging) updatePosition(e.touches[0].clientX);
        });
        window.addEventListener('touchend', () => isDragging = false);
    });
}

// ---- Price Calculator ----
function initPriceCalculator() {
    const calcForm = document.getElementById('price-calculator');
    if (!calcForm) return;

    const vehicleSelect = document.getElementById('calc-vehicle');
    const serviceSelect = document.getElementById('calc-service');
    const addons = document.querySelectorAll('.calc-addon');
    const totalEl = document.getElementById('calc-total');

    const servicePrices = {
        'headlight-basic': 79,
        'headlight-standard': 129,
        'headlight-premium': 199,
        'taillight': 89,
        'foglight': 69
    };

    const vehicleMultipliers = {
        'sedan': 1,
        'suv': 1.15,
        'truck': 1.25,
        'luxury': 1.4,
        'fleet': 0.85
    };

    const calculate = () => {
        const vehicle = vehicleSelect?.value || 'sedan';
        const service = serviceSelect?.value || 'headlight-basic';
        let base = servicePrices[service] || 79;
        const multiplier = vehicleMultipliers[vehicle] || 1;
        let addonTotal = 0;

        addons.forEach(addon => {
            if (addon.checked) {
                addonTotal += parseFloat(addon.dataset.price) || 0;
            }
        });

        const total = Math.round((base * multiplier) + addonTotal);
        if (totalEl) {
            totalEl.textContent = '$' + total;
        }
    };

    if (vehicleSelect) vehicleSelect.addEventListener('change', calculate);
    if (serviceSelect) serviceSelect.addEventListener('change', calculate);
    addons.forEach(a => a.addEventListener('change', calculate));

    calculate();
}

// ---- Booking Form Steps ----
function initBookingSteps() {
    const steps = document.querySelectorAll('.booking-form-step');
    const stepIndicators = document.querySelectorAll('.booking-step');
    const nextBtns = document.querySelectorAll('.btn-next-step');
    const prevBtns = document.querySelectorAll('.btn-prev-step');
    if (!steps.length) return;

    let currentStep = 0;

    const showStep = (index) => {
        steps.forEach((step, i) => {
            step.style.display = i === index ? 'block' : 'none';
        });
        stepIndicators.forEach((ind, i) => {
            ind.classList.remove('active', 'completed');
            if (i < index) ind.classList.add('completed');
            if (i === index) ind.classList.add('active');
        });
        currentStep = index;
    };

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep < steps.length - 1) {
                showStep(currentStep + 1);
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep > 0) {
                showStep(currentStep - 1);
            }
        });
    });

    showStep(0);
}

// ---- Coming Soon Countdown ----
function initCountdown() {
    const countdownEl = document.getElementById('countdown-timer');
    if (!countdownEl) return;

    // Set target to 30 days from now
    const target = new Date();
    target.setDate(target.getDate() + 30);

    const update = () => {
        const now = new Date();
        const diff = target - now;
        if (diff <= 0) {
            countdownEl.innerHTML = '<span>Launched!</span>';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('cd-days');
        const hoursEl = document.getElementById('cd-hours');
        const minsEl = document.getElementById('cd-mins');
        const secsEl = document.getElementById('cd-secs');

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minsEl) minsEl.textContent = String(mins).padStart(2, '0');
        if (secsEl) secsEl.textContent = String(secs).padStart(2, '0');
    };

    update();
    setInterval(update, 1000);
}

// ---- Headlight SVG Logo ----
function getHeadlightSVG(size = 36) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="50" rx="38" ry="32" fill="var(--logo-glass-fill)" stroke="var(--logo-primary)" stroke-width="2.5"/>
        <ellipse cx="50" cy="50" rx="22" ry="18" fill="var(--logo-beam-fill)" stroke="var(--logo-primary)" stroke-width="1.5"/>
        <circle cx="50" cy="50" r="8" fill="var(--logo-primary)" opacity="0.9"/>
        <circle cx="50" cy="50" r="4" fill="var(--logo-glow)"/>
        <path d="M68 38 L92 22" stroke="var(--logo-primary)" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
        <path d="M72 50 L96 50" stroke="var(--logo-primary)" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
        <path d="M68 62 L92 78" stroke="var(--logo-primary)" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
    </svg>`;
}

// ---- Zone Checker ----
function initZoneChecker() {
    const form = document.getElementById('zone-check-form');
    const resultEl = document.getElementById('zone-check-result');
    if (!form || !resultEl) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input');
        const zip = input?.value.trim();

        if (!zip) return;

        // Simulate zone check
        const zones = {
            'downtown': ['10001', '10002', '10003', '10004', '10005', '10010', '10012', '10013'],
            'suburbs': ['10101', '10102', '10103', '10201', '10202', '10301', '10302'],
            'metro': ['10401', '10402', '10403', '10501', '10502', '10601', '10602']
        };

        let found = null;
        for (const [zone, zips] of Object.entries(zones)) {
            if (zips.includes(zip)) {
                found = zone;
                break;
            }
        }

        if (found) {
            const zoneNames = { downtown: 'Downtown Core', suburbs: 'Suburban Area', metro: 'Metro Extended' };
            const responseTimes = { downtown: '30 minutes', suburbs: '45 minutes', metro: '60 minutes' };
            resultEl.innerHTML = `
                <div style="padding:16px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);border-radius:12px;margin-top:16px;">
                    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
                        <i class="fas fa-check-circle" style="color:var(--success);"></i>
                        <strong style="color:var(--success);">Service Available!</strong>
                    </div>
                    <p style="font-size:0.85rem;color:var(--text-muted);">
                        ZIP code <strong>${zip}</strong> is in our <strong>${zoneNames[found]}</strong> service zone. Average response time: <strong>${responseTimes[found]}</strong>.
                    </p>
                </div>`;
        } else {
            resultEl.innerHTML = `
                <div style="padding:16px;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.3);border-radius:12px;margin-top:16px;">
                    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
                        <i class="fas fa-exclamation-triangle" style="color:var(--warning);"></i>
                        <strong style="color:var(--warning);">Not in Standard Zone</strong>
                    </div>
                    <p style="font-size:0.85rem;color:var(--text-muted);">
                        ZIP code <strong>${zip}</strong> isn't in our standard coverage. <a href="contact.html" style="color:var(--primary);font-weight:600;">Contact us</a> for a custom quote — we often extend for fleet customers.
                    </p>
                </div>`;
        }
    });
}

// ---- Init Everything ----
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initRTL();
    initPasswordToggles();
    initAccordion();
    initFilterTabs();
    initScrollAnimations();
    initCounters();
    initBASliders();
    initPriceCalculator();
    initBookingSteps();
    initCountdown();
    initZoneChecker();
});
