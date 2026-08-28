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
    hero_badge: 'خبرة في النقل التعاقدي والتعليمي منذ 2013',
    hero_subtitle: 'حلول نقل للموظفين والطلاب والوفود والمجموعات، بعقود سنوية أو شهرية، ومركبات حديثة متعددة السعات، وسائقين مؤهلين، ومتابعة للمسارات عبر GPS.',
    hero_cta_primary: 'اطلب حلاً لجهتك', hero_cta_secondary: 'تسجيل المشتركات',
    hero_trusted_label: 'موثوق لدى',
    hero_title_line1:'نخطط الرحلة، ندير الأسطول',
    hero_title_line2:'ونوصل ركابك باحتراف',
    title_visual_side:'خدمات وُسُل',
    live_label: 'مباشر',
    title_service_text1:'النقل المتخصص',
    sub_title_service_text1:'منسوبو الشركات والمؤسسات',
    title_service_badge1:'نشط',
    title_service_text2:'النقل التعليمي',
    sub_title_service_text2:'نقل جامعي ونقل مدرسي',
    title_service_text3:'النقل السياحي',
    sub_title_service_text3:'وفود ومزارات وحج وعمرة',
    title_service_text4:'تشغيل ومتابعة',
    sub_title_service_text4:'GPS ومركبات احتياطية ودعم تشغيلي',
    title_card_stat1:'خبرة منذ',
    title_card_stat2:'سعة المركبات',
    title_card_stat3:'مراقبة المسارات',
    title_float_badge:'سائقون مرخصون ومدربون',


    about_badge: 'عن وُسُل',
    about_title: 'شركة نقل تفهم التشغيل قبل أن تبدأ الرحلة',
    about_desc: 'تأسست وُسُل للنقل في جدة عام 2013 لتقديم حلول نقل تعاقدية موثوقة للقطاعين العام والخاص والجهات التعليمية. تعمل المؤسسة بالتراخيص الرسمية اللازمة للنشاط، وتوفّر مركبات متعددة السعات لتلبية احتياجات التشغيل اليومية والرحلات والمجموعات.',
    coverage_badge: 'التغطية الجغرافية',
    coverage_title: 'نصل بخدماتنا إلى مدن ومشاريع متعددة',
    coverage_subtitle: 'يتم تأكيد التغطية وتوفر المركبات بعد دراسة موقع المشروع، عدد الركاب والجدول التشغيلي.',
    about_feature_1_title: 'تشغيل تعاقدي مرن',
    about_feature_1_desc: 'عقود شهرية وسنوية، ومسارات وجداول تُبنى وفق مواقع الركاب والورديات ومتطلبات المشروع.',
    about_feature_2_title: 'أسطول متنوع وتجهيزات عملية',
    about_feature_2_desc: 'مركبات بسعات مختلفة، تكييف، تأمين شامل، نظافة يومية، وإمكانية توفير مركبات احتياطية عند الحاجة.',
    about_feature_3_title: 'متابعة وسلامة على الطريق',
    about_feature_3_desc: 'سائقون ذوو خبرة، متابعة للمركبات عبر GPS، وإدارة تشغيلية للتعامل مع الملاحظات والمتغيرات.',
    services_badge: 'خدماتنا', services_title: 'خدمات نقل تغطي احتياج الجهة والراكب',
    services_subtitle: 'ثلاثة مسارات واضحة: النقل المتخصص للجهات، النقل التعليمي، والنقل السياحي، مع تشغيل يدعم الراحة والسلامة.',
    service_1_title: 'النقل المتخصص',
    service_1_desc: 'نقل منسوبي الشركات والمؤسسات والجهات وفق جداول وورديات ومسارات متفق عليها.',
    service_2_title: 'النقل التعليمي',
    service_2_desc: 'نقل جامعي ونقل مدرسي للجهات التعليمية والطلاب والطالبات، مع تسجيل المشتركات.',
    service_3_title: 'النقل السياحي',
    service_3_desc: 'نقل الوفود والزوار للمزارات، وخدمات الحج والعمرة والرحلات في مكة والمدينة.',
    service_4_title: 'متابعة المسارات عبر GPS',
    service_4_desc: 'مراقبة خط سير المركبات لدعم الانضباط التشغيلي ومتابعة حركة الأسطول.',
    service_5_title: 'مركبات متعددة السعات',
    service_5_desc: 'خيارات بسعات 9 و13 و23 و49 راكبًا لتناسب الفرق الصغيرة والمشاريع والمجموعات الكبيرة.',
    service_6_title: 'تخصيص ودعم للمشروع',
    service_6_desc: 'إمكانية تخصيص هوية المركبات للجهة وتوفير مركبات احتياطية وخدمة متابعة للملاحظات التشغيلية.',
    contact_badge: 'تواصل معنا', contact_title: 'أخبرنا باحتياجك التشغيلي',
    contact_subtitle: 'أرسل عدد الركاب، المدينة، نقاط الانطلاق والوصول، المواعيد ومدة التعاقد. تساعدنا هذه المعلومات على تقديم تصور أدق.',
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
    hero_badge: 'Contract and educational transport expertise since 2013',
    hero_subtitle: 'Transport solutions for employees, students, delegations, and groups, with annual or monthly contracts, a modern multi-capacity fleet, qualified drivers, and GPS route monitoring.',
    hero_cta_primary: 'Plan Transport for Your Organization', hero_cta_secondary: 'Female Subscriber Registration',
    hero_trusted_label: 'Trusted by',
    hero_title_line1:'We plan the journey and manage the fleet',
    hero_title_line2:'So your passengers arrive professionally',
    title_visual_side:'wosol Services',
    live_label: 'Live',
    title_service_text1:'Specialized Transport',
    sub_title_service_text1:'Company and organization staff',
    title_service_badge1:'Active',
    title_service_text2:'Educational Transport',
    sub_title_service_text2:'University and school transport',
    title_service_text3:'Tourism Transport',
    sub_title_service_text3:'Delegations, attractions, Hajj and Umrah',
    title_service_text4:'Operations and Monitoring',
    sub_title_service_text4:'GPS, backup vehicles, and operational support',
    title_card_stat1:'Operating since',
    title_card_stat2:'Vehicle capacity',
    title_card_stat3:'Route monitoring',
    title_float_badge:'Licensed and trained drivers',

    about_badge: 'About Wosol',
    about_title: 'A transport company that understands operations before the journey begins',
    about_desc: 'Wosol Transportation was founded in Jeddah in 2013 to provide dependable contract transport for public and private sectors and educational institutions. The company operates with the official licenses required for the activity and provides multiple vehicle capacities for daily operations, trips, and groups.',
    coverage_badge: 'Geographic Coverage',
    coverage_title: 'Serving projects across multiple Saudi cities',
    coverage_subtitle: 'Coverage and vehicle availability are confirmed after reviewing the project location, passenger count, and operating schedule.',
    about_feature_1_title: 'Flexible Contract Operations',
    about_feature_1_desc: 'Monthly and annual contracts, with routes and schedules designed around passenger locations, shifts, and project requirements.',
    about_feature_2_title: 'Diverse Fleet and Practical Equipment',
    about_feature_2_desc: 'Different vehicle capacities, air conditioning, comprehensive insurance, daily cleaning, and backup vehicles when required.',
    about_feature_3_title: 'Road Safety and Monitoring',
    about_feature_3_desc: 'Experienced drivers, GPS vehicle monitoring, and operational management for service notes and changing conditions.',
    services_badge: 'Our Services', services_title: 'Transport services for organizations and passengers',
    services_subtitle: 'Three clear service lines: specialized, educational, and tourism transport, supported by practical comfort and safety measures.',
    service_1_title: 'Specialized Transport',
    service_1_desc: 'Transport for company, institution, and organization staff according to agreed schedules, shifts, and routes.',
    service_2_title: 'Educational Transport',
    service_2_desc: 'University and school transport for educational organizations and students, with direct subscriber registration.',
    service_3_title: 'Tourism Transport',
    service_3_desc: 'Transport for delegations, visitors, attractions, Hajj, Umrah, Makkah, and Madinah trips.',
    service_4_title: 'GPS Route Monitoring',
    service_4_desc: 'Vehicle route monitoring to support operational discipline and fleet visibility.',
    service_5_title: 'Multiple Vehicle Capacities',
    service_5_desc: 'Options for 9, 13, 23, and 49 passengers, suitable for small teams, projects, and large groups.',
    service_6_title: 'Project Customization and Support',
    service_6_desc: 'Organization branding, backup vehicle options, and operational follow-up for project requirements.',
    contact_badge: 'Contact Us', contact_title: 'Tell us about your operating requirement',
    contact_subtitle: 'Share passenger count, city, pickup and destination points, schedules, and contract term so we can prepare a more accurate proposal.',
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
