'use strict';

(() => {
  /* ══════════════════════════════════════════════════════════════
     PLAN DATA — single source of truth for all pricing cards
     ══════════════════════════════════════════════════════════════ */
  const UNI_NAMES = {
    kau: 'جامعة الملك عبدالعزيز',
    uj:  'جامعة جدة',
  };

  const PLAN_DATA = [
    // ── KAU · Term 1 · Monthly ──
    { uni: 'kau', district: 'أبحر الشمالية',                tripType: 'roundTrip', duration: 'month', term: 'term1', price: 805,  featured: true },
    { uni: 'kau', district: 'أبحر الشمالية',                tripType: 'oneWay',   duration: 'month', term: 'term1', price: 450,  featured: false },
    { uni: 'kau', district: 'أبحر الجنوبية',                tripType: 'roundTrip', duration: 'month', term: 'term1', price: 750,  featured: true },
    { uni: 'kau', district: 'أبحر الجنوبية',                tripType: 'oneWay',   duration: 'month', term: 'term1', price: 420,  featured: false },
    { uni: 'kau', district: 'حي النور',                     tripType: 'roundTrip', duration: 'month', term: 'term1', price: 850,  featured: true },
    { uni: 'kau', district: 'حي النور',                     tripType: 'oneWay',   duration: 'month', term: 'term1', price: 500,  featured: false },
    // ── KAU · Term 2 · Monthly ──
    { uni: 'kau', district: 'أبحر الشمالية',                tripType: 'roundTrip', duration: 'month', term: 'term2', price: 855,  featured: true },
    { uni: 'kau', district: 'أبحر الشمالية',                tripType: 'oneWay',   duration: 'month', term: 'term2', price: 480,  featured: false },
    { uni: 'kau', district: 'أبحر الجنوبية',                tripType: 'roundTrip', duration: 'month', term: 'term2', price: 800,  featured: true },
    { uni: 'kau', district: 'أبحر الجنوبية',                tripType: 'oneWay',   duration: 'month', term: 'term2', price: 450,  featured: false },
    { uni: 'kau', district: 'حي النور',                     tripType: 'roundTrip', duration: 'month', term: 'term2', price: 900,  featured: true },
    { uni: 'kau', district: 'حي النور',                     tripType: 'oneWay',   duration: 'month', term: 'term2', price: 530,  featured: false },
    // ── KAU · Term 1 · Full ──
    { uni: 'kau', district: 'أبحر الشمالية',                tripType: 'roundTrip', duration: 'term1', term: 'term1', price: 2650, featured: true },
    { uni: 'kau', district: 'أبحر الشمالية',                tripType: 'oneWay',   duration: 'term1', term: 'term1', price: 1800, featured: false },
    { uni: 'kau', district: 'أبحر الجنوبية',                tripType: 'roundTrip', duration: 'term1', term: 'term1', price: 2200, featured: true },
    { uni: 'kau', district: 'أبحر الجنوبية',                tripType: 'oneWay',   duration: 'term1', term: 'term1', price: 1500, featured: false },
    { uni: 'kau', district: 'حي النور',                     tripType: 'roundTrip', duration: 'term1', term: 'term1', price: 2850, featured: true },
    { uni: 'kau', district: 'حي النور',                     tripType: 'oneWay',   duration: 'term1', term: 'term1', price: 1900, featured: false },
    // ── KAU · Term 2 · Full ──
    { uni: 'kau', district: 'أبحر الشمالية',                tripType: 'roundTrip', duration: 'term2', term: 'term2', price: 2750, featured: true },
    { uni: 'kau', district: 'أبحر الشمالية',                tripType: 'oneWay',   duration: 'term2', term: 'term2', price: 1900, featured: false },
    { uni: 'kau', district: 'أبحر الجنوبية',                tripType: 'roundTrip', duration: 'term2', term: 'term2', price: 2300, featured: true },
    { uni: 'kau', district: 'أبحر الجنوبية',                tripType: 'oneWay',   duration: 'term2', term: 'term2', price: 1600, featured: false },
    { uni: 'kau', district: 'حي النور',                     tripType: 'roundTrip', duration: 'term2', term: 'term2', price: 2950, featured: true },
    { uni: 'kau', district: 'حي النور',                     tripType: 'oneWay',   duration: 'term2', term: 'term2', price: 2000, featured: false },

    // ── UJ · Term 1 · Monthly ──
    { uni: 'uj', district: 'أبحر الشمالية والجنوبية',       tripType: 'roundTrip', duration: 'month', term: 'term1', price: 750,  featured: true },
    { uni: 'uj', district: 'أبحر الشمالية والجنوبية',       tripType: 'oneWay',   duration: 'month', term: 'term1', price: 420,  featured: false },
    // ── UJ · Term 2 · Monthly ──
    { uni: 'uj', district: 'أبحر الشمالية والجنوبية',       tripType: 'roundTrip', duration: 'month', term: 'term2', price: 800,  featured: true },
    { uni: 'uj', district: 'أبحر الشمالية والجنوبية',       tripType: 'oneWay',   duration: 'month', term: 'term2', price: 450,  featured: false },
    // ── UJ · Term 1 · Full ──
    { uni: 'uj', district: 'أبحر الشمالية والجنوبية',       tripType: 'roundTrip', duration: 'term1', term: 'term1', price: 2200, featured: true },
    { uni: 'uj', district: 'أبحر الشمالية والجنوبية',       tripType: 'oneWay',   duration: 'term1', term: 'term1', price: 1500, featured: false },
    // ── UJ · Term 2 · Full ──
    { uni: 'uj', district: 'أبحر الشمالية والجنوبية',       tripType: 'roundTrip', duration: 'term2', term: 'term2', price: 2300, featured: true },
    { uni: 'uj', district: 'أبحر الشمالية والجنوبية',       tripType: 'oneWay',   duration: 'term2', term: 'term2', price: 1600, featured: false },
  ];

  /* ══════════════════════════════════════════════════════════════
     RENDER CARDS from PLAN_DATA
     ══════════════════════════════════════════════════════════════ */
  function fmtPrice(n) { return n.toLocaleString('en-US'); }

  function renderCards() {
    for (const p of PLAN_DATA) {
      const grid = document.getElementById(`plans-grid-${p.uni}`);
      if (!grid) continue;

      const card = document.createElement('article');
      card.className = 'plan-card' + (p.featured ? ' plan-card--featured' : '');

      if (p.duration === 'month') {
        card.dataset.duration = 'month';
        card.dataset.termMonth = p.term;
        if (p.term === 'term2') card.hidden = true;
      } else {
        card.dataset.duration = p.duration;
        card.hidden = true;
      }

      const top = document.createElement('div');
      top.className = 'plan-card__top';

      const chip = document.createElement('span');
      chip.className = 'plan-card__chip';
      chip.textContent = p.tripType === 'roundTrip' ? 'ذهاب وعودة' : 'ذهاب أو عودة';

      const period = document.createElement('span');
      period.className = 'plan-card__period';
      if (p.duration === 'month') period.textContent = 'شهري';
      else if (p.duration === 'term1') period.textContent = 'ترم أول';
      else period.textContent = 'ترم ثاني';

      top.append(chip, period);

      const title = document.createElement('h3');
      title.className = 'plan-card__title';
      title.textContent = p.district;

      const sub = document.createElement('p');
      sub.className = 'plan-card__sub';
      sub.textContent = UNI_NAMES[p.uni];

      const ul = document.createElement('ul');
      ul.className = 'plan-card__features';
      const features = [
        p.tripType === 'roundTrip' ? 'رحلتين يومياً' : 'رحلة واحدة يومياً',
        'نقل آمن وموثوق', 'سائقين مرخصين', 'تتبع مباشر GPS',
        'متابعة ميدانية من قسم التشغيل',
      ];
      for (const f of features) {
        const li = document.createElement('li');
        const check = document.createElement('span');
        check.className = 'plan-card__check';
        check.textContent = '\u2713';
        li.append(check, f);
        ul.appendChild(li);
      }

      const priceDiv = document.createElement('div');
      priceDiv.className = 'plan-card__price';

      const amount = document.createElement('span');
      amount.className = 'plan-card__amount';
      amount.textContent = fmtPrice(p.price);

      const currency = document.createElement('span');
      currency.className = 'plan-card__currency';
      currency.textContent = 'ر.س';

      const per = document.createElement('span');
      per.className = 'plan-card__per';
      per.textContent = p.duration === 'month' ? '/ شهرياً' : '/ ترم';

      priceDiv.append(amount, currency, per);

      const cta = document.createElement('a');
      cta.href = 'register.html';
      cta.className = p.featured ? 'btn btn--primary plan-card__cta' : 'btn btn--outline plan-card__cta';
      cta.textContent = 'اشتركي الآن';

      card.append(top, title, sub, ul, priceDiv, cta);
      grid.appendChild(card);
    }
  }

  renderCards();

  /* ══════════════════════════════════════════════════════════════
     FILTERING LOGIC (unchanged)
     ══════════════════════════════════════════════════════════════ */
  const tabs         = [...document.querySelectorAll('.plans-tab')];
  const termBtns     = [...document.querySelectorAll('[data-term]')];
  const paymentBtns  = [...document.querySelectorAll('[data-payment]')];
  const grids        = [...document.querySelectorAll('[data-uni-grid]')];
  if (!tabs.length || !grids.length) return;

  const cardsByGrid = new Map(
    grids.map(g => [g, [...g.querySelectorAll('.plan-card')]])
  );

  let currentUni      = tabs.find(t => t.classList.contains('active'))?.dataset.uni || 'kau';
  let currentTerm     = termBtns.find(b => b.classList.contains('active'))?.dataset.term || 'term1';
  let currentPayment  = paymentBtns.find(b => b.classList.contains('active'))?.dataset.payment || 'month';

  function applyFilters() {
    for (const [grid, cards] of cardsByGrid) {
      const isActive = grid.dataset.uniGrid === currentUni;
      grid.hidden = !isActive;
      if (!isActive) continue;
      for (const card of cards) {
        let shouldShow = false;
        if (currentPayment === 'month') {
          shouldShow = card.dataset.duration === 'month' && card.dataset.termMonth === currentTerm;
        } else {
          shouldShow = card.dataset.duration === currentTerm;
        }
        if (card.hidden !== !shouldShow) card.hidden = !shouldShow;
      }
    }
  }

  function selectIn(group, target) {
    group.forEach(el => {
      const isActive = el === target;
      el.classList.toggle('active', isActive);
      el.setAttribute('aria-selected', String(isActive));
      el.tabIndex = isActive ? 0 : -1;
    });
  }

  function bindGroup(group, attrName, onChange) {
    group.forEach((el, i) => {
      el.addEventListener('click', () => {
        selectIn(group, el);
        onChange(el.dataset[attrName]);
        applyFilters();
      });
      el.addEventListener('keydown', e => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft' && e.key !== 'Home' && e.key !== 'End') return;
        e.preventDefault();
        let nextIdx;
        if (e.key === 'Home') {
          nextIdx = 0;
        } else if (e.key === 'End') {
          nextIdx = group.length - 1;
        } else {
          const isRTL = document.documentElement.dir === 'rtl';
          const forward = isRTL ? (e.key === 'ArrowLeft') : (e.key === 'ArrowRight');
          const dir = forward ? 1 : -1;
          nextIdx = (i + dir + group.length) % group.length;
        }
        const next = group[nextIdx];
        next.focus();
        selectIn(group, next);
        onChange(next.dataset[attrName]);
        applyFilters();
      });
    });
  }

  bindGroup(tabs,        'uni',      v => { currentUni = v; });
  bindGroup(termBtns,    'term',     v => { currentTerm = v; });
  bindGroup(paymentBtns, 'payment',  v => { currentPayment = v; });

  applyFilters();
})();
