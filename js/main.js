/**
 * وُسُل - Main JavaScript
 * @version 2.0.0
 * @description Core application logic
 * @dependencies WASUL_I18N
 */

'use strict';

/* ══════════════════════════════════════════════════════════════
   UTILITIES
   ══════════════════════════════════════════════════════════════ */
const Utils = {
  debounce(fn, ms) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), ms);
    };
  },

  setText(el, value) {
    if (el) el.textContent = value;
  },

  query(sel, root = document) {
    return root.querySelector(sel);
  },

  queryAll(sel, root = document) {
    return [...root.querySelectorAll(sel)];
  }
};

const $$ = Utils.queryAll;

/* ══════════════════════════════════════════════════════════════
   TRANSLATIONS & STATE
   ══════════════════════════════════════════════════════════════ */
const i18n = WASUL_I18N;

const safeStorage = {
  get(key, fallback) {
    try { return localStorage.getItem(key) ?? fallback; }
    catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, value); }
    catch { /* storage unavailable — ignore */ }
  },
};

const state = {
  lang:  safeStorage.get('nova-lang', 'ar'),
  theme: safeStorage.get('nova-theme', 'light'),
};

/* ══════════════════════════════════════════════════════════════
   DOM CACHE
   ══════════════════════════════════════════════════════════════ */
const dom = {
  html:        document.documentElement,
  navbar:      document.getElementById('navbar'),
  navLinks:    document.getElementById('navLinks'),
  hamburger:   document.getElementById('hamburger'),
  themeToggle: document.getElementById('themeToggle'),
  langToggle:  document.getElementById('langToggle'),
};

/* ══════════════════════════════════════════════════════════════
   THEME
   ══════════════════════════════════════════════════════════════ */
function applyTheme(theme) {
  dom.html.setAttribute('data-theme', theme);
  safeStorage.set('nova-theme', theme);
  state.theme = theme;
}

dom.themeToggle?.addEventListener('click', () => {
  applyTheme(state.theme === 'light' ? 'dark' : 'light');
});

/* ══════════════════════════════════════════════════════════════
   LANGUAGE / i18n
   ══════════════════════════════════════════════════════════════ */
function applyLang(lang) {
  applyI18n(lang);   // delegates to js/i18n.js
  state.lang = lang;
}

dom.langToggle?.addEventListener('click', () => {
  applyLang(state.lang === 'ar' ? 'en' : 'ar');
});

/* ══════════════════════════════════════════════════════════════
   NAVBAR
   ══════════════════════════════════════════════════════════════ */
function setNavbarScrolled() {
  if (!dom.navbar) return;
  dom.navbar.classList.toggle('scrolled', window.scrollY > 8);
}

// rAF-throttled scroll handler — runs once per frame, no perceived lag.
let _navTicking = false;
window.addEventListener('scroll', () => {
  if (_navTicking) return;
  _navTicking = true;
  requestAnimationFrame(() => {
    setNavbarScrolled();
    _navTicking = false;
  });
}, { passive: true });

function closeMenu() {
  if (!dom.navLinks || !dom.hamburger) return;
  dom.navLinks.classList.remove('open');
  dom.hamburger.classList.remove('active');
  dom.hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

dom.hamburger?.addEventListener('click', () => {
  const isOpen = dom.navLinks.classList.toggle('open');
  dom.hamburger.classList.toggle('active', isOpen);
  dom.hamburger.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close on nav link click
dom.navLinks?.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close on outside click
document.addEventListener('click', e => {
  if (dom.navLinks?.classList.contains('open')
    && !dom.navLinks.contains(e.target)
    && !dom.hamburger.contains(e.target)) {
    closeMenu();
  }
});

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && dom.navLinks?.classList.contains('open')) closeMenu();
});

/* ════════════════════════════════════════════════════════════════════
   ACTIVE NAV LINK
   ════════════════════════════════════════════════════════════ */
const navLinkEls = dom.navLinks ? [...dom.navLinks.querySelectorAll('.nav-link')] : [];

const sectionObserver = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    navLinkEls.forEach(link => {
      const isMatchingSection = link.getAttribute('href') === `#${entry.target.id}`;
      link.classList.toggle('active', isMatchingSection && !link.hasAttribute('data-contact-tab'));
    });
  }
}, { rootMargin: '-40% 0px -55% 0px' });

document.querySelectorAll('section[id]').forEach(sec => sectionObserver.observe(sec));

/* ══════════════════════════════════════════════════════════════
   ASYNC FORM HANDLER
   ══════════════════════════════════════════════════════════════ */
/** نماذج التواصل (استفسار · شكوى · عرض سعر) تصل إلى info@wosol.net ونسخة إلى omar-b@wosol.net */
async function sendSiteForm(form, subject) {
  if (!window.WASUL_EMAIL?.submitForm) {
    throw new Error('Email submit helper is not loaded');
  }
  return window.WASUL_EMAIL.submitForm(form, subject, {
    to: window.WASUL_EMAIL.contactRecipient,
    cc: window.WASUL_EMAIL.contactCc,
  });
}

function bindAsyncForm(formId, successId, messageKey, subject) {
  const form = document.getElementById(formId);
  const success = document.getElementById(successId);
  if (!form || !success) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const btnSpan = btn?.querySelector('span');
    const original = btnSpan?.textContent ?? '';

    if (btn) btn.disabled = true;
    if (btnSpan) Utils.setText(btnSpan, state.lang === 'ar' ? 'جارٍ الإرسال...' : 'Sending...');
    btn?.classList.add('loading');

    try {
      await sendSiteForm(form, subject);
      if (btn) btn.disabled = false;
      if (btnSpan) Utils.setText(btnSpan, original);
      btn?.classList.remove('loading');

      Utils.setText(success, i18n[state.lang][messageKey] || 'Done');
      success.classList.add('visible');
      form.reset();

      setTimeout(() => success.classList.remove('visible'), 6000);
    } catch (error) {
      console.error(error);
      if (btn) btn.disabled = false;
      if (btnSpan) Utils.setText(btnSpan, original);
      btn?.classList.remove('loading');

      Utils.setText(success, state.lang === 'ar'
        ? 'تعذر إرسال الطلب الآن. يرجى المحاولة مرة أخرى.'
        : 'Could not send the request right now. Please try again.');
      success.classList.add('visible');
    }
  });
}

/* ══════════════════════════════════════════════════════════════
   SCROLL-TO-TOP BUTTON
   ══════════════════════════════════════════════════════════════ */
(function initScrollToTop() {
  const btn = document.createElement('button');
  btn.id = 'scrollToTop';
  btn.setAttribute('aria-label', state.lang === 'ar' ? 'العودة للأعلى' : 'Back to top');

  // Static SVG icon — safe to use innerHTML here (no user data)
  btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2.5"
    width="20" height="20" aria-hidden="true">
    <polyline points="18 15 12 9 6 15"/>
  </svg>`;

  document.body.appendChild(btn);

  const onScroll = Utils.debounce(() => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, 60);

  window.addEventListener('scroll', onScroll, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ════════════════════════════════════════════════════════════
   SCROLL REVEAL
   ════════════════════════════════════════════════════════════ */
function initScrollReveal() {
  const els = [...document.querySelectorAll('[data-reveal]')];
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  els.forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════════════════════════
   BUTTON RIPPLE
   ══════════════════════════════════════════════════════════════ */
(function initRipple() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top  - size / 2;

    const wave = document.createElement('span');
    wave.className = 'ripple-wave';
    wave.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
    btn.appendChild(wave);
    wave.addEventListener('animationend', () => wave.remove());
  });
})();

/* ══════════════════════════════════════════════════════════════
   CONTACT TABS
   ══════════════════════════════════════════════════════════════ */
(function initContactTabs() {
  const tabs   = [...document.querySelectorAll('.contact-tab[data-tab]')];
  const panels = [...document.querySelectorAll('.contact-panel[id]')];
  if (!tabs.length) return;
  const params = new URLSearchParams(window.location.search);

  function activateTab(tab) {
    tabs.forEach(t => {
      t.classList.toggle('active', t === tab);
      t.setAttribute('aria-selected', String(t === tab));
    });
    panels.forEach(p => {
      const match = p.id === `panel-${tab.dataset.tab}`;
      if (match) p.removeAttribute('hidden'); else p.setAttribute('hidden', '');
    });
  }

  function activateTabByName(tabName) {
    const targetTab = tabs.find(tab => tab.dataset.tab === tabName);
    if (!targetTab) return null;
    activateTab(targetTab);
    return targetTab;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', e => {
      const idx = tabs.indexOf(tab);
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const dir = e.key === 'ArrowLeft' ? -1 : 1;
        const next = tabs[(idx + dir + tabs.length) % tabs.length];
        next.focus();
        activateTab(next);
      }
    });
  });

  document.querySelectorAll('[data-contact-tab]').forEach(link => {
    link.addEventListener('click', e => {
      const tabName = link.dataset.contactTab;
      const contactSection = document.querySelector(link.getAttribute('href') || '#contact');
      if (!tabName || !contactSection) return;

      activateTabByName(tabName);

      const quoteService = link.dataset.quoteService;
      if (tabName === 'quote' && quoteService) {
        const quoteServiceField = document.getElementById('qt-service');
        if (quoteServiceField) quoteServiceField.value = quoteService;
      }

      e.preventDefault();
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

      if (window.history?.replaceState) {
        window.history.replaceState(null, '', '#contact');
      } else {
        window.location.hash = 'contact';
      }
    });
  });

  const initialTab = params.get('contactTab');
  const quoteService = params.get('quoteService');
  const activatedTab = initialTab ? activateTabByName(initialTab) : null;

  if (!activatedTab) {
    activateTab(tabs[0]);
  }

  if ((initialTab === 'quote' || activatedTab?.dataset.tab === 'quote') && quoteService) {
    const quoteServiceField = document.getElementById('qt-service');
    if (quoteServiceField) quoteServiceField.value = quoteService;
  }
})();

/* ══════════════════════════════════════════════════════════════
   FORMS INIT
   ══════════════════════════════════════════════════════════════ */
function initForms() {
  bindAsyncForm('contactForm', 'formSuccess', 'contact_success', 'طلب تواصل جديد من موقع وُسُل');
  bindAsyncForm('complaintForm', 'complaintSuccess', 'complaint_success', 'شكوى جديدة من موقع وُسُل');
  bindAsyncForm('quoteForm', 'quoteSuccess', 'quote_success', 'طلب عرض سعر جديد من موقع وُسُل');
}

/* ══════════════════════════════════════════════════════════════
    INIT
    ══════════════════════════════════════════════════════════════ */
(function init() {
  // First-visit theme: respect system preference, default to light
  if (!safeStorage.get('nova-theme', null)) {
    state.theme = window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Apply theme without flashing (prevent flash of unstyled content)
  applyTheme(state.theme);
  applyLang(state.lang);
  setNavbarScrolled();

  // Initialize forms
  initForms();

  // Initialize scroll reveal after layout is stable
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => initScrollReveal(), { timeout: 200 });
  } else {
    setTimeout(initScrollReveal, 100);
  }
})();
