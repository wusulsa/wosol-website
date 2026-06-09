/* ============================================================
   نُقلة — Form Validation  (form.js)
   ‣ No innerHTML — all DOM writes use textContent or safe APIs.
   ‣ Config-driven: add/remove fields by editing FIELD_CONFIG.
   ‣ Sanitize strips HTML tags from every user string before processing.
   ============================================================ */

'use strict';

/* ══════════════════════════════════════════════════════════════
   1. SECURITY — INPUT SANITIZATION
   Strip all HTML/script tags before touching any user value.
   ══════════════════════════════════════════════════════════════ */

/**
 * Remove HTML tags and trim whitespace from a string.
 * Uses the browser's own text-node parsing — no regex needed.
 */
function sanitize(raw) {
  if (typeof raw !== 'string') return '';
  const tmp = document.createElement('span');
  tmp.textContent = raw;          // assigns as text, browser encodes special chars
  return tmp.textContent.trim();  // read back as plain text
}

/* ══════════════════════════════════════════════════════════════
   2. VALIDATION RULES
   ══════════════════════════════════════════════════════════════ */
const RULES = {
  /** Arabic + Latin letters and spaces only — no digits or symbols */
  name: {
    pattern: /^[\u0600-\u06FF\u0750-\u077Fa-zA-Z ]+$/,
    message: 'الاسم يجب أن يحتوي على حروف فقط (بدون أرقام)',
  },
  /** Saudi mobile: starts with 5, exactly 9 digits */
  phone: {
    pattern: /^5[0-9]{8}$/,
    message: 'رقم غير صحيح — يبدأ بـ 5 ويتكون من 9 أرقام (مثال: 512345678)',
  },
  /** Basic RFC-5322 subset */
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    message: 'البريد الإلكتروني غير صحيح',
  },
  /** Saudi national ID (1...) or iqama (2...): 10 digits */
  id: {
    pattern: /^[12][0-9]{9}$/,
    message: 'الهوية يجب أن تكون 10 أرقام وتبدأ بـ 1 (سعودي) أو 2 (مقيم)',
  },
};

const MSG = {
  required:      'هذا الحقل إجباري',
  requiredSelect:'الرجاء الاختيار',
  requiredRadio: 'الرجاء اختيار خيار',
  requiredDate:  'الرجاء تحديد التاريخ',
  futureDate:    'لا يمكن اختيار تاريخ في الماضي',
  minLength: n => `يجب ألا يقل الطول عن ${n} أحرف`,
  requiredDays:  'يجب اختيار يوم دراسي واحد على الأقل',
  requiredTerms: 'يجب الموافقة على الشروط والأحكام للمتابعة',
};

/* ══════════════════════════════════════════════════════════════
   3. FIELD VALIDATION CONFIG
   Each entry maps a field id → its rules.
   Sections group field ids for submit-time validation.
   ══════════════════════════════════════════════════════════════ */
const FIELD_CONFIG = {
  // ── Section 1: Student data ─────────────────────────────────
  firstName:       { type: 'name',   required: true, min: 2 },
  secondName:      { type: 'name',   required: true, min: 2 },
  thirdName:       { type: 'name',   required: true, min: 2 },
  familyName:      { type: 'name',   required: true, min: 2 },
  gender:          { type: 'hidden', required: true },
  nationality:     { type: 'select', required: true },
  idNumber:        { type: 'id',     required: true },
  studentPhone:    { type: 'phone',  required: true },
  studentEmail:    { type: 'email',  required: true },
  region:          { type: 'hidden', required: true },
  city:            { type: 'hidden', required: true },
  district:        { type: 'select', required: true },
  // ── Section 2: Subscription data ───────────────────────────
  universityName:  { type: 'select', required: true },
  universityGate:  { type: 'text',   required: true, min: 2 },
  serviceType:     { type: 'hidden', required: true },
  startDate:       { type: 'date',   required: true },
};

/** Ordered section → field id lists (drives section validators). */
const SECTIONS = {
  1: ['firstName','secondName','thirdName','familyName','gender','nationality',
      'idNumber','studentPhone','studentEmail','region','city','district'],
  2: ['universityName','universityGate','serviceType','startDate'],
};

/* ══════════════════════════════════════════════════════════════
   4. DOM FEEDBACK HELPERS
   All writes use element.textContent — never innerHTML.
   ══════════════════════════════════════════════════════════════ */

/** Return the visual target for styling (phone wrapper or the field itself). */
function getTarget(fieldId) {
  const el = document.getElementById(fieldId);
  return el ? (el.closest('.phone-input') ?? el) : null;
}

function showError(fieldId, message) {
  const errEl = document.getElementById(`err-${fieldId}`);
  if (errEl) {
    errEl.textContent = message;   // ← safe: textContent, not innerHTML
    errEl.setAttribute('role', 'alert');
  }
  const target = getTarget(fieldId);
  if (target) {
    target.classList.add('error');
    target.classList.remove('success');
    target.setAttribute('aria-invalid', 'true');
  }
}

function showSuccess(fieldId) {
  const errEl = document.getElementById(`err-${fieldId}`);
  if (errEl) {
    errEl.textContent = '';
    errEl.removeAttribute('role');
  }
  const target = getTarget(fieldId);
  if (target) {
    target.classList.remove('error');
    target.classList.add('success');
    target.removeAttribute('aria-invalid');
  }
}

function clearFeedback(fieldId) {
  const errEl = document.getElementById(`err-${fieldId}`);
  if (errEl) errEl.textContent = '';
  const target = getTarget(fieldId);
  if (target) {
    target.classList.remove('error', 'success');
    target.removeAttribute('aria-invalid');
  }
}

/* ══════════════════════════════════════════════════════════════
   5. CORE FIELD VALIDATOR
   Single entry-point — reads config, runs the right checks.
   ══════════════════════════════════════════════════════════════ */
function validateField(fieldId) {
  const cfg = FIELD_CONFIG[fieldId];
  if (!cfg) return true; // unknown field → skip

  const el  = document.getElementById(fieldId);
  const raw = el?.value ?? '';
  const val = sanitize(raw);

  /* ── Select ──────────────────────────────────────────────── */
  if (cfg.type === 'select') {
    if (cfg.required && !val) { showError(fieldId, MSG.requiredSelect); return false; }
    showSuccess(fieldId);
    return true;
  }

  /* ── Hidden (auto-filled) ───────────────────────────────── */
  if (cfg.type === 'hidden') {
    if (cfg.required && !val) { showError(fieldId, MSG.required); return false; }
    clearFeedback(fieldId);
    return true;
  }

  /* ── Date ────────────────────────────────────────────────── */
  if (cfg.type === 'date') {
    if (!val) { showError(fieldId, MSG.requiredDate); return false; }
    const today = new Date(); today.setHours(0, 0, 0, 0);
    if (new Date(val) < today) { showError(fieldId, MSG.futureDate); return false; }
    showSuccess(fieldId);
    return true;
  }

  /* ── Optional empty ─────────────────────────────────────── */
  if (!cfg.required && !val) { clearFeedback(fieldId); return true; }

  /* ── Required check ─────────────────────────────────────── */
  if (!val) { showError(fieldId, MSG.required); return false; }

  /* ── Min length ─────────────────────────────────────────── */
  if (cfg.min && val.length < cfg.min) {
    showError(fieldId, MSG.minLength(cfg.min));
    return false;
  }

  /* ── Pattern checks ──────────────────────────────────────── */
  const rule = RULES[cfg.type];
  if (rule && !rule.pattern.test(val)) {
    showError(fieldId, rule.message);
    return false;
  }

  showSuccess(fieldId);
  return true;
}

/* ══════════════════════════════════════════════════════════════
   6. RADIO / DAYS / TERMS VALIDATORS
   ══════════════════════════════════════════════════════════════ */
function validateRadioGroup(name, errorId) {
  const checked = document.querySelector(`[name="${name}"]:checked`);
  const errEl   = document.getElementById(`err-${errorId}`);
  if (!checked) {
    if (errEl) { errEl.textContent = MSG.requiredRadio; errEl.setAttribute('role', 'alert'); }
    return false;
  }
  if (errEl) errEl.textContent = '';
  return true;
}

function validateDays() {
  const anyChecked = [...document.querySelectorAll('.day-checkbox')].some(c => c.checked);
  const errEl      = document.getElementById('err-days');
  if (!anyChecked) {
    if (errEl) { errEl.textContent = MSG.requiredDays; errEl.setAttribute('role', 'alert'); }
    return false;
  }
  if (errEl) errEl.textContent = '';
  return true;
}

function validateTerms() {
  if (document.getElementById('agreeTerms')?.checked) {
    clearFeedback('terms');
    return true;
  }
  showError('terms', MSG.requiredTerms);
  const label = document.getElementById('termsLabel');
  if (label) {
    label.classList.add('shake');
    setTimeout(() => label.classList.remove('shake'), 450);
  }
  return false;
}

/* ══════════════════════════════════════════════════════════════
   7. SECTION VALIDATORS  (used at submit-time)
   ══════════════════════════════════════════════════════════════ */
function validateSection(sectionNum) {
  const fields  = SECTIONS[sectionNum] ?? [];
  const results = fields.map(id => validateField(id));
  return results.every(Boolean);
}

function validateSection1() { return validateSection(1); }

function validateSection2() {
  const fieldsOk = validateSection(2);
  const radioOk = [
    validateRadioGroup('subscriptionType', 'subscriptionType'),
    validateRadioGroup('tripType', 'tripType'),
  ].every(Boolean);
  return fieldsOk && !!radioOk;
}

function validateSection3() { return validateDays(); }
function validateSection4() { return validateTerms(); }

/* ══════════════════════════════════════════════════════════════
   8. FULL-FORM VALIDATION
   ══════════════════════════════════════════════════════════════ */
function validateAll() {
  // Run all sections — never short-circuit, so all errors show at once
  const results = [
    validateSection1(),
    validateSection2(),
    validateSection3(),
    validateSection4(),
  ];

  const firstFailedSection = results.findIndex(r => !r);
  return {
    valid: results.every(Boolean),
    firstFailedSection: firstFailedSection === -1 ? null : firstFailedSection + 1,
  };
}

/* ══════════════════════════════════════════════════════════════
   9. LIVE VALIDATION BINDINGS
   ══════════════════════════════════════════════════════════════ */
(function bindLiveValidation() {

  /* ── Input masks ─────────────────────────────────────────── */

  // Numeric-only (preserve caret position)
  ['studentPhone', 'idNumber'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', function () {
      const caret = this.selectionStart;
      const prev  = this.value;
      this.value  = prev.replace(/[^0-9]/g, '');
      if (this.value.length === prev.length) this.setSelectionRange(caret, caret);
    });
  });

  // Letters-only (no digits) for name fields
  ['firstName','secondName','thirdName','familyName'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', function () {
      this.value = this.value.replace(/[0-9]/g, '');
    });
  });

  /* ── Clear error on focus ──────────────────────────────── */
  document.querySelectorAll('input, select').forEach(el => {
    el.addEventListener('focus', () => { if (el.id) clearFeedback(el.id); });
  });

  /* ── Blur validation: validate after user leaves field ──── */
  Object.keys(FIELD_CONFIG).forEach(id => {
    document.getElementById(id)?.addEventListener('blur', () => validateField(id));
  });

  /* ── Radio groups ────────────────────────────────────────── */
  document.querySelectorAll('[name="subscriptionType"]').forEach(r =>
    r.addEventListener('change', () => validateRadioGroup('subscriptionType', 'subscriptionType'))
  );
  document.querySelectorAll('[name="tripType"]').forEach(r =>
    r.addEventListener('change', () => validateRadioGroup('tripType', 'tripType'))
  );

  /* ── Days checkboxes ────────────────────────────────────── */
  document.querySelectorAll('.day-checkbox').forEach(cb =>
    cb.addEventListener('change', () => {
      if ([...document.querySelectorAll('.day-checkbox')].some(c => c.checked)) {
        const errEl = document.getElementById('err-days');
        if (errEl) errEl.textContent = '';
      }
    })
  );

  /* ── Terms checkbox ──────────────────────────────────────── */
  document.getElementById('agreeTerms')?.addEventListener('change', () => {
    if (document.getElementById('agreeTerms').checked) clearFeedback('terms');
  });

})();

/* ══════════════════════════════════════════════════════════════
   10. FORM SUBMIT HANDLER
   ══════════════════════════════════════════════════════════════ */
(function bindSubmit() {

  const form          = document.getElementById('regForm');
  const submitBtn     = document.getElementById('submitBtn');
  const submitText    = document.getElementById('submitBtnText');
  const submitArrow   = document.getElementById('submitArrow');
  const submitSpinner = document.getElementById('submitSpinner');

  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const { valid, firstFailedSection } = validateAll();

    if (!valid) {
      // Scroll first failing card into view
      if (firstFailedSection) {
        document.getElementById(`section-${firstFailedSection}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      form.dispatchEvent(new CustomEvent('validationFailed',
        { detail: { section: firstFailedSection } }));
      return;
    }

    // Loading state
    if (submitBtn)     submitBtn.disabled = true;
    if (submitText)    submitText.textContent = 'جارٍ الإرسال...';
    if (submitArrow)   submitArrow.hidden = true;
    if (submitSpinner) submitSpinner.hidden = false;

    form.dispatchEvent(new CustomEvent('submitStart'));

    try {
      if (!window.WASUL_EMAIL?.submitForm) {
        throw new Error('Email submit helper is not loaded');
      }

      await window.WASUL_EMAIL.submitForm(form, 'طلب تسجيل طالبة جديد من موقع وُسُل');

      if (submitBtn)     submitBtn.disabled = false;
      if (submitText)    submitText.textContent = 'إرسال طلب التسجيل';
      if (submitArrow)   submitArrow.hidden = false;
      if (submitSpinner) submitSpinner.hidden = true;

      form.dispatchEvent(new CustomEvent('submitSuccess'));

      // Collect form data for payment page
      const district        = document.getElementById('district')?.value || '';
      const serviceType     = document.getElementById('serviceType')?.value || 'educational';
      const subscriptionType = document.querySelector('[name="subscriptionType"]:checked')?.value || '';
      const tripType        = document.querySelector('[name="tripType"]:checked')?.value || '';
      const startDate       = document.getElementById('startDate')?.value || '';
      const finalPriceEl    = document.getElementById('pr-final');
      const finalPrice      = finalPriceEl?.textContent || '';
      const refNum          = 'NQL-' + Date.now().toString().slice(-6);

      // Store order summary in sessionStorage for payment page
      sessionStorage.setItem('order', JSON.stringify({
        ref: refNum,
        district,
        serviceType,
        subscriptionType,
        tripType,
        startDate,
        finalPrice,
      }));

      window.location.href = 'payment.html';
    } catch (error) {
      console.error(error);
      if (submitBtn)     submitBtn.disabled = false;
      if (submitText)    submitText.textContent = 'إرسال طلب التسجيل';
      if (submitArrow)   submitArrow.hidden = false;
      if (submitSpinner) submitSpinner.hidden = true;

      alert('تعذر إرسال طلب التسجيل الآن. يرجى المحاولة مرة أخرى.');
    }
  });

})();
