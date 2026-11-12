/* Zoho Forms' exported multipart HTML endpoints. No credentials or client-side success claims. */
(() => {
  'use strict';
  const quoteURL = 'https://forms.zohopublic.com/wosolnet/form/WOSOLTransportQuote/formperma/feihP9AN_ZqvxKRBauPH72ofHgvwAFo5d3dYMiGi9J8/htmlRecords/submit';
  const contactURL = 'https://forms.zohopublic.com/wosolnet/form/WOSOLContact/formperma/8b8kl7ll5bcbX-E0NllZzILlovck2qxcM1JFqh9dVUM/htmlRecords/submit';
  const services = {
    employees: 'نقل الموظفين / Employee transport',
    workforce: 'نقل فرق المشاريع / Workforce and project transport',
    private: 'رحلات خاصة / Private day trips',
    events: 'نقل الفعاليات / Event transport',
    airport: 'نقل المطار والفنادق / Airport and hotel transfers',
    intercity: 'نقل بين المدن / Intercity transport',
    tourism: 'النقل السياحي / Tourism transport',
    umrah: 'نقل المعتمرين والزوار / Umrah and visitor transport',
    executive: 'نقل كبار الشخصيات / Executive transport',
    vehicle_only: 'مركبات دون سائق / Vehicle rental without driver',
    driver_only: 'سائقون دون مركبات / Driver-only services',
    specialized: 'نقل متخصص / Special transport requirements'
  };
  function validateAttachments(form) {
    const files = [...form.querySelectorAll('input[type="file"]:not(:disabled)')].flatMap(el => [...el.files]);
    if (files.some(f => !/\.(pdf|png|jpe?g)$/i.test(f.name) || !['application/pdf','image/png','image/jpeg'].includes(f.type) || !f.size || f.size > 3*1024*1024) || files.reduce((n,f)=>n+f.size,0)>9*1024*1024) {
      throw Error(document.documentElement.lang === 'ar'
        ? 'اختر PDF أو JPG أو PNG، حتى 3 ميجابايت لكل ملف و9 ميجابايت إجمالاً، دون ملفات فارغة.'
        : 'Choose PDF, JPG or PNG, up to 3 MB per file and 9 MB total. Empty files are not accepted.');
    }
  }
  function payloadFor(form) {
    const value = id => form.querySelector('#'+id)?.value.trim() || '';
    const quote = form.id === 'quoteForm', complaint = form.id === 'complaintForm';
    const summary = [...form.elements].filter(el => el.name && !el.disabled && !['file','submit','hidden'].includes(el.type))
      .map(el => `${el.labels?.[0]?.textContent.trim() || el.name}: ${el.tagName === 'SELECT' ? el.selectedOptions[0]?.textContent || '' : el.value.trim()}`)
      .join('\n');
    const fields = quote ? {
      SingleLine: value('qt-org') || 'فرد / Individual',
      SingleLine1: value('qt-contact'), SingleLine2: value('qt-job'),
      Email: value('qt-email'), PhoneNumber_countrycode: value('qt-phone'),
      SingleLine3: value('qt-region'), Dropdown: services[value('qt-service')],
      MultiLine: summary
    } : {
      SingleLine: value(complaint ? 'cmp-name' : 'name'),
      Email: value(complaint ? 'cmp-email' : 'email'),
      PhoneNumber_countrycode: value(complaint ? 'cmp-phone' : 'contact-phone'),
      Dropdown: complaint ? 'شكوى / Complaint' : 'استفسار / Inquiry',
      MultiLine: summary
    };
    if (!fields.Dropdown || !fields.MultiLine) throw Error('Select a valid request type.');
    fields.zf_referrer_name = location.origin + location.pathname; // No query strings or advertising identifiers.
    return { url: quote ? quoteURL : contactURL, fields,
      uploads: quote ? [['qt-commercial','FileUpload'],['qt-tax','FileUpload1'],['qt-address','FileUpload2']]
        : [[complaint ? 'cmp-attachment' : 'contact-attachment','FileUpload']] };
  }
  function submitForm(form) {
    validateAttachments(form);
    const data = payloadFor(form);
    const post = document.createElement('form');
    post.method = 'POST'; post.action = data.url; post.enctype = 'multipart/form-data';
    post.acceptCharset = 'UTF-8'; post.hidden = true;
    for (const [name,value] of Object.entries(data.fields)) {
      const input = document.createElement('input'); input.type='hidden'; input.name=name; input.value=value;
      post.append(input);
    }
    for (const [id,name] of data.uploads) {
      const source = form.querySelector('#'+id);
      if (source?.files?.length) {
        const input=document.createElement('input'); input.type='file'; input.name=name; input.files=source.files;
        post.append(input);
      }
    }
    document.body.append(post);
    HTMLFormElement.prototype.submit.call(post);
    // Only Zoho can confirm acceptance on its response page. Never reset or claim success here.
    return { navigating: true };
  }
  window.WOSOL_ZOHO = { validateAttachments, payloadFor, submitForm };
})();
