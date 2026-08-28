/* ============================================================
   وُسُل — Shared i18n  (i18n.js)
   Single source of truth for all page translations.
   Used by: index.html · register.html
   ============================================================ */
'use strict';

/* eslint-disable key-spacing */
const WASUL_I18N = {

  /* ══════════════════════════════════════════════════════════
     ARABIC
  ══════════════════════════════════════════════════════════ */
  ar: {
    /* ── Shared ──────────────────────────────────────────── */
    nav_home: 'الرئيسية', nav_about: 'من نحن',
    nav_services: 'الخدمات', nav_pricing: 'الاشتراكات',
    nav_specialized: 'النقل المتخصص',
    nav_contact: 'تواصل معنا',
    footer_desc: 'حلول نقل متكاملة من الدرجة الأولى للشركات والموظفين والجامعات في المملكة العربية السعودية.',
    footer_links: 'روابط سريعة', footer_services_title: 'خدماتنا',
    footer_legal: 'قانوني', footer_privacy: 'سياسة الخصوصية',
    footer_terms: 'شروط الاستخدام',
    footer_copyright: '© {year} وُسُل. جميع الحقوق محفوظة.',

    /* ── Index ───────────────────────────────────────────── */
    page_title: 'وُسُل للنقل | نقل الموظفين والجامعات في السعودية',
    hero_badge: 'حلول نقل مرخصة للجهات والأفراد',
    hero_subtitle: 'نصمم ونشغّل حلول نقل للشركات والجهات التعليمية، ونوفر اشتراكات نقل جامعي للأفراد؛ بأسطول حديث، سائقين مرخصين، تتبع مباشر ودعم تشغيلي.',
    hero_cta_primary: 'اطلب عرض سعر للجهات', hero_cta_secondary: 'سجّل في النقل الجامعي',
    hero_trusted_label: 'موثوق لدى',
    hero_title_line1:'نقل موظفين وطلاب',
    hero_title_line2:'بتشغيل منظم وراحة في كل رحلة',
    title_visual_side:'خدمات وُسُل',
    live_label: 'مباشر',
    title_service_text1:'نقل الشركات',
    sub_title_service_text1:'حلول نقل من الدرجة الأولى للموظفين',
    title_service_badge1:'نشط',
    title_service_text2:'نقل الجامعات',
    sub_title_service_text2:'جدول يومي ثابت من وإلى الجامعة',
    title_service_text3:'تتبع حي GPS',
    sub_title_service_text3:'متابعة لحظية لمسار السيارات',
    title_service_text4:'أمان ومراقبة',
    sub_title_service_text4:'كاميرات داخلية وخارجية على كل رحلة',
    title_card_stat1:'خبرة منذ',
    title_card_stat2:'مدن نخدمها',
    title_card_stat3:'رقم الترخيص',
    title_float_badge:'سائقون مرخصون ومدربون',


    about_badge: 'عن وُسُل',
    about_title: 'راحتك في قلب كل رحلة… باحترافية تستحقها',
    about_desc: 'مؤسسة وُسُل. تأسست مؤسسة وُسُل عام 2014م في مدينة جدة، وهي مرخصة من الهيئة العامة للنقل. تقدم حلول نقل ذكية ومتكاملة للقطاعين الحكومي والخاص في 7 مدن سعودية، وحاصلة على شهادات ISO 9001 وISO 45001 وISO 14001، بما يعكس التزامها بأعلى معايير الجودة والسلامة والاستدامة.',
    coverage_badge: 'التغطية الجغرافية',
    coverage_title: 'نخدم في 7 مدن سعودية',
    coverage_subtitle: 'الحافلة تجول تلقائياً — مرّري على أي مدينة لتنطلق الحافلة إليها',
    about_feature_1_title: 'نقل الشركات من الدرجة الأولى',
    about_feature_1_desc: 'حلول نقل متكاملة للشركات والمؤسسات بأسطول حديث ومكيّف، مع سائقين مرخصين ومدربين لضمان أعلى معايير الأمان.',
    about_feature_2_title: 'نقل تعليمي متخصص',
    about_feature_2_desc: 'خدمات نقل مخصصة للجامعات والمدارس بجداول زمنية ثابتة، مع متابعة ميدانية من قسم التشغيل على مدار الساعة.',
    about_feature_3_title: 'تتبع ذكي ودقة في المواعيد',
    about_feature_3_desc: 'نلتزم بالجداول الزمنية المحددة مع أنظمة تتبع GPS متقدمة، لضمان عدم تأخر الموظفين أو الطلاب عن وجهتهم.',
    services_badge: 'خدماتنا', services_title: 'حلول نقل متكاملة للشركات والجامعات',
    services_subtitle: 'نقدم باقة شاملة من خدمات النقل من الدرجة الأولى للشركات والموظفين والجامعات',
    service_1_title: 'نقل الشركات والموظفين',
    service_1_desc: 'حلول نقل من الدرجة الأولى للشركات والمؤسسات، بأسطول حديث وسائقين مرخصين لتوصيل الموظفين براحة وأمان.',
    service_2_title: 'نقل الجامعات والتعليم',
    service_2_desc: 'خدمة نقل يومية منتظمة للطلاب والطالبات من وإلى الجامعات والمدارس بجدول زمني ثابت ودقيق.',
    service_3_title: 'معايير أمان عالية',
    service_3_desc: 'سائقون مرخصون ومدربون، مع كاميرات داخلية وخارجية وتأمين شامل على جميع الرحلات.',
    service_4_title: 'تتبع حي فوري',
    service_4_desc: 'تطبيق ذكي يتيح لإدارات الشركات والجامعات متابعة مواقع السيارات لحظة بلحظة.',
    service_5_title: 'أسطول متنوع',
    service_5_desc: 'سيارات حديثة من مختلف الأحجام تناسب الشركات والجامعات والمجموعات بكل مرونة.',
    service_6_title: 'دعم على مدار الساعة',
    service_6_desc: 'فريق خدمة عملاء متاح 24/7 للرد على استفسارات الشركات والجامعات وحل أي طارئ فوراً.',
    contact_badge: 'تواصل معنا', contact_title: 'نحن هنا لخدمتك',
    contact_subtitle: 'هل تريد الاستفسار عن خدمات نقل الشركات أو الجامعات؟ تواصل معنا وسيرد فريقنا خلال ساعات.',
    contact_tab_inquiry: 'استفسار', contact_tab_complaint: 'شكوى', contact_tab_quote: 'عرض سعر',
    contact_name: 'الاسم الكامل', contact_email: 'البريد الإلكتروني',
    contact_subject: 'نوع الخدمة المطلوبة', contact_message: 'تفاصيل الطلب',
    contact_send: 'إرسال الطلب',
    contact_success: 'تم استلام رسالتك! سيتواصل معك فريقنا خلال 24 ساعة.',
    contact_info_phone: '920003790',
    contact_info_email: 'info@wosol.net',
    complaint_name: 'الاسم الكامل', complaint_phone: 'رقم الجوال',
    complaint_type: 'نوع الشكوى',
    complaint_date: 'تاريخ الواقعة', complaint_desc: 'وصف الشكوى',
    complaint_send: 'إرسال الشكوى',
    complaint_success: 'تم استلام شكواك! سنتواصل معك خلال 24 ساعة.',
    quote_org: 'اسم الجهة / الشركة', quote_service: 'نوع الخدمة المطلوبة',
    quote_count: 'العدد المتوقع للأشخاص', quote_region: 'المنطقة / المدينة',
    quote_notes: 'ملاحظات إضافية', quote_send: 'طلب عرض السعر',
    quote_service_specialized: 'النقل المتخصص',
    quote_success: 'تم استلام طلبك! سيتواصل معك فريق المبيعات خلال 24 ساعة.',

    /* ── Register ─────────────────────────────────────────── */
    page_title_register: 'تسجيل اشتراك النقل التعليمي | وُسُل للنقل',
    reg_hero_title: 'التسجيل في خدمات النقل',
    reg_hero_sub: 'أكمل البيانات التالية للاشتراك في خدمة نقل الجامعات والشركات',
    reg_step_1: 'بيانات المشتركة', reg_step_1_tip: 'الاسم، الهوية، الجوال، العنوان',
    reg_step_2: 'الاشتراك',       reg_step_2_tip: 'الجامعة، طريقة السداد، الاتجاه، تاريخ الاشتراك',
    reg_step_3: 'الإرسال',        reg_step_3_tip: 'مراجعة الشروط وإرسال الطلب',
    reg_sec1_title: 'بيانات المشتركة', reg_sec1_sub: 'المعلومات الشخصية للمشتركة',
    reg_sec2_title: 'بيانات الاشتراك', reg_sec2_sub: 'تفاصيل الجامعة ونوع الخدمة',
    reg_sec4_title: 'الشروط والأحكام', reg_sec4_sub: 'يرجى القراءة بعناية والموافقة قبل الإرسال',
    reg_terms_scroll: 'اسحب للأسفل لقراءة كامل الشروط',
    reg_submit_btn: 'إرسال طلب التسجيل',
    reg_success_title: 'تم إرسال طلبك بنجاح!',
    reg_success_desc: 'جارٍ مراجعة الطلب من قبل فريق العمل، وسيتم الرد عليك في أسرع وقت.',

    /* ── Payment ──────────────────────────────────────────── */
  },

  /* ══════════════════════════════════════════════════════════
     ENGLISH
  ══════════════════════════════════════════════════════════ */
  en: {
    /* ── Shared ──────────────────────────────────────────── */
    nav_home: 'Home', nav_about: 'About',
    nav_services: 'Services', nav_pricing: 'Subscriptions',
    nav_specialized: 'Specialized Transport',
    nav_contact: 'Contact',
    footer_desc: 'Premium, end-to-end transportation solutions for companies, employees, and universities across Saudi Arabia.',
    footer_links: 'Quick Links', footer_services_title: 'Services',
    footer_legal: 'Legal', footer_privacy: 'Privacy Policy',
    footer_terms: 'Terms of Service',
    footer_copyright: '© {year} wosol. All rights reserved.',

    /* ── Index ───────────────────────────────────────────── */
    page_title: 'Wosol Transportation | Employee & University Transport in Saudi Arabia',
    hero_badge: 'Licensed transport solutions for organizations and individuals',
    hero_subtitle: 'We design and operate transport solutions for companies and educational institutions, and provide university subscriptions for individuals—with a modern fleet, licensed drivers, live tracking, and operational support.',
    hero_cta_primary: 'Request a Business Quote', hero_cta_secondary: 'Register for University Transport',
    hero_trusted_label: 'Trusted by',
    hero_title_line1:'Employee and Student Transport',
    hero_title_line2:'Organized operations and comfort on every journey',
    title_visual_side:'wosol Services',
    live_label: 'Live',
    title_service_text1:'Corporate Transportation',
    sub_title_service_text1:'First-class transport solutions for employees',
    title_service_badge1:'Active',
    title_service_text2:'University Transportation',
    sub_title_service_text2:'A consistent daily timetable to and from the university',
    title_service_text3:'Live GPS Tracking',
    sub_title_service_text3:'Real-time monitoring of vehicle routes',
    title_service_text4:'Safety & Monitoring',
    sub_title_service_text4:'Interior and exterior cameras on every trip',
    title_card_stat1:'Operating since',
    title_card_stat2:'Cities served',
    title_card_stat3:'License number',
    title_float_badge:'Licensed and trained drivers',

    about_badge: 'About Wosol',
    about_title: 'Your comfort is at the heart of every journey… with professionalism you deserve.',
    about_desc: 'Wosol was founded in 2014 in Jeddah and is licensed by the Transport General Authority. We provide smart, integrated transport solutions for government and private sectors across 7 Saudi cities, holding ISO 9001, ISO 45001, and ISO 14001 certifications reflecting our commitment to the highest quality, safety, and sustainability standards.',
    coverage_badge: 'Geographic Coverage',
    coverage_title: 'Serving 7 Saudi Cities',
    coverage_subtitle: 'The bus tours automatically — hover any city and it will drive to it',
    about_feature_1_title: 'First-Class Corporate Transportation',
    about_feature_1_desc: 'Integrated transport solutions for companies and institutions with a modern, air-conditioned fleet and licensed, trained drivers to ensure the highest safety standards.',
    about_feature_2_title: 'Specialized Educational Transport',
    about_feature_2_desc: 'Dedicated transport services for universities and schools on fixed schedules, with round-the-clock field follow-up from our operations team.',
    about_feature_3_title: 'Smart Tracking & Punctuality',
    about_feature_3_desc: 'We adhere strictly to fixed schedules using advanced GPS tracking systems, ensuring employees and students are never late.',
    services_badge: 'Our Services', services_title: 'Integrated Transport Solutions for Companies & Universities',
    services_subtitle: 'A comprehensive suite of first-class transportation services for companies, employees, and universities.',
    service_1_title: 'Corporate & Employee Transportation',
    service_1_desc: 'First-class transport solutions for companies and institutions, with a modern fleet and licensed drivers delivering employees in comfort and safety.',
    service_2_title: 'University & Educational Transportation',
    service_2_desc: 'A regular daily transport service for students to and from universities and schools on a fixed, precise schedule.',
    service_3_title: 'High Safety Standards',
    service_3_desc: 'Licensed and trained drivers, with interior and exterior cameras and comprehensive insurance on every trip.',
    service_4_title: 'Live GPS Tracking',
    service_4_desc: 'A smart app allowing company and university administrators to track vehicle locations moment by moment.',
    service_5_title: 'Diverse Fleet',
    service_5_desc: 'Modern vehicles of various sizes suited for companies, universities, and groups with full flexibility.',
    service_6_title: '24/7 Support',
    service_6_desc: 'A customer service team available 24/7 to answer inquiries from companies and universities and resolve any issue immediately.',
    contact_badge: 'Contact Us', contact_title: "We're Here to Serve You",
    contact_subtitle: 'Want to inquire about corporate or university transport services? Contact us and our team will respond within hours.',
    contact_tab_inquiry: 'Inquiry', contact_tab_complaint: 'Complaint', contact_tab_quote: 'Get a Quote',
    contact_name: 'Full Name', contact_email: 'Email Address',
    contact_subject: 'Service Required', contact_message: 'Request Details',
    contact_send: 'Send Request',
    contact_success: 'Message received! Our team will contact you within 24 hours.',
    contact_info_phone: '920003790',
    contact_info_email: 'info@wosol.net',
    complaint_name: 'Full Name', complaint_phone: 'Phone Number',
    complaint_type: 'Complaint Type',
    complaint_date: 'Incident Date', complaint_desc: 'Complaint Description',
    complaint_send: 'Submit Complaint',
    complaint_success: 'Complaint received! We will contact you within 24 hours.',
    quote_org: 'Organization / Company Name', quote_service: 'Service Required',
    quote_count: 'Expected Number of Passengers', quote_region: 'Region / City',
    quote_notes: 'Additional Notes', quote_send: 'Request a Quote',
    quote_service_specialized: 'Specialized Transport',
    quote_success: 'Request received! Our sales team will contact you within 24 hours.',

    /* ── Register ─────────────────────────────────────────── */
    page_title_register: 'Educational Transport Registration | wosol',
    reg_hero_title: 'Transportation Service Registration',
    reg_hero_sub: 'Complete the form below to subscribe to our university and corporate transportation service',
    reg_step_1: 'Student Info',   reg_step_1_tip: 'Name, ID, phone, address',
    reg_step_2: 'Subscription',   reg_step_2_tip: 'University, payment method, direction, start date',
    reg_step_3: 'Submit',         reg_step_3_tip: 'Review terms and submit',
    reg_sec1_title: 'Student Information', reg_sec1_sub: 'Personal details of the student',
    reg_sec2_title: 'Subscription Details', reg_sec2_sub: 'University and service type',
    reg_sec4_title: 'Terms & Conditions', reg_sec4_sub: 'Please read carefully before submitting',
    reg_terms_scroll: 'Scroll down to read the full terms',
    reg_submit_btn: 'Submit Registration',
    reg_success_title: 'Request Submitted Successfully!',
    reg_success_desc: 'Your request is being reviewed by our team, and we will get back to you as soon as possible.',

    /* ── Payment ──────────────────────────────────────────── */
  },
};

/* ─────────────────────────────────────────────────────────────
   applyI18n(lang)
   Updates all [data-i18n], [data-i18n-ph], [data-tooltip-i18n]
   on the page, sets document direction and title.
───────────────────────────────────────────────────────────── */
const _YEAR_RE = /\{year\}/g;
const _subst = (s) => s.replace(_YEAR_RE, new Date().getFullYear());

function applyI18n(lang) {
  const t = WASUL_I18N[lang];
  if (!t) return;

  const html = document.documentElement;
  html.setAttribute('lang', lang);
  html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  html.setAttribute('data-lang', lang);

  // Page-specific title key (data-page="register" → page_title_register)
  const page     = html.dataset.page;
  const titleKey = page ? `page_title_${page}` : 'page_title';
  document.title = t[titleKey] || t.page_title || document.title;

  // Lang toggle label
  const langBtn = document.getElementById('langToggle');
  if (langBtn) langBtn.textContent = lang === 'ar' ? 'EN' : 'ع';

  // Text content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = t[el.getAttribute('data-i18n')];
    if (v != null) el.textContent = _subst(v);
  });

  // Placeholders
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const v = t[el.getAttribute('data-i18n-ph')];
    if (v != null) el.placeholder = _subst(v);
  });

  // data-tooltip values
  document.querySelectorAll('[data-tooltip-i18n]').forEach(el => {
    const v = t[el.getAttribute('data-tooltip-i18n')];
    if (v != null) el.setAttribute('data-tooltip', v);
  });

  try { localStorage.setItem('nova-lang', lang); } catch { /* storage unavailable — ignore */ }
}

/* ─────────────────────────────────────────────────────────────
   initI18n()
   Restores saved language and wires the lang toggle button.
   Call once per page that includes this script.
───────────────────────────────────────────────────────────── */
function initI18n() {
  let saved = 'ar';
  try { saved = localStorage.getItem('nova-lang') || 'ar'; } catch { /* storage unavailable */ }
  applyI18n(saved);

  document.getElementById('langToggle')?.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-lang') || 'ar';
    applyI18n(cur === 'ar' ? 'en' : 'ar');
  });
}
