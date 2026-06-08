/* ============================================================
   نُقلة — Dynamic Pricing Engine  (pricing.js)
   ‣ Zero innerHTML for dynamic values — textContent + safe DOM only.
   ‣ DOM references cached once at init.
   ‣ Pure config object → pure calc functions → render.
   ============================================================ */

'use strict';

/* ══════════════════════════════════════════════════════════════
   1. PRICING CONFIG
   Edit prices, tiers, and labels here — no logic changes needed.
   ══════════════════════════════════════════════════════════════ */
const PRICING_CONFIG = {

  currency: 'ر.س',

  serviceTypes: {
    educational: {
      label: 'النقل التعليمي',
      priceMultiplier: 1,
    },
    specialized: {
      label: 'النقل المتخصص',
      priceMultiplier: 1.2,
    },
  },

  /**
   * districts[key].prices[subscriptionType][tripKey]
   * tripKey: 'both' = ذهاب وعودة  |  'single' = ذهاب أو عودة
   */
  districts: {
    'abhur-north': {
      label: 'أبحر الشمالية',
      prices: {
        month: { both: 805,  single: 450  },
        term1: { both: 2630, single: 1500 },
        term2: { both: 2630, single: 1500 },
      },
    },
    'abhur-south': {
      label: 'أبحر الجنوبية',
      prices: {
        month: { both: 750,  single: 400  },
        term1: { both: 2300, single: 1200 },
        term2: { both: 2300, single: 1200 },
      },
    },
  },

  /**
   * Monthly-only discount tiers.
   * daysPerMonth = checkedDays × WEEKS_PER_MONTH.
   * First matching tier (highest threshold first) wins.
   */
  discountTiers: [
    { minDays: 25, rate: 0.20, label: 'خصم 20%' },
    { minDays: 20, rate: 0.15, label: 'خصم 15%' },
    { minDays: 15, rate: 0.10, label: 'خصم 10%' },
    { minDays: 10, rate: 0.05, label: 'خصم 5%'  },
  ],

  WEEKS_PER_MONTH: 5,
};

/* ══════════════════════════════════════════════════════════════
   2. DOM CACHE  (query once at module load)
   ══════════════════════════════════════════════════════════════ */
const EL = {
  card:          document.getElementById('pricingCard'),
  placeholder:   document.getElementById('pricingPlaceholder'),
  details:       document.getElementById('pricingDetails'),
  service:       document.getElementById('pr-service'),
  district:      document.getElementById('pr-district'),
  subtype:       document.getElementById('pr-subtype'),
  triptype:      document.getElementById('pr-triptype'),
  base:          document.getElementById('pr-base'),
  discountRow:   document.getElementById('pr-discount-row'),
  discountLabel: document.getElementById('pr-discount-label'),
  discountAmt:   document.getElementById('pr-discount-amount'),
  termNote:      document.getElementById('pr-term-note'),
  daysBadge:     document.getElementById('pr-days-badge'),
  daysCount:     document.getElementById('pr-days-count'),
  final:         document.getElementById('pr-final'),
  discountHint:  document.getElementById('pr-discount-hint'),
  // Placeholder step indicators
  ppService:     document.getElementById('pp-service'),
  ppDistrict:    document.getElementById('pp-district'),
  ppSub:         document.getElementById('pp-sub'),
  ppTrip:        document.getElementById('pp-trip'),
};

/* ══════════════════════════════════════════════════════════════
   3. SAFE DOM HELPERS
   ══════════════════════════════════════════════════════════════ */

/** Set textContent safely — never interprets HTML. */
function setText(el, value) {
  if (el) el.textContent = value;
}

/** Show or hide an element using the `hidden` attribute. */
function setHidden(el, hide) {
  if (!el) return;
  if (hide) el.setAttribute('hidden', ''); else el.removeAttribute('hidden');
}

/** Format a number for Arabic locale display. */
function fmt(n) {
  return n.toLocaleString('ar-SA');
}

/* ══════════════════════════════════════════════════════════════
   4. PURE CALCULATION FUNCTIONS
   ══════════════════════════════════════════════════════════════ */

function resolveTripKey(tripType) {
  return tripType === 'both' ? 'both' : 'single';
}

function getBasePrice(district, subscriptionType, tripType) {
  const distCfg  = PRICING_CONFIG.districts[district];
  const priceTbl = distCfg?.prices[subscriptionType];
  const key      = resolveTripKey(tripType);
  return priceTbl?.[key] ?? null;
}

function getDiscount(subscriptionType, selectedDaysCount) {
  const none = { rate: 0, label: '', daysPerMonth: 0 };
  if (subscriptionType !== 'month') return none;

  const daysPerMonth = selectedDaysCount * PRICING_CONFIG.WEEKS_PER_MONTH;

  for (const tier of PRICING_CONFIG.discountTiers) {
    if (daysPerMonth >= tier.minDays) {
      return { rate: tier.rate, label: tier.label, daysPerMonth };
    }
  }

  return { ...none, daysPerMonth };
}

/**
 * @returns {object|null} Full price breakdown, or null if inputs are incomplete.
 */
function calculate(district, serviceType, subscriptionType, tripType, selectedDaysCount) {
  const routePrice = getBasePrice(district, subscriptionType, tripType);
  const serviceCfg = PRICING_CONFIG.serviceTypes[serviceType];
  if (routePrice === null || !serviceCfg) return null;

  const basePrice = Math.round(routePrice * serviceCfg.priceMultiplier);

  const { rate, label: discountLabel, daysPerMonth } =
    getDiscount(subscriptionType, selectedDaysCount);

  const discountAmount = Math.round(basePrice * rate);
  const finalPrice     = basePrice - discountAmount;

  const cfg = PRICING_CONFIG.districts[district];

  return {
    basePrice,
    discountRate:   rate,
    discountLabel,
    discountAmount,
    finalPrice,
    daysPerMonth,
    currency:          PRICING_CONFIG.currency,
    serviceLabel:      serviceCfg.label,
    districtLabel:     cfg?.label ?? district,
    subscriptionLabel: subscriptionType === 'month' ? 'شهري'
                     : subscriptionType === 'term1' ? 'الترم الأول'
                     :                               'الترم الثاني',
    tripLabel:         tripType === 'both'   ? 'ذهاب وعودة'
                     : tripType === 'go'     ? 'ذهاب فقط'
                     :                        'عودة فقط',
  };
}

/* ══════════════════════════════════════════════════════════════
   5. READ FORM STATE
   ══════════════════════════════════════════════════════════════ */
function readFormState() {
  return {
    district:         document.getElementById('district')?.value                       || '',
    serviceType:      document.querySelector('[name="serviceType"]:checked')?.value       || '',
    subscriptionType: document.querySelector('[name="subscriptionType"]:checked')?.value || '',
    tripType:         document.querySelector('[name="tripType"]:checked')?.value          || '',
    selectedDays:     [...document.querySelectorAll('.day-checkbox:checked')].length,
  };
}

/* ══════════════════════════════════════════════════════════════
   6. PLACEHOLDER STEP INDICATORS
   Mark steps done/undone using safe SVG DOM manipulation.
   ══════════════════════════════════════════════════════════════ */

/** Create a checkmark <polyline> SVG child. */
function makeCheck() {
  const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  poly.setAttribute('points', '20 6 9 17 4 12');
  poly.setAttribute('stroke-width', '2.5');
  return poly;
}

/** Create a circle <circle> SVG child. */
function makeCircle() {
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', '12');
  circle.setAttribute('cy', '12');
  circle.setAttribute('r',  '10');
  return circle;
}

function setStepDone(stepEl, done) {
  if (!stepEl) return;
  stepEl.classList.toggle('done', done);

  const svg = stepEl.querySelector('svg');
  if (!svg) return;

  // Safe DOM replacement — no innerHTML
  while (svg.firstChild) svg.removeChild(svg.firstChild);
  svg.appendChild(done ? makeCheck() : makeCircle());
}

function renderPlaceholderSteps(serviceType, district, subscriptionType, tripType) {
  setStepDone(EL.ppService,  !!serviceType);
  setStepDone(EL.ppDistrict, !!district);
  setStepDone(EL.ppSub,      !!subscriptionType);
  setStepDone(EL.ppTrip,     !!tripType);
}

/* ══════════════════════════════════════════════════════════════
   7. RENDER PRICING CARD
   All writes use setText / setHidden — never innerHTML.
   ══════════════════════════════════════════════════════════════ */
function renderPricingCard(result) {

  if (!result) {
    setHidden(EL.placeholder, false);
    setHidden(EL.details, true);
    EL.card?.classList.remove('pricing-card--ready');
    return;
  }

  const cur = result.currency;

  // ── Summary tags ───────────────────────────────────────────
  setText(EL.service,  result.serviceLabel);
  setText(EL.district, result.districtLabel);
  setText(EL.subtype,  result.subscriptionLabel);
  setText(EL.triptype, result.tripLabel);

  // ── Base price ─────────────────────────────────────────────
  setText(EL.base, `${fmt(result.basePrice)} ${cur}`);

  // ── Discount row ───────────────────────────────────────────
  const hasDiscount = result.discountRate > 0;
  setHidden(EL.discountRow, !hasDiscount);
  if (hasDiscount) {
    setText(EL.discountLabel, result.discountLabel);
    setText(EL.discountAmt,   `− ${fmt(result.discountAmount)} ${cur}`);
  }

  // ── Days badge (monthly only) ──────────────────────────────
  const showDays = result.subscriptionLabel === 'شهري' && result.daysPerMonth > 0;
  setHidden(EL.daysBadge, !showDays);
  if (showDays) setText(EL.daysCount, result.daysPerMonth);

  // ── Term note ──────────────────────────────────────────────
  setHidden(EL.termNote, result.subscriptionLabel === 'شهري');

  // ── Discount hint (monthly, no tier reached yet) ───────────
  const showHint = result.subscriptionLabel === 'شهري' && !hasDiscount;
  setHidden(EL.discountHint, !showHint);

  // ── Final price with pop animation ────────────────────────
  if (EL.final) {
    const nextVal = String(result.finalPrice);
    if (EL.final.dataset.prev !== nextVal) {
      EL.final.classList.remove('price-pop');
      void EL.final.offsetWidth;        // force reflow to restart animation
      EL.final.classList.add('price-pop');
      EL.final.dataset.prev = nextVal;
    }
    setText(EL.final, `${fmt(result.finalPrice)} ${cur}`);
  }

  // ── Toggle placeholder ↔ details ──────────────────────────
  setHidden(EL.placeholder, true);
  setHidden(EL.details, false);
  EL.card?.classList.add('pricing-card--ready');
}

/* ══════════════════════════════════════════════════════════════
   8. ORCHESTRATOR
   ══════════════════════════════════════════════════════════════ */
function updatePricing() {
  const { district, serviceType, subscriptionType, tripType, selectedDays } = readFormState();

  renderPlaceholderSteps(serviceType, district, subscriptionType, tripType);

  if (!serviceType || !district || !subscriptionType || !tripType) {
    renderPricingCard(null);
    return;
  }

  renderPricingCard(calculate(district, serviceType, subscriptionType, tripType, selectedDays));
}

/* ══════════════════════════════════════════════════════════════
   9. EVENT BINDINGS
   ══════════════════════════════════════════════════════════════ */
(function bindPricingEvents() {

  document.getElementById('district')
    ?.addEventListener('change', updatePricing);

  document.querySelectorAll('[name="serviceType"]')
    .forEach(r => r.addEventListener('change', updatePricing));

  document.querySelectorAll('[name="subscriptionType"]')
    .forEach(r => r.addEventListener('change', updatePricing));

  document.querySelectorAll('[name="tripType"]')
    .forEach(r => r.addEventListener('change', updatePricing));

  document.querySelectorAll('.day-checkbox')
    .forEach(cb => cb.addEventListener('change', updatePricing));

  // Initial render (handles pre-filled form state)
  updatePricing();

})();
