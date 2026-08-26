/* ============================================================
   نُقلة — Register Page UI  (register.js)
   Responsibilities: theme sync, navbar, days/time picker,
   terms scroll indicator, progress steps.
   All validation → form.js  |  All pricing → pricing.js
   ============================================================ */

'use strict';

/* ══════════════════════════════════════════════════════════════
   DOM CACHE
   ══════════════════════════════════════════════════════════════ */
const dom = {
  html:        document.documentElement,
  navbar:      document.getElementById('navbar'),
  hamburger:   document.getElementById('hamburger'),
  navLinks:    document.getElementById('navLinks'),
  themeToggle: document.getElementById('themeToggle'),
  startDate:   document.getElementById('startDate'),
  termsContent:    document.getElementById('termsContent'),
  termsIndicator:  document.getElementById('termsScrollIndicator'),
  regForm:         document.getElementById('regForm'),
  steps:           [...document.querySelectorAll('.reg-step')],
  stepLines:       [...document.querySelectorAll('.reg-step__line')],
};

/* ══════════════════════════════════════════════════════════════
   THEME  (synced with main site via localStorage)
   ══════════════════════════════════════════════════════════════ */
(function initTheme() {
  let saved = 'light';
  try { saved = localStorage.getItem('nova-theme') || 'light'; } catch { /* storage unavailable */ }
  dom.html.setAttribute('data-theme', saved);

  dom.themeToggle?.addEventListener('click', () => {
    const next = dom.html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    dom.html.setAttribute('data-theme', next);
    try { localStorage.setItem('nova-theme', next); } catch { /* storage unavailable */ }
  });
})();

/* ══════════════════════════════════════════════════════════════
   NAVBAR
   ══════════════════════════════════════════════════════════════ */
(function initNavbar() {
  // Register page always shows the solid navbar
  dom.navbar?.classList.add('scrolled');

  window.addEventListener('scroll', () => {
    dom.navbar?.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  dom.hamburger?.addEventListener('click', () => {
    const isOpen = dom.navLinks.classList.toggle('open');
    dom.hamburger.classList.toggle('active', isOpen);
    dom.hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (dom.navLinks?.classList.contains('open')
      && !dom.navLinks.contains(e.target)
      && !dom.hamburger.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && dom.navLinks?.classList.contains('open')) closeMenu();
  });

  function closeMenu() {
    dom.navLinks.classList.remove('open');
    dom.hamburger.classList.remove('active');
    dom.hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
})();

/* ══════════════════════════════════════════════════════════════
   MIN DATE
   أقل تاريخ لبداية الاشتراك — يجب أن يطابق القيد المضبوط في
   نموذج زوهو، وإلا رفض زوهو السجل. عدّل القيمتين معاً.
   ══════════════════════════════════════════════════════════════ */
const SUBSCRIPTION_OPENS = '2026-08-30';

if (dom.startDate) {
  const today = new Date().toISOString().split('T')[0];
  dom.startDate.min = today > SUBSCRIPTION_OPENS ? today : SUBSCRIPTION_OPENS;
}

/* ══════════════════════════════════════════════════════════════
   SUBSCRIPTION END-DATE HINT
   Shows a friendly note below the start date field explaining
   when the subscription ends.
   ══════════════════════════════════════════════════════════════ */
(function initEndDateHint() {
  const hintEl  = document.getElementById('subEndHint');
  const hintTxt = document.getElementById('subEndHintText');
  if (!hintEl || !hintTxt) return;

  const AR_MONTHS = [
    'يناير','فبراير','مارس','أبريل','مايو','يونيو',
    'يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر',
  ];

  function updateHint() {
    const dateVal  = dom.startDate?.value;
    const typeVal  = document.getElementById('subscriptionType')?.value;

    if (!dateVal || !typeVal) {
      hintEl.setAttribute('hidden', '');
      return;
    }

    let msg;
    if (typeVal === 'term') {
      msg = 'ينتهي اشتراكك في نهاية الترم';
    } else {
      // Last day of the selected month
      const d     = new Date(dateVal);
      const month = AR_MONTHS[d.getMonth()];
      const year  = d.getFullYear();
      msg = `ينتهي اشتراكك في نهاية شهر ${month} ${year}`;
    }

    hintTxt.textContent = msg;
    hintEl.removeAttribute('hidden');
  }

  dom.startDate?.addEventListener('change', updateHint);
  document.getElementById('subscriptionType')
    ?.addEventListener('change', updateHint);
})();

/* ══════════════════════════════════════════════════════════════
   TERMS SCROLL INDICATOR
   Hides the "scroll down" hint when the user reaches the bottom.
   ══════════════════════════════════════════════════════════════ */
(function initTermsScroll() {
  const { termsContent: content, termsIndicator: indicator } = dom;
  if (!content || !indicator) return;

  content.addEventListener('scroll', () => {
    const atBottom = content.scrollTop + content.clientHeight >= content.scrollHeight - 10;
    indicator.classList.toggle('hidden', atBottom);
  }, { passive: true });
})();

/* ══════════════════════════════════════════════════════════════
   PROGRESS STEPS
   ══════════════════════════════════════════════════════════════ */
function updateSteps(activeStep) {
  dom.steps.forEach((step, i) => {
    step.classList.remove('active', 'done');
    if (i + 1 < activeStep)  step.classList.add('done');
    if (i + 1 === activeStep) step.classList.add('active');
  });
  dom.stepLines.forEach((line, i) => {
    line.classList.toggle('done', i + 1 < activeStep);
  });
}

// Highlight current step based on scroll position
(function initScrollSteps() {
  const sectionMap = {
    'section-1': 1, 'section-2': 2, 'section-3': 3,
  };

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        updateSteps(sectionMap[entry.target.id] ?? 1);
      }
    }
  }, { rootMargin: '-30% 0px -60% 0px' });

  Object.keys(sectionMap).forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
})();

/* ══════════════════════════════════════════════════════════════
   PRE-FILL FROM URL PARAMS
   Reads ?district=&subtype=&triptype= from the link and pre-selects
   the matching form fields.
   ══════════════════════════════════════════════════════════════ */
(function prefillFromURL() {
  const params = new URLSearchParams(window.location.search);

  const district = params.get('district');
  const subtype  = params.get('subtype');
  const triptype = params.get('triptype');

  if (!district && !subtype && !triptype) return;

  // Pre-fill district select
  if (district) {
    const el = document.getElementById('district');
    if (el) {
      el.value = district;
      el.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  // Pre-select subscription type
  if (subtype) {
    const el = document.getElementById('subscriptionType');
    if (el) {
      el.value = subtype;
      el.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  // Pre-select trip direction
  if (triptype) {
    const el = document.getElementById('tripType');
    if (el) {
      el.value = triptype;
      el.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  // Scroll to section 2 (subscription section) after a short delay
  setTimeout(() => {
    document.getElementById('section-2')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 350);
})();

/* ══════════════════════════════════════════════════════════════
   FORM EVENTS  (dispatched by form.js)
   ══════════════════════════════════════════════════════════════ */
(function listenFormEvents() {
  dom.regForm?.addEventListener('validationFailed', e => {
    const section = e.detail?.section;
    if (section) updateSteps(section);
  });

  dom.regForm?.addEventListener('submitStart',   () => updateSteps(3));
  dom.regForm?.addEventListener('submitSuccess', () => updateSteps(3));
})();
