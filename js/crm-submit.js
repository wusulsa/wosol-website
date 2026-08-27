/* ============================================================
   وُسُل — Zoho CRM Submit  (crm-submit.js)
   يرسل بيانات نموذج التسجيل إلى Zoho CRM مباشرة من الموقع،
   عبر POST داخل إطار مخفي (لا يحتاج خادماً ولا يتأثر بـ CORS).

   المصدر: نموذج الويب المولَّد من CRM (Web Form) — العنوان
   والرموز وأسماء الحقول مأخوذة منه حرفياً.
   الوحدة: CustomModule12 (actionType بصيغة base64).

   وضع الفحص: أضف ?crmDebug=1 إلى الرابط ليظهر رد CRM أمامك.
   ============================================================ */

'use strict';

(function () {

  const FORM_ACTION = 'https://crm.zoho.com/crm/WebForm';

  /* ⚠️ تنبيه مثبت بالتجربة:
     نموذج الويب في CRM يقبل الطلبات من النطاقات المسجّلة في إعداده فقط
     («عنوان URL الخاص بالموقع»). الطلب القادم من نطاق غير مسجّل — مثل
     localhost — يرد success:true لكن لا يُنشَأ له سجل، بلا أي رسالة خطأ.
     لذا سجّل في CRM نطاقات الموقع كلها: https://wosoltransportation.com
     (وأي نطاق آخر يُستضاف عليه الموقع). */

  /* الرموز المخفية — بدونها يرفض CRM أي طلب */
  const HIDDEN = {
    xnQsjsdp:   '907c178fd3e7994c9ed777b517cb15a9e6ff68ad2345e7a10218a81bbd7c4643',
    xmIwtLD:    '260e6505660ca4b9abdf9e52ab0475fa9a3151bdcad4854124fc8ec5693679599097c4be9f9ce5fd8af44f863505241f',
    actionType: 'Q3VzdG9tTW9kdWxlMTI=',
    returnURL:  'https://wosoltransportation.com/',
    wFaTrisJS:  'true',
    zc_gad:     '',
    aG9uZXlwb3Q: '',            // مصيدة السبام — تبقى فارغة دائماً
  };

  /* حقولنا (id في الصفحة) → اسم الحقل في CRM */
  const FIELD_MAP = {
    fullName:         'NAME',          // اسم العميل (الحقل الإلزامي الوحيد)
    idNumber:         'COBJ12CF7',     // رقم هوية المشتركة
    studentPhone:     'COBJ12CF12',    // رقم جوال المشتركة
    studentEmail:     'Email',         // البريد الإلكتروني
    guardianName:     'COBJ12CF29',    // اسم ولي الأمر / شخص التواصل
    relationship:     'COBJ12CF16',    // صلة القرابة
    guardianId:       'COBJ12CF6',     // رقم هوية شخص التواصل
    guardianPhone:    'COBJ12CF15',    // رقم جوال شخص التواصل
    district:         'COBJ12CF28',    // الحي
    address:          'COBJ12CF14',    // العنوان الوطني المختصر
    locationUrl:      'COBJ12CF27',    // الموقع (رابط قوقل ماب)
    universityName:   'COBJ12CF3',     // فرع الجامعة
    subscriptionType: 'COBJ12CF5',     // طريقة السداد
    tripType:         'COBJ12CF4',     // الاتجاه
    startDate:        'COBJ12CF116',   // تاريخ بداية الاشتراك (YYYY-MM-DD)
  };

  const DEBUG = new URLSearchParams(location.search).has('crmDebug');

  /** القوائم المنسدلة تُرسل بنص الخيار الظاهر ليطابق خيارات CRM. */
  function readValue(el) {
    if (!el) return '';
    if (el.tagName === 'SELECT') return el.selectedOptions[0]?.textContent.trim() ?? '';
    return el.value.trim();     // حقل التاريخ عندنا YYYY-MM-DD وهو ما يطلبه CRM
  }

  function collect() {
    const data = { ...HIDDEN };
    for (const [id, crmName] of Object.entries(FIELD_MAP)) {
      data[crmName] = readValue(document.getElementById(id));
    }
    return data;
  }

  /**
   * يرسل السجل إلى CRM داخل إطار مخفي.
   * رد CRM غير قابل للقراءة (نطاق مختلف)، فيُحسم الوعد عند تحميل الإطار
   * أو بعد مهلة — ونسخة البريد تبقى المرجع عند أي تعثر.
   */
  function submitToCRM() {
    return new Promise(resolve => {
      const frameName = 'crm-sink-' + Date.now();

      const frame = document.createElement('iframe');
      frame.name = frameName;
      if (DEBUG) {
        frame.style.cssText = 'position:fixed;inset-inline:16px;bottom:16px;height:45vh;'
                            + 'z-index:3000;background:#fff;border:3px solid #D4A520;'
                            + 'border-radius:12px;box-shadow:0 10px 40px rgba(0,0,0,.4)';
      } else {
        frame.style.display = 'none';
        frame.setAttribute('aria-hidden', 'true');
      }

      const form = document.createElement('form');
      form.action = FORM_ACTION;
      form.method = 'POST';
      form.target = frameName;
      form.acceptCharset = 'UTF-8';
      form.style.display = 'none';

      for (const [name, value] of Object.entries(collect())) {
        const input = document.createElement('input');
        input.type  = 'hidden';
        input.name  = name;
        input.value = value;
        form.appendChild(input);
      }

      let done = false;
      const finish = ok => {
        if (done) return;
        done = true;
        clearTimeout(timer);
        setTimeout(() => { if (!DEBUG) frame.remove(); form.remove(); }, 1000);
        resolve(ok);
      };

      frame.addEventListener('load', () => finish(true));
      const timer = setTimeout(() => finish(false), 12000);

      document.body.append(frame, form);
      form.submit();
    });
  }

  window.WASUL_CRM = { submitToCRM, collect, FORM_ACTION };

})();
