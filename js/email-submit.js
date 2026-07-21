/* Wasul email submissions through FormSubmit. */
'use strict';

(function () {
  const RECIPIENT_EMAIL = 'o-bakhidhr@wosol.net';
  const ENDPOINT = `https://formsubmit.co/ajax/${encodeURIComponent(RECIPIENT_EMAIL)}`;

  function readableName(name) {
    return String(name || '')
      .replace(/[-_]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function collectFormData(form, subject) {
    const data = new FormData(form);
    data.set('_subject', subject);
    data.set('_template', 'table');
    data.set('_captcha', 'true');
    data.set('_honeypot', '');
    data.append('_next', window.location.href);

    const namedEntries = [...data.entries()]
      .filter(([key]) => !key.startsWith('_'))
      .map(([key, value]) => `${readableName(key)}: ${value || '-'}`);

    data.set('form_source', document.title || window.location.pathname);
    data.set('sent_at', new Date().toLocaleString('ar-SA'));
    data.set('summary', namedEntries.join('\n'));

    return data;
  }

  async function submitForm(form, subject) {
    const now = Date.now();
    const last = parseInt(sessionStorage.getItem('_wasul_last_submit') || '0', 10);
    if (now - last < 30000) {
      throw new Error('يرجى الانتظار 30 ثانية قبل إرسال طلب آخر');
    }
    sessionStorage.setItem('_wasul_last_submit', String(now));

    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: collectFormData(form, subject),
    });

    if (!response.ok) {
      throw new Error(`Email submit failed with status ${response.status}`);
    }

    return response.json().catch(() => ({}));
  }

  window.WASUL_EMAIL = {
    recipient: RECIPIENT_EMAIL,
    submitForm,
  };
})();
