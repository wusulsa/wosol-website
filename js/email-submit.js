/* Wasul email submissions through FormSubmit. */
'use strict';

(function () {
  const RECIPIENT_EMAIL = 'omar-b@wosol.net';        // المستلم الافتراضي (نموذج التسجيل)
  const CONTACT_RECIPIENT = 'info@wosol.net';        // مستلم نماذج التواصل
  const CONTACT_CC = 'atef-alreemi@wosol.net,a@wosol.net';             // نسخة كربونية لنماذج التواصل

  const endpointFor = email => `https://formsubmit.co/ajax/${encodeURIComponent(email)}`;

  function readableName(name) {
    return String(name || '')
      .replace(/[-_]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function collectFormData(form, subject, cc) {
    const data = new FormData(form);
    data.set('_subject', subject);
    if (cc) data.set('_cc', cc);
    data.set('_template', 'table');
    data.set('_captcha', 'true');
    data.set('_honey', '');
    const reply = form.querySelector('input[type="email"]')?.value?.trim();
    if (reply) data.set('_replyto', reply);
    data.append('_next', window.location.origin + window.location.pathname);

    const namedEntries = [...data.entries()]
      .filter(([key]) => !key.startsWith('_'))
      .map(([key, value]) => {
        const field = Array.from(form.elements).find(el => el.name === key);
        const label = field?.labels?.[0]?.textContent?.trim() || readableName(key);
        const display = value instanceof File ? (value.size ? value.name : '-') : value;
        return `${label}: ${display || '-'}`;
      });

    data.set('form_source', document.title || window.location.pathname);
    data.set('sent_at', new Date().toLocaleString('ar-SA'));
    data.set('summary', namedEntries.join('\n'));

    return data;
  }

  /**
   * @param {HTMLFormElement} form
   * @param {string} subject
   * @param {{to?: string, cc?: string}} [options] المستلم ونسخته — الافتراضي RECIPIENT_EMAIL
   */
  async function submitForm(form, subject, options = {}) {
    validateAttachments(form);
    const now = Date.now();
    const last = parseInt(sessionStorage.getItem('_wasul_last_submit') || '0', 10);
    if (now - last < 30000) {
      throw new Error('يرجى الانتظار 30 ثانية قبل إرسال طلب آخر');
    }
    sessionStorage.setItem('_wasul_last_submit', String(now));

    const response = await fetch(endpointFor(options.to || RECIPIENT_EMAIL), {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: collectFormData(form, subject, options.cc),
    });

    if (!response.ok) {
      throw new Error(`Email submit failed with status ${response.status}`);
    }

    return response.json().catch(() => ({}));
  }

  function validateAttachments(form) {
    const files = Array.from(form.querySelectorAll('input[type="file"]')).flatMap(el => Array.from(el.files || []));
    const ar = document.documentElement.lang === 'ar';
    const allowed = /\.(pdf|png|jpe?g)$/i;
    if (files.some(f => !allowed.test(f.name) || !['application/pdf','image/png','image/jpeg'].includes(f.type) || f.size === 0 || f.size > 3 * 1024 * 1024) || files.reduce((n,f)=>n+f.size,0) > 9 * 1024 * 1024) {
      throw new Error(ar ? 'المرفقات: PDF أو JPG أو PNG، بحد أقصى 3 ميجابايت لكل ملف و9 ميجابايت إجمالاً، دون ملفات فارغة.' : 'Attachments: PDF, JPG or PNG; maximum 3 MB per file and 9 MB total. Empty files are not accepted.');
    }
  }

  window.WASUL_EMAIL = {
    validateAttachments,
    recipient: RECIPIENT_EMAIL,
    contactRecipient: CONTACT_RECIPIENT,
    contactCc: CONTACT_CC,
    submitForm,
  };
})();
