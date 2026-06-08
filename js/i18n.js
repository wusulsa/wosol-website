/* ============================================================
   وُسُل — Shared i18n  (i18n.js)
   Single source of truth for all page translations.
   Used by: index.html · register.html · payment.html
   ============================================================ */
'use strict';

/* eslint-disable key-spacing */
const WASUL_I18N = {

  /* ══════════════════════════════════════════════════════════
     ARABIC
  ══════════════════════════════════════════════════════════ */
  ar: {
    /* ── Shared ──────────────────────────────────────────── */
    brand_name: 'وُسُل',
    nav_home: 'الرئيسية', nav_about: 'عن وُسُل',
    nav_services: 'خدمتنا', nav_pricing: 'النقل التعليمي',
    nav_specialized: 'النقل المتخصص',
    nav_contact: 'تواصل معنا', nav_clients: 'عملاؤنا',
    lang_btn: 'EN',
    footer_desc: 'خدمة نقل موثوقة وآمنة في المملكة العربية السعودية.',
    footer_links: 'روابط سريعة', footer_services_title: 'خدماتنا',
    footer_legal: 'قانوني', footer_privacy: 'سياسة الخصوصية',
    footer_terms: 'شروط الاستخدام',
    footer_copyright: '© {year} وُسُل. جميع الحقوق محفوظة.',

    /* ── Index ───────────────────────────────────────────── */
    page_title: 'شركة وُسُل',
    hero_badge: 'خدمة نقل موثوقة وآمنة',
    hero_title: 'نقل آمن للطالبات والموظفين بكل راحة واطمئنان',
    hero_subtitle: 'نقل آمن واحترافي بمعايير عالية، بأسطول حديث ومكيّف، وسائقين مرخصين، وتتبع مباشر على مدار الساعة.',
    hero_cta_primary: 'اشترك الآن', hero_cta_secondary: 'تعرف على خدماتنا',
    hero_trusted: 'نخدم أكثر من', hero_trusted_count: '3,000+ طالبة وموظفة',
    hero_trusted_label: 'موثوق لدى',
    hero_trusted_tga: 'الهيئة العامة للنقل',
    hero_trusted_sbc: 'المركز السعودي للأعمال',
    hero_title_line1:'نرتقي بخدمات النقل لنكون دائماً الأفضل',
    hero_title_line2:'أمان وثقة في كل رحلة',
    title_visual_side:'خدمات وُسُل',
    // card_live_dot:'مباشر',
    title_service_text1:'نقل الطالبات',
    sub_title_service_text1:'جدول يومي ثابت من وإلى الجامعة',
    title_service_badge1:'نشط',
    title_service_text2:'نقل الموظفات',
    sub_title_service_text2:'توصيل للشركات والمنشآت بكل مرونة',
    title_service_text3:'الرحلات السياحيه',
    sub_title_service_text3:'حجز مرن للرحلات الفردية والمجموعات',
    title_service_text4:'تتبع حي GPS',
    sub_title_service_text4:'متابعة موثوقة لمسار الباص طوال الرحلة',
    title_card_stat1:'راكبة يومياً',
    title_card_stat2:'رضا العملاء',
    title_card_stat3:'مدرسة وشركة',
    title_float_badge:'سائقون مرخّصون ومدرّبون',


    stat_1_label: 'طالبة وموظفة', stat_2_label: 'مدرسة وشركة',
    stat_3_label: 'رضا العملاء',   stat_4_label: 'دعم وتتبع',
    about_badge: 'من نحن',
    about_title: 'راحتك في قلب كل رحلة… باحترافية تستحقها',
    about_desc: 'وُسُل شركة متخصصة في تقديم خدمات نقل آمنة ومريحة للطالبات والموظفات. نعمل بأسطول سيارات حديث ومكيّف، وسائقين مرخصين ومدربين، لضمان وصول كل راكبة في الوقت المحدد وبكامل الأمان.',
    about_feature_1_title: 'أمان لا يُساوم عليه',
    about_feature_1_desc: 'جميع سياراتنا مجهزة بكاميرات وأنظمة تتبع GPS لضمان سلامة الراكبات.',
    about_feature_2_title: 'أسطول حديث ومريح',
    about_feature_2_desc: 'سيارات مكيفة وصيانتها دورية لضمان أعلى مستوى من الراحة في كل رحلة.',
    about_feature_3_title: 'دقة في المواعيد',
    about_feature_3_desc: 'نلتزم بالجداول الزمنية المحددة لضمان عدم تأخر الطالبة أو الموظفة.',
    services_badge: 'خدماتنا', services_title: 'خدمات نقل متكاملة بمعايير عالية',
    services_subtitle: 'نقدم باقة شاملة من خدمات النقل المصممة خصيصاً لراحة وأمان الطالبات والموظفين',
    service_1_title: 'نقل الطالبات',
    service_1_desc: 'خدمة نقل يومية منتظمة للطالبات من وإلى المدارس والجامعات بجدول زمني ثابت ودقيق.',
    service_2_title: 'نقل الموظفين',
    service_2_desc: 'حلول نقل مخصصة للشركات والمؤسسات لتوصيل الموظفين يومياً براحة تامة.',
    service_3_title: 'تتبع حي فوري',
    service_3_desc: 'تطبيق ذكي يتيح للأهالي وإدارات الشركات متابعة مواقع السيارات لحظة بلحظة.',
    service_4_title: 'معايير أمان عالية',
    service_4_desc: 'سائقون مرخصون ومدربون، مع كاميرات داخلية وخارجية وتأمين شامل على جميع الرحلات.',
    service_5_title: 'أسطول متنوع',
    service_5_desc: 'سيارات من مختلف الأحجام تناسب الأفراد والمجموعات الصغيرة والكبيرة بكل مرونة.',
    service_6_title: 'دعم على مدار الساعة',
    service_6_desc: 'فريق خدمة عملاء متاح 24/7 للرد على استفساراتكم وحل أي طارئ فوراً.',
    pricing_badge: 'النقل التعليمي', pricing_title: 'اعرض سعر النقل التعليمي',
    pricing_subtitle: 'اختر الحي ونوع الاشتراك والرحلة وسيظهر السعر تلقائياً',
    calc_step1_title: 'اختر الحي', calc_step2_title: 'نوع الاشتراك', calc_step3_title: 'نوع الرحلة', calc_step4_title: 'نوع الرحلة',
    transport_educational: 'النقل التعليمي', transport_educational_note: 'للطالبات والجهات التعليمية',
    transport_specialized: 'النقل المتخصص', transport_specialized_note: 'خدمة مخصصة باحتياج خاص',
    district_north: 'أبحر الشمالية', district_south: 'أبحر الجنوبية',
    subtype_month: 'شهري',     subtype_month_note: 'خصومات حسب الأيام',
    subtype_term:  'ترم كامل', subtype_term_note:  '٥ أشهر · توفير أكبر',
    triptype_both: 'ذهاب وعودة', triptype_go: 'ذهاب فقط', triptype_return: 'عودة فقط',
    calc_placeholder_text: 'اختر الحي ونوع الاشتراك والرحلة لعرض السعر الفوري',
    calc_base_label: 'السعر الأساسي', calc_total_label: 'الإجمالي',
    calc_term_note: 'سعر ترم كامل (٥ أشهر)', calc_cta: 'سجّل الآن وابدأ رحلتك',
    clients_badge: 'عملاؤنا', clients_title: 'شركاء يثقون بخدماتنا',
    clients_subtitle: 'نفخر بثقة كبرى الشركات والمؤسسات التعليمية في المملكة العربية السعودية',
    contact_badge: 'تواصل معنا', contact_title: 'نحن هنا لخدمتك',
    contact_subtitle: 'هل تريد الاستفسار عن خدماتنا أو الاشتراك؟ تواصل معنا وسيرد فريقنا خلال ساعات.',
    contact_tab_inquiry: 'استفسار', contact_tab_complaint: 'شكوى', contact_tab_quote: 'عرض سعر',
    contact_name: 'الاسم الكامل', contact_email: 'البريد الإلكتروني',
    contact_subject: 'نوع الخدمة المطلوبة', contact_message: 'تفاصيل الطلب',
    contact_send: 'إرسال الطلب',
    contact_success: 'تم استلام رسالتك! سيتواصل معك فريقنا خلال 24 ساعة.',
    contact_info_phone: '920003790', contact_info_phone_sub: 'الرقم الموحد',
    contact_info_email: 'info@wosol.net',
    contact_info_address: 'جدة - الرويس - طريق المدينة المنورة النازل - المحمدية بلازا',
    complaint_name: 'الاسم الكامل', complaint_phone: 'رقم الجوال',
    complaint_order_num: 'رقم الاشتراك', complaint_type: 'نوع الشكوى',
    complaint_date: 'تاريخ الواقعة', complaint_desc: 'وصف الشكوى',
    complaint_send: 'إرسال الشكوى',
    complaint_success: 'تم استلام شكواك! سنتواصل معك خلال 24 ساعة.',
    quote_org: 'اسم الجهة / الشركة', quote_service: 'نوع الخدمة المطلوبة',
    quote_count: 'العدد المتوقع للأشخاص', quote_region: 'المنطقة / المدينة',
    quote_notes: 'ملاحظات إضافية', quote_send: 'طلب عرض السعر',
    quote_service_specialized: 'النقل المتخصص',
    quote_success: 'تم استلام طلبك! سيتواصل معك فريق المبيعات خلال 24 ساعة.',

    /* ── Register ─────────────────────────────────────────── */
    page_title_register: 'وُسُل | تسجيل طالبة',
    reg_hero_title: 'تسجيل طالبة جديدة',
    reg_hero_sub: 'أكمل البيانات التالية للاشتراك في خدمة نقل الطالبات',
    reg_step_1: 'بيانات الطالبة', reg_step_1_tip: 'الاسم، الهوية، الجوال، العنوان',
    reg_step_2: 'الاشتراك',       reg_step_2_tip: 'الجامعة، نوع الاشتراك، تاريخ البداية',
    reg_step_3: 'الجدول',         reg_step_3_tip: 'أيام الدراسة وأوقات الذهاب والعودة',
    reg_step_4: 'الإرسال',        reg_step_4_tip: 'مراجعة الشروط وإرسال الطلب',
    reg_sec1_title: 'بيانات الطالبة', reg_sec1_sub: 'المعلومات الشخصية للطالبة',
    reg_label_fullname: 'الاسم الرباعي', reg_label_address_group: 'العنوان',
    reg_first_name: 'الاسم الأول', reg_second_name: 'اسم الأب',
    reg_third_name: 'اسم الجد',    reg_family_name: 'اسم العائلة',
    reg_gender: 'الجنس', reg_nationality: 'الجنسية',
    reg_id: 'رقم الهوية / الإقامة', reg_phone: 'رقم الجوال',
    reg_email: 'البريد الإلكتروني', reg_region: 'المنطقة',
    reg_city: 'المدينة', reg_district: 'الحي', reg_address: 'العنوان التفصيلي',
    reg_sec2_title: 'بيانات الاشتراك', reg_sec2_sub: 'تفاصيل الجامعة ونوع الخدمة',
    reg_univ: 'اسم الجامعة', reg_gate: 'بوابة الجامعة',
    reg_service_type: 'نوع النقل',
    reg_service_educational: 'النقل التعليمي',
    reg_service_specialized: 'النقل المتخصص',
    reg_sub_type: 'نوع الاشتراك',
    reg_sub_month: 'شهري', reg_sub_term1: 'الترم الأول', reg_sub_term2: 'الترم الثاني',
    reg_trip_type: 'نوع الرحلة',
    reg_trip_go: 'ذهاب', reg_trip_return: 'عودة', reg_trip_both: 'ذهاب وعودة',
    reg_start_date: 'تاريخ البداية',
    reg_price_title: 'ملخص السعر', reg_price_sub: 'يتحدث تلقائياً عند تغيير أي خيار',
    reg_price_live: 'مباشر',
    reg_sec3_title: 'جدول المواعيد', reg_sec3_sub: 'حدد أيام الدراسة وأوقات الذهاب والعودة',
    reg_days_hint: 'اختر الأيام ثم حدد وقت الذهاب و/أو العودة لكل يوم',
    reg_sec4_title: 'الشروط والأحكام', reg_sec4_sub: 'يرجى القراءة بعناية والموافقة قبل الإرسال',
    reg_terms_scroll: 'اسحب للأسفل لقراءة كامل الشروط',
    reg_terms_agree_text: 'لقد قرأت وأوافق على جميع الشروط والأحكام الواردة أعلاه، وأُقرّ بصحة البيانات المدخلة.',
    reg_submit_btn: 'إرسال طلب التسجيل',
    reg_back_btn: 'العودة للرئيسية',
    reg_success_title: 'تم إرسال طلبك بنجاح!',
    reg_success_desc: 'شكراً لتسجيلك في خدمة وُسُل. سيتواصل معك فريقنا خلال 24 ساعة لتأكيد الاشتراك وتحديد تفاصيل الرحلة.',
    reg_ref_label: 'رقم طلبك:',
    reg_return_home: 'العودة للصفحة الرئيسية',
    rsb_step_of: 'من',
    rsb_step_label: 'الخطوة',

    /* ── Payment ──────────────────────────────────────────── */
    page_title_payment: 'وُسُل | إتمام الدفع',
    pay_hero_title: 'إتمام عملية الدفع',
    pay_hero_sub: 'أدخل بيانات بطاقتك لإتمام الاشتراك بشكل آمن',
    pay_order_title: 'ملخص الطلب', pay_order_sub: 'تفاصيل اشتراكك المختار',
    pay_ref: 'رقم الطلب', pay_subtype: 'نوع الاشتراك',
    pay_triptype: 'نوع الرحلة', pay_district: 'الحي',
    pay_start: 'تاريخ البداية', pay_total: 'المبلغ الإجمالي',
    pay_secure_msg: 'طلبك محفوظ ومشفّر بالكامل',
    pay_form_title: 'بيانات الدفع', pay_form_sub: 'سيتم ربط هذه الحقول ببوابة الدفع',
    pay_card_number: 'رقم البطاقة', pay_card_holder: 'اسم حامل البطاقة',
    pay_expiry: 'تاريخ الانتهاء', pay_cvv: 'رمز CVV',
    pay_accepted: 'البطاقات المقبولة:',
    pay_btn: 'إتمام الدفع بأمان',
    pay_ssl: 'مشفّر بـ SSL 256-bit — بياناتك آمنة تماماً',
    pay_success_title: 'تم الدفع بنجاح!',
    pay_success_desc: 'شكراً لك! تم تأكيد اشتراكك في خدمة وُسُل. سيتواصل معك فريقنا خلال 24 ساعة لتحديد تفاصيل الرحلة.',
    pay_ref_label: 'رقم طلبك:',
    pay_return_home: 'العودة للصفحة الرئيسية',
  },

  /* ══════════════════════════════════════════════════════════
     ENGLISH
  ══════════════════════════════════════════════════════════ */
  en: {
    /* ── Shared ──────────────────────────────────────────── */
    brand_name: 'wosol',
    nav_home: 'Home', nav_about: 'About Wosol',
    nav_services: 'Services', nav_pricing: 'Educational Transport',
    nav_specialized: 'Specialized Transport',
    nav_contact: 'Contact', nav_clients: 'Clients',
    lang_btn: 'ع',
    footer_desc: 'Reliable and safe transportation for students and employees across Saudi Arabia.',
    footer_links: 'Quick Links', footer_services_title: 'Services',
    footer_legal: 'Legal', footer_privacy: 'Privacy Policy',
    footer_terms: 'Terms of Service',
    footer_copyright: '© {year} wosol. All rights reserved.',

    /* ── Index ───────────────────────────────────────────── */
    page_title: 'wosol Company',
    hero_badge: 'Reliable & Safe Transportation',
    hero_title: 'Safe Transportation for Students & Employees, Every Day',
    hero_subtitle: 'Safe and professional transportation with high standards, a modern air-conditioned fleet, licensed drivers, and real-time tracking available 24/7.',
    hero_cta_primary: 'Subscribe Now', hero_cta_secondary: 'Explore Services',
    hero_trusted: 'Serving over', hero_trusted_count: '3,000+ students & employees',
    hero_trusted_label: 'Trusted by',
    hero_trusted_tga: 'Transport General Authority',
    hero_trusted_sbc: 'Saudi Business Center',
    hero_title_line1:'We elevate transportation services to always remain the best.',
    hero_title_line2:'Safety and trust in every journey',
    title_visual_side:'wosol Services',
    // card_live_dot:'Live',
    title_service_text1:'Student transportation',
    sub_title_service_text1:'A consistent daily timetable to and from the university',
    title_service_badge1:'Active',
    title_service_text2:'Employee transportation',
    sub_title_service_text2:'Flexible transportation for companies and facilities',
    title_service_text3:'Tourist trips',
    sub_title_service_text3:'Flexible booking for individual and group trips',
    title_service_text4:'Live GPS tracking',
    sub_title_service_text4:'Reliable tracking of the bus route throughout the journey',
    title_card_stat1:'Daily rider',
    title_card_stat2:'Customer satisfaction',
    title_card_stat3:'Educational institutions and companies',
    title_float_badge:'Licensed and trained drivers',

    stat_1_label: 'Students & Employees', stat_2_label: 'Schools & Companies',
    stat_3_label: 'Satisfaction Rate',    stat_4_label: 'Support & Tracking',
    about_badge: 'About Wosol',
    about_title: 'Your comfort is at the heart of every journey… with professionalism you deserve.',
    about_desc: 'wosol is a specialized company providing safe and comfortable transportation services. We operate a modern, air-conditioned fleet with licensed, trained drivers to ensure every passenger arrives on time and in complete safety.',
    about_feature_1_title: 'Uncompromising Safety',
    about_feature_1_desc: 'All our vehicles are equipped with cameras and GPS tracking to ensure passenger safety throughout every trip.',
    about_feature_2_title: 'Modern & Comfortable Fleet',
    about_feature_2_desc: 'Air-conditioned vehicles with regular maintenance to ensure the highest comfort on every journey.',
    about_feature_3_title: 'Punctual & Reliable',
    about_feature_3_desc: 'We strictly adhere to schedules to ensure no student or employee is ever late.',
    services_badge: 'Our Services', services_title: 'Comprehensive Transportation Services',
    services_subtitle: 'A full suite of transport solutions designed for the safety and comfort of students and employees.',
    service_1_title: 'Student Transportation',
    service_1_desc: 'Regular daily transportation for female students to and from schools and universities on a fixed schedule.',
    service_2_title: 'Employee Transportation',
    service_2_desc: 'Custom transport solutions for companies to deliver employees to their workplaces with full comfort.',
    service_3_title: 'Real-Time Live Tracking',
    service_3_desc: 'A smart app allowing parents and managers to monitor vehicle locations in real time.',
    service_4_title: 'High Safety Standards',
    service_4_desc: 'Licensed and trained drivers, interior and exterior cameras, and comprehensive insurance on all trips.',
    service_5_title: 'Diverse Fleet',
    service_5_desc: 'Vehicles of various sizes suited for individuals and small or large groups, with full flexibility.',
    service_6_title: '24/7 Support',
    service_6_desc: 'Customer service team available around the clock to answer inquiries and resolve any urgent issues.',
    pricing_badge: 'Educational Transport', pricing_title: 'View Educational Transport Pricing',
    pricing_subtitle: 'Choose the district, subscription type, and trip direction to see live pricing.',
    calc_step1_title: 'Choose District', calc_step2_title: 'Subscription Type', calc_step3_title: 'Trip Direction', calc_step4_title: 'Trip Direction',
    transport_educational: 'Educational Transport', transport_educational_note: 'For students and educational institutions',
    transport_specialized: 'Specialized Transport', transport_specialized_note: 'Tailored service for specific needs',
    district_north: 'Abhur North', district_south: 'Abhur South',
    subtype_month: 'Monthly',    subtype_month_note: 'Discounts by days',
    subtype_term:  'Full Term',  subtype_term_note:  '5 months · Best value',
    triptype_both: 'Round Trip', triptype_go: 'Drop-off only', triptype_return: 'Pick-up only',
    calc_placeholder_text: 'Select the district, subscription type, and trip direction to see your instant price',
    calc_base_label: 'Base Price', calc_total_label: 'Total',
    calc_term_note: 'Full term price (5 months)', calc_cta: 'Register Now',
    clients_badge: 'Our Clients', clients_title: 'Partners Who Trust Our Services',
    clients_subtitle: 'We are proud to serve leading companies and educational institutions across Saudi Arabia',
    contact_badge: 'Contact Us', contact_title: "We're Here to Serve You",
    contact_subtitle: 'Want to inquire about our services or subscribe? Our team will respond within hours.',
    contact_tab_inquiry: 'Inquiry', contact_tab_complaint: 'Complaint', contact_tab_quote: 'Get a Quote',
    contact_name: 'Full Name', contact_email: 'Email Address',
    contact_subject: 'Service Required', contact_message: 'Request Details',
    contact_send: 'Send Request',
    contact_success: 'Message received! Our team will contact you within 24 hours.',
    contact_info_phone: '920003790', contact_info_phone_sub: 'Unified Number',
    contact_info_email: 'info@wosol.net',
    contact_info_address: 'Jeddah - Al Rowais - Madinah Road descending - Al Muhammadiyah Plaza',
    complaint_name: 'Full Name', complaint_phone: 'Phone Number',
    complaint_order_num: 'Subscription Number', complaint_type: 'Complaint Type',
    complaint_date: 'Incident Date', complaint_desc: 'Complaint Description',
    complaint_send: 'Submit Complaint',
    complaint_success: 'Complaint received! We will contact you within 24 hours.',
    quote_org: 'Organization / Company Name', quote_service: 'Service Required',
    quote_count: 'Expected Number of Passengers', quote_region: 'Region / City',
    quote_notes: 'Additional Notes', quote_send: 'Request a Quote',
    quote_service_specialized: 'Specialized Transport',
    quote_success: 'Request received! Our sales team will contact you within 24 hours.',

    /* ── Register ─────────────────────────────────────────── */
    page_title_register: 'wosol | Student Registration',
    reg_hero_title: 'New Student Registration',
    reg_hero_sub: 'Complete the form below to subscribe to our student transportation service',
    reg_step_1: 'Student Info',   reg_step_1_tip: 'Name, ID, phone, address',
    reg_step_2: 'Subscription',   reg_step_2_tip: 'University, subscription type, start date',
    reg_step_3: 'Schedule',       reg_step_3_tip: 'Study days and pickup/dropoff times',
    reg_step_4: 'Submit',         reg_step_4_tip: 'Review terms and submit',
    reg_sec1_title: 'Student Information', reg_sec1_sub: 'Personal details of the student',
    reg_label_fullname: 'Full Name (4 parts)', reg_label_address_group: 'Address',
    reg_first_name: 'First Name', reg_second_name: "Father's Name",
    reg_third_name: "Grandfather's Name", reg_family_name: 'Family Name',
    reg_gender: 'Gender', reg_nationality: 'Nationality',
    reg_id: 'National ID / Iqama', reg_phone: 'Phone Number',
    reg_email: 'Email Address', reg_region: 'Region',
    reg_city: 'City', reg_district: 'District', reg_address: 'Detailed Address',
    reg_sec2_title: 'Subscription Details', reg_sec2_sub: 'University and service type',
    reg_univ: 'University Name', reg_gate: 'University Gate',
    reg_service_type: 'Transport Type',
    reg_service_educational: 'Educational Transport',
    reg_service_specialized: 'Specialized Transport',
    reg_sub_type: 'Subscription Type',
    reg_sub_month: 'Monthly', reg_sub_term1: 'Term 1', reg_sub_term2: 'Term 2',
    reg_trip_type: 'Trip Type',
    reg_trip_go: 'Drop-off', reg_trip_return: 'Pick-up', reg_trip_both: 'Round Trip',
    reg_start_date: 'Start Date',
    reg_price_title: 'Price Summary', reg_price_sub: 'Updates automatically',
    reg_price_live: 'Live',
    reg_sec3_title: 'Schedule', reg_sec3_sub: 'Select study days and pickup/dropoff times',
    reg_days_hint: 'Select days then set departure and/or return time for each',
    reg_sec4_title: 'Terms & Conditions', reg_sec4_sub: 'Please read carefully before submitting',
    reg_terms_scroll: 'Scroll down to read the full terms',
    reg_terms_agree_text: 'I have read and agree to all Terms & Conditions above, and confirm the accuracy of the entered information.',
    reg_submit_btn: 'Submit Registration',
    reg_back_btn: 'Back to Home',
    reg_success_title: 'Request Submitted Successfully!',
    reg_success_desc: 'Thank you for registering with wosol. Our team will contact you within 24 hours to confirm your subscription.',
    reg_ref_label: 'Your reference:',
    reg_return_home: 'Return to Homepage',
    rsb_step_of: 'of',
    rsb_step_label: 'Step',

    /* ── Payment ──────────────────────────────────────────── */
    page_title_payment: 'wosol | Complete Payment',
    pay_hero_title: 'Complete Your Payment',
    pay_hero_sub: 'Enter your card details to securely complete your subscription',
    pay_order_title: 'Order Summary', pay_order_sub: 'Your selected subscription details',
    pay_ref: 'Order Number', pay_subtype: 'Subscription Type',
    pay_triptype: 'Trip Type', pay_district: 'District',
    pay_start: 'Start Date', pay_total: 'Total Amount',
    pay_secure_msg: 'Your order is fully encrypted and secure',
    pay_form_title: 'Payment Details', pay_form_sub: 'Fields will be connected to a payment gateway',
    pay_card_number: 'Card Number', pay_card_holder: 'Cardholder Name',
    pay_expiry: 'Expiry Date', pay_cvv: 'CVV Code',
    pay_accepted: 'Accepted cards:',
    pay_btn: 'Pay Securely',
    pay_ssl: 'SSL 256-bit encrypted — your data is completely safe',
    pay_success_title: 'Payment Successful!',
    pay_success_desc: 'Thank you! Your wosol subscription has been confirmed. Our team will contact you within 24 hours with trip details.',
    pay_ref_label: 'Your reference:',
    pay_return_home: 'Return to Homepage',
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

  // Notify sticky bar to re-render counter if present
  if (typeof window._rsbRefresh === 'function') window._rsbRefresh();

  localStorage.setItem('nova-lang', lang);
}

/* ─────────────────────────────────────────────────────────────
   initI18n()
   Restores saved language and wires the lang toggle button.
   Call once per page that includes this script.
───────────────────────────────────────────────────────────── */
function initI18n() {
  const saved = localStorage.getItem('nova-lang') || 'ar';
  applyI18n(saved);

  document.getElementById('langToggle')?.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-lang') || 'ar';
    applyI18n(cur === 'ar' ? 'en' : 'ar');
  });
}
